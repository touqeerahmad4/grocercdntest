import { action, computed, observable } from "mobx";
import { algoliaRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import gtmService from "../services/GTMService";
import { getListingPageName } from "../utils/SearchUtils";
import { mapToStandardAnalyticsProducts } from "../utils/ProductUtils";

class SearchProductsStore {
  @observable all = [];
  @observable facets = [];
  @observable lastPage;
  @observable per = 30;
  @observable page = 0;
  @observable algoliaQuery = "";
  @observable totalRecords = 0;
  @observable state = "pending";
  @observable selectedFacet = "";

  query = "";
  promise;

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @computed get customer() {
    return customerStore.customer;
  }

  fetch(query, selectedFacet = "") {
    this.cancel();
    this.query = query;
    if (selectedFacet) {
      this.selectedFacet = selectedFacet;
    }
    this.fetchInternal();
  }

  @action
  cancelPromise() {
    if (this.promise) {
      this.promise.cancel();
    }
    this.state = "pending";
  }

  @action
  fetchInternal() {
    this.cancelPromise();

    if (!this.query) {
      this.cancelAll();
      return;
    }
    const facetFilters = [];
    if (this.selectedFacet) {
      facetFilters.push(`category_name:${this.selectedFacet}`);
    }

    algoliaRequest(
      this,
      {
        query: this.query,
        filters: `vendor_id=${this.vendorId}`,
        attributesToRetrieve: "*",
        page: this.page,
        analytics: true,
        getRankingInfo: true,
        responseFields: "*",
        facets: ["category_name"],
        facetFilters,
        hitsPerPage: this.per
      },
      data => {
        this.all = this.all.slice().concat(data.hits);
        this.lastPage = data.nbPages;
        if (data.facets && data.facets.category_name && !this.selectedFacet) {
          this.facets = Object.entries(data.facets.category_name);
          this.totalRecords = data.nbHits;
          this.algoliaQuery = data.query;
        }

        if (data.nbHits === 0) {
          gtmService.event(
            "Algolia Search",
            "Not found",
            data.query,
            data.nbHits
          );
          this.totalRecords = 0;
        } else {
          gtmService.event(
            "Algolia Search",
            "Found",
            data.query,
            data.nbHits,
            mapToStandardAnalyticsProducts(data.hits)
          );
          gtmService.productImpressions(
            data.hits,
            getListingPageName(),
            this.customer,
            "Search"
          );
        }
      }
    );
  }

  @action
  loadMore() {
    this.page++;
    this.fetchInternal();
  }

  @action
  cancel() {
    this.all = [];
    this.selectedFacet = "";
    this.per = 30;
    this.page = 0;
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
  }

  @action
  cancelAll() {
    this.cancel();
    this.totalRecords = 0;
    this.algoliaQuery = "";
  }
}

const searchProductsStore = new SearchProductsStore();
export default searchProductsStore;
