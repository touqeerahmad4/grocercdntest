import { toJS, action, observable, computed, autorun } from "mobx";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";

class TopSellingStore {
  @observable all = [];
  @observable state = "pending";
  @observable fetchedOnce = false;
  @observable fetchState = "pending";

  promise;

  constructor() {
    this.persistData();
  }

  persistData() {
    const key = "topSellingStore";
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
  fetch = () => {
    this.cancelPromise("fetch");
    this.fetchedOnce = true;
    this.fetchState = "fetching";

    this.fetchPromise = getRequest(
      this,
      `v3/products/top-selling?vendor_id=${this.vendorId}`,
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

const topSellingStore = new TopSellingStore();
export default topSellingStore;
