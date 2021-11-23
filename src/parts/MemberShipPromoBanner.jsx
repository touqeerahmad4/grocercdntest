import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useMemo } from "react";
import { ReactComponent as MemberShipIcon } from "../assets/images/membership.svg";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import withCustomStyles from "./MemberShipPromoBanner.style";
import classnames from "classnames";
import { Link } from "react-router-dom";
import memberShipStore from "../stores/MemberShipStore";

const MemberShipPromoBanner = ({ classes, plan, isHome, isClose }) => {
  const cartBanner = useMemo(
    () =>
      plan && (
        <Paper className={classes.root}>
          <Typography variant="h6">Unlimited Free Deliveries</Typography>
          <Grid
            container
            alignItems="center"
            wrap="nowrap"
            className={classes.membership}
          >
            <Grid item>
              <MemberShipIcon height="90" width="100" />
            </Grid>
            <Grid container>
              <Grid item className={classes.text}>
                <Typography variant="subtitle1">
                  Grocer Club Membership
                </Typography>
                <Grid
                  container
                  wrap="nowrap"
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item>
                    <Typography>{plan.name}</Typography>
                    <Typography inline variant="subtitle2">
                      {plan.fee} PKR
                    </Typography>
                    <Typography inline className={classes.price}>
                      {plan.fee + plan.fee_discount} PKR
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ChevronRightIcon fontSize="large" color="primary" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ),
    [plan, classes]
  );
  const homeBanner = useMemo(
    () =>
      plan && (
        <Paper
          className={classnames(classes.root, classes.bottomBanner, {
            [classes.closeAnim]: !isClose
          })}
        >
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item xs align="center">
              <MemberShipIcon height="90" width="100" />
            </Grid>
            <Grid item xs={10} align="left">
              <Typography
                variant="h6"
                color="secondary"
                className={classnames(classes.marginLeft1, classes.headText)}
              >
                Unlimited Free Deliveries
              </Typography>
              <Typography
                variant="subtitle2"
                className={classnames(classes.marginLeft1, classes.subText)}
              >
                Try {plan.name} membership for Rs. {plan.fee}
              </Typography>
            </Grid>
            <Grid item align="right" onClick={memberShipStore.hideBanner}>
              <CloseIcon
                className={classes.closeButton}
                fontSize="medium"
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>
      ),
    [plan, classes, isClose]
  );

  return (
    <Button
      component={Link}
      to="/membership"
      className={classnames(classes.linkButton, {
        [classes.bottomBanner]: isHome
      })}
    >
      {isHome && homeBanner}
      {!isHome && cartBanner}
    </Button>
  );
};

export default withCustomStyles(MemberShipPromoBanner);
