import React from "react";
import withCustomStyles from "./LoginPage.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import {
  allowOTPCodeEdit,
  allowPhoneEdit,
  mapToStandardAnalyticsCustomer,
  phoneWithoutCountry
} from "../utils/CustomerUtils";
import {
  getFirstFailMessage,
  getFirstFailMessageOfKey
} from "../utils/ResponseUtils";
import LoginPageSignupPart from "../parts/LoginPageSignupPart";
import LoginPageLoginPart from "../parts/LoginPageLoginPart";
import Button from "@material-ui/core/Button";
import { getQueryParam } from "../utils/UrlUtils";
import { Link } from "react-router-dom";
import gtmService from "../services/GTMService";
import {
  isEasyPaisaMiniApp,
  logInfoMessage,
  logMessage
} from "../utils/AppUtils";
import LoginPageEnterOTPPart from "../parts/LoginPageEnterOTPPart";
import _throttle from "lodash/throttle";
import LoadMorePart from "../parts/LoadMorePart";
import { withSnackbar } from "notistack";

@inject(["customerStore"])
@observer
class LoginPage extends React.Component {
  state = {
    phone: "+92 - ",
    location: "",
    address: "",
    name: "",
    screen: "login",
    gender: "",
    locationCoordinates: "",
    loginFailMessage: "",
    generateOTPFailMessage: "",
    signupFailMessage: "",
    accessToken: "",
    otpCode: "",
    isLoginError: false,
    isGenerateOTPError: false,
    isSignupError: false
  };

  handleLocationUpdate = (lat, lng, location, address) => {
    this.setState({
      ...this.state,
      address: isEasyPaisaMiniApp() ? this.state.address : address,
      locationCoordinates: `${lat},${lng}`,
      location
    });
  };

  login = () => {
    const {
      props: { customerStore },
      state: { phone, otpCode, accessToken }
    } = this;
    customerStore.login(
      {
        phone_number: phoneWithoutCountry(phone),
        access_token: accessToken,
        otp_code: otpCode
      },
      ({ customer }) => {
        this.setState({
          ...this.state,
          screen: "success"
        });
        gtmService.pageView(
          "/login-success",
          mapToStandardAnalyticsCustomer(customer, customerStore.deviceId)
        );
      },
      data => {
        if (
          getFirstFailMessageOfKey(data, "phone_number").startsWith(
            "Phone number not registered"
          )
        ) {
          this.setState({
            ...this.state,
            accessToken: accessToken,
            screen: "signup"
          });
          gtmService.pageView("/signup", {
            "phone number": phoneWithoutCountry(phone)
          });
          return;
        }
        logMessage(getFirstFailMessage(data));
        this.setState({
          ...this.state,
          loginFailMessage: getFirstFailMessage(data)
        });
      },
      () => {
        this.setState({
          ...this.state,
          isLoginError: true
        });
      }
    );
  };

  generateOTP = type => {
    const {
      props: { customerStore },
      state: { phone }
    } = this;

    customerStore.generateOTP(
      {
        phone_number: phoneWithoutCountry(phone),
        type
      },
      data => {
        this.setState({
          ...this.state,
          accessToken: data.access_token,
          generateOTPFailMessage: "",
          screen: "enter-otp"
        });
        gtmService.pageView("/enter-otp", {
          "phone number": phoneWithoutCountry(phone),
          type
        });
      },
      data => {
        logMessage(getFirstFailMessage(data));
        this.setState({
          ...this.state,
          generateOTPFailMessage: getFirstFailMessage(data)
        });
      },
      () => {
        this.setState({
          ...this.state,
          isGenerateOTPError: true
        });
      }
    );
  };

