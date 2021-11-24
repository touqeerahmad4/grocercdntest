import { action, autorun, computed, observable, toJS } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";

class AllBrandsStore {
  @observable all = [];
  @observable topBrands = [];
  @observable limited = [];
  @observable state = "pending";
  @observable fetchLimitedState = "pending";

  promise;

  constructor() {
    this.persistData();
  }

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  persistData() {
    const key = "allBrandsStore";
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
    this.cancelPromise();
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
  fetch() {
    this.cancelPromise("fetch");
    this.fetchPromise = getRequest(
      this,
      `v2/brands/all?vendor_id=${this.vendorId}`,
      data => {
        this.all = data;
      }
    );
  }

  @computed get isFailed() {
    return this.state === "fail" || this.state === "error";
  }

  @action
  fetchLimited = limit => {
    this.cancelPromise("fetchLimited");
    let url = `v2/brands/all?vendor_id=${this.vendorId}&limit=${limit}`;
    this.fetchLimitedPromise = getRequest(this, url, data => {
      this.limited = data;
      const brands = [];
      // eslint-disable-next-line no-unused-vars
      for (let brand of this.limited) {
        if (brands.length < 7 && brand.brand_slider_image) {
          brands.push(brand);
        }
        if (brands.length >= 6) {
          break;
        }
      }
      this.topBrands = brands;
    });
  };

  @action
  cancel() {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetch");
    this.cancelPromise("fetchLimited");
  }
}

const allBrandsStore = new AllBrandsStore();
export default allBrandsStore;
