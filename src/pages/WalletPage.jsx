import React, { Component } from "react";
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./WalletPage.style";
import LoadMorePart from "../parts/LoadMorePart";
import BalancePart from "../parts/BalancePart";
import CreditCardListPart from "../parts/CreditCardListPart";
import PaymentMethodListPart from "../parts/PaymentMethodListPart";

@inject(["uiStore"])
@inject(["paymentStore"])
@inject(["customerStore"])
@observer
class WalletPage extends Component {
  componentDidMount() {
    const { customerStore } = this.props;
    customerStore.fetchCustomerWithWallet();
  }

  componentWillUnmount() {
    this.props.customerStore.cancel();
  }

  render() {
    const {
      props: {
        classes,
        uiStore,
        customerStore,
        paymentStore: {
          cards,
          selectedCard,
          fetchCreditCards,
          deleteCreditCard,
          fetchCreditCardState,
          selectedPaymentMethod,
          deleteCreditCardState
        },
        location: { pathname, search }
      }
    } = this;

    return (
      <>
        {customerStore.customerWalletDetailState === "fetching" && (
          <LoadMorePart className={classes.mainLoader} />
        )}
        {customerStore.customerWalletDetailState === "done" && (
          <BalancePart
            classes={classes}
            wallet={customerStore.wallet}
            uiStore={uiStore}
          />
        )}
        <CreditCardListPart
          cards={cards}
          title="Cards"
          showTitleBar
          showDeleteButton
          search={search}
          pathname={pathname}
          selectedCard={selectedCard}
          deleteCreditCard={deleteCreditCard}
          fetchCreditCards={fetchCreditCards}
          fetchCreditCardState={fetchCreditCardState}
          selectedPaymentMethod={selectedPaymentMethod}
          deleteCreditCardState={deleteCreditCardState}
        />
        <PaymentMethodListPart title="Current Payment Method" />
      </>
    );
  }
}

export default withRouter(withCustomStyles(WalletPage));