  sendOTPSms = _throttle(
    () => {
      this.generateOTP("sms");
    },
    30000,
    { trailing: false }
  );
  makeOTPCall = _throttle(
    () => {
      this.generateOTP("call");
    },
    30000,
    { trailing: false }
  );
  handleSignup = () => {
    const {
      props: { customerStore },
      state: {
        phone,
        name,
        accessToken,
        address,
        locationCoordinates,
        location,
        gender,
        otpCode
      }
    } = this;
    customerStore.signup(
      {
        phone_number: phoneWithoutCountry(phone),
        access_token: accessToken,
        otp_code: otpCode,
        name,
        address,
        location,
        location_coordinates: locationCoordinates,
        gender
      },
      ({ customer }) => {
        this.setState({
          ...this.state,
          screen: "success"
        });
        gtmService.pageView(
          "/signup-success",
          mapToStandardAnalyticsCustomer(customer, customerStore.deviceId)
        );
        gtmService.pageView(
          "/login-success",
          mapToStandardAnalyticsCustomer(customer, customerStore.deviceId)
        );
      },
      data => {
        this.setState({
          ...this.state,
          signupFailMessage: getFirstFailMessage(data)
        });
      },
      () => {
        this.setState({
          ...this.state,
          isSignupError: true
        });
      }
    );
  };

  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;
    if (isEasyPaisaMiniApp()) {
      window.addEventListener(
        "ep_auth_code_result",
        this.handleEasyPaisaAuth,
        false
      );
      if (pathname === "/login") {
        this.handleEasyPaisa();
      }
    }
  }

  componentDidUpdate() {
    const {
      customerStore,
      history,
      location: { search }
    } = this.props;

    if (customerStore.isLoggedIn && getQueryParam(search, "redirect")) {
      history.replace(getQueryParam(search, "redirect"));
    }
  }

  handlePhoneChange = event => {
    const phone = event.target.value;
    if (!allowPhoneEdit(phone)) return;
    this.setState({
      ...this.state,
      phone: phone
    });
  };

  handleOTPCodeChange = event => {
    const otpCode = event.target.value;
    if (!allowOTPCodeEdit(otpCode)) return;
    this.setState({
      ...this.state,
      otpCode
    });
  };

  handleFormInputChange = (key, event) => {
    const val = event.target.value;
    this.setState({
      ...this.state,
      [key]: val
    });
  };

  handleEasyPaisa = (askPermission = false) => {
    const { customerStore } = this.props;
    if (customerStore.isLoggedIn) {
      return;
    }
    const openId = getQueryParam(this.props.location.search, "openId");
    if (!askPermission && openId) {
      this.handleEasyPaisaLoginAPi({ openId });
    } else {
      // eslint-disable-next-line no-undef
      mp.getUserAuthCode(["OPEN_ID", "USER_NAME", "USER_MSISDN"]);
    }
  };

  handleEasyPaisaAuth = ({ detail: data }) => {
    logInfoMessage("Authentication response from Easypaisa MiniApp", {
      environment: "easypaisa_miniapp",
      customer: this.props.customerStore.customer,
      data,
      queryParams: window.location.search
    });
    if (!data || (data && data.status !== "SUCCESS")) {
      this.props.enqueueSnackbar("Authentication failed! Please try again", {
        variant: "error"
      });
      this.redirectPage();
      return;
    }
    this.handleEasyPaisaLoginAPi(data);
  };

  handleEasyPaisaLoginAPi = data => {
    const { customerStore } = this.props;

    customerStore.easyPaisaAuthenticate(
      { auth_code: data.authCode, openId: data.openId },
      () => {
        this.redirectPage();
      },
      () => {
        this.redirectPage();
      },
      () => {
        this.props.enqueueSnackbar("Something went wrong please try again", {
          variant: "error"
        });
        this.redirectPage();
      }
    );
  };

  redirectPage = () => {
    const {
      props: {
        history,
        customerStore,
        location: { search }
      }
    } = this;

    let redirect = getQueryParam(search, "redirect");
    const openId = getQueryParam(this.props.location.search, "openId");

    if (!customerStore.isLoggedIn && isEasyPaisaMiniApp() && !openId) {
      history.replace("/cart");
      return;
    }

    if (
      isEasyPaisaMiniApp() &&
      !customerStore.customer.address_2 &&
      customerStore.isLoggedIn
    ) {
      redirect = redirect + "?redirect=/checkout";
    }

    getQueryParam(search, "redirect")
      ? history.replace(redirect)
      : history.replace("/");
  };

  componentWillUnmount() {
    if (isEasyPaisaMiniApp()) {
      window.removeEventListener(
        "ep_auth_code_result",
        this.handleEasyPaisaAuth
      );
    }
  }

  render() {
    const {
      props: {
        customerStore,
        classes,
        location: { pathname }
      },
      state: {
        phone,
        isLoginError,
        signupFailMessage,
        isSignupError,
        generateOTPFailMessage,
        isGenerateOTPError,
        name,
        screen,
        address,
        loginFailMessage,
        location,
        otpCode,
        gender
      }
    } = this;

    const loggedIn = (
      <Grid
        container
        className={classes.minHeightPage}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item className={classes.marginBottom2}>
          <Typography variant={"h6"} align={"center"}>
            Welcome {customerStore.name}!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={Link}
            to={"/"}
            color="primary"
          >
            Start shopping
          </Button>
        </Grid>
      </Grid>
    );

    const notLoggedIn = (
      <React.Fragment>
        {screen === "success" && loggedIn}
        {screen === "login" && (
          <LoginPageLoginPart
            onPhoneChange={this.handlePhoneChange}
            phone={phone}
            onSubmitSms={this.sendOTPSms}
            onSubmitCall={this.makeOTPCall}
            state={customerStore.generateOTPState}
            failMessage={generateOTPFailMessage}
            isError={isGenerateOTPError}
          />
        )}
        {screen === "enter-otp" && (
          <LoginPageEnterOTPPart
            onOTPCodeChange={this.handleOTPCodeChange}
            otpCode={otpCode}
            onSubmitSms={this.sendOTPSms}
            onSubmitCall={this.makeOTPCall}
            onLogin={this.login}
            loginState={customerStore.loginState}
            phone={phone}
            generateOTPState={customerStore.generateOTPState}
            failMessage={loginFailMessage || generateOTPFailMessage}
            isError={isLoginError || isGenerateOTPError}
          />
        )}
        {screen === "signup" && (
          <LoginPageSignupPart
            name={name}
            address={address}
            deliveryLocation={location}
            gender={gender}
            loginThis={this}
            onFormInputChange={this.handleFormInputChange}
            onLocationFocus={this.toggleLocationSection}
            onSaveClick={this.handleSignup}
            state={customerStore.signupState}
            failMessage={signupFailMessage}
            isError={isSignupError}
            onLocationUpdate={this.handleLocationUpdate}
            saveButtonText={"Signup"}
            heading={"Create your GrocerApp Account"}
          />
        )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {(customerStore.signupState === "fetching" ||
          customerStore.loginState === "fetching" ||
          customerStore.generateOTPState === "fetching" ||
          customerStore.easyPaisaLoginState === "fetching") && (
          <div className={classes.blockScreen} />
        )}
        <Paper>
          {pathname === "/login" &&
            isEasyPaisaMiniApp() &&
            customerStore.easyPaisaLoginState === "fetching" && (
              <LoadMorePart />
            )}
          {customerStore.isLoggedIn && loggedIn}
          {!isEasyPaisaMiniApp() && !customerStore.isLoggedIn && notLoggedIn}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(LoginPage)));
