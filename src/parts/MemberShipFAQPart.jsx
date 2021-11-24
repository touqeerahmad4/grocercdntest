import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withCustomStyles from "./MemberShipFAQPart.style";

const MemberShipFAQPart = ({ classes }) => {
  return (
    <>
      <Typography className={classes.padding} variant="h6">
        FAQs
      </Typography>
      <ExpansionPanel className={classes.padding}>
        <ExpansionPanelSummary
          className={classes.padding0}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="body1">
            How many orders can I place in a month?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.padding0}>
          <Typography>
            Because we value our customers so much, we are giving you unlimited
            orders throughout the month without any delivery charges.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.padding}>
        <ExpansionPanelSummary
          className={classes.padding0}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="body1">
            Can I use the same membership accounts for different locations?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.padding0}>
          <Typography>
            Place your orders at your convince and without the worry of a
            specific address. Just make sure you update the location prior to
            placing the order.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.padding}>
        <ExpansionPanelSummary
          className={classes.padding0}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="body1">
            How do I resubscribe once the membership expires?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.padding0}>
          <Typography>
            Don&apos;t worry, as always, we have you covered. Your current plan
            will automatically resubscribe at the end of the plan duration. If
            you wish to cancel your membership, you can do that within 15 days
            of activation/renewal.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.padding}>
        <ExpansionPanelSummary
          className={classes.padding0}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="body1">
            I changed my mind, how do I cancel?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.padding0}>
          <Typography>
            Cancellations are super easy, simply hit the cancel button on
            membership detail page within 15 days of the plan purchase for a
            full refund. Please note, you will be charged for all deliveries as
            per our regular policy on the orders placed using the plan.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.padding}>
        <ExpansionPanelSummary
          className={classes.padding0}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="body1">How do I pay for membership?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.padding0}>
          <Typography>
            Once you purchase a plan, we will put the membership amount as
            negative credit in your app wallet. You can pay for it along with
            your next order! Simple, right?
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default withCustomStyles(MemberShipFAQPart);
