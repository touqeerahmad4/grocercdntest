import React, { Component } from "react";
import withCustomStyles from "./BottomNavPart.style";
import { withRouter } from "react-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRounded from "@material-ui/icons/HomeRounded";
import ListRounded from "@material-ui/icons/ListRounded";
import MoreVertRounded from "@material-ui/icons/MoreVertRounded";
import ViewModuleRounded from "@material-ui/icons/ViewModuleRounded";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

@inject(["routerStore"])
@observer
class BottomNavPart extends Component {
  render() {
    const {
      props: { classes, routerStore }
    } = this;

    return (
      <div className={classes.root}>
        <BottomNavigation
          value={routerStore.currentPath}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            label="Home"
            value="/"
            className={classes.action}
            component={Link}
            to="/"
            icon={<HomeRounded />}
          />
          <BottomNavigationAction
            label="Categories"
            component={Link}
            to="/categories"
            className={classes.action}
            value="/categories"
            icon={<ViewModuleRounded />}
          />
          <BottomNavigationAction
            label="Orders"
            component={Link}
            className={classes.action}
            to="/myorders"
            value="/myorders"
            icon={<ListRounded />}
          />
          <BottomNavigationAction
            label="More"
            component={Link}
            className={classes.action}
            to="/menu"
            value="/menu"
            icon={<MoreVertRounded />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default withRouter(withCustomStyles(BottomNavPart));
