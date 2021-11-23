import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import withCustomStyles from "./MemberShipPlanTilePart.style";

const MemberShipPlanTilePart = ({ plan, classes, onSelectPlan }) => {
  return (
    <Paper
      onClick={() => onSelectPlan(plan)}
      className={classes.root}
      elevation={3}
    >
      <CardHeader
        className={classes.header}
        title={plan.name}
        titleTypographyProps={{
          variant: "subtitle1",
          color: "primary"
        }}
      />
      <Divider className={classes.fullWidth} variant="fullWidth" />
      <Grid item className={classes.content}>
        <Typography align="center">
          {plan.fee + plan.fee_discount} PKR
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {plan.fee} PKR
        </Typography>
      </Grid>

      <Button fullWidth variant="contained" color="primary">
        Select
      </Button>
    </Paper>
  );
};

MemberShipPlanTilePart.propTypes = {
  plan: PropTypes.object.isRequired,
  onSelectPlan: PropTypes.func.isRequired
};

export default withCustomStyles(MemberShipPlanTilePart);
