import { action, autorun, computed, observable, toJS } from "mobx";
import { loadData, objToMap, saveData } from "../utils/StoreUtils";
import {
  maxPurchaseLimitReached,
  productActivePrice,
  productPrice
} from "../utils/ProductUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import customerStore from "./CustomerStore";
import { postRequest } from "../utils/RestMiddlewareUtil";
import { _forEach, _has, _map, _merge } from "../utils/HelperUtils";
import {
  isEasyPaisaMiniApp,
  logInfoMessage,
  logMessage
} from "../utils/AppUtils";
import gtmService from "../services/GTMService";
import globalSettingStore from "./GlobalSettingStore";
import paymentStore from "./PaymentStore";

class OrderStore {
  @observable all = new Map();
  @observable notFound = new Map();
  @observable timeSlot = "";
  @observable state = "pending";
  @observable placeOrderState = "pending";
  @observable verifyPaymentState = "pending";
  @observable checkAvailabilityState = "pending";
  @observable comments = "";
  @observable successfulOrder = {};
  @observable successfulPayment = {};
  @observable shouldUseWallet = false;
  promise;
  disposeAutorun;

  constructor() {
    this.persistData();
  }

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @computed get paymentMethod() {
    return paymentStore.selectedPaymentMethod;
  }

  @computed get selectedCard() {
    return paymentStore.selectedCard;
  }

  @action
  setComments(comments) {
    this.comments = comments;
  }

  @action
  setShouldUseWallet(shouldUseWallet) {
    if (customerStore.pendingWallet) {
      this.shouldUseWallet = true;
    } else {
      this.shouldUseWallet = shouldUseWallet;
    }
  }

  @action
  setTimeSlot(timeSlot) {
    this.timeSlot = timeSlot;
  }

  @computed get vendor() {
    return customerStore.vendor;
  }

  @computed get customer() {
    return customerStore.customer;
  }

  @computed get wallet() {
    return customerStore.wallet;
  }

  @action
  cancel() {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("placeOrder");
    this.cancelPromise("checkAvailability");
  }

  @action
  cancelPromise(callee) {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  }

  getOrderBody(cvv) {
    const order_items = _map(Array.from(this.all.values()), product => {
      return {
        product_id: product.id,
        quantity: product.order_quantity
      };
    });
    const time_slot_id = this.timeSlot.split("||")[0] || "";
    const delivery_date = this.timeSlot.split("||")[1] || "";
    const body = {
      order_items,
      should_use_wallet: (this.canUseWallet && this.shouldUseWallet) || false,
      time_slot_id,
      delivery_date,
      payment_mode: this.paymentMethod,
      source: "web"
    };
    if (this.paymentMethod === "card") {
      _merge(body, {
        card_id: this.selectedCard.id,
        cvv
      });
    }
    if (this.comments) {
      _merge(body, {
        comments: this.comments
      });
    }
    if (!time_slot_id || !delivery_date) {
      logMessage("Invalid timeslot id", body);
    }
    return body;
  }

  isSuccessfulOrderValid() {
    return (
      _has(this.successfulOrder, "delivery_start_time.date") &&
      _has(this.successfulOrder, "delivery_time.date")
    );
  }

  @action
  placeOrder(cvv, success = () => {}, fail = () => {}, error = () => {}) {
    this.cancelPromise("placeOrder");
    this.placeOrderState = "fetching";
    const body = this.getOrderBody(cvv);
    this.placeOrderPromise = postRequest(
      this,
      "v9/order/create",
      body,
      data => {
        if (this.shouldUseWallet) {
          customerStore.fetchCustomerWithWallet();
          this.setShouldUseWallet(false);
        }
        this.successfulOrder = data;
        if (!this.isSuccessfulOrderValid()) {
          logMessage("order success response not valid", {
            data
          });
        }
        logInfoMessage("place order response from backend", {
          data,
          body,
          queryParams: window.location.search,
          url: "v9/order/create"
        });
        success(data);
        this.placeOrderState = "done";
        if (!data.paymentResponse) {
          this.all.clear();
          this.notFound.clear();
        } else {
          window.location.href = data.paymentResponse._links.redirect.href;
          this.all.clear();
          this.notFound.clear();
        }
      },
      data => {
        fail(data);
        logMessage("Make order failed", {
          customer: this.customer,
          body,
          failResponse: data
        });
        this.placeOrderState = "fail";
      },
      e => {
        error(e);
        logMessage("Make order error", {
          customer: this.customer,
          body,
          errorResponse: e
        });
        this.placeOrderState = "error";
      }
    );
  }

