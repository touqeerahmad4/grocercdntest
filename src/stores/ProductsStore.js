import { action, computed, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import gtmService from "../services/GTMService";
import { getListingPageName } from "../utils/CategoryUtils";

class ProductsStore {
  @observable all = [];
  @observable fruitsAndVegetables = [];
  @observable daalainAndRice = [];
  @observable siteMapProducts = [];
  @observable lastPage;
  @observable lastPageDaalainAndRice;
  @observable lastPageFruitsAndVegetables;
  @observable product;
  @observable per = 30;
  @observable page = 1;
  @observable fruitsAndVegetablesPage = 1;
  @observable daalainAndRicePage = 1;
  @observable state = "pending";
  @observable fruitsAndVegetablesState = "pending";
  @observable daalainAndRiceState = "pending";
  @observable siteMapProductState = "pending";

  categoryId;
  promise;

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @computed get customer() {
    return customerStore.customer;
  }

  fetch(categoryId) {
    this.categoryId = categoryId;
    this.fetchInternal();
  }

  @action
  cancelPromise = callee => {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  };

  @computed get isFailed() {
    return this.state === "fail" || this.state === "error";
  }

  @action
  loadMore() {
    this.page++;
    this.fetchInternal();
  }

  @action
  fetchInternal() {
    this.cancelPromise();

    if (!this.categoryId) {
      throw new Error("Missing categoryId");
    }
    getRequest(
      this,
      `v3/products/listByParent?per=${this.per}&page=${this.page}&vendor_id=${this.vendorId}&category_id=${this.categoryId}`,
      data => {
        this.lastPage = data.last_page;
        this.all = this.all.slice().concat(data.data);
        gtmService.productImpressions(
          data.data,
          getListingPageName(this.categoryId),
          this.customer,
          "Category"
        );
        gtmService.categoryImpression(this.categoryId);
      }
    );
  }

  @action
  fetchInternalSiteMap(cid) {
    this.cancelPromise("siteMapProduct");
    if (!cid) {
      throw new Error("Missing categoryId");
    }
    const catId = cid;
    this.siteMapProductState = "fetching";
    this.siteMapProductPromise = getRequest(
      this,
      `v2/products/sitemap/listByParent?per=999999&vendor_id=${this.vendorId}&category_id=${cid}`,
      data => {
        this.siteMapProducts = data.data;
        gtmService.productImpressions(
          data.data,
          getListingPageName(catId),
          this.customer,
          "Category"
        );
        gtmService.categoryImpression(catId);
        this.siteMapProductState = "done";
      },
      () => {
        this.siteMapProductState = "fail";
      },
      () => {
        this.siteMapProductState = "error";
      }
    );
  }

  @action
  fetchFruitsAndVegetables = () => {
    this.cancelPromise();
    this.fruitsAndVegetablesState = "fetching";
    const categoryId = 1;
    this.fruitsAndVegetablesPromise = getRequest(
      this,
      `v3/products/listByParent?per=${this.per}&page=${this.fruitsAndVegetablesPage}&vendor_id=${this.vendorId}&category_id=${categoryId}`,
      data => {
        this.lastPageFruitAndVegetables = data.last_page;
        this.fruitsAndVegetables = this.fruitsAndVegetables
          .slice()
          .concat(data.data);
        this.fruitsAndVegetablesState = "done";
        gtmService.productImpressions(
          data.data,
          getListingPageName(categoryId),
          this.customer,
          "Home"
        );
        gtmService.categoryImpression(categoryId);
      },
      () => {
        this.fruitsAndVegetablesState = "fail";
      },
      () => {
        this.fruitsAndVegetablesState = "error";
      }
    );
  };

  @action
  loadMoreFruitsAndVegetables = () => {
    this.fruitsAndVegetablesPage++;
    this.fetchFruitsAndVegetables();
  };

  @action
  fetchDaalainAndRice = () => {
    this.cancelPromise();
    const categoryId = 148;
    this.daalainAndRiceState = "fetching";
    this.daalainAndRicePromise = getRequest(
      this,
      `v3/products/listByParent?per=${this.per}&page=${this.daalainAndRicePage}&vendor_id=${this.vendorId}&category_id=${categoryId}`,
      data => {
        this.lastPageDaalainAndRice = data.last_page;
        this.daalainAndRice = this.daalainAndRice.slice().concat(data.data);
        this.daalainAndRiceState = "done";
        gtmService.productImpressions(
          data.data,
          getListingPageName(categoryId),
          this.customer,
          "Home"
        );
        gtmService.categoryImpression(categoryId);
      },
      () => {
        this.daalainAndRiceState = "fail";
      },
      () => {
        this.daalainAndRiceState = "error";
      }
    );
  };

  @action
  loadMoreDaalainAndRice = () => {
    this.daalainAndRicePage++;
    this.fetchDaalainAndRice();
  };

  @action
  cancelDaalainAndRice = () => {
    this.DaalainAndRice = [];
    this.per = 30;
    this.daalainAndRicePage = 1;
    this.daalainAndRiceState = "pending";
    if (this.daalainAndRicePromise) {
      this.daalainAndRicePromise.cancel();
    }
  };

  @action
  cancelFruitsAndVegetables = () => {
    this.fruitsAndVegetables = [];
    this.per = 30;
    this.fruitsAndVegetablesPage = 1;
    this.fruitsAndVegetablesState = "pending";
    if (this.fruitsAndVegetablesPromise) {
      this.fruitsAndVegetablesPromise.cancel();
    }
  };

  @action
  cancel() {
    this.all = [];
    this.per = 30;
    this.page = 1;
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
  }

  @action
  cancelAll() {
    this.cancel();
    this.cancelPromise("siteMapProduct");
  }
}

const productsStore = new ProductsStore();
export default productsStore;
