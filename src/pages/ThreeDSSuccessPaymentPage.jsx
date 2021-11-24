import React from "react";
import withCustomStyles from "./CartPage.style";
import withRouter from "react-router/es/withRouter";
import { inject, observer } from "mobx-react";
import CheckoutPageSuccessPart from "../parts/CheckoutPageSuccessPart";
import { toJS } from "mobx";
import LoadMorePart from "../parts/LoadMorePart";
import { isEasyPaisaMiniApp } from "../utils/AppUtils";
import { withSnackbar } from "notistack";
import { getQueryParam } from "../utils/UrlUtils";

@inject(["myOrdersStore"])
@inject(["orderStore"])
@inject(["customerStore"])
@observer
class ThreeDSSuccessPayment extends React.Component {
  componentDidMount() {
    const {
      myOrdersStore,
      match,
      enqueueSnackbar,
      location: { search }
    } = this.props;
    if (match.params.order === "2") {
      enqueueSnackbar(
        "Card transaction failed. Please contact your bank for more details. You can always retry with the same or new card.",
        {
          variant: "error"
        }
      );
    }
    const orderInfoBody = {
      order_id: getQueryParam(search, "order_id"),
      payment_id: getQueryParam(search, "payment_id"),
      retry_payment: getQueryParam(search, "retry")
        ? getQueryParam(search, "retry")
        : "false"
    };
    myOrdersStore.updateOrder(
      orderInfoBody,
      () => {
        myOrdersStore.fetchLastOrder();
      },
      () => {
        enqueueSnackbar("An error occured. Please try again.", {
          variant: "error"
        });
      },
      () => {
        enqueueSnackbar("An error occured. Please try again.", {
          variant: "error"
        });
      }
    );
  }

  render() {
    const { myOrdersStore, customerStore, orderStore } = this.props;
    const content = (
      <React.Fragment>
        <CheckoutPageSuccessPart
          order={toJS(myOrdersStore.lastOrder)}
          customer={customerStore.customer}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {!isEasyPaisaMiniApp() &&
          (myOrdersStore.updateOrderState === "fetching" ||
            myOrdersStore.fetchLastOrderState === "fetching") && (
            <LoadMorePart />
          )}
        {!isEasyPaisaMiniApp() &&
          myOrdersStore.updateOrderState !== "fetching" &&
          myOrdersStore.fetchLastOrderState !== "fetching" &&
          myOrdersStore.lastOrder &&
          content}
        {!isEasyPaisaMiniApp() &&
          myOrdersStore.updateOrderState !== "fetching" &&
          myOrdersStore.fetchLastOrderState !== "fetching" &&
          myOrdersStore.lastOrder &&
          orderStore.all.clear &&
          orderStore.notFound.clear}
      </React.Fragment>
    );
  }
}

export default withRouter(
  withSnackbar(withCustomStyles(ThreeDSSuccessPayment))
);
