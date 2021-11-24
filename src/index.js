import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import stores from "./stores";
import { Provider } from "mobx-react";
import App from "./App";
import * as Sentry from "@sentry/browser";
import "whatwg-fetch";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  environment: process.env.REACT_APP_SENTRY_ENV,
  release: process.env.REACT_APP_COMMIT_REF
});

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();

// Its not recommended to use css grid, its not supported yet on opera mini and sparsely on UC browser
// On android browser 4.x.x, its not supported at all. And we have around
// 1260 customer (4%) on android 4.x.x. So to build layouts, only use the
// material-ui grid. Its based on flex, which is much widely supported.
// Also don't think you can use grid and support old browsers with polyfill, its much more than
// that, please read https://www.smashingmagazine.com/2017/11/css-grid-supporting-browsers-without-grid/
