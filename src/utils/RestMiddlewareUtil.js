import { flow } from "mobx";
import algoliasearch from "algoliasearch/lite";
import * as Sentry from "@sentry/browser";
import { consoleError, consoleLog, consoleWarn } from "./AppUtils";
import { fetch } from "./FetchMiddlewareUtils";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP,
  process.env.REACT_APP_ALGOLIA_APP_SECRET
);
const index = searchClient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX);

/**
 *
 * @param self
 * @param uri
 * @param success
 * @param fail
 * @param error
 * @returns {CancellablePromise<FlowReturnType<any>>}
 */
export const getRequest = (
  self,
  uri,
  success,
  fail = () => {},
  error = () => {}
) => {
  const promise = flow(function*() {
    self.state = "fetching";

    try {
      const response = yield fetch(uri);
      const body = response.body;
      if (!response || !body) {
        self.state = "error";
        error(`${uri}: No response`);
        return;
      }
      switch (body.status) {
        case "success":
          self.state = "done";
          consoleLog(uri, body.data);
          success(body.data);
          break;
        case "fail":
          self.state = "fail";
          consoleWarn(body);
          fail(body.data);
          break;
        case "error":
          self.state = "error";
          Sentry.captureMessage(`Something went wrong at ${uri}`, {
            level: "error"
          });
          //TODO: add error page, and redirect error cases to there.
          consoleError(body);
          break;
        default:
      }
    } catch (error) {
      consoleError(error);
      Sentry.captureException(error);
      //TODO: add error page, and redirect error cases to there.
      self.state = "error";
    }
  })();

  promise.catch(() => {
    consoleLog("promise cancelled", uri);
  });

  self.promise = promise;

  return promise;
};

/**
 *
 * @param self
 * @param uri
 * @param paramsBody
 * @param success
 * @param fail
 * @param error
 * @returns {CancellablePromise<FlowReturnType<any>>}
 */
export const postRequest = (
  self,
  uri,
  paramsBody = {},
  success,
  fail = () => {},
  error = () => {}
) => {
  const promise = flow(function*() {
    self.state = "fetching";

    try {
      const response = yield fetch(uri, {
        method: "post",
        body: JSON.stringify(paramsBody)
      });
      const body = response.body;
      if (!response || !body) {
        self.state = "error";
        return;
      }
      switch (body.status) {
        case "success":
          self.state = "done";
          consoleLog(uri, body.data);
          success(body.data);
          break;
        case "fail":
          self.state = "fail";
          consoleWarn(body);
          fail(body.data);
          break;
        case "error":
          self.state = "error";
          Sentry.captureMessage(`Something went wrong at ${uri}`, {
            level: "error"
          });
          //TODO: add error page, and redirect error cases to there.
          consoleError(body);
          error(body.data);
          break;
        default:
      }
    } catch (e) {
      consoleError(e);
      Sentry.captureException(e);
      //TODO: add error page, and redirect error cases to there.
      self.state = "error";
      error(e);
    }
  })();

  promise.catch(error => {
    consoleLog("promise cancelled", uri, error);
  });

  self.promise = promise;

  return promise;
};

/**
 *
 * @param self
 * @param request
 * @param success
 * @param error
 * @returns {CancellablePromise<FlowReturnType<any>>}
 */
export const algoliaRequest = (self, request, success, error = () => {}) => {
  const promise = flow(function*() {
    self.state = "fetching";

    try {
      const response = yield index.search(request);

      if (!response) {
        self.state = "error";
        Sentry.captureMessage("No response from algolia", {
          level: "error",
          extra: {
            request: request
          }
        });
        return;
      }

      self.state = "done";
      consoleLog(response);
      success(response);
    } catch (e) {
      Sentry.captureException(error);
      //TODO: add error page, and redirect error cases to there.
      self.state = "error";
      consoleError(e);
      error(e);
    }
  })();

  promise.catch(() => {
    consoleLog("promise cancelled");
  });

  self.promise = promise;

  return promise;
};
