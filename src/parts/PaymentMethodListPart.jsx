import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";
import Divider from "@material-ui/core/Divider";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Paper from "@material-ui/core/Paper";
import withRouter from "react-router/withRouter";
import withCustomStyles from "./PaymentMethodListPart.style";
import CreditCardListPart from "./CreditCardListPart";
import { ReactComponent as EasyPaisaIcon } from "../assets/images/easy_paisa.svg";

class PaymentMethodListPart extends Component {
  render() {
    const {
      props: {
        title,
        cards,
        history,
        search,
        pathname,
        selectedCard,
        allowSelection,
        fetchCreditCards,
        showCreditCardList,
        fetchCreditCardState,
        onToggleModal,
        onPaymentSelection,
        selectedPaymentMethod
      }
    } = this;

    return (
      <Paper>
        <Typography variant={"h6"} color={"textSecondary"}>
          {title || "Select Payment Method"}
        </Typography>
        <List>
          <ListItem
            disableGutters
            button={allowSelection}
            onClick={() => {
              allowSelection && onPaymentSelection("cod");
              allowSelection && onToggleModal();
            }}
          >
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Cash On Delivery (COD)" />
            {(!showCreditCardList || selectedPaymentMethod === "cod") && (
              <ListItemIcon>
                <DoneIcon color="secondary" />
              </ListItemIcon>
            )}
          </ListItem>
          <Divider />
          {!showCreditCardList && (
            <ListItem
              disableGutters
              button={allowSelection || showCreditCardList}
              onClick={() => showCreditCardList && history.push("/add-card")}
            >
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Credit Card" />
              <ListItemIcon>
                {!showCreditCardList && <DoneIcon color="secondary" />}
              </ListItemIcon>
            </ListItem>
          )}
          {showCreditCardList && (
            <CreditCardListPart
              cards={cards}
              allowSelection
              search={search}
              pathname={pathname}
              onToggleModal={onToggleModal}
              selectedCard={selectedCard}
              fetchCreditCards={fetchCreditCards}
              onPaymentSelection={onPaymentSelection}
              fetchCreditCardState={fetchCreditCardState}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          )}
          {!allowSelection && (
            <>
              <Divider />
              <ListItem disableGutters>
                <ListItemIcon>
                  <EasyPaisaIcon width="30px" height="30px" />
                </ListItemIcon>
                <ListItemText primary="EasyPaisa" />
                <ListItemIcon>
                  <ListItemText primary="Coming Soon" />
                </ListItemIcon>
              </ListItem>
            </>
          )}
        </List>
      </Paper>
    );
  }
}

export default withRouter(withCustomStyles(PaymentMethodListPart));
