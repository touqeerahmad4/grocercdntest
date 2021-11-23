import React from "react";
import withCustomStyles from "./DeliveryLocationPart.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MapWithASearchBoxPart } from "./MapWithASearchBoxPart";
import LocationSearchingRounded from "@material-ui/icons/LocationSearchingRounded";
import gtmService from "../services/GTMService";
import { inject, observer } from "mobx-react";
import EmptyAreaPart from "./EmptyAreaPart";
import LoadMorePart from "./LoadMorePart";
import * as classnames from "classnames";
import { mapToStandardAnalyticsCustomer } from "../utils/CustomerUtils";
import { isEasyPaisaMiniApp, logInfoMessage } from "../utils/AppUtils";
import InputPart from "./InputPart";

@inject(["customerStore"])
@observer
class DeliveryLocationPart extends React.Component {
  componentDidMount() {
    const {
      props: {
        customerStore: { customer },
        address
      },
      handleGetEasyPaisaLocation
    } = this;
    window.scrollTo(0, 0);
    this.setState({
      address: address || customer.address_2
    });
    handleGetEasyPaisaLocation();
    gtmService.pageView("/set-delivery");
  }

  handleGetEasyPaisaLocation = () => {
    if (isEasyPaisaMiniApp()) {
      this.setState({ mountMap: false });
      window.addEventListener(
        "ep_location_result",
        this.handleEasyPaisaLocation,
        false
      );
      // eslint-disable-next-line no-undef
      mp.getLocation();
    }
  };

  state = {
    isAreaOutOfBoundSection: false,
    lat: "",
    lng: "",
    location: "",
    address: "",
    epLocation: {},
    mountMap: false
  };
  locationUpdate;

  toggleIsAreaOutOfBoundSection = () => {
    this.setState({
      ...this.state,
      isAreaOutOfBoundSection: !this.state.isAreaOutOfBoundSection
    });
  };

  onProceed = () => {
    const {
      props: { customerStore, onButtonClick, onLocationUpdate },
      state: { lat, lng, location, address }
    } = this;
    customerStore.fetchVendor(
      {
        latitude: lat,
        longitude: lng
      },
      data => {
        this.setState({
          ...this.state,
          isAreaOutOfBoundSection: false
        });
        const shouldRedirectToCart =
          isEasyPaisaMiniApp() &&
          data.isVendorChange &&
          !customerStore.customer.address_2;
        onLocationUpdate(lat, lng, location, address, shouldRedirectToCart);
        onButtonClick();
      },
      () => {
        this.setState({
          ...this.state,
          isAreaOutOfBoundSection: true
        });
        gtmService.pageView(
          "/delivery-not-found",
          mapToStandardAnalyticsCustomer(customerStore.customer)
        );
      }
    );
  };

  onLocationUpdateLocal = (lat, lng, location) => {
    this.setState({
      ...this.state,
      lat,
      lng,
      location
    });
    this.onProceed();
  };

  handleFormInputChange = (key, event) => {
    const val = event.target.value;
    this.setState({
      ...this.state,
      [key]: val
    });
  };

  isLocationValid = () => {
    if (isEasyPaisaMiniApp()) {
      return this.props.customerStore.isLoggedIn ? !!this.state.address : true;
    } else if (this.props.showDeliveryAddressField) {
      return !!this.state.address;
    } else {
      return true;
    }
  };

  handleEasyPaisaLocation = ({ detail: epLocation }) => {
    logInfoMessage("Location response from EasyPaisa MiniApp", {
      environment: "easypaisa_miniapp",
      epLocation
    });
    if (
      epLocation.status !== "SUCCESS" &&
      this.props.customerStore.isLoggedIn
    ) {
      const locationArray = this.props.customerStore.customer.location_coordinates.split(
        ","
      );
      epLocation = {
        ...epLocation,
        latitude: locationArray[0],
        longitude: locationArray[1]
      };
    }
    this.setState({
      epLocation,
      epErrorCode:
        epLocation.status === "SUCCESS"
          ? null
          : parseInt(epLocation.errorCode || 0),
      mountMap: epLocation.errorCode === 11 ? false : true
    });
  };

  componentWillUnmount() {
    window.removeEventListener(
      "ep_location_result",
      this.handleEasyPaisaLocation
    );
  }