  @action
  easyPaisaPlaceOrder(success = () => {}, fail = () => {}, error = () => {}) {
    this.cancelPromise("placeOrder");
    this.placeOrderState = "fetching";

    const body = this.getOrderBody();
    this.placeOrderPromise = postRequest(
      this,
      "v1/easypaisa/order/create",
      body,
      data => {
        this.successfulOrder = data;
        if (!this.isSuccessfulOrderValid()) {
          logMessage("order success response not valid", {
            data
          });
        }
        logInfoMessage("Order placed successfully", {
          environment: isEasyPaisaMiniApp() ? "easypaisa_miniapp" : "web",
          data,
          body,
          url: "v1/easypaisa/order/create"
        });
        success(data);
        this.placeOrderState = "done";
      },
      data => {
        fail(data);
        logMessage("Make order failed", {
          customer: this.customer,
          body,
          url: "v1/easypaisa/order/create",
          failResponse: data
        });
        this.placeOrderState = "fail";
      },
      e => {
        error(e);
        logMessage("Make order error", {
          customer: this.customer,
          body,
          url: "v1/easypaisa/order/create",
          errorResponse: e
        });
        this.placeOrderState = "error";
      }
    );
  }

  @action
  handleEasyPaisaOrderCleanUp = isSuccess => {
    if (isSuccess) {
      this.all.clear();
      this.notFound.clear();

      if (this.shouldUseWallet) {
        customerStore.fetchCustomerWithWallet();
        this.setShouldUseWallet(false);
      }
    }
  };

  @action
  verifyPayment(url) {
    this.cancelPromise("verifyPayment");
    this.verifyPaymentState = "fetching";
    window.location.href = url;
  }

  @action
  checkAvailability() {
    const productIds = [
      ...Array.from(this.all.keys()),
      ...Array.from(this.notFound.keys())
    ];
    if (productIds.length < 1) {
      return;
    }
    if (
      window.location.pathname &&
      !window.location.pathname.startsWith("/cart")
    ) {
      return;
    }
    this.cancelPromise("checkAvailability");

    this.checkAvailabilityState = "fetching";
    this.checkAvailabilityPromise = postRequest(
      this,
      "v2/products/fetch/by/vendor-id/product-ids",
      {
        vendor_id: this.vendorId,
        product_ids: productIds
      },
      data => {
        const notFoundArr = data["not-found"];
        const foundArr = data["found"];

        _forEach(notFoundArr, id => {
          let notFound = this.all.get(id);
          if (!notFound) {
            notFound = this.notFound.get(id);
          }
          this.notFound.set(notFound.id, notFound);
          this.all.delete(id);
        });

        _forEach(foundArr, serverProduct => {
          let localProduct = this.all.get(serverProduct.id);
          if (!localProduct) {
            localProduct = this.notFound.get(serverProduct.id);
          }
          this.all.set(localProduct.id, _merge(localProduct, serverProduct));
          this.notFound.delete(localProduct.id);
        });

        if (notFoundArr.length < 1) {
          this.notFound = new Map();
        }

        if (foundArr.length < 1) {
          this.all = new Map();
        }

        this.checkAvailabilityState = "done";

        gtmService.checkoutCartStep(orderStore.getAllArray(), orderStore);
      },
      () => {
        this.checkAvailabilityState = "fail";
      },
      () => {
        this.checkAvailabilityState = "error";
      }
    );
  }

