import { toJS, action, observable, computed, autorun } from "mobx";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";

class DealsStore {
  @observable all = [];
  @observable tree = [];
  @observable state = "pending";
  @observable fetchState = "pending";

  promise;

  constructor() {
    this.persistData();
  }

  persistData() {
    const key = "dealsStore";
    loadData(this, key, data => {
      this.all = data.all;
      this.tree = data.tree;
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS(this.all),
          tree: toJS(this.tree)
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
    this.fetchState = "fetching";
    this.fetchPromise = getRequest(
      this,
      `v3/deals?vendor_id=${this.vendorId}`,
      data => {
        this.tree = data.tree;
        this.all = data.flat;
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

const dealsStore = new DealsStore();
export default dealsStore;
