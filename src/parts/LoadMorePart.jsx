import React from "react";
import withCustomStyles from "./LoadMorePart.style";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as classnames from "classnames";

const LoadMorePart = props => (
  <Paper className={classnames(props.classes.loadMore, props.className)}>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  </Paper>
);

LoadMorePart.propTypes = {
  className: PropTypes.string
};
export default withCustomStyles(LoadMorePart);