  getAllArray() {
    return _map(Array.from(this.all.values()), product => toJS(product));
  }

  cancelAndDisposeAutorun() {
    this.cancel();
    this.disposeAutorun();
  }

  persistData() {
    const key = "orderStore";
    loadData(this, key, data => {
      this.all = objToMap(data.all);
      this.notFound = objToMap(data.notFound);
      this.comments = data.comments;
      this.setShouldUseWallet(data.shouldUseWallet);
      this.checkAvailability();
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS(this.all),
          notFound: toJS(this.notFound),
          comments: toJS(this.comments),
          shouldUseWallet: toJS(this.shouldUseWallet)
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  }

  @computed
  get subTotal() {
    let sum = 0;
    // eslint-disable-next-line no-unused-vars
    for (const val of this.all.values()) {
      sum += productActivePrice(val) * val.order_quantity;
    }
    return sum;
  }

  @computed
  get subTotalSavings() {
    let sum = 0;
    // eslint-disable-next-line no-unused-vars
    for (const val of this.all.values()) {
      sum += (productPrice(val) - productActivePrice(val)) * val.order_quantity;
    }
    return sum;
  }

  @action
  addOne(product, listName, CTListName, query) {
    if (!product) return;
    if (maxPurchaseLimitReached(product)) return;
    const id = product.id;
    if (this.all.has(id)) {
      this.all.get(id).order_quantity++;
    } else {
      product.order_quantity = 1;
      this.all.set(id, product);
    }
    product.quantity = 1;
    product = toJS(product);
    gtmService.addToCart(product, listName, CTListName, query, this.customer);
  }

  @action
  remove(product, listName, CTListName = "") {
    if (!product) {
      return;
    }

    let analyticsProduct = this.all.get(product.id);
    analyticsProduct.quantity = analyticsProduct.order_quantity;
    analyticsProduct = toJS(analyticsProduct);

    gtmService.removeFromCart(analyticsProduct, listName, CTListName);
    this.all.delete(product.id);
  }

  @action
  removeNotFound(product) {
    if (!product) {
      return;
    }
    this.notFound.delete(product.id);
  }

  @action
  removeOne(product, listName, CTListName) {
    if (!product) {
      return;
    }
    const id = product.id;
    const storeProduct = this.all.get(id);
    if (storeProduct && storeProduct.order_quantity === 1) {
      storeProduct.order_quantity = 0;
      this.all.delete(id);
    } else {
      storeProduct.order_quantity--;
      this.all.set(id, storeProduct);
    }
    product.quantity = 1;
    product = toJS(product);
    gtmService.removeFromCart(product, listName, CTListName);
  }

  getQuantity = product => {
    if (!product) {
      return 0;
    }
    const id = product.id;
    if (this.all.has(id)) {
      return this.all.get(id).order_quantity;
    }
    return 0;
  };

  @computed get totalBillWithDelivery() {
    return this.isDeliveryFree
      ? this.subTotal
      : this.subTotal + this.vendor.delivery_charges;
  }

  @computed get totalBill() {
    if (
      customerStore.isLoggedIn &&
      (this.shouldUseWallet || customerStore.pendingWallet)
    ) {
      return this.totalBillWithDelivery - this.wallet.amount > 0
        ? this.totalBillWithDelivery - this.wallet.amount
        : 0;
    }
    return this.totalBillWithDelivery;
  }

  @computed get canUseWallet() {
    return (
      customerStore.isLoggedIn &&
      (this.subTotal >= globalSettingStore.settings.wallet_order_limit ||
        customerStore.pendingWallet ||
        this.customer.is_member)
    );
  }

  @computed get deliveryCharges() {
    return this.isDeliveryFree ? 0 : this.vendor.delivery_charges;
  }

  @computed get isDeliveryFree() {
    return this.subTotal >= this.vendor.free_delivery_after;
  }

  @computed get shopMoreForFreeDelivery() {
    return this.vendor.free_delivery_after - this.subTotal;
  }
}

const orderStore = new OrderStore();
export default orderStore;
