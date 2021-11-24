import React, { Component } from "react";
import withCustomStyles from "./UnsubscribePage.style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";

class UnsubscribePage extends Component {
  state = {
    email: ""
  };

  componentDidMount() {
    window.addEventListener("subscription_status", this.updateStatus);
  }

  handleUnsubscribe = () => {
    const {
      props: { enqueueSnackbar }
    } = this;
    try {
      // eslint-disable-next-line no-undef
      $WZRK_WR.unSubEmail(false);
    } catch {
      enqueueSnackbar("An error occured, please try again.", {
        variant: "error"
      });
      return;
    }
  };

  updateStatus = () => {
    const {
      props: { history }
    } = this;
    this.props.enqueueSnackbar("Successfully Unsubscribed from Email List", {
      variant: "success"
    });
    history.replace("/");
  };

  componentWillUnmount() {
    window.removeEventListener("subscription_status", this.updateStatus);
  }

  render() {
    const {
      props: { classes },
      state: { email },
      handleUnsubscribe
    } = this;

    return (
      <Paper>
        <Typography variant="h5" className={classes.gutterBottom2}>
          Unsubscribe from Email List
        </Typography>
        <TextField disabled value={email} type="hidden" id="email" />
        <Button
          variant="contained"
          color="primary"
          className={classes.largeButton}
          onClick={handleUnsubscribe}
        >
          Unsubscribe
        </Button>
      </Paper>
    );
  }
}

export default withSnackbar(withCustomStyles(UnsubscribePage));
