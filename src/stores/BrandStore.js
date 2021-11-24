import { action, computed, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import gtmService from "../services/GTMService";

class BrandStore {
  @observable all = [];
  @observable categories = [];
  @observable brand = {};
  @observable lastPage;
  @observable per = 30;
  @observable page = 1;
  @observable total = 0;
  @observable state = "pending";
  @observable brandDetailState = "pending";
  @observable brandProductsState = "pending";

  categoryId;
  slug;
  promise;

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @computed get customer() {
    return customerStore.customer;
  }

  brandProducts(slug, categoryId = null) {
    this.categoryId = categoryId;
    this.slug = slug;
    this.fetchInternal();
  }

  @action
  cancelPromise(callee) {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  }

  @action
  brandDetail(slug) {
    this.cancelPromise("brandDetail");

    if (!slug) {
      throw new Error("Missing brand");
    }
    let url = `v1/brands/detail?vendor_id=${this.vendorId}&slug=${slug}`;
    this.brandDetailState = "fetching";

    this.brandDetailPromise = getRequest(
      this,
      url,
      data => {
        this.brand = data;
        this.brandDetailState = "done";
      },
      fail => {
        this.brandDetailState = "fail";
        console.log(fail);
      },
      error => {
        this.brandDetailState = "error";
        console.log(error);
      }
    );
  }

  @action
  fetchInternal() {
    this.cancelPromise();
    this.cancelPromise("brandProducts");

    if (!this.slug) {
      throw new Error("Missing brand");
    }
    this.brandProductsState = "fetching";

    let url = `v2/brands/products?per=${this.per}&page=${this.page}&vendor_id=${this.vendorId}&slug=${this.slug}`;

    if (this.categoryId) {
      url += `&category_id=${this.categoryId}`;
    }

    this.brandProductsPromise = getRequest(
      this,
      url,
      data => {
        const productPaginatedObj = data.products;
        const productsList = productPaginatedObj.data;
        this.categories = data.categories;
        this.lastPage = productPaginatedObj.last_page;
        this.total = productPaginatedObj.total;
        this.brandProductsState = "done";

        this.all = this.all.slice().concat(productsList);
        gtmService.productImpressions(
          productsList,
          `Brand Page - ${this.slug}`,
          this.customer,
          "Brand"
        );
      },
      () => {
        this.brandProductsState = "fail";
      },
      () => {
        this.brandProductsState = "error";
      }
    );
  }

  @action
  isFailed(state) {
    return state === "fail" || state === "error";
  }

  @action
  isSuccess(state) {
    return state === "done";
  }

  @action
  isFetching(state) {
    return state === "fetching";
  }

  @action
  loadMore() {
    if (!this.isFailed(this.brandProductsState)) {
      this.page++;
      this.fetchInternal();
    }
  }

  @action
  cancel() {
    this.all = [];
    this.categories = [];
    this.per = 30;
    this.page = 1;
    this.total = 0;
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("brandProducts");
    this.cancelPromise("brandDetail");
  }
}

const brandStore = new BrandStore();
export default brandStore;
