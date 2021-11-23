import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShoppingIcon from "@material-ui/icons/ShoppingCartOutlined";
import withCustomStyles from "./HeaderPart.style";
import MenuIcon from "@material-ui/icons/Menu";
import SearchPart from "./SearchPart";
import DrawerPart from "./DrawerPart";
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import TypographyPart from "./TypographyPart";
import * as classnames from "classnames";
import gtmService from "../services/GTMService";
import { strLimit } from "../utils/HelperUtils";
import { getLargeLogo } from "../utils/UrlUtils";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AppBarSecondRowButtonPart from "./AppBarSecondRowButtonPart";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import RootRef from "@material-ui/core/RootRef";
// import LoadMorePart from "./LoadMorePart";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { isEasyPaisaMiniApp } from "../utils/AppUtils";
import { CircularProgress } from "@material-ui/core";

@inject(["orderStore"])
@inject(["customerStore"])
@inject(["uiStore"])
@inject(["categoriesStore"])
@inject(["allBrandsStore"])
@inject(["searchProductsStore"])
@inject(["globalSettingStore"])
@observer
class HeaderPart extends Component {
  locationRef = React.createRef();

  state = {
    anchorEl: <></>,
    locError: false,
    locDisabled: "",
    drawerOpen: false,
    selectManually: false,
    selectedLocation: null,
    locationAccess: false
  };

  fetchCategoriesAndBrands = () => {
    const { categoriesStore, allBrandsStore } = this.props;

    categoriesStore.fetch();
    allBrandsStore.fetchLimited(50);
  };

  handleDrawerOpen = () => {
    gtmService.pageView("/side-menu");
    this.setState({
      ...this.state,
      drawerOpen: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      ...this.state,
      drawerOpen: false
    });
  };

  handleLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (coords && coords.latitude && coords.longitude) {
            this.setState({
              locationAccess: true
            });
            this.handleUpdateLocation({
              lat: coords.latitude,
              lng: coords.longitude
            });
          }
        },
        () =>
          this.setState({
            locDisabled: "Please allow location from your browser settings"
          })
      );
    }
  };

  handleUpdateLocation = coords => {
    const {
      props: { uiStore, customerStore, globalSettingStore },
      state: { locError },
      fetchCategoriesAndBrands
    } = this;
    uiStore.setDefaultDeliveryLocation({
      lat: coords.lat,
      lng: coords.lng
    });
    this.setState({
      selectedLocation: coords
    });
    customerStore.fetchVendor(
      undefined,
      data => {
        if (locError) this.setState({ locError: false });
        uiStore.setDefaultDeliveryLocation({
          lat: coords.lat,
          lng: coords.lng,
          location: data.name
        });
        fetchCategoriesAndBrands();
        globalSettingStore.registerDevice();
      },
      () => {
        this.setState({ locError: true });
      }
    );
  };

  handleSelectManually = value => {
    this.setState({ selectManually: value });
  };

  componentDidMount() {
    const {
      props: {
        location: { pathname }
      }
    } = this;
    this.setState({ anchorEl: this.locationRef.current });
    if (pathname === "/unsubscribe") {
      this.handleUpdateLocation({
        lat: "31.5204",
        lng: "74.3587"
      });
    }
  }

  navigateToChangeLocation = () => {
    const {
      props: {
        history,
        location: { pathname, search }
      }
    } = this;

    if (pathname !== "/change-location") {
      history.push(`/change-location?redirect=${pathname}${search}`);
    }
  };

  render() {
    const {
      props: {
        classes,
        orderStore,
        customerStore: { isLoggedIn, customer, fetchVendorState, vendor },
        uiStore,
        location: { pathname }
      },
      state: {
        drawerOpen,
        anchorEl,
        locError,
        locDisabled,
        selectManually,
        selectedLocation,
        locationAccess
      },
      handleLocation,
      handleSelectManually,
      navigateToChangeLocation
    } = this;

    const location =
      uiStore &&
      uiStore.defaultDeliveryLocation &&
      uiStore.defaultDeliveryLocation.location;

    const googleAddress =
      isLoggedIn && customer.address !== "N/A"
        ? customer.address
        : (location === "N/A" && vendor.name) || location || "";

    let addressCharLimit = 15;
    if (uiStore.screenWidth >= 375 && uiStore.screenWidth < 800) {
      addressCharLimit = 20;
    } else if (uiStore.screenWidth >= 800) {
      addressCharLimit = 50;
    }

    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Grid
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          container
        >
          <Grid item>
            <Grid
              container
              wrap="nowrap"
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <RootRef rootRef={this.locationRef}>
                <Grid item>
                  <Grid
                    container
                    wrap="nowrap"
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item>
                      <IconButton
                        disabled={drawerOpen}
                        className={classes.colorBlack}
                        onClick={this.handleDrawerOpen}
                        aria-label="Menu"
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                    <Grid item className={classes.noDecoration}>
                      <Grid
                        container
                        wrap="nowrap"
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        {pathname !== "/" && (
                          <Grid
                            item
                            component={Link}
                            to="/"
                            className={classes.marginRight1}
                          >
                            <CardMedia
                              component="img"
                              alt="logo"
                              className={classes.logo}
                              src={getLargeLogo()}
                            />
                          </Grid>
                        )}
                        <Grid
                          className={classes.noDecoration}
                          onClick={navigateToChangeLocation}
                          item
                        >
                          <Typography
                            variant={"caption"}
                            className={classes.colorBlack}
                          >
                            Delivering to
                          </Typography>
                          <Typography
                            variant="body2"
                            className={classes.deliveryAddress}
                          >
                            {strLimit(googleAddress, addressCharLimit)}
                            <ExpandMoreIcon
                              fontSize={"small"}
                              className={classes.expandMore}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </RootRef>
              {uiStore.dataLoaded &&
                !location &&
                pathname !== "/change-location" &&
                pathname !== "/unsubscribe" && (
                  <Popper
                    open
                    placement="bottom-start"
                    disablePortal={true}
                    modifiers={{
                      flip: {
                        enabled: true
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: "scrollParent"
                      },
                      arrow: {
                        enabled: true,
                        element: anchorEl
                      }
                    }}
                    anchorEl={anchorEl}
                    className={classes.popperUi}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade className={classes.popperUi} {...TransitionProps}>
                        <Paper elevation={3}>
                          {!isEasyPaisaMiniApp() &&
                            !selectManually &&
                            !locDisabled &&
                            !locError && (
                              <>
                                <Typography variant="subtitle1" gutterBottom>
                                  Welcome to GrocerApp.
                                </Typography>
                                <Grid container wrap="nowrap">
                                  <Grid item className={classes.marginRight1}>
                                    <LocationOnIcon
                                      color="primary"
                                      fontSize="large"
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography gutterBottom>
                                      Please provide your delivery location to
                                      see products at nearby store.
                                    </Typography>
                                    {/* {fetchVendorState === "fetching" && (
                                      <LoadMorePart />
                                    )} */}
                                    {/* {fetchVendorState !== "fetching" && ( */}
                                    <Grid container>
                                      <Grid
                                        className={classnames(
                                          classes.marginTop1,
                                          classes.paddingRight1
                                        )}
                                        xs={12}
                                        sm={6}
                                        item
                                      >
                                        <Button
                                          fullWidth
                                          color="primary"
                                          variant="outlined"
                                          onClick={handleSelectManually}
                                          disabled={locationAccess}
                                        >
                                          Set manually
                                        </Button>
                                      </Grid>
                                      <Grid
                                        className={classnames(
                                          classes.marginTop1,
                                          classes.paddingRight1
                                        )}
                                        xs={12}
                                        sm={6}
                                        item
                                      >
                                        <Button
                                          fullWidth
                                          color="primary"
                                          variant="contained"
                                          onClick={handleLocation}
                                          className={classes.deliveryBtn}
                                          disabled={locationAccess}
                                        >
                                          Set Delivery Location
                                          {locationAccess && (
                                            <CircularProgress
                                              className={classes.btnLoading}
                                            />
                                          )}
                                        </Button>
                                      </Grid>
                                    </Grid>
                                    {/* )} */}
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          {(selectManually ||
                            locDisabled ||
                            locError ||
                            isEasyPaisaMiniApp()) && (
                            <>
                              {/* {fetchVendorState === "fetching" && (
                                <LoadMorePart />
                              )} */}
                              {/* {fetchVendorState !== "fetching" && ( */}
                              <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                              >
                                {!isEasyPaisaMiniApp() && (
                                  <Grid item className={classes.marginBottom1}>
                                    <MyLocationIcon
                                      color="primary"
                                      fontSize="large"
                                    />
                                  </Grid>
                                )}
                                <Grid item>
                                  {!selectManually && !locDisabled && (
                                    <Typography variant="h6" align={"center"}>
                                      {isEasyPaisaMiniApp()
                                        ? "Welcome to GrocerApp"
                                        : "We are not here yet!"}
                                    </Typography>
                                  )}
                                  {locDisabled && (
                                    <Typography variant="h6" align={"center"}>
                                      Location Access Denied!
                                    </Typography>
                                  )}
                                  {selectManually && (
                                    <Typography variant="h6" align={"center"}>
                                      Select Manually
                                    </Typography>
                                  )}
                                  <Typography gutterBottom>
                                    Please select the city you want to place
                                    your order in
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="column"
                                    className={classes.marginBottom1}
                                  >
                                    {uiStore.availableLocations.map(cities => (
                                      <Button
                                        className={classnames(
                                          classes.marginRight1,
                                          classes.marginBottom1
                                        )}
                                        onClick={() =>
                                          this.handleUpdateLocation(cities)
                                        }
                                        variant="outlined"
                                        color="primary"
                                        key={cities.lat}
                                        disabled={
                                          fetchVendorState === "fetching"
                                        }
                                      >
                                        {cities.location}
                                        {selectedLocation === cities && (
                                          <CircularProgress
                                            className={classes.btnLoading}
                                          />
                                        )}
                                      </Button>
                                    ))}
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    paragraph
                                    variant="caption"
                                    align={"center"}
                                    className={classes.marginBottom0}
                                  >
                                    Currently we only operate in the cities
                                    mentioned above. But we are expanding
                                    quickly and hopeful will reach other areas
                                    soon
                                  </Typography>
                                </Grid>
                              </Grid>
                              {/* )} */}
                            </>
                          )}
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                )}
              <Grid item className={classes.cartIconGrid}>
                <Grid item component={Link} to="/cart">
                  <div
                    className={classnames(classes.cartItemsCount, {
                      [classes.displayNone]: orderStore.all.size < 1
                    })}
                  >
                    <TypographyPart
                      variant="smallBoldWhite"
                      className={classes.countNumber}
                    >
                      {orderStore.all.size}
                    </TypographyPart>
                  </div>
                  <IconButton
                    className={classes.cartIcon}
                    aria-label="ShoppingCart"
                  >
                    <ShoppingIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.secondRow}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <AppBarSecondRowButtonPart to={"/categories"}>
                  <Typography variant="body1">Categories</Typography>
                </AppBarSecondRowButtonPart>
              </Grid>
              <Grid item className={classes.searchContainer}>
                {pathname !== "/change-location" && pathname !== "/profile" && (
                  <SearchPart />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {uiStore.dataLoaded &&
          !location &&
          pathname !== "/change-location" &&
          pathname !== "/unsubscribe" && (
            <div className={classes.dimBackground} />
          )}
        <DrawerPart open={drawerOpen} onClose={this.handleDrawerClose} />
      </AppBar>
    );
  }
}

export default withRouter(withCustomStyles(HeaderPart));
