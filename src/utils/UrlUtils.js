import queryString from "query-string";
import {
  ANDROID_APP_LINK,
  IOS_APP_LINK,
  STANDALONE_PAGES
} from "../constatns/AppConstants";
import { decodeUrlString } from "./HelperUtils";
import { BASE_URL } from "../constatns/ApiConstants";
import getSlug from "speakingurl";
import _get from "lodash/get";

export const getProductsPageUrl = category =>
  `/cn/${getSlug(category.name)}/cid/${category.id}`;

export const getSiteMapProductsPageUrl = category =>
  `/sitemap/cn/${getSlug(category.name)}/cid/${category.id}`;

export const getBrandPageUrl = (slug, category = null) => {
  let url = `/shop/${getSlug(slug)}`;
  const cid = _get(category, "id", false);
  const cn = _get(category, "name", "category");

  if (cid) {
    url += `/${getSlug(cn)}/${cid}`;
  }
  return url;
};

export const getBrandPageAbsUrl = (slug, category = null) =>
  getAbsUrl(getBrandPageUrl(slug, category));

export const getAbsUrl = url => `https://grocerapp.pk${url}`;

export const getProductsPageAbsUrl = category =>
  getAbsUrl(getProductsPageUrl(category));

export const getAllBrandsPageAbsUrl = () => getAbsUrl("/brands");

export const getSearchPageAbsUrl = query => getAbsUrl(getSearchPageUrl(query));

export const getSearchPageUrl = query => {
  let base = "/search";
  if (!query) {
    return base;
  }
  return `${base}?q=${getSlug(query)}`;
};

export const getProductPageUrl = product =>
  `/prn/${getSlug(product.name)}/prid/${product.id}`;

export const getProductPageAbsUrl = product =>
  getAbsUrl(getProductPageUrl(product));

export const getLargeLogo = () =>
  "https://pictures.grocerapps.com/original/grocerapp-large-logo-5e6d96218036a.png";

export const getLogoIcon = () =>
  "https://pictures.grocerapps.com/original/grocerapp-small-logo-5e6d96030e467.png";

export const getImageBaseUrlForSiteMap = () =>
  "https://pictures.grocerapps.com/original/";

export const getImageWithBaseUrl = imagePath =>
  `https://pictures.grocerapps.com/original/${imagePath}`;

export const getSearchQuery = search => {
  const qObj = queryString.parse(search);
  if (!qObj) return;
  return decodeUrlString(qObj.q);
};

export const getQueryParam = (search, param) => {
  const qObj = queryString.parse(search);
  if (!qObj) return;
  return qObj[param];
};

export const getImage = product => {
  if (!product.image) {
    return getLargeBrokenCarrot();
  }
  return product.image;
};

export const productFullImage = product => {
  if (!product.image && !product.full_image) {
    return getLargeBrokenCarrot();
  }
  return product.full_image || product.image;
};

export const getProductAllFullImages = product => {
  if (!product.all_images || !product.all_images.length) {
    return [getLargeBrokenCarrot()];
  }
  return product.all_images.map(image => image || getLargeBrokenCarrot());
};

export const getBrokenCarrot = () => {
  return "https://pictures.grocerapps.com/lgthumb/grocerapp-image-not-found-5e6d9643b3c6a.png";
};

export const getLargeBrokenCarrot = () => {
  return "https://pictures.grocerapps.com/original/grocerapp-image-not-found-5e6d9643b3c6a.png";
};

export const gotoNotFoundPage = () => (window.location.href = "/not-found");

export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  // iOS detection from: https://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  return "unknown";
};

export const redirectToAppStore = () => {
  switch (getMobileOperatingSystem()) {
    case "Android":
      window.location.href = ANDROID_APP_LINK;
      break;
    case "iOS":
      window.location.href = IOS_APP_LINK;
      break;
    default:
      window.location.href = ANDROID_APP_LINK;
  }
};

export const isStandalonePage = path =>
  STANDALONE_PAGES.some(standAlone => standAlone === path);

export const endpointUrl = uri => `${BASE_URL}/${uri}`;

export const loginRouteWithRedirect = location => {
  const redirect = location.pathname + location.search;
  return `/login?redirect=${redirect}`;
};

export const getUrlPath = url => {
  let l = document.createElement("a");
  l.href = url;
  return l.pathname + l.search;
};
