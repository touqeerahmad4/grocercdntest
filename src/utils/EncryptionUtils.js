import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { logException } from "./AppUtils";

export const encryptObj = obj => {
  return AES.encrypt(
    JSON.stringify(obj),
    process.env.REACT_APP_SALT
  ).toString();
};

export const decryptObj = hashStr => {
  try {
    if (!hashStr) {
      return {};
    }
    const bytes = AES.decrypt(hashStr, process.env.REACT_APP_SALT);
    if (!bytes) {
      return {};
    }
    const str = bytes.toString(Utf8);
    if (!str) {
      return {};
    }
    return JSON.parse(str) || {};
  } catch (error) {
    logException(error);
    return {};
  }
};
