import React from "react";
import withCustomStyles from "./LoginPageSignupPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputPart from "./InputPart";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import DeliveryLocationPart from "./DeliveryLocationPart";
import LoadMorePart from "./LoadMorePart";
import { isEasyPaisaMiniApp } from "../utils/AppUtils";

class LoginPageSignupPart extends React.Component {
  state = {
    isLocationSection: false
  };

  toggleLocationSection = () => {
    this.setState({
      ...this.state,
      isLocationSection: !this.state.isLocationSection
    });
  };

  isSignupValid = () => {
    const {
      props: { name, address, location, gender }
    } = this;
    if (isEasyPaisaMiniApp()) {
      return name && address && location;
    } else {
      return name && gender && address;
    }
  };

  render() {
    const {
      props: {
        classes,
        name,
        address,
        phone,
        gender,
        onSaveClick,
        onFormInputChange,
        loginThis,
        state,
        failMessage,
        isError,
        saveButtonText,
        heading,
        onLocationUpdate
      },
      state: { isLocationSection }
    } = this;

    const locationSection = (
      <DeliveryLocationPart
        address={address}
        onButtonClick={this.toggleLocationSection}
        onLocationUpdate={onLocationUpdate}
        onCancel={this.toggleLocationSection}
        showDeliveryAddressField={true}
      />
    );

    const signupSection = (
      <Grid
        container
        className={classes.minHeightPage}
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
            {heading}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            {state !== "fetching" && (
              <React.Fragment>
                {failMessage && (
                  <Grid item>
                    <Typography
                      variant={"caption"}
                      color={"error"}
                      className={classes.marginBottom2}
                      align={"center"}
                    >
                      {failMessage}
                    </Typography>
                  </Grid>
                )}
                {isError && (
                  <Grid item>
                    <Typography
                      variant={"caption"}
                      color={"error"}
                      className={classes.marginBottom2}
                      align={"center"}
                    >
                      We are unable to save your information, please chat with
                      our customer support.
                    </Typography>
                  </Grid>
                )}
              </React.Fragment>
            )}
            <Grid item>
              <InputPart
                label={"Name"}
                readOnly={isEasyPaisaMiniApp()}
                disabled={isEasyPaisaMiniApp()}
                onChange={onFormInputChange.bind(loginThis, "name")}
                value={name}
              />
            </Grid>
            {phone && (
              <Grid item>
                <InputPart
                  label={"Phone Number"}
                  readOnly
                  disabled
                  value={phone}
                />
              </Grid>
            )}
            <Grid item>
              <InputPart
                label={"Select delivery location *"}
                onFocus={this.toggleLocationSection}
                value={address}
              />
            </Grid>
            <Grid item>
              {!isEasyPaisaMiniApp() && (
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender"
                    className={classes.group}
                    value={gender}
                    onChange={onFormInputChange.bind(loginThis, "gender")}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio color={"primary"} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio color={"primary"} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio color={"primary"} />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {state === "fetching" && <LoadMorePart />}
          {state !== "fetching" && (
            <Button
              className={classes.largeButton}
              variant="contained"
              disabled={!this.isSignupValid()}
              onClick={onSaveClick}
              color="primary"
            >
              {saveButtonText}
            </Button>
          )}
        </Grid>
      </Grid>
    );

    return (
      <React.Fragment>
        {!isLocationSection && signupSection}
        {isLocationSection && locationSection}
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(LoginPageSignupPart));
