import { action, computed, observable } from "mobx";
import { getRequest, postRequest } from "../utils/RestMiddlewareUtil";
import { gotoNotFoundPage } from "../utils/UrlUtils";
import gtmService from "../services/GTMService";
import customerStore from "./CustomerStore";
import { logMessage } from "../utils/AppUtils";

class MyOrdersStore {
  @observable all = [];
  @observable previouslyOrderedList = [];
  @observable lastPage;
  @observable previouslyOrderedListLastPage;
  @observable lastOrder = {};
  @observable per = 30;
  @observable page = 1;
  @observable prevOrderPage = 1;
  @observable prevOrderPageSize = 30;
  @observable state = "pending";
  @observable retryOrderId = "";
  @observable fetchLastOrderState = "pending";
  @observable retryPaymentState = "pending";
  @observable updateOrderState = "pending";
  @observable fetchPreviouslyOrderedProductsState = "pending";

  promise;

  fetch() {
    this.fetchInternal();
  }

  @computed get customer() {
    return customerStore.customer;
  }

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @action
  cancelPromise(callee) {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  }

  @action
  fetchInternal() {
    this.cancelPromise();

    getRequest(
      this,
      `v5/orders/history?per=${this.per}&page=${this.page}`,
      data => {
        this.all = this.all.slice().concat(data.data);
        gtmService.refundAllCancelled(data.data);
        this.lastPage = data.last_page;
      },
      () => {
        gotoNotFoundPage();
      }
    );
  }

  @action
  fetchLastOrder(success = () => {}) {
    if (!customerStore.isLoggedIn) {
      return;
    }
    this.cancelPromise("fetchLastOrder");
    this.fetchLastOrderState = "fetching";
    this.fetchLastOrderPromise = getRequest(
      this,
      "v2/last/order",
      data => {
        if (data) {
          this.lastOrder = data;
          this.lastOrder.id = data.order_id;
        }
        success();
        this.fetchLastOrderState = "done";
      },
      () => {
        this.fetchLastOrderState = "fail";
      },
      () => {
        this.fetchLastOrderState = "error";
      }
    );
  }

  @action
  fetchPreviouslyOrderedProducts = (success = () => {}) => {
    if (!customerStore.isLoggedIn) {
      return;
    }
    this.cancelPromise("fetchPreviouslyOrderedProducts");
    this.fetchPreviouslyOrderedProductsState = "fetching";
    this.fetchPreviouslyOrderedProductsPromise = getRequest(
      this,
      `v1/products/reorder?vendor_id=${this.vendorId}&page=${this.prevOrderPage}&page_size=${this.prevOrderPageSize}`,
      data => {
        if (Array.isArray(data)) {
          this.previouslyOrderedList = [];
          this.fetchPreviouslyOrderedProductsState = "done";
          return;
        }
        this.previouslyOrderedList = this.previouslyOrderedList
          .slice()
          .concat(data.data);
        this.previouslyOrderedListLastPage = data.last_page;
        success();
        this.fetchPreviouslyOrderedProductsState = "done";
      },
      () => {
        this.fetchPreviouslyOrderedProductsState = "fail";
      },
      () => {
        this.fetchPreviouslyOrderedProductsState = "error";
      }
    );
  };

  @action
  loadMorePrevOrders = () => {
    this.prevOrderPage++;
    this.fetchPreviouslyOrderedProducts();
  };

  @action
  cancelPrevOrders = () => {
    this.previouslyOrderedList = [];
    this.per = 30;
    this.prevOrderPage = 1;
    this.fetchPreviouslyOrderedProductsState = "pending";
    if (this.fetchPreviouslyOrderedProductsPromise) {
      this.fetchPreviouslyOrderedProductsPromise.cancel();
    }
  };

  @action
  retryPayment = (
    paymentBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("retryPayment");
    this.retryPaymentState = "fetching";
    this.retryOrderId = paymentBody.order_id;
    const body = {
      order_id: paymentBody.order_id,
      card_id: paymentBody.card_id,
      cvv: paymentBody.cvv,
      source: "web"
    };
    this.retryPaymentPromise = postRequest(
      this,
      "v2/customer/card/retry/payment",
      body,
      order => {
        success(order);
        this.retryPaymentState = "done";
        if (order.paymentResponse._links.redirect.href) {
          window.location.href = order.paymentResponse._links.redirect.href;
        }
      },
      data => {
        fail(data);
        logMessage("Retry Payment failed", {
          customer: this.customer,
          body,
          failResponse: data
        });
        this.retryPaymentState = "fail";
        this.retryOrderId = "";
      },
      e => {
        error(e);
        logMessage("Retry Payment error", {
          customer: this.customer,
          body,
          errorResponse: e
        });
        this.retryPaymentState = "error";
        this.retryOrderId = "";
      }
    );
  };

  @action
  updateOrder = (
    orderInfoBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("updateOrder");
    this.updateOrderState = "fetching";
    const body = {
      order_id: orderInfoBody.order_id,
      payment_id: orderInfoBody.payment_id,
      retry_payment: orderInfoBody.retry_payment
    };
    this.retryPaymentPromise = postRequest(
      this,
      "v1/update/order/checkout",
      body,
      () => {
        success();
        this.updateOrderState = "done";
      },
      () => {
        fail();
        this.updateOrderState = "fail";
      },
      () => {
        error();
        this.updateOrderState = "error";
      }
    );
  };

  @action
  loadMore() {
    this.page++;
    this.fetchInternal();
  }

  @action
  cancel() {
    this.all = [];
    this.per = 30;
    this.page = 1;
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
  }
}

const myOrdersStore = new MyOrdersStore();
export default myOrdersStore;
