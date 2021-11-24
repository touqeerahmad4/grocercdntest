import { action, autorun, observable, toJS } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";

class FAQStore {
  @observable all = [];
  @observable fetchFAQState = "pending";

  promise;
  disposeAutorun;

  constructor() {
    this.persistData();
  }

  @action
  cancel = () => {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetchFAQ");
  };

  @action
  cancelPromise = callee => {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  };

  persistData = () => {
    const key = "faqStore";
    loadData(this, key, () => {
      this.all = (Array.isArray(this.all) && this.all) || [];
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS((Array.isArray(this.all) && this.all) || [])
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  };

  @action
  fetchFAQs = (success = () => {}) => {
    this.cancelPromise("fetchFAQ");
    this.fetchFAQState = "fetching";
    this.fetchFAQPromise = getRequest(
      this,
      "v2/faqs",
      data => {
        success();
        this.all = data;
        this.fetchFAQState = "done";
      },
      () => {
        this.fetchFAQState = "fail";
      },
      () => {
        this.fetchFAQState = "error";
      }
    );
  };

  cancelAndDisposeAutorun = () => {
    this.cancel();
  };
}

const faqStore = new FAQStore();
export default faqStore;
