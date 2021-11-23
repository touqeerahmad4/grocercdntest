import { action, autorun, computed, observable, toJS } from "mobx";
import { getRequest, postRequest } from "../utils/RestMiddlewareUtil";
import { _filter } from "../utils/HelperUtils";
import customerStore from "./CustomerStore";
import { loadData, objToMap, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import { logInfoMessage, logMessage } from "../utils/AppUtils";

class PaymentStore {
  @observable all = [];
  @observable paymentMethodList = ["cod", "card", "easypaisa_miniapp"];
  @observable selectedCard = {};
  @observable selectedPaymentMethod = "cod";
  @observable fetchCreditCardState = "pending";
  @observable verifyCreditCardState = "pending";
  @observable deleteCreditCardState = "pending";
  @observable confirmEasyPaisaPaymentState = "pending";

  promise;
  disposeAutorun;

  constructor() {
    this.persistData();
  }

  @action
  resetSelectedMethod() {
    this.selectedCard = {};
    this.selectedPaymentMethod = "cod";
  }

  @action
  cancel = () => {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetchCreditCards");
    this.cancelPromise("verifyCreditCard");
    this.cancelPromise("deleteCreditCard");
  };

  @action
  cancelPromise = callee => {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  };

  persistData = () => {
    const key = "paymentStore";
    loadData(this, key, data => {
      this.all = (Array.isArray(this.all) && this.all) || [];
      this.paymentMethodList = objToMap(data.paymentMethodList);
      this.selectedCard = data.selectedCard;
      this.selectedPaymentMethod = data.selectedPaymentMethod;
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS((Array.isArray(this.all) && this.all) || []),
          paymentMethodList: toJS(this.paymentMethodList),
          selectedCard: toJS(this.selectedCard),
          selectedPaymentMethod: toJS(this.selectedPaymentMethod)
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  };

  @computed get cards() {
    return this.all;
  }

  @action
  handlePaymentSelection = (type, data) => {
    this.selectedPaymentMethod = type;
    this.selectedCard = {};
    if (type === "card") {
      this.selectedCard = data;
    }
  };

  @action
  setVerifyCreditCardState = state => {
    this.verifyCreditCardState = state;
  };

  @action
  verifyCreditCard = (
    cardBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("verifyCreditCard");
    const body = {
      token: cardBody.token,
      scheme: cardBody.scheme.toLowerCase()
    };
    this.verifyCreditCardState = "fetching";
    this.verifyCreditCardPromise = postRequest(
      this,
      "v2/customer/card/verify",
      body,
      data => {
        logInfoMessage("verify credit card response from backend", {
          data,
          body,
          queryParams: window.location.search,
          url: "v2/customer/card/verify"
        });
        success(data);
        if (cardBody.checkout) {
          this.selectedCard = { id: data.card_id };
          this.selectedPaymentMethod = "card";
        }
        this.verifyCreditCardState = "done";
      },
      data => {
        fail(data);
        this.verifyCreditCardState = "fail";
      },
      e => {
        error(e);
        this.verifyCreditCardState = "error";
      }
    );
  };

  @action
  fetchCreditCards = (success = () => {}) => {
    if (!customerStore.isLoggedIn) {
      return;
    }
    this.cancelPromise("fetchCreditCard");
    this.fetchCreditCardState = "fetching";
    this.fetchCreditCardPromise = getRequest(
      this,
      "v1/customer/card/listing",
      data => {
        success();
        this.all = data;
        if (Object.keys(this.selectedCard).length) {
          const card = _filter(data, card => card.id === this.selectedCard.id);
          if (card.length) {
            this.selectedCard = card[0];
          } else {
            this.selectedCard = {};
            this.selectedPaymentMethod = "cod";
          }
        }
        this.fetchCreditCardState = "done";
      },
      () => {
        this.fetchCreditCardState = "fail";
      },
      () => {
        this.fetchCreditCardState = "error";
      }
    );
  };

  @action
  deleteCreditCard = (cardId, success = () => {}) => {
    if (!customerStore.isLoggedIn) {
      return;
    }
    const body = {
      card_id: cardId
    };
    this.cancelPromise("deleteCreditCard");
    this.deleteCreditCardState = "fetching";
    this.deleteCreditCardPromise = postRequest(
      this,
      "v1/customer/card/delete",
      body,
      () => {
        success();
        this.all = _filter(this.all, card => card.id !== parseInt(cardId));
        this.deleteCreditCardState = "done";
      },
      () => {
        this.deleteCreditCardState = "fail";
      },
      () => {
        this.deleteCreditCardState = "error";
      }
    );
  };

  @action
  confirmEasyPaisaPayment = (
    body,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("confirmEasyPaisaPayment");
    this.confirmEasyPaisaPaymentState = "fetching";
    this.confirmEasyPaisaPaymentPromise = postRequest(
      this,
      "v1/confirm/payment",
      body,
      data => {
        logInfoMessage(
          "Confirm payment response of Easypaisa MiniApp from grocerapp",
          {
            environment: "easypaisa_miniapp",
            customer: customerStore.customer,
            data,
            body,
            url: "v1/confirm/payment"
          }
        );
        success(data);
        this.confirmEasyPaisaPaymentState = "done";
      },
      data => {
        logMessage(
          "Confirm payment response of Easypaisa MiniApp from grocerapp failed",
          {
            customer: customerStore.customer,
            body,
            failResponse: data
          }
        );
        fail(data);
        this.confirmEasyPaisaPaymentState = "fail";
      },
      e => {
        logMessage(
          "Confirm payment response of Easypaisa MiniApp from grocerapp error",
          {
            customer: customerStore.customer,
            body,
            errorResponse: e
          }
        );
        error(e);
        this.confirmEasyPaisaPaymentState = "error";
      }
    );
  };

  cancelAndDisposeAutorun = () => {
    this.cancel();
  };
}

const paymentStore = new PaymentStore();
export default paymentStore;
