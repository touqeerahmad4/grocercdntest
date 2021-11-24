import { action, autorun, observable, toJS } from "mobx";
import { isHeadless, isLightHouse } from "../utils/AppUtils";
import { loadData, saveData } from "../utils/StoreUtils";
import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";

class UIStore {
  @observable screenWidth = 360;
  @observable isNotifyPopupShown = false;
  @observable subscribeToPush = false;
  @observable dataLoaded = false;
  @observable defaultDeliveryLocation = {
    lat: "31.5204",
    lng: "74.3587",
    location: ""
  };
  @observable availableLocations = [
    {
      lat: "31.5204",
      lng: "74.3587",
      location: "Lahore"
    },
    {
      lat: "31.4178683285",
      lng: "73.0741497034",
      location: "Faisalabad"
    },
    {
      lat: "33.6844202",
      lng: "73.04788479999999",
      location: "Rawalpindi / Islamabad"
    }
  ];

  constructor() {
    this.persistData();
    if (isHeadless() || isLightHouse()) {
      this.defaultDeliveryLocation = this.availableLocations[0];
    }
  }

  @action setDataLoaded(value = false) {
    this.dataLoaded = value;
  }

  persistData() {
    const key = "uiStore";
    loadData(
      this,
      key,
      data => {
        this.isNotifyPopupShown = data.isNotifyPopupShown;
        this.subscribeToPush = data.subscribeToPush;
        if (!isHeadless() || !isLightHouse()) {
          this.defaultDeliveryLocation = data.defaultDeliveryLocation;
        }
        this.dataLoaded = true;
      },
      () => {
        this.dataLoaded = true;
      }
    );
    this.disposeAutorun = autorun(
      () => {
        saveData(this, key, {
          subscribeToPush: toJS(this.subscribeToPush),
          isNotifyPopupShown: toJS(this.isNotifyPopupShown),
          defaultDeliveryLocation: toJS(this.defaultDeliveryLocation)
        });
      },
      { delay: DEFAULT_DEBOUNCE * 8 }
    );
  }

  subscribeToPushNotifications() {
    this.subscribeToPush = true;
    this.isNotifyPopupShown = true;
  }

  dontSubscribeToPushNotifications() {
    this.subscribeToPush = false;
    this.isNotifyPopupShown = true;
  }

  @action
  setScreenWidth(screenWidth) {
    if (isHeadless()) return;
    this.screenWidth = screenWidth;
  }

  @action
  setDefaultDeliveryLocation(location) {
    this.defaultDeliveryLocation = location;
  }

  extraSmall() {
    return this.screenWidth && this.screenWidth < 330;
  }
}

const uiStore = new UIStore();
export default uiStore;
