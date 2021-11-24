import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./ProductListPage.style";
import Grid from "@material-ui/core/Grid";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import { handleScroll } from "../utils/AppUtils";
import EmptyAreaPart from "../parts/EmptyAreaPart";
import ShoppingBasketRounded from "@material-ui/icons/ShoppingBasketRounded";
import MyOrdersListPart from "../parts/MyOrdersListPart";
import Paper from "@material-ui/core/Paper";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";

@inject(["myOrdersStore"])
@inject(["paymentStore"])
@observer
class MyOrdersPage extends Component {
  componentDidMount() {
    const { myOrdersStore } = this.props;

    myOrdersStore.fetch();
    this.scrollListener = handleScroll.bind(this, myOrdersStore);

    window.addEventListener("scroll", this.scrollListener);
  }

  componentWillUnmount() {
    const { myOrdersStore } = this.props;
    window.removeEventListener("scroll", this.scrollListener);
    myOrdersStore.cancel();
  }

  render() {
    const {
      props: {
        classes,
        paymentStore: {
          cards,
          selectedCard,
          fetchCreditCards,
          fetchCreditCardState,
          selectedPaymentMethod,
          handlePaymentSelection
        },
        myOrdersStore
      }
    } = this;

    const emptyAreaSection = (
      <React.Fragment>
        <EmptyAreaPart
          icon={<ShoppingBasketRounded />}
          title="No orders"
          content="Your favourite items are just a click away"
        />
      </React.Fragment>
    );

    return (
      <Paper className={classes.minHeightPage}>
        <RobotsNoIndexPart />
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          {myOrdersStore.all.length === 0 &&
            myOrdersStore.state === "fetching" && (
              <LoadMorePart className={classes.productsLoadMore} />
            )}

          {myOrdersStore.all.length === 0 &&
            myOrdersStore.state !== "fetching" &&
            emptyAreaSection}

          {myOrdersStore.all.length >= 1 && (
            <MyOrdersListPart
              cards={cards}
              orders={myOrdersStore.all}
              selectedCard={selectedCard}
              fetchCreditCards={fetchCreditCards}
              retryOrderId={myOrdersStore.retryOrderId}
              fetchCreditCardState={fetchCreditCardState}
              onRetryPayment={myOrdersStore.retryPayment}
              onPaymentSelection={handlePaymentSelection}
              selectedPaymentMethod={selectedPaymentMethod}
              retryPaymentState={myOrdersStore.retryPaymentState}
            />
          )}
        </Grid>
        {myOrdersStore.all.length > 1 && myOrdersStore.state === "fetching" && (
          <LoadMorePart />
        )}
      </Paper>
    );
  }
}

export default withRouter(withCustomStyles(MyOrdersPage));
