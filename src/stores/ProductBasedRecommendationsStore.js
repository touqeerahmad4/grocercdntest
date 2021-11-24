import { action, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";

class ProductBasedRecommendationsStore {
  @observable all = [];
  @observable lastPage;
  @observable page = 1;
  @observable fetchState = "pending";
  @observable productId = "";

  promise;
  fetchPromise;

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
  fetch = (productId, success = () => {}) => {
    if (!productId) {
      return;
    }
    this.cancelPromise("fetch");
    this.fetchState = "fetching";
    if (productId !== this.productId) {
      this.page = 1;
    }

    this.fetchPromise = getRequest(
      this,
      `v1/products/aws-based-similar?vendor_id=${customerStore.vendorId}&product_id=${productId}&page=${this.page}`,
      data => {
        if (Array.isArray(data)) {
          this.all = [];
        } else {
          if (
            parseInt(data.current_page) === 1 ||
            productId !== this.productId
          ) {
            this.all = data.data;
            this.productId = productId;
          } else {
            this.all = [...this.all, ...data.data];
          }
          this.lastPage = data.last_page;
        }
        this.fetchState = "done";
        success();
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
  loadMore = prId => {
    if (this.fetchState === "fetching") return;
    if (this.page >= this.lastPage) return;
    this.page++;
    this.fetch(prId);
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

const productBasedRecommendationsStore = new ProductBasedRecommendationsStore();
export default productBasedRecommendationsStore;
