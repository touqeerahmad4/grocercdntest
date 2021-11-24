import React, { Component } from "react";
import withCustomStyles from "./MyOrdersListPart.style";
import Grid from "@material-ui/core/Grid";
import OrderTilePart from "./OrderTilePart";
import Typography from "@material-ui/core/Typography";

class MyOrdersListPart extends Component {
  render() {
    const {
      cards,
      orders,
      classes,
      selectedCard,
      retryOrderId,
      onRetryPayment,
      fetchCreditCards,
      retryPaymentState,
      onPaymentSelection,
      fetchCreditCardState,
      selectedPaymentMethod
    } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.gutterBottom2}>
          <Typography variant={"h6"}>My Orders</Typography>
        </Grid>
        {orders.map(order => (
          <Grid item key={order.id}>
            <OrderTilePart
              cards={cards}
              order={order}
              retryOrderId={retryOrderId}
              selectedCard={selectedCard}
              onRetryPayment={onRetryPayment}
              fetchCreditCards={fetchCreditCards}
              retryPaymentState={retryPaymentState}
              onPaymentSelection={onPaymentSelection}
              isFirstOrder={order.id === orders[0].id}
              fetchCreditCardState={fetchCreditCardState}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </Grid>
        ))}
      </React.Fragment>
    );
  }
}

export default withCustomStyles(MyOrdersListPart);
