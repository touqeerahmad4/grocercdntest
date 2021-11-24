import { flow } from "mobx";
import _entries from "lodash/entries";
import localForage from "localforage";
import { consoleLog } from "./AppUtils";
import { _some } from "./HelperUtils";

export const objToMap = obj =>
  new Map(_entries(obj).map(val => [parseInt(val[0]), val[1]]));

export const loadData = (self, key, success, failed = () => {}) => {
  self.firstRun = true;
  const promise = flow(function*() {
    self.state = "fetching";
    const data = yield localForage.getItem(key);
    self.firstRun = false;
    if (data) {
      success(data);
    } else {
      failed();
    }
    self.state = "done";
  })();
  promise.catch(() => {
    consoleLog("loadData: promise cancelled", key);
  });
  self.promise = promise;
  return promise;
};

export const saveData = (self, key, data) => {
  if (!self.hasOwnProperty("firstRun")) return;
  if (self.firstRun) return;
  const promise = flow(function*() {
    self.state = "fetching";
    yield localForage.setItem(key, data);
    self.state = "done";
  })();
  promise.catch(() => {
    consoleLog("saveData: promise cancelled", key);
  });
  self.promise = promise;
  return promise;
};

export const isFetching = arr => _some(arr, state => state === "fetching");
