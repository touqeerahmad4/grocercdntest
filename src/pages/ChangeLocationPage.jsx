import React from "react";
import withCustomStyles from "./ChangeLocationPage.style";
import withRouter from "react-router/es/withRouter";
import DeliveryLocationPart from "../parts/DeliveryLocationPart";
import { inject, observer } from "mobx-react";
import { getQueryParam } from "../utils/UrlUtils";
import { withSnackbar } from "notistack";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import gtmService from "../services/GTMService";
import { mapToStandardAnalyticsCustomer } from "../utils/CustomerUtils";
import { isEasyPaisaMiniApp } from "../utils/AppUtils";

@inject(["customerStore"])
@inject(["uiStore"])
@observer
class ChangeLocationPage extends React.Component {
  redirectPage = shouldRedirectToCart => {
    const {
      props: {
        customerStore,
        history,
        location: { search }
      }
    } = this;

    let redirect = getQueryParam(search, "redirect");

    if (
      (isEasyPaisaMiniApp() &&
        (shouldRedirectToCart ||
          (!customerStore.customer.address_2 && redirect === "/checkout"))) ||
      (!isEasyPaisaMiniApp() && redirect === "/checkout")
    ) {
      redirect = "/cart";
    }

    getQueryParam(search, "redirect")
      ? history.push(redirect)
      : history.push("/");
  };

  handleLocationUpdate = (
    lat,
    lng,
    location,
    address,
    shouldRedirectToCart = false
  ) => {
    const {
      props: { customerStore, uiStore, enqueueSnackbar }
    } = this;

    uiStore.setDefaultDeliveryLocation({
      lat,
      lng,
      location
    });

    if (!customerStore.isLoggedIn) {
      this.redirectPage();
      return;
    }

    customerStore.profileUpdate(
      {
        location,
        location_coordinates: `${lat},${lng}`,
        name: customerStore.customer.name,
        address: address || customerStore.customer.address_2
      },
      () => {
        this.redirectPage(shouldRedirectToCart);
        gtmService.pageView(
          "/set-delivery-success",
          mapToStandardAnalyticsCustomer(
            customerStore.customer,
            customerStore.deviceId
          )
        );
      },
      () => {
        enqueueSnackbar("Failed to save the location in profile!", {
          variant: "error"
        });
        this.redirectPage();
      },
      () => {
        enqueueSnackbar("Some error while saving the profile", {
          variant: "error"
        });
        this.redirectPage();
      }
    );
  };

  handleProceed = () => {
    if (!this.props.customerStore.isLoggedIn) {
      this.redirectPage();
    }
  };

  render() {
    const {
      props: { classes },
      handleProceed,
      handleLocationUpdate,
      redirectPage
    } = this;

    return (
      <div className={classes.minHeightPage}>
        <RobotsNoIndexPart />
        <DeliveryLocationPart
          onButtonClick={handleProceed}
          onLocationUpdate={handleLocationUpdate}
          onCancel={() => redirectPage()}
        />
      </div>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(ChangeLocationPage)));
