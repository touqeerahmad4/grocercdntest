export const SHOP_NOW_BUTTON_TEXT = "Shop Now";

export const ANDROID_APP_LINK =
  "https://play.google.com/store/apps/details?id=com.barfee.mart";
export const IOS_APP_LINK =
  "https://itunes.apple.com/pk/app/grocer-app/id1119311709?mt=8";

export const DEFAULT_DEBOUNCE = 200;

export const STANDALONE_PAGES = [
  "/cart",
  "/checkout",
  "/login",
  "/change-location"
];

export const authStoreKey = "WZRKStore";

const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`;

export const DELIVERY_STATUS_MESSAGES = {
  pending: "You order has been received",
  confirmed: "Your order has been marked confirmed",
  "in progress": "Your order is being packed",
  "in review": "Your order is being packed",
  dispatched: "Your order is en-route",
  delivered: "Your order has been delivered",
  declined: "Your order has been declined",
  dorment: "Your order has been declined"
};
