import React, { useMemo } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as DeliveryCarIcon } from "../assets/images/deliver_charge.svg";
import { ReactComponent as CashBackIcon } from "../assets/images/cashback.svg";
import { ReactComponent as CallMeIcon } from "../assets/images/call_me_carrot.svg";
import withCustomStyles from "./MemberShipBenefitPart.style";

const MemberShipBenefitPart = ({ classes, memberFst }) => {
  const benefits = useMemo(
    () => (
      <Paper className={classes.root}>
        <Typography variant="h6">Membership Features</Typography>
        <div className={classes.cardBorder}>
          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <DeliveryCarIcon width="60" height="80" />
              </ListItemIcon>
              <ListItemText
                primary="No Delivery Charge"
                primaryTypographyProps={{
                  color: "primary"
                }}
                secondary={`On orders above Rs. ${memberFst}`}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CashBackIcon width="60" height="70" />
              </ListItemIcon>
              <ListItemText
                primary="Exclusive Promo Codes"
                primaryTypographyProps={{
                  color: "primary"
                }}
                secondary="Save big with lots of members-only promos every month"
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CallMeIcon width="60" height="70" />
              </ListItemIcon>
              <ListItemText
                primary="Customer Support Over Call"
                primaryTypographyProps={{
                  color: "primary"
                }}
                secondary="Talk directly to our customer support team. Why get help over the chat like non-members?"
              />
            </ListItem>
          </List>
        </div>
      </Paper>
    ),
    [classes, memberFst]
  );

  return <>{benefits}</>;
};

export default withCustomStyles(MemberShipBenefitPart);
