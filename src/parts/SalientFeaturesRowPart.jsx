import React from "react";
import withCustomStyles from "./SalientFeaturesRowPart.style";
import PropTypes from "prop-types";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const SalientFeaturesRowPart = props => (
  <Grid item className={props.classes.salientFeaturesRow}>
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid xs={2} sm={1} className={props.classes.iconItem} item>
        {props.icon}
      </Grid>
      <Grid xs sm item>
        <Typography variant="body1">{props.title}</Typography>
        <Typography variant="body2">{props.text}</Typography>
      </Grid>
    </Grid>
  </Grid>
);

SalientFeaturesRowPart.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default withRouter(withCustomStyles(SalientFeaturesRowPart));