  render() {
    const {
      props: { classes, customerStore, onCancel, showDeliveryAddressField },
      state: {
        address,
        epLocation,
        mountMap,
        epErrorCode,
        isAreaOutOfBoundSection
      },
      handleFormInputChange,
      handleGetEasyPaisaLocation
    } = this;

    const isFetching =
      customerStore.fetchVendorState === "fetching" ||
      customerStore.profileUpdateState === "fetching";

    const locationSection = (
      <Grid
        container
        className={classnames(classes.minHeightPage, classes.mapCont)}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        {(customerStore.isLoggedIn || showDeliveryAddressField) && (
          <Paper
            className={classnames(classes.padding1, classes.gutterBottom0)}
          >
            <Grid item className={classes.gutterBottom2}>
              <Typography
                variant="h6"
                className={classes.marginBottom}
                align={"center"}
              >
                Enter delivery address details{" "}
                <Typography inline variant="caption" color="error">
                  *
                </Typography>
              </Typography>
              <InputPart
                shrink
                placeholder="Enter delivery address details"
                onChange={handleFormInputChange.bind(this, "address")}
                value={address}
              />
            </Grid>
          </Paper>
        )}

        <Paper className={classes.padding0}>
          <Grid item>
            <Typography
              variant="h6"
              className={classes.marginBottom2}
              align={"center"}
            >
              Select delivery location{" "}
              <Typography inline variant="caption" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
        </Paper>
        {isEasyPaisaMiniApp() && epErrorCode === 11 && (
          <Grid item>
            <Typography
              variant="subheading"
              className={classnames(classes.gutterBottom1, classes.danger)}
            >
              Location failed. Please{" "}
              <Button
                mini
                variant="text"
                className={classes.btnDanger}
                onClick={handleGetEasyPaisaLocation}
              >
                Click me
              </Button>{" "}
              to fetch your location again
            </Typography>
          </Grid>
        )}
        <Grid item className={classes.mapItem}>
          {((isEasyPaisaMiniApp() && mountMap) || !isEasyPaisaMiniApp()) && (
            <MapWithASearchBoxPart
              epLocation={epLocation}
              onLocationUpdate={this.onLocationUpdateLocal}
              setLocationUpdate={locationUpdate =>
                (this.locationUpdate = locationUpdate)
              }
            />
          )}
        </Grid>
        {isFetching && (
          <Grid item>
            <LoadMorePart />
          </Grid>
        )}
        {!isFetching && (
          <Grid item>
            <Button
              className={classes.largeButton}
              disabled={!this.isLocationValid()}
              onClick={() =>
                typeof this.locationUpdate === "function" &&
                this.locationUpdate()
              }
              variant="contained"
              color="primary"
            >
              Proceed
            </Button>
          </Grid>
        )}
        {!isFetching && onCancel && (
          <Grid item>
            <Button
              className={classnames(classes.largeButton, classes.marginTop2)}
              onClick={onCancel}
              variant="outlined"
              color={"primary"}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>
    );

    const epLocationSection = (
      <Paper>
        <Grid
          container
          className={classnames(classes.minHeightPage, classes.mapCont)}
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item>
            <Typography
              variant="h6"
              className={classes.marginBottom2}
              align={"center"}
            >
              Welcome {customerStore.customer.name}
            </Typography>
          </Grid>
          <Grid item className={classes.gutterBottom2}>
            <Typography
              variant="h6"
              className={classes.marginBottom}
              align={"center"}
            >
              Enter delivery address details{" "}
              <Typography inline variant="caption" color="error">
                *
              </Typography>
            </Typography>
            <InputPart
              shrink
              placeholder="Enter delivery address details"
              onChange={handleFormInputChange.bind(this, "address")}
              value={address}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              className={classes.marginBottom2}
              align={"center"}
            >
              Select delivery location{" "}
              <Typography inline variant="caption" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
          {isEasyPaisaMiniApp() && epErrorCode === 11 && (
            <Grid item>
              <Typography
                variant="subheading"
                className={classnames(classes.gutterBottom1, classes.danger)}
              >
                Location failed. Please{" "}
                <Button
                  mini
                  variant="text"
                  className={classes.btnDanger}
                  onClick={handleGetEasyPaisaLocation}
                >
                  Click me
                </Button>{" "}
                to fetch your location again
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.mapItem}>
            {isEasyPaisaMiniApp() && mountMap && (
              <MapWithASearchBoxPart
                epLocation={epLocation}
                onLocationUpdate={this.onLocationUpdateLocal}
                setLocationUpdate={locationUpdate =>
                  (this.locationUpdate = locationUpdate)
                }
              />
            )}
          </Grid>
          {isFetching && (
            <Grid item>
              <LoadMorePart />
            </Grid>
          )}
          {!isFetching && (
            <Grid item>
              <Button
                className={classes.largeButton}
                onClick={() => this.locationUpdate()}
                disabled={!this.isLocationValid()}
                variant="contained"
                color="primary"
              >
                Proceed
              </Button>
            </Grid>
          )}
          {!isFetching && onCancel && (
            <Grid item>
              <Button
                className={classnames(classes.largeButton, classes.marginTop2)}
                onClick={onCancel}
                variant="outlined"
                color={"primary"}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    );

    const emptyArea = (
      <EmptyAreaPart
        icon={<LocationSearchingRounded />}
        title="We are not here yet!"
        buttonText="Try another location"
        onButtonClick={this.toggleIsAreaOutOfBoundSection}
        content="Currently we operate in Lahore, Islamabad, Rawalpindi and Faisalabad (Pakistan). But we are expanding quickly and hopeful will reach other areas"
      />
    );

    return (
      <React.Fragment>
        {isAreaOutOfBoundSection && emptyArea}
        {!isAreaOutOfBoundSection &&
          (!isEasyPaisaMiniApp() ||
            (isEasyPaisaMiniApp() &&
              (customerStore.customer.address_2 ||
                !customerStore.isLoggedIn))) &&
          locationSection}
        {!isAreaOutOfBoundSection &&
          isEasyPaisaMiniApp() &&
          customerStore.isLoggedIn &&
          !customerStore.customer.address_2 &&
          epLocationSection}
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(DeliveryLocationPart));
