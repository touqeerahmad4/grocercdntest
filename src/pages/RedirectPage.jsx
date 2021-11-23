import React from "react";
import withCustomStyles from "./RedirectPage.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { redirectToAppStore } from "../utils/UrlUtils";

class RedirectPage extends React.Component {
  componentDidMount() {
    redirectToAppStore();
  }

  render() {
    const {
      props: { classes }
    } = this;

    return (
      <Paper className={classes.root}>
        <Typography variant="body1">...Redirecting</Typography>
      </Paper>
    );
  }
}

export default withRouter(withCustomStyles(RedirectPage));
