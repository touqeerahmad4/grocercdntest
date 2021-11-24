// 3rd party
import React, { Component } from "react";
import { Route, withRouter } from "react-router";
import _startsWith from "lodash/startsWith";
import { inject, observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import NoSsr from "@material-ui/core/NoSsr";
import * as classnames from "classnames";
import "lazysizes";

// lib
import HeaderPart from "./parts/HeaderPart";
import { mainThemeObject } from "./theme/MainTheme";
import { isStandalonePage } from "./utils/UrlUtils";
import LoadMorePart from "./parts/LoadMorePart";
import RouteWrapper from "./RouteWrapper";
import withCustomStyles from "./MainWrapper.style";

@inject(["uiStore"])
@inject(["customerStore"])
@observer
class MainWrapper extends Component {
  componentDidMount = () => {
    if (window && window.innerWidth) {
      this.props.uiStore.setScreenWidth(window.innerWidth);
    }
  };

  isGreaterThanMd = () => {
    return (
      this.props.uiStore.screenWidth >= mainThemeObject.breakpoints.values.md
    );
  };

  render() {
    const {
      props: {
        classes,
        uiStore,
        customerStore,
        location: { pathname }
      }
    } = this;

    const location =
      uiStore &&
      uiStore.defaultDeliveryLocation &&
      uiStore.defaultDeliveryLocation.location;

    let content = (
      <React.Fragment>
        <main
          className={classnames(
            {
              [classes.mdWidth]: this.isGreaterThanMd()
            },
            {
              [classes.upLift]: isStandalonePage(pathname)
            }
          )}
        >
          <HeaderPart />
          {!_startsWith(pathname, "/redirect") &&
            (customerStore.fetchVendorState === "fetching" ||
              (!location && pathname !== "/change-location")) && (
              <LoadMorePart />
            )}
          {(_startsWith(pathname, "/redirect") ||
            location ||
            pathname === "/change-location") && (
            <>
              <RouteWrapper />
            </>
          )}
        </main>
      </React.Fragment>
    );

    if (pathname === "/apple-app-site-association") {
      const reload = () => window.location.reload();
      content = <Route path="/apple-app-site-association" onEnter={reload} />;
    }

    const forGreaterThanMd = (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>{content}</Grid>
      </Grid>
    );

    return (
      <NoSsr>
        <div className={classes.app}>
          <CssBaseline />
          {customerStore.logoutState === "fetching" && <LoadMorePart />}
          {customerStore.logoutState !== "fetching" &&
            this.isGreaterThanMd() &&
            forGreaterThanMd}
          {customerStore.logoutState !== "fetching" &&
            !this.isGreaterThanMd() &&
            content}
        </div>
      </NoSsr>
    );
  }
}

export default withRouter(withCustomStyles(MainWrapper));
