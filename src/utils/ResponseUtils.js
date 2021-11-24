import { logMessage } from "./AppUtils";

export const getFirstFailMessage = data => {
  const key = Object.keys(data)[0];
  if (!data || !key || !data[key] || !data[key][0]) {
    logMessage("getFirstFailMessageOfKey: Invalid fail message", {
      data,
      key
    });
    return "";
  }
  return data[key][0];
};

export const getFirstFailMessageOfKey = (data, key) => {
  if (!data || !data[key] || !data[key][0]) {
    logMessage("getFirstFailMessageOfKey: Invalid fail message", {
      data,
      key
    });
    return "";
  }
  return data[key][0];
};
