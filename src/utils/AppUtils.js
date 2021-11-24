import * as Sentry from "@sentry/browser";

/**
 *
 * @param store
 */
export const handleScroll = store => {
  if (store.state === "fetching") return;
  if (store.page >= store.lastPage) return;
  const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  const scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  const clientHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const scrolledToBottom =
    Math.ceil(scrollTop + clientHeight + scrollHeight / 3) >= scrollHeight;
  if (scrolledToBottom) {
    store.loadMore();
  }
};

/**
 *
 * @param element  HTML Element
 * @param callback  callback function
 */
export const handleHorizontalScroll = (element, callback) => {
  const scrollLeft = (element && element.scrollLeft) || document.body.scrollTop;
  const scrollWidth =
    (element && element.scrollWidth) || document.body.scrollWidth;
  const clientWidth = element.clientWidth || window.innerHeight;
  const scrolledToRight =
    Math.ceil(scrollLeft + clientWidth + scrollWidth / 3) >= scrollWidth;
  if (scrolledToRight) {
    callback();
  }
};

export const consoleLog = (...toBeLogged) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(toBeLogged);
  }
};

export const consoleError = (toBeLogged, obj = {}) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(toBeLogged, obj);
  }
};

export const consoleWarn = (toBeLogged, obj = {}) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(toBeLogged, obj);
  }
};

export const logException = error => {
  consoleError(error);
  Sentry.captureException(error);
};

export const logMessage = (message, extra = {}) => {
  consoleError(message);
  Sentry.captureMessage(message, {
    level: "error",
    extra
  });
};

export const logInfoMessage = (message, extra = {}) => {
  consoleLog(message);
  Sentry.captureMessage(message, {
    level: "log",
    extra
  });
};

export const isHeadless = () =>
  window.navigator.webdriver ||
  /bot|googlebot|crawler|spider|robot|headless|crawling/i.test(
    window.navigator.userAgent
  ) ||
  false;

export const isLightHouse = () =>
  window.navigator.webdriver ||
  /bot|googlebot|crawler|spider|robot|headless|lighthouse|crawling/i.test(
    window.navigator.userAgent
  ) ||
  false;

export const isEasyPaisaMiniApp = () =>
  /easypaisa/.test(window.navigator.userAgent) || false;

export const UANNUMBER = "042-111-476-237";
