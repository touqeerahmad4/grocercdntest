import React, { Component } from "react";
import withCustomStyles from "./ReturnRefundPolicyPage.style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SEOInfoPart from "../parts/SEOInfoPart";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import { UANNUMBER } from "../utils/AppUtils";

class ReturnRefundPolicyPage extends Component {
  render() {
    const {
      props: { classes }
    } = this;

    return (
      <Paper>
        <SEOInfoPart />
        <RobotsNoIndexPart />
        <Typography variant="h5" className={classes.gutterBottom2}>
          Returns & Refunds
        </Typography>

        <div className={classes.gutterTopDown}>
          <Typography variant="body1">
            What is GrocerApp return & refund policy?
          </Typography>
          <Typography variant="body2">
            If your product is defective / damaged or incorrect/incomplete at
            the time of delivery, please contact us within 24 hours. We will
            offer return or refund.
          </Typography>
        </div>

        <div className={classes.gutterTopDown}>
          <Typography variant="body1">
            What is GrocerApp cancellation policy?
          </Typography>
          <Typography variant="body2">
            GrocerApp provides easy and hassle free cancellation policy. You can
            cancel your order any time before the order is out for delivery. You
            can also reject the delivery or ask for replacement if you are not
            satisfied with any product.
          </Typography>
        </div>

        <div className={classes.gutterTopDown}>
          <Typography variant="body1">How do I cancel my order?</Typography>
          <Typography variant="body2">
            You can cancel your order by simply calling {UANNUMBER} before
            before your order is confirmed.
          </Typography>
        </div>

        <div className={classes.gutterTopDown}>
          <Typography variant="body1">
            What if I have complaint regarding my order or GrocerApp service?
          </Typography>
          <Typography variant="body2">
            Complaints/Feedback/Queries are always welcome. Drop us line at
            info@grocerapps.com or give us a call at {UANNUMBER} and we will be
            more than happy to help you.
          </Typography>
        </div>
      </Paper>
    );
  }
}

export default withCustomStyles(ReturnRefundPolicyPage);
