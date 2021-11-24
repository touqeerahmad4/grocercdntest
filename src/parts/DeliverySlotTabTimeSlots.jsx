import React, { Component } from "react";
import withCustomStyles from "./DeliverySlotTabTimeSlots.style";
import withRouter from "react-router/es/withRouter";
import { inject, observer } from "mobx-react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { getDeliveryTime } from "../utils/DateUtils";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

@inject(["orderStore"])
@inject(["customerStore"])
@observer
class DeliverySlotTabTimeSlots extends Component {
  state = {
    selectedTimeSlot: ""
  };

  handleSlotTimeChange = event => {
    this.setState({ selectedTimeSlot: event.target.value });
    this.props.orderStore.setTimeSlot(event.target.value);
  };

  handleDefaultTimeSlot = () => {
    const customerStore = this.props.customerStore;
    this.setState({
      ...this.state,
      selectedTimeSlot: this.getSlotDayTimeId(customerStore.firstActiveSlotTime)
    });
    this.props.orderStore.setTimeSlot(
      this.getSlotDayTimeId(customerStore.firstActiveSlotTime)
    );
  };

  componentDidMount() {
    this.handleDefaultTimeSlot();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderStore.timeSlot !== this.state.selectedTimeSlot) {
      this.handleDefaultTimeSlot();
    }
  }

  getSlotDayTimeId(slotTime) {
    return slotTime.id + "||" + slotTime.start + "||" + slotTime.end;
  }

  render() {
    const {
      props: { slotDay, classes },
      state: { selectedTimeSlot }
    } = this;

    return (
      <FormControl component="fieldset" className={classes.padding1}>
        <RadioGroup
          aria-label="TimeSlot"
          name="time_slot_id"
          value={selectedTimeSlot}
          onChange={this.handleSlotTimeChange}
        >
          {slotDay.timeSlots.map(slotTime => (
            <FormControlLabel
              key={slotTime.id}
              disabled={!slotTime.is_available}
              value={this.getSlotDayTimeId(slotTime)}
              control={<Radio color={"primary"} />}
              label={getDeliveryTime(slotTime.start, slotTime.end)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withRouter(withCustomStyles(DeliverySlotTabTimeSlots));
