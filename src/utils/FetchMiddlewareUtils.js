import merge from "lodash/merge";
// fetchJSON is bundled wrapper around fetch which simplifies working
// with JSON API:
//   * Automatically adds Content-Type: application/json to request headers
//   * Parses response as JSON when Content-Type: application/json header is
//     present in response headers
//   * Converts non-ok responses to errors
import { configureRefreshFetch, fetchJSON } from "./refresh-fetch-util";
import { endpointUrl } from "./UrlUtils";
import { consoleError, logException } from "./AppUtils";
import customerStore from "../stores/CustomerStore";
import { _get } from "./HelperUtils";

// Add token to the request headers
const fetchJSONWithToken = (uri, options = {}) => {
  const authStore = customerStore.auth;
  let optionsWithToken = merge({}, options, {
    headers: {
      Accept: "application/json"
    }
  });
  if (authStore.access_token) {
    optionsWithToken = merge({}, options, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authStore.access_token}`
      }
    });
  }
  return fetchJSON(endpointUrl(uri), optionsWithToken);
};

// Decide whether this error returned from API means that we want
// to try refreshing the token. error.response contains the fetch Response
// object, error.body contains the parsed JSON response body
const shouldRefreshToken = error => {
  return (
    _get(error, "response.status") === 401 &&
    _get(error, "body.message") === "Unauthenticated."
  );
};

// Do the actual token refreshing and update the saved token
const refreshToken = () => {
  const authStore = customerStore.auth;
  if (!authStore.refresh_token) {
    customerStore.localLogout();
    consoleError("No refresh token found");
    return;
  }

  return fetchJSONWithToken("v1/customer/refresh/token", {
    method: "POST",
    body: JSON.stringify({
      refresh_token: authStore.refresh_token
    })
  })
    .then(response => {
      const body = response.body;
      if (!response || !body || !body.data || !body.data.refresh_token) {
        throw new Error("Could not find refresh token in response");
      }
      customerStore.setAuth(response.body.data);
      return response;
    })
    .catch(error => {
      customerStore.localLogout();
      logException(error);
    });
};

export const fetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken
});
