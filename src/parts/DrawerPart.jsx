import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router";
import withCustomStyles from "./DrawerPart.style";
import ListRounded from "@material-ui/icons/ListRounded";
import PermIdentityRounded from "@material-ui/icons/PermIdentityRounded";
import PhoneCallbackRounded from "@material-ui/icons/PhoneCallbackRounded";
import PowerSettingsNewRounded from "@material-ui/icons/PowerSettingsNewRounded";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CardMembership from "@material-ui/icons/CardMembership";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Chip from "@material-ui/core/Chip";
import { isEasyPaisaMiniApp, UANNUMBER } from "../utils/AppUtils";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CloseIcon from "@material-ui/icons/Close";

@inject(["customerStore"])
@observer
class DrawerPart extends Component {
  state = {
    drawerOpen: true
  };

  componentDidMount() {
    this.props.customerStore.fetchCustomerInfo();
  }

  handleSignoutClick = () => {
    const {
      props: { customerStore, onClose }
    } = this;
    onClose();
    if (customerStore.isLoggedIn) {
      customerStore.logout();
    }
  };

  signinLink = () => {
    const {
      props: { customerStore }
    } = this;
    return customerStore.isLoggedIn ? "" : "/login";
  };

  render() {
    const {
      props: {
        open,
        classes,
        customerStore,
        onClose,
        location: { pathname }
      }
    } = this;

    return (
      <Drawer open={open} onClose={onClose} className={classes.drawer}>
        <Grid className={classes.closeIcon}>
          <IconButton
            focusRipple
            disableRipple
            disableTouchRipple
            onClick={onClose}
          >
            <CloseIcon color="action" />
          </IconButton>
        </Grid>
        <Paper className={classes.drawerChild}>
          <Typography variant={"h6"} gutterBottom>
            Salam, {customerStore.name}!
          </Typography>
          <List>
            {((isEasyPaisaMiniApp() && customerStore.isLoggedIn) ||
              !isEasyPaisaMiniApp()) && (
              <>
                <ListItem
                  className={classes.listItem}
                  onClick={onClose}
                  component={Link}
                  to={`/profile?redirect=${pathname}`}
                  disableGutters
                >
                  <ListItemIcon>
                    <PermIdentityRounded />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  onClick={onClose}
                  component={Link}
                  to={"/myorders"}
                  disableGutters
                >
                  <ListItemIcon>
                    <ListRounded />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItem>
              </>
            )}
            {!isEasyPaisaMiniApp() && (
              <>
                <ListItem
                  className={classes.listItem}
                  onClick={onClose}
                  component={Link}
                  to={"/membership"}
                  disableGutters
                >
                  <ListItemIcon>
                    <CardMembership />
                  </ListItemIcon>
                  <ListItemText primary="GrocerClub" />
                </ListItem>
                {customerStore.isLoggedIn && (
                  <ListItem
                    className={classes.listItem}
                    onClick={onClose}
                    component={Link}
                    to={"/wallet"}
                    disableGutters
                  >
                    <ListItemIcon>
                      <AccountBalanceWallet />
                    </ListItemIcon>
                    <ListItemText primary="Wallet" />
                    {customerStore.customer && (
                      <Chip
                        color="primary"
                        label={`PKR ${customerStore.wallet.amount || 0}`}
                      />
                    )}
                  </ListItem>
                )}
                <ListItem
                  className={classes.listItem}
                  component="a"
                  href={`tel: ${UANNUMBER}`}
                  disableGutters
                >
                  <ListItemIcon>
                    <PhoneCallbackRounded />
                  </ListItemIcon>
                  <ListItemText primary="Call Us" />
                </ListItem>
              </>
            )}
            {isEasyPaisaMiniApp() && (
              <ListItem className={classes.listItem} disableGutters>
                <ListItemIcon>
                  <PhoneCallbackRounded />
                </ListItemIcon>
                <ListItemText primary={`tel: ${UANNUMBER}`} />
              </ListItem>
            )}
            <ListItem
              className={classes.listItem}
              onClick={onClose}
              component={Link}
              to={"/faqs"}
              disableGutters
            >
              <ListItemIcon>
                <ErrorOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="FAQs" />
            </ListItem>
            {!isEasyPaisaMiniApp() && (
              <ListItem
                className={classes.listItem}
                component={Link}
                to={this.signinLink()}
                onClick={this.handleSignoutClick}
                disableGutters
              >
                <ListItemIcon>
                  <PowerSettingsNewRounded />
                </ListItemIcon>
                <ListItemText
                  primary={customerStore.isLoggedIn ? "Sign Out" : "Sign In"}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </Drawer>
    );
  }
}

export default withRouter(withCustomStyles(DrawerPart));
