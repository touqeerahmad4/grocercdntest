import React from "react";
import withRouter from "react-router/withRouter";
import Paper from "@material-ui/core/Paper";
import AddPaymentCardPart from "../parts/AddPaymentCardPart";
import { inject, observer } from "mobx-react";
import { getQueryParam } from "../utils/UrlUtils";

@inject(["paymentStore"])
@observer
class AddCardPage extends React.Component {
  redirectPage = () => {
    const {
      props: {
        history,
        location: { search }
      }
    } = this;

    let redirect = getQueryParam(search, "redirect");

    getQueryParam(search, "redirect")
      ? history.push(redirect)
      : history.push("/wallet");
  };

  render() {
    const {
      props: {
        paymentStore: {
          verifyCreditCard,
          verifyCreditCardState,
          setVerifyCreditCardState
        },
        location: { search }
      },
      redirectPage
    } = this;

    return (
      <Paper>
        <AddPaymentCardPart
          redirectPage={redirectPage}
          redirectCheckout={getQueryParam(search, "redirect") === "/checkout"}
          verifyCreditCard={verifyCreditCard}
          verifyCreditCardState={verifyCreditCardState}
          setVerifyCreditCardState={setVerifyCreditCardState}
        />
      </Paper>
    );
  }
}

export default withRouter(AddCardPage);
