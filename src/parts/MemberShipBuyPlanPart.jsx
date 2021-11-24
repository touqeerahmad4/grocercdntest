import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withCustomStyles from "./MemberShipBuyPlanPart.style";

const MemberShipBuyPlanPart = ({ classes, plan, isLogin, onBuyPlan }) => {
  return useMemo(
    () => (
      <Paper className={classes.root} variant="outlined">
        <Typography variant="h6" align="left">
          Membership Summary
        </Typography>
        <div className={classes.summary}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="subtitle1" align="left" color="primary">
                {plan.name} membership plan
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" className={classes.price}>
                Rs. {plan.fee + plan.fee_discount}
              </Typography>
              <Typography variant="subtitle1" align="right">
                Rs. {plan.fee}
              </Typography>
              <Typography variant="subtitle1" color="secondary" align="right">
                You save Rs {plan.fee_discount}
              </Typography>
            </Grid>
          </Grid>
          <Button
            align="center"
            variant="contained"
            color="primary"
            onClick={() => onBuyPlan(plan.id)}
          >
            {!isLogin && "Sign in to "}pay with grocer wallet
          </Button>
          <Divider variant="fullWidth" className={classes.fullWidth} />

          <Typography align="left">
            Pay for grocerapp with grocerapp wallet. Any negative balance will
            be adjusted with your next order. Clear negative balance within 30
            days to enjoy uninterrupted membership. The plan will
            auto-resubscribe when its duration will end.
          </Typography>
        </div>
      </Paper>
    ),
    [classes, plan]
  );
};

export default withCustomStyles(MemberShipBuyPlanPart);
