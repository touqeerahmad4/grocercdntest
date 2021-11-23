import { action, autorun, computed, observable, toJS } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import { pushCategoryNode } from "../utils/ProductUtils";
import { objectFilter } from "../utils/HelperUtils";
import customerStore from "./CustomerStore";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";

class CategoriesStore {
  @observable all = [];
  @observable flat = [];
  @observable youngPeopleBuy = [];
  @observable state = "pending";

  promise;

  constructor() {
    this.persistData();
  }

  persistData() {
    const key = "categoriesStore";
    loadData(this, key, data => {
      this.all = data.all;
      this.flat = data.flat;
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS(this.all),
          flat: toJS(this.flat)
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  }

  @action
  cancelAndDisposeAutorun() {
    this.cancelPromise();
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
    this.fetchPromise = getRequest(
      this,
      `v2/categories/list?vendor_id=${this.vendorId}`,
      data => {
        this.all = data.tree;
        this.flat = data.flat;
        this.youngPeopleBuy = [
          this.flat[21],
          this.flat[42],
          this.flat[43],
          this.flat[44]
        ];
      }
    );
  };

  @action
  cancel() {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetch");
  }

  children(id) {
    let intId = parseInt(id);
    if (intId === 144 || intId === 98 || intId === 82) {
      intId++;
    }
    return (
      objectFilter(this.flat, category => category.parent_id === intId) || []
    );
  }

  parents(id) {
    let node = this.flat[id];
    if (!node) {
      return [];
    }
    return [...this.parents(node.parent_id), ...pushCategoryNode(node)];
  }

  find(id) {
    return this.flat[id] || {};
  }
}

const categoriesStore = new CategoriesStore();
export default categoriesStore;
