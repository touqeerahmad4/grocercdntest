import React from "react";
import withCustomStyles from "./ProfilePage.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import { inject, observer } from "mobx-react";
import { getFirstFailMessage } from "../utils/ResponseUtils";
import LoginPageSignupPart from "../parts/LoginPageSignupPart";
import { checkLoggedIn } from "../utils/AuthUtils";
import { withSnackbar } from "notistack";
import gtmService from "../services/GTMService";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import { getQueryParam } from "../utils/UrlUtils";
import { mapToStandardAnalyticsCustomer } from "../utils/CustomerUtils";

@inject(["customerStore"])
@observer
class ProfilePage extends React.Component {
  state = {
    location: "",
    address: "",
    phoneNumber: "",
    name: "",
    gender: "",
    locationCoordinates: "",
    failMessage: "",
    isError: false
  };

  handleLocationUpdate = (lat, lng, location, address) => {
    this.setState({
      ...this.state,
      address: address || this.state.address,
      locationCoordinates: `${lat},${lng}`,
      location
    });
  };

  componentDidMount() {
    const {
      props: {
        customerStore: { customer }
      }
    } = this;
    this.setState({
      ...this.state,
      location: customer.address,
      address: customer.address_2,
      phoneNumber: `+92 - ${customer.phone_number}`,
      locationCoordinates: customer.location_coordinates,
      name: customer.name,
      gender: customer.gender
    });
  }

  handleSave = () => {
    const {
      props: {
        customerStore,
        history,
        location: { search }
      },
      state: { name, address, locationCoordinates, location, gender }
    } = this;
    let isLocationDirty = false;
    if (location !== customerStore.customer.address) {
      isLocationDirty = true;
    }
    customerStore.profileUpdate(
      {
        name,
        address,
        location,
        location_coordinates: locationCoordinates,
        gender
      },
      customer => {
        if (isLocationDirty) {
          gtmService.pageView(
            "/set-delivery-success",
            mapToStandardAnalyticsCustomer(customer)
          );
        }
        this.props.enqueueSnackbar("Profile successfully updated!", {
          variant: "info"
        });
        gtmService.pageView(
          "/profile-success",
          mapToStandardAnalyticsCustomer(customer, customerStore.deviceId)
        );

        if (getQueryParam(search, "redirect")) {
          history.push(getQueryParam(search, "redirect"));
        }
      },
      data => {
        this.setState({
          ...this.state,
          failMessage: getFirstFailMessage(data)
        });
      },
      () => {
        this.setState({
          ...this.state,
          isError: true
        });
      }
    );
  };

  handleFormInputChange = (key, event) => {
    const val = event.target.value;
    this.setState({
      ...this.state,
      [key]: val
    });
  };

  componentWillMount() {
    checkLoggedIn(this.props);
  }

  componentWillUpdate(nextProps) {
    checkLoggedIn(nextProps);
  }

  render() {
    const {
      props: { customerStore },
      state: {
        failMessage,
        isError,
        name,
        address,
        phoneNumber,
        location,
        gender
      }
    } = this;

    return (
      <React.Fragment>
        <RobotsNoIndexPart />
        <Paper>
          <LoginPageSignupPart
            name={name}
            address={address}
            phone={phoneNumber}
            deliveryLocation={location}
            gender={gender}
            loginThis={this}
            onFormInputChange={this.handleFormInputChange}
            onLocationFocus={this.toggleLocationSection}
            onSaveClick={this.handleSave}
            state={customerStore.profileUpdateState}
            failMessage={failMessage}
            isError={isError}
            onLocationUpdate={this.handleLocationUpdate}
            saveButtonText={"Update"}
            heading={"My Profile"}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(ProfilePage)));
