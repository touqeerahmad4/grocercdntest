import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useMemo } from "react";
import { ReactComponent as MemberShipIcon } from "../assets/images/membership.svg";
import withCustomStyles from "./MemberShipPlanPart.style";
import LoadMorePart from "./LoadMorePart";

const MemberShipDetailPart = ({ classes, plan, memberShipStatsState }) => {
  return useMemo(
    () => (
      <Paper className={classes.root}>
        <Grid container justify="center" className={classes.memberShipIcon}>
          <MemberShipIcon height="105" width="125" />
        </Grid>

        <Typography variant="h6">Enjoy Your GrocerClub benefits for</Typography>
        {memberShipStatsState === "fetching" && <LoadMorePart />}
        <Typography variant="subtitle1">{plan.daysLeft} Days left</Typography>
        {Boolean(plan.cashBack) && (
          <Typography variant="subtitle1">
            {plan.cashBack} Cash back Received
          </Typography>
        )}
        {Boolean(plan.savedAmount) && (
          <Typography variant="subtitle1">
            Saved Rs. {plan.savedAmount}, using {plan.freeDeliveries} free
            delivery
          </Typography>
        )}
      </Paper>
    ),
    [plan, memberShipStatsState]
  );
};

export default withCustomStyles(MemberShipDetailPart);
