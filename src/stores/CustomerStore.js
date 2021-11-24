import { action, autorun, computed, observable, toJS } from "mobx";
import { getRequest, postRequest } from "../utils/RestMiddlewareUtil";
import { loadData, saveData } from "../utils/StoreUtils";
import { authStoreKey, DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import _has from "lodash/has";
import _find from "lodash/find";
import {
  consoleWarn,
  isEasyPaisaMiniApp,
  logInfoMessage,
  logMessage
} from "../utils/AppUtils";
import { decryptObj, encryptObj } from "../utils/EncryptionUtils";
import uiStore from "./UIStore";
import globalSettingStore from "./GlobalSettingStore";
import paymentStore from "./PaymentStore";

class CustomerStore {
  @observable vendor = {};
  @observable customer = {};
  @observable wallet = {};
  @observable auth = {};
  @observable timeSlots = [];
  @observable state = "pending";
  @observable loginState = "pending";
  @observable easyPaisaLoginState = "pending";
  @observable logoutState = "pending";
  @observable signupState = "pending";
  @observable fetchVendorState = "pending";
  @observable fetchTimeSlotState = "pending";
  @observable profileUpdateState = "pending";
  @observable customerWalletDetailState = "pending";
  @observable customerInfoState = "pending";
  @observable generateOTPState = "pending";
  @observable newVendorAssigned = false;
  @observable skipDeviceId = false;
  @observable isTokenLoaded = false;
  @observable isCustomerLoaded = false;

  promise;
  disposeAutoRun;
  disposeAuthAutoRun;

  constructor() {
    this.persistData();
  }

  persistData = () => {
    const key = "customerStore";

    loadData(
      this,
      authStoreKey,
      data => {
        this.auth = decryptObj(data);
        this.isTokenLoaded = true;
      },
      () => {
        this.isTokenLoaded = true;
      }
    );

    loadData(
      this,
      key,
      data => {
        this.vendor = data.vendor;
        this.customer = data.customer;
        this.wallet = data.wallet || {};
        this.isCustomerLoaded = true;
      },
      () => {
        this.isCustomerLoaded = true;
      }
    );

    this.disposeAutoRun = autorun(
      () => {
        saveData(this, key, {
          vendor: toJS(this.vendor),
          customer: toJS(this.customer),
          wallet: toJS(this.wallet) || {}
        });
      },
      { delay: DEFAULT_DEBOUNCE }
    );

    this.disposeAuthAutoRun = autorun(
      () => {
        saveData(this, authStoreKey, encryptObj(toJS(this.auth)));
      },
      { delay: DEFAULT_DEBOUNCE }
    );
  };

  @computed get firstActiveSlotTime() {
    return _find(this.timeSlots[0].timeSlots, { is_available: true });
  }

  @computed get name() {
    return this.isLoggedIn ? this.customer.name : "Guest User";
  }

  @computed get vendorId() {
    return this.vendor.id;
  }

  @computed get deviceId() {
    return globalSettingStore.deviceId;
  }

  @computed get cleverTapId() {
    return globalSettingStore.cleverTapId;
  }

  @computed
  get isLoggedIn() {
    return _has(this.auth, "refresh_token") && _has(this.customer, "id");
  }

  checkVendorValidity(vendor) {
    return _has(vendor, "delivery_option[0].timeSlots[0].id");
  }

  isTimeSlotValid = () => {
    if (!this.timeSlots.length || !this.timeSlots[0].timeSlots[0].id) {
      logMessage("Vendor not valid, checkout page under maintenance", {
        vendor: this.vendor
      });
      return false;
    }
    return true;
  };

  @action
  setAuth = auth => {
    this.auth = auth;
  };

  @action
  localLogout = () => {
    consoleWarn("Logging out");
    this.setAuth({});
    paymentStore.resetSelectedMethod();
    this.customer = {};
    this.wallet = {};
  };

  @action
  cancelPromise = callee => {
    if (this[callee + "Promise"]) {
      this[callee + "Promise"].cancel();
    }
    this[callee + "State"] = "pending";
  };

  @action
  fetchVendor = (
    body = undefined,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    const requestBody = body
      ? body
      : {
          latitude:
            uiStore &&
            uiStore.defaultDeliveryLocation &&
            uiStore.defaultDeliveryLocation.lat,
          longitude:
            uiStore &&
            uiStore.defaultDeliveryLocation &&
            uiStore.defaultDeliveryLocation.lng
        };

    if (this.fetchVendorState === "fetching") {
      return;
    }
    this.cancelPromise("fetchVendor");
    this.fetchVendorState = "fetching";
    this.fetchVendorPromise = postRequest(
      this,
      "v4/vendor/detail",
      requestBody,
      data => {
        let isVendorChange = false;
        if (isEasyPaisaMiniApp() && this.vendorId !== data.id) {
          isVendorChange = true;
        }
        this.vendor = data;
        success({ ...data, isVendorChange });
        this.fetchVendorState = "done";
      },
      data => {
        fail(data);
        this.fetchVendorState = "fail";
      },
      () => {
        error();
        this.fetchVendorState = "error";
      }
    );
  };

  @action
  fetchTimeSlots = (success = () => {}, fail = () => {}, error = () => {}) => {
    this.cancelPromise("fetchTimeSlot");
    if (!this.vendorId) {
      return;
    }

    this.fetchTimeSlotState = "fetching";
    this.fetchTimeSlotPromise = getRequest(
      this,
      `v1/slot/details?vendor_id=${this.vendorId}`,
      data => {
        this.timeSlots = data;
        success(data);
        this.fetchTimeSlotState = "done";
      },
      data => {
        fail(data);
        this.fetchTimeSlotState = "fail";
      },
      () => {
        error();
        this.fetchTimeSlotState = "error";
      }
    );
  };

  @action
  logout = () => {
    if (!this.isLoggedIn) {
      this.localLogout();
      return;
    }

    this.cancelPromise("logout");
    this.logoutState = "fetching";

    this.logoutPromise = postRequest(
      this,
      "v1/customer/logout",
      undefined,
      () => {
        this.localLogout();
        this.logoutState = "done";
        window.location.reload();
      },
      () => (this.logoutState = "fail"),
      () => (this.logoutState = "error")
    );
  };

  @action
  generateOTP = (
    body,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("generateOTP");

    this.generateOTPState = "fetching";
    this.generateOTPPromise = postRequest(
      this,
      "v1/otp/generate",
      body,
      data => {
        success(data);
        this.generateOTPState = "done";
      },
      data => {
        fail(data);
        this.generateOTPState = "fail";
      },
      e => {
        error(e);
        this.generateOTPState = "error";
      }
    );
  };

  @action
  login = (
    loginBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("login");

    this.loginState = "fetching";
    if (this.deviceId || this.skipDeviceId) {
      const body = {
        ...loginBody,
        device_request_key: this.deviceId,
        clevertap_id: this.cleverTapId
      };
      this.loginPromise = postRequest(
        this,
        "v5/customer/login",
        body,
        data => {
          if (
            data &&
            data.customer &&
            data.customer.vendor &&
            this.checkVendorValidity(data.customer.vendor)
          ) {
            this.vendor = data.customer.vendor;
          }
          this.customer = data.customer;
          this.updateWallet(data.customer);
          this.auth = data.auth;
          success(data);
          this.loginState = "done";
        },
        data => {
          fail(data);
          this.loginState = "fail";
        },
        e => {
          error(e);
          this.loginState = "error";
        }
      );
    } else {
      globalSettingStore.registerDevice(
        () => {
          this.login(loginBody, success, fail, error);
        },
        () => {
          this.skipDeviceId = true;
          this.login(loginBody, success, fail, error);
        }
      );
    }
  };

  @action
  easyPaisaAuthenticate = (
    easyPaisaBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("easyPaisaLogin");

    if (this.deviceId || this.skipDeviceId) {
      let locationCoordinates = "";
      if (uiStore && uiStore.defaultDeliveryLocation) {
        locationCoordinates = `${uiStore.defaultDeliveryLocation.lat},${uiStore.defaultDeliveryLocation.lng}`;
      }
      const body = {
        ...easyPaisaBody,
        device_request_key: this.deviceId,
        location_coordinates: locationCoordinates
      };
      this.easyPaisaLoginState = "fetching";
      this.easyPaisaLoginPromise = postRequest(
        this,
        "v1/easypaisa/authentication",
        body,
        data => {
          if (
            data &&
            data.customer &&
            data.customer.vendor &&
            this.checkVendorValidity(data.customer.vendor)
          ) {
            this.vendor = data.customer.vendor;
          }
          this.customer = data.customer;
          // this.updateWallet(data.customer);
          this.auth = data.auth;
          logInfoMessage(
            "Authentication response of Easypaisa MiniApp from grocerapp",
            {
              environment: "easypaisa_miniapp",
              customer: customerStore.customer,
              data,
              body,
              queryParams: window.location.search,
              url: "v1/easypaisa/authentication"
            }
          );
          success(data);
          this.easyPaisaLoginState = "done";
        },
        data => {
          logMessage(
            "Authentication response of Easypaisa MiniApp from grocerapp failed",
            {
              customer: customerStore.customer,
              body,
              queryParams: window.location.search,
              failResponse: data
            }
          );
          fail(data);
          this.easyPaisaLoginState = "fail";
        },
        e => {
          logMessage(
            "Authentication response of Easypaisa MiniApp from grocerapp error",
            {
              customer: customerStore.customer,
              body,
              queryParams: window.location.search,
              errorResponse: e
            }
          );
          error(e);
          this.easyPaisaLoginState = "error";
        }
      );
    } else {
      globalSettingStore.registerDevice(
        () => {
          this.easyPaisaAuthenticate(easyPaisaBody, success, fail, error);
        },
        () => {
          this.skipDeviceId = true;
          this.easyPaisaAuthenticate(easyPaisaBody, success, fail, error);
        }
      );
    }
  };

  @action
  signup = (
    signupBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("signup");
    this.signupState = "fetching";
    if (this.deviceId || this.skipDeviceId) {
      const body = {
        ...signupBody,
        device_request_key: this.deviceId,
        clevertap_id: this.cleverTapId,
        signup_user_agent: isEasyPaisaMiniApp() ? "web_easy_paisa" : "web"
      };
      this.signupPromise = postRequest(
        this,
        "v5/customer/register",
        body,
        data => {
          if (
            data &&
            data.customer &&
            data.customer.vendor &&
            this.checkVendorValidity(data.customer.vendor)
          ) {
            this.vendor = data.customer.vendor;
          }
          this.customer = data.customer;
          this.updateWallet(data.customer);
          this.auth = data.auth;
          success(data);
          this.signupState = "done";
        },
        data => {
          fail(data);
          this.signupState = "fail";
        },
        e => {
          error(e);
          this.signupState = "error";
        }
      );
    } else {
      globalSettingStore.registerDevice(
        () => {
          this.signup(signupBody, success, fail, error);
        },
        () => {
          this.skipDeviceId = true;
          this.signup(signupBody, success, fail, error);
        }
      );
    }
  };

  @action
  profileUpdate = (
    profileBody,
    success = () => {},
    fail = () => {},
    error = () => {}
  ) => {
    this.cancelPromise("profileUpdate");
    if (this.deviceId || this.skipDeviceId) {
      this.profileUpdateState = "fetching";
      const body = { ...profileBody, device_request_key: this.deviceId };
      this.profileUpdatePromise = postRequest(
        this,
        "v4/customer/update",
        body,
        data => {
          if (
            data &&
            data &&
            data.vendor &&
            this.checkVendorValidity(data.vendor)
          ) {
            this.vendor = data.vendor;
          }
          this.customer = data;
          this.updateWallet(data);
          success(data);
          this.profileUpdateState = "done";
        },
        data => {
          fail(data);
          this.profileUpdateState = "fail";
        },
        e => {
          error(e);
          this.profileUpdateState = "error";
        }
      );
    } else {
      globalSettingStore.registerDevice(
        () => {
          this.profileUpdate(profileBody, success, fail, error);
        },
        () => {
          this.skipDeviceId = true;
          this.profileUpdate(profileBody, success, fail, error);
        }
      );
    }
  };

  @action
  fetchCustomerInfo = (success = () => {}) => {
    if (!this.isLoggedIn || this.customerInfoState === "fetching") {
      return;
    }
    this.cancelPromise("customerInfo");
    this.customerInfoState = "fetching";
    this.customerInfoPromise = getRequest(
      this,
      "v4/customer/info",
      data => {
        this.customer = data;
        this.updateWallet(data);
        if (this.vendorId !== data.vendor_id) {
          const coordinates = data.location_coordinates.split(",");
          this.vendor = {
            id: data.vendor_id
          };
          uiStore.setDefaultDeliveryLocation({
            lat: coordinates[0],
            lng: coordinates[1],
            location: data.address
          });
          this.customerInfoState = "done";
          this.fetchVendor(undefined, success);
        } else {
          this.customerInfoState = "done";
          success();
        }
      },
      () => {
        this.customerInfoState = "fail";
      },
      () => {
        this.customerInfoState = "error";
      }
    );
  };

  @action
  cancel = () => {
    this.state = "pending";
    if (this.promise) {
      this.promise.cancel();
    }
    this.cancelPromise("fetchVendor");
    this.cancelPromise("logout");
    this.cancelPromise("login");
    this.cancelPromise("signup");
    this.cancelPromise("profileUpdate");
    this.cancelPromise("customerInfo");
    this.cancelPromise("customerWalletDetail");
  };

  @action
  fetchCustomerWithWallet = (success = () => {}) => {
    if (!this.isLoggedIn) {
      return;
    }
    this.cancelPromise("customerWalletDetail");
    this.customerWalletDetailState = "fetching";
    this.customerWalletDetailPromise = getRequest(
      this,
      "v2/customer/infoWithWalletDetail",
      data => {
        if (data && data.vendor) {
          this.vendor = data && data.vendor;
        }
        this.customer = data;
        this.updateWallet(data);
        this.customerWalletDetailState = "done";
        success();
      },
      () => {
        this.customerWalletDetailState = "fail";
      },
      () => {
        this.customerWalletDetailState = "error";
      }
    );
  };

  @computed get pendingWallet() {
    return this.wallet.amount < 0;
  }

  updateWallet = data => {
    this.wallet = {
      manualAmount: data.manual_amount,
      amount: data.wallet_amount,
      promotionExpiringInDays:
        data.promotion_expiring_in_days || this.wallet.promotionExpiringInDays
    };
  };

  @action
  cancelAndDisposeAutorun = () => {
    this.cancel();
    this.disposeAutoRun();
    this.disposeAuthAutoRun();
  };
}

const customerStore = new CustomerStore();
export default customerStore;
