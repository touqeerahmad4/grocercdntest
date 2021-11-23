import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import MemberShipPlanTilePart from "./MemberShipPlanTilePart";
import { ReactComponent as MemberShipIcon } from "../assets/images/membership.svg";
import withCustomStyles from "./MemberShipPlanPart.style";
import LoadMorePart from "./LoadMorePart";

const MemberShipPlanPart = ({
  classes,
  plans,
  fetchMemberShipState,
  onSelectPlan
}) => {
  return (
    <Paper className={classes.root}>
      <Grid container justify="center" className={classes.memberShipIcon}>
        <MemberShipIcon height="110" width="130" />
      </Grid>

      <Typography variant="subtitle1">
        Select the plan which suits your needs
      </Typography>
      <Grid container justify="center" className={classes.plan}>
        {fetchMemberShipState === "fetching" && <LoadMorePart />}
        {plans.map(plan => (
          <MemberShipPlanTilePart
            key={plan.id}
            plan={plan}
            onSelectPlan={onSelectPlan}
          />
        ))}
      </Grid>
      <Typography variant="subtitle1">
        You can cancel anytime within 15 days.
      </Typography>
    </Paper>
  );
};

export default withCustomStyles(MemberShipPlanPart);
