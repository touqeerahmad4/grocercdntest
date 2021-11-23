import { action, autorun, computed, observable, toJS } from "mobx";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import { getRequest, postRequest } from "../utils/RestMiddlewareUtil";
import customerStore from "./CustomerStore";
import { isHeadless } from "../utils/AppUtils";

class GlobalSettingStore {
  @observable deviceId = "";
  @observable cleverTapId = "";
  @observable state = "pending";
  @observable settingState = "pending";
  @observable settings = {
    wallet_order_limit: 500
  };

  platform = "web";
  osVersion = "";
  deviceModel = "";
  language = "en";

  promise;
  disposeAutorun;

  constructor() {
    this.setDeviceInfo();
    this.persistData();
  }

  fetch = () => {
    this.fetchInternal();
  };

  @computed get vendorId() {
    return customerStore.vendorId;
  }

  @action
  setDeviceInfo() {
    this.osVersion = window.navigator.platform;
    this.deviceModel = window.navigator.userAgent;
  }

  persistData() {
    const key = "globalSettingStore";
    loadData(this, key, data => {
      this.settings = data.settings || {};
      this.deviceId = data.deviceId;
    });
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          settings: toJS(this.settings || {}),
          deviceId: this.deviceId
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  }

  @action
  cancel() {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
  }

  @action
  cancelPromise(callee) {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  }

  fetchInternal = () => {
    this.cancelPromise("setting");

    this.settingState = "fetching";
    this.settingPromise = getRequest(
      this,
      "v1/global/settings",
      data => {
        const setting = {};
        data.map(sData => (setting[sData.key] = sData.value));
        this.settings = setting;
        this.settingState = "done";
      },
      () => (this.settingState = "fail"),
      () => (this.settingState = "error")
    );
  };

  registerDevice = (success = () => {}, fail = () => {}) => {
    this.cancelPromise();
    if (window.clevertap && window.clevertap.getCleverTapID && !isHeadless()) {
      this.cleverTapId = window.clevertap.getCleverTapID();
      const body = {
        platform: this.platform,
        device_model: this.deviceModel,
        clevertap_id: window.clevertap.getCleverTapID(),
        language: this.language,
        vendor_id: this.vendorId,
        build_version: process.env.REACT_APP_COMMIT_REF,
        os_version: this.osVersion
      };

      postRequest(
        this,
        "v2/user/device",
        body,
        data => {
          this.deviceId = data.device_request_key;
          success(data.device_request_key);
        },
        () => {}
      );
    } else {
      fail();
    }
  };

  cancelAndDisposeAutorun() {
    this.cancel();
    this.disposeAutorun();
  }
}

const globalSettingStore = new GlobalSettingStore();
export default globalSettingStore;
