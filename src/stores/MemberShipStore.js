import { action, autorun, computed, observable, toJS } from "mobx";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import customerStore from "./CustomerStore";
import { getRequest, postRequest } from "../utils/RestMiddlewareUtil";
import { logMessage } from "../utils/AppUtils";

class MemberShipStore {
  @observable all = [];
  @observable cancelState = "pending";
  @observable buyPlanState = "pending";
  @observable memberShipStatsState = "pending";
  @observable fetchMemberShipState = "pending";
  @observable currentPlan = {};
  @observable showBanner = true;
  promise;
  disposeAutorun;

  constructor() {
    this.persistData();
  }

  @computed
  get customer() {
    return customerStore.customer;
  }

  @action
  hideBanner = e => {
    e.preventDefault();
    this.showBanner = false;
  };

  @action
  setCurrentPlan = plan => {
    this.currentPlan = plan;
  };

  @action
  cancel = () => {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("buyPlan");
    this.cancelPromise("memberShipStats");
    this.cancelPromise("fetchMemberShip");
    this.cancelPromise("cancelMemberShip");
  };

  @action
  cancelPromise = callee => {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  };

  @action
  buyPlan = (id, success = () => {}, fail = () => {}, error = () => {}) => {
    this.cancelPromise("buyPlan");
    this.buyPlanState = "fetching";
    const body = {
      plan_id: id,
      customer_id: this.customer.id
    };
    this.buyPlanPromise = postRequest(
      this,
      "v1/customer-plans/create",
      body,
      data => {
        success(data);
        this.buyPlanState = "done";
      },
      data => {
        fail(data);
        logMessage("Buy membership plan fails", {
          customer: this.customer,
          body,
          failResponse: data
        });
        this.buyPlanState = "fail";
      },
      e => {
        error(e);
        logMessage("Buy membership plan error", {
          customer: this.customer,
          body,
          errorResponse: e
        });
        this.buyPlanState = "error";
      }
    );
  };

  @action
  fetchMemberShipStats = (success = () => {}) => {
    if (!customerStore.isLoggedIn || !customerStore.customer.is_member) {
      return;
    }
    this.cancelPromise("memberShipStats");
    this.memberShipStatsState = "fetching";
    this.memberShipStatsPromise = getRequest(
      this,
      "v1/customer/plan/stats",
      data => {
        this.currentPlan = data;
        this.memberShipStatsState = "done";
        success();
      },
      () => {
        this.memberShipStatsState = "fail";
      },
      () => {
        this.memberShipStatsState = "error";
      }
    );
  };

  @action
  fetchMemberShip = (success = () => {}) => {
    this.cancelPromise("fetchMemberShip");
    this.fetchMemberShipState = "fetching";
    this.fetchMemberShipPromise = getRequest(
      this,
      "v1/plans",
      data => {
        this.all = data;
        this.fetchMemberShipState = "done";
        success();
      },
      () => {
        this.fetchMemberShipState = "fail";
      },
      () => {
        this.fetchMemberShipState = "error";
      }
    );
  };

  @action
  cancelMemberShip = (
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("cancelMemberShip");
    this.cancelState = "fetching";
    this.cancelMemberShipPromise = postRequest(
      this,
      "v1/customer/plan/cancel",
      {
        customer_id: this.customer.id
      },
      data => {
        success(data);
        this.setCurrentPlan({});
        this.cancelState = "done";
      },
      data => {
        fail(data);
        logMessage("Cancel membership plan fails", {
          customer: this.customer,
          failResponse: data
        });
        this.cancelState = "fail";
      },
      e => {
        error(e);
        logMessage("Cancel membership plan error", {
          customer: this.customer,
          errorResponse: e
        });
        this.cancelState = "error";
      }
    );
  };

  cancelAndDisposeAutorun = () => {
    this.cancel();
    this.disposeAutorun();
  };

  persistData = () => {
    const key = "memberShipStore";
    loadData(this, key, data => {
      this.all = Array.isArray(data.all) ? data.all : [];
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          all: toJS(Array.isArray(this.all) ? this.all : [])
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  };
}

const memberShipStore = new MemberShipStore();
export default memberShipStore;
