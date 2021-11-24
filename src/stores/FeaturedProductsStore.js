import { toJS, action, observable, computed, autorun } from "mobx";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";

class FeaturedProductsStore {
  @observable all = [];
  @observable state = "pending";
  @observable fetchState = "pending";

  promise;

  constructor() {
    this.persistData();
  }

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  persistData() {
    const key = "featuredProductsStore";
    loadData(this, key, data => {
      this.all = data.all;
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS(this.all)
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  }

  @action
  cancelAndDisposeAutorun() {
    this.cancel();
    this.disposeAutorun();
  }

  @action
  cancelPromise(callee) {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  }

  @action
  fetch = () => {
    this.cancelPromise("fetch");
    this.fetchState = "fetching";

    this.fetchPromise = getRequest(
      this,
      `v2/products/featured?vendor_id=${this.vendorId}`,
      data => {
        this.all = data;
        this.fetchState = "done";
      },
      () => {
        this.fetchState = "fail";
      },
      () => {
        this.fetchState = "error";
      }
    );
  };

  @action
  cancel = () => {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetch");
  };
}

const featuredProductsStore = new FeaturedProductsStore();
export default featuredProductsStore;
