import { action, computed, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import gtmService from "../services/GTMService";

class ProductStore {
  @observable item = {};
  @observable state = "pending";

  promise;

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @computed get customer() {
    return customerStore.customer;
  }

  @action
  setProduct(product) {
    if (!product) return;
    this.item = product;
  }

  @action
  cancelPromise() {
    if (this.promise) {
      this.promise.cancel();
    }
    this.state = "pending";
  }

  @computed get isFailed() {
    return this.state === "fail" || this.state === "error";
  }

  @computed get isSuccess() {
    return this.state === "done";
  }

  @computed get isFetching() {
    return this.state === "fetching";
  }

  @action
  fetch(productId, success = () => {}, fail = () => {}) {
    if (!productId) {
      throw new Error("Missing productId");
    }
    this.cancelPromise();
    getRequest(
      this,
      `v1/products/web/detail?vendor_id=${this.vendorId}&product_id=${productId}`,
      data => {
        this.item = data;
        if (!data) {
          this.state = "fail";
        }
        success(data);
        gtmService.productDetail(data, this.customer);
      },
      () => {
        fail();
      }
    );
  }

  @action
  cancel() {
    this.product = {};
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
  }
}

const productStore = new ProductStore();
export default productStore;
