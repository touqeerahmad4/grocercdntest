import React from "react";
import withCustomStyles from "./LoginPageLoginPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputPart from "./InputPart";
import Button from "@material-ui/core/Button";
import LoadMorePart from "../parts/LoadMorePart";
import { isPhoneValid } from "../utils/CustomerUtils";

class LoginPageLoginPart extends React.Component {
  render() {
    const {
      props: {
        classes,
        onPhoneChange,
        phone,
        state,
        failMessage,
        isError,
        onSubmitSms,
        onSubmitCall
      }
    } = this;

    return (
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
            Hi, we need your phone number to verify your identity
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <InputPart
                label={"Phone Number"}
                onChange={onPhoneChange}
                helperText="Phone number must start with 3 eg: 3xxxxxxxxx"
                value={phone}
              />
            </Grid>
            {state === "fetching" && (
              <Grid item>
                <LoadMorePart />
              </Grid>
            )}
            {state !== "fetching" && (
              <React.Fragment>
                <Grid item className={classes.padding1}>
                  <Button
                    className={classes.largeButton}
                    variant="contained"
                    disabled={!isPhoneValid(phone)}
                    onClick={onSubmitSms}
                    color="primary"
                  >
                    Use SMS
                  </Button>
                </Grid>
                <Grid item className={classes.padding1}>
                  <Button
                    className={classes.largeButton}
                    variant="contained"
                    disabled={!isPhoneValid(phone)}
                    onClick={onSubmitCall}
                    color="primary"
                  >
                    Use Call
                  </Button>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        {state !== "fetching" && (
          <React.Fragment>
            {failMessage && (
              <Grid item>
                <Typography
                  variant={"caption"}
                  color={"error"}
                  className={classes.marginTop2}
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
                  className={classes.marginTop2}
                  align={"center"}
                >
                  We are unable to verify you, please chat with our customer
                  support.
                </Typography>
              </Grid>
            )}
          </React.Fragment>
        )}
        <Grid item>
          <Typography
            variant={"caption"}
            className={classes.marginTop2}
            align={"center"}
          >
            *You will receive a call/sms shortly. Existing users will log in
            right after verifying the confirmation code
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withCustomStyles(LoginPageLoginPart));
