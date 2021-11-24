import React, { Component } from "react";
import withCustomStyles from "./DeliverySlotTabsPart.style";
import withRouter from "react-router/es/withRouter";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeliverySlotTabTimeSlots from "./DeliverySlotTabTimeSlots";
import { dayMonth, weekDay } from "../utils/DateUtils";
import _take from "lodash/take";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as classnames from "classnames";

class DeliverySlotTabsPart extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      props: { deliveryOptions, classes },
      state: { value }
    } = this;

    const dayLabel = (date, index) => (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="subtitle2"
            className={classnames({
              [classes.colorPrimary]: value === index
            })}
          >
            {weekDay(date)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            className={classnames({
              [classes.colorPrimary]: value === index
            })}
          >
            {dayMonth(date)}
          </Typography>
        </Grid>
      </Grid>
    );

    return (
      <React.Fragment>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          onChange={this.handleChange}
        >
          {_take(deliveryOptions, 4).map((day, index) => (
            <Tab key={day.date} label={dayLabel(day.date, index)} />
          ))}
        </Tabs>
        <DeliverySlotTabTimeSlots slotDay={deliveryOptions[value]} />
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(DeliverySlotTabsPart));
