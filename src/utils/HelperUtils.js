import _isArray from "lodash/isArray";
import { logMessage } from "./AppUtils";

export { default as _isEmpty } from "lodash/isEmpty";
export { default as _isUndefined } from "lodash/isUndefined";
export { default as _filter } from "lodash/filter";
export { default as _get } from "lodash/get";
export { default as _has } from "lodash/has";
export { default as _every } from "lodash/every";
export { default as _some } from "lodash/some";
export { default as _isNumber } from "lodash/isNumber";
export { default as _isArray } from "lodash/isArray";
export { default as _isFunction } from "lodash/isFunction";
export { default as _forEach } from "lodash/forEach";
export { default as _debounce } from "lodash/debounce";
export { default as _keyBy } from "lodash/keyBy";
export { default as _merge } from "lodash/merge";
export { default as _map } from "lodash/map";

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const objectFilter = (obj, predicate) => {
  const result = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result.push(obj[key]);
    }
  }
  return result;
};

export const decodeUrlString = str => str && decodeURI(str.replace(/-/g, " "));

export const encodeUrlString = str =>
  str && encodeURI(str.replace(/\s+/g, "-").toLowerCase());

export const stringOrArraytoArray = val => {
  if (!_isArray(val)) {
    return [val];
  }
  if (_isArray(val)) {
    return val;
  }
  logMessage("Invalid stringOrArraytoArray", {
    val
  });
};

export const strLimit = (str, allowedChars = 50) => {
  let subStr = str.substring(0, allowedChars);
  if (str[allowedChars]) {
    return subStr + "...";
  }
  return subStr;
};

export const limitByWord = (str = "", allowedChars = 60) => {
  let seoStr = "";
  str
    .trim()
    .split(" ")
    .forEach(word => {
      if (`${seoStr} ${word.trim()}`.length <= allowedChars) {
        seoStr += ` ${word.trim()}`;
      }
    });
  return seoStr.trim();
};
