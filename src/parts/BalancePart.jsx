import React, { useMemo } from "react";
import withRouter from "react-router/withRouter";
import Grid from "@material-ui/core/Grid";
import * as classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const BalancePart = props => {
  const { classes, wallet, uiStore } = props;
  return useMemo(
    () => (
      <Paper className={classes.root}>
        <Grid container>
          <Grid
            container
            className={classnames(classes.displayInline)}
            justify={"center"}
            alignItems={"center"}
            direction={"column"}
          >
            <Typography align={"center"} variant="h6" gutterBottom>
              Available Balance
            </Typography>
            <Typography
              variant="subtitle1"
              align={"center"}
              className={classes.greenColor}
            >
              Rs. {wallet.amount}
            </Typography>
          </Grid>
          <Grid
            item
            xs={uiStore.extraSmall() ? 12 : 6}
            className={classnames(classes.displayInline, classes.centerContent)}
          >
            <Typography variant="body1" align={"center"}>
              Personal Balance
            </Typography>
            <Typography
              variant="subtitle1"
              align={"center"}
              className={classes.greenColor}
            >
              Rs. {wallet.manualAmount}
            </Typography>
          </Grid>
          <Grid
            item
            xs={uiStore.extraSmall() ? 12 : 6}
            className={classnames(classes.displayInline, classes.centerContent)}
          >
            <Typography variant="body1" align={"center"}>
              Promotional Balance
            </Typography>
            <Typography
              variant="subtitle1"
              align={"center"}
              className={classes.greenColor}
            >
              Rs. {wallet.amount - wallet.manualAmount || 0}
            </Typography>
            {Boolean(wallet.amount - wallet.manualAmount) && (
              <Typography align={"center"} color="error">
                {wallet.promotionExpiringInDays
                  ? `Expiry in ${wallet.promotionExpiringInDays} days`
                  : "Expiring today"}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    ),
    [wallet, uiStore]
  );
};

export default withRouter(BalancePart);
