import { _isFunction, _isNumber } from "./HelperUtils";
import { logMessage } from "./AppUtils";

export const getCoordinate = (center, key) => {
  if (_isNumber(center[key])) {
    return center[key];
  } else if (_isFunction(center[key])) {
    return center[key]();
  } else {
    logMessage("Google maps: Invalid center found", {
      center: center
    });
  }
};
