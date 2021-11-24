import { action, observable } from "mobx";
import { getRequest } from "../utils/RestMiddlewareUtil";
import globalSettingStore from "./GlobalSettingStore";

class UserBasedRecommendationsStore {
  @observable all = [];
  @observable lastPage;
  @observable page = 1;
  @observable fetchState = "pending";

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
  fetch = (success = () => {}) => {
    if (!globalSettingStore.deviceId) {
      return;
    }
    this.cancelPromise("fetch");
    this.fetchState = "fetching";

    this.fetchPromise = getRequest(
      this,
      `v1/recommendations/user?user_device_id=${globalSettingStore.deviceId}&page=${this.page}`,
      data => {
        if (Array.isArray(data)) {
          this.all = [];
        } else {
          if (parseInt(data.current_page) === 1) {
            this.all = data.data;
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
  loadMore = () => {
    if (this.fetchState === "fetching") return;
    if (this.page >= this.lastPage) return;
    this.page++;
    this.fetch();
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

const userBasedRecommendationsStore = new UserBasedRecommendationsStore();
export default userBasedRecommendationsStore;
