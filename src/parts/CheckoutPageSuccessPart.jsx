import React from "react";
import withCustomStyles from "./CheckoutPageSuccessPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { getLargeLogo } from "../utils/UrlUtils";
import AttachMoneyRounded from "@material-ui/icons/AttachMoneyRounded";
import CalendarTodayRounded from "@material-ui/icons/CalendarTodayRounded";
import LocationOnRounded from "@material-ui/icons/LocationOnRounded";
import TimerRounded from "@material-ui/icons/TimerRounded";
import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import BottomFixedButton from "./BottomFixedButton";
import { getDeliveryTime, readableDate } from "../utils/DateUtils";
import { _get } from "../utils/HelperUtils";
import gtmService from "../services/GTMService";

class CheckoutPageSuccessPart extends React.Component {
  componentDidMount() {
    gtmService.pageView("/checkout-success");
  }

  render() {
    const {
      props: { classes, customer, order }
    } = this;

    const successInfo = (icon, title, info, info2 = "") => {
      return (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              onClick={this.handleBack}
              className={classes.gutterBottom0}
              aria-label="Menu"
            >
              {icon}
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant={"body1"} align={"center"}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body1"} color={"error"} align={"center"}>
              {info}
            </Typography>
          </Grid>
          {info2 && (
            <Grid item>
              <Typography variant={"body1"} color={"error"} align={"center"}>
                {info2}
              </Typography>
            </Grid>
          )}
        </Grid>
      );
    };

    return (
      <React.Fragment>
        <Paper>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <ImageWithLoaderPart
                width="72"
                height="72"
                src={getLargeLogo()}
                alt="Grocerapp logo"
                loaderClass={classes.marginLeft1}
                className={classes.logo}
              />
            </Grid>
            <Grid item>
              <Typography variant={"h5"} align={"center"}>
                Thank you for your order
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                Read your details below
              </Typography>
            </Grid>
            <Grid item>
              {successInfo(
                <AttachMoneyRounded />,
                "Total Cost",
                "Rs. " + order.application_total
              )}
            </Grid>
            <Grid item>
              {successInfo(
                <TimerRounded />,
                "Estimated Delivery Time",
                order.time_slot
                  ? order.time_slot
                  : getDeliveryTime(
                      _get(order, "delivery_start_time.date"),
                      _get(order, "delivery_time.date")
                    )
              )}
            </Grid>
            <Grid item>
              {successInfo(
                <CalendarTodayRounded />,
                "Delivery Date",
                order.date
                  ? order.date
                  : readableDate(_get(order, "delivery_time.date"))
              )}
            </Grid>
            <Grid item>
              {successInfo(
                <LocationOnRounded />,
                "Delivery Address",
                customer.address_2,
                customer.address
              )}
            </Grid>
          </Grid>
        </Paper>
        <BottomFixedButton content="Done" to={"/myorders"} />
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(CheckoutPageSuccessPart));
