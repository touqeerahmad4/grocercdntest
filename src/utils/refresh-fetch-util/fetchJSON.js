import merge from "lodash/merge";

const fetchJSON = (url, options) => {
  const jsonOptions = merge(
    {
      headers: {
        "Content-Type": "application/json"
      }
    },
    options
  );

  return fetch(url, jsonOptions)
    .then(response => {
      return getResponseBody(response).then(body => ({
        response,
        body
      }));
    })
    .then(checkStatus);
};

const getResponseBody = response => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("json") >= 0
    ? response.text().then(tryParseJSON)
    : response.text();
};

const tryParseJSON = json => {
  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`Failed to parse unexpected JSON response: ${json}`);
  }
};

function ResponseError(status, response, body) {
  this.name = "ResponseError";
  this.status = status;
  this.response = response;
  this.body = body;
}

// $FlowIssue
ResponseError.prototype = Error.prototype;

const checkStatus = ({ response, body }) => {
  if (response.ok) {
    return { response, body };
  } else {
    throw new ResponseError(response.status, response, body);
  }
};

export default fetchJSON;
