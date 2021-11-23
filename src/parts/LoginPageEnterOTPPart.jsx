import React from "react";
import withCustomStyles from "./LoginPageEnterOTPPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputPart from "./InputPart";
import Button from "@material-ui/core/Button";
import LoadMorePart from "../parts/LoadMorePart";
import { isOTPCodeValid } from "../utils/CustomerUtils";
import * as classnames from "classnames";

class LoginPageEnterOTPPart extends React.Component {
  DEFAULT_TIMER_MIN = 0;
  DEFAULT_TIMER_SEC = 30;
  state = {
    minutes: this.DEFAULT_TIMER_MIN,
    seconds: this.DEFAULT_TIMER_SEC
  };
  resetTheTimerAndCall = callback => {
    clearInterval(this.myInterval);
    this.setState({
      minutes: this.DEFAULT_TIMER_MIN,
      seconds: this.DEFAULT_TIMER_SEC
    });
    this.startTheTimer();
    callback();
  };

  startTheTimer() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
  }

  isTimerRunning(minutes, seconds) {
    return minutes !== 0 || seconds !== 0;
  }

  componentDidMount() {
    this.startTheTimer();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const {
      props: {
        classes,
        otpCode,
        onOTPCodeChange,
        phone,
        loginState,
        generateOTPState,
        failMessage,
        onSubmitSms,
        onSubmitCall,
        isError,
        onLogin
      },
      state: { minutes, seconds },
      resetTheTimerAndCall,
      isTimerRunning
    } = this;

    return (
      <Grid
        container
        className={classnames(classes.minHeightPage, classes.containerMargin)}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item>
          <Typography
            variant="h6"
            className={classes.marginBottom2}
            align={"center"}
          >
            Enter the sent 6 digit code
          </Typography>
          <Typography
            variant="body1"
            className={classes.marginBottom2}
            align={"center"}
          >
            {phone}
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
                label={"6 digit code"}
                onChange={onOTPCodeChange}
                value={otpCode}
              />
            </Grid>
            {(generateOTPState === "fetching" || loginState === "fetching") && (
              <Grid item>
                <LoadMorePart />
              </Grid>
            )}
            {generateOTPState !== "fetching" && loginState !== "fetching" && (
              <React.Fragment>
                <Grid item className={classes.padding1}>
                  <Button
                    className={classes.largeButton}
                    variant="contained"
                    disabled={!isOTPCodeValid(otpCode)}
                    onClick={onLogin}
                    color="primary"
                  >
                    Next
                  </Button>
                </Grid>
                {isTimerRunning(minutes, seconds) && (
                  <Typography
                    variant="h6"
                    className={classes.marginTop2}
                    align={"center"}
                  >
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </Typography>
                )}
                {!isTimerRunning(minutes, seconds) && (
                  <React.Fragment>
                    <Grid item className={classes.padding1}>
                      <Button
                        className={classes.largeButton}
                        variant="contained"
                        onClick={resetTheTimerAndCall.bind(this, onSubmitSms)}
                        color="primary"
                      >
                        Resend SMS
                      </Button>
                    </Grid>
                    <Grid item className={classes.padding1}>
                      <Button
                        className={classes.largeButton}
                        variant="contained"
                        onClick={resetTheTimerAndCall.bind(this, onSubmitCall)}
                        color="primary"
                      >
                        Call again
                      </Button>
                    </Grid>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        {generateOTPState !== "fetching" && loginState !== "fetching" && (
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
        <Grid item className={classes.marginTop2}>
          <Typography variant="subtitle1" align={"center"}>
            Didn&apos;t receive SMS?
          </Typography>
          <Typography variant={"caption"} align={"center"}>
            Please verify your mobile number by sending &apos;MNP&apos; in an
            SMS to 99095, and then retry SMS verification
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withCustomStyles(LoginPageEnterOTPPart));
