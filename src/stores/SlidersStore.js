import { action, computed, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";

class SlidersStore {
  @observable all = [];
  @observable state = "pending";

  promise;

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @action
  cancelPromise() {
    if (this.promise) {
      this.promise.cancel();
    }
    this.state = "pending";
  }

  @action
  fetch() {
    this.cancelPromise();

    getRequest(this, `v2/sliders?vendor_id=${this.vendorId}`, data => {
      this.all = data;
    });
  }

  @action
  cancel() {
    this.all = [];
    this.cancelPromise();
  }
}

const slidersStore = new SlidersStore();
export default slidersStore;
