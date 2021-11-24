import React from "react";
import withCustomStyles from "./CheckoutPage.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as classnames from "classnames";
import { inject, observer } from "mobx-react";
import AddShoppingCartRounded from "@material-ui/icons/AddShoppingCartRounded";
import EmptyAreaPart from "../parts/EmptyAreaPart";
import BottomFixedButton from "../parts/BottomFixedButton";
import DeliverySlotTabsPart from "../parts/DeliverySlotTabsPart";
import * as Sentry from "@sentry/browser";
import {
  consoleError,
  isEasyPaisaMiniApp,
  logInfoMessage
} from "../utils/AppUtils";
import InputPart from "../parts/InputPart";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import CheckoutPageSuccessPart from "../parts/CheckoutPageSuccessPart";
import gtmService from "../services/GTMService";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SimpleDialogPart from "../parts/SimpleDialogPart";
import PaymentMethodListPart from "../parts/PaymentMethodListPart";
import CreditCardListPart from "../parts/CreditCardListPart";
import LoadMorePart from "../parts/LoadMorePart";
import AddCardCvvPart from "../parts/AddCardCvvPart";
import CreditCardIconPart from "../parts/CreditCardIconPart";
import customerStore from "../stores/CustomerStore";
import { ReactComponent as EasyPaisaIcon } from "../assets/images/easy_paisa.svg";
import {
  handleEasyPaisaConfirmResponse,
  handleEasyPaisaResponse
} from "../utils/EasyPaisaUtils";

@inject(["orderStore"])
@inject(["myOrdersStore"])
@inject(["customerStore"])
@inject(["paymentStore"])
@observer
class CheckoutPage extends React.Component {
  state = {
    order: {},
    openModal: false,
    errorMessage: "",
    selectCard: false,
    selectCvv: false,
    receiveEasyPaisaResponse: false,
    isEasyPaisaSuccess: false
  };

  placeOrder = cvv => {
    const {
      props: { orderStore, customerStore, history },
      handlePlaceOrderSuccess
    } = this;

    if (!customerStore.isLoggedIn) {
      history.push("/login?redirect=/cart");
      return;
    }
    if (!this.state.errorMessage && !isEasyPaisaMiniApp()) {
      orderStore.placeOrder(
        cvv,
        handlePlaceOrderSuccess,
        errorMessage => {
          this.props.enqueueSnackbar(
            errorMessage ||
              "Order not placed, please chat with customer support",
            {
              variant: "error"
            }
          );
        },
        () => {
          this.props.enqueueSnackbar(
            "Order not placed, please chat with customer support",
            {
              variant: "error"
            }
          );
        }
      );
    } else if (isEasyPaisaMiniApp() && !this.state.errorMessage) {
      orderStore.easyPaisaPlaceOrder(
        handlePlaceOrderSuccess,
        errorMessage => {
          this.props.enqueueSnackbar(
            errorMessage ||
              "Order not placed, please chat with customer support",
            {
              variant: "error"
            }
          );
        },
        () => {
          this.props.enqueueSnackbar(
            "Order not placed, please chat with customer support",
            {
              variant: "error"
            }
          );
        }
      );
    } else {
      this.handleRetryPayment(cvv);
    }
  };

  handlePlaceOrderSuccess = order => {
    const {
      props: { orderStore },
      handleEasyPaisaCreatePaymentAuthModal
    } = this;
    const orderObj = {
      ...order,
      paymentMethod: orderStore.paymentMethod,
      timeSlot: orderStore.timeSlot
    };
    if (isEasyPaisaMiniApp()) {
      this.setState({ order });
      handleEasyPaisaCreatePaymentAuthModal(order.paymentTransactionId);
    }
    gtmService.checkoutDoneStep(orderStore.getAllArray(), orderObj);
    gtmService.purchase(
      orderObj,
      orderStore.getAllArray(),
      customerStore.customer
    );
  };

  handleEasyPaisaCreatePaymentAuthModal = transactionId => {
    // eslint-disable-next-line no-undef
    mp.createPayment(transactionId);
  };

  handleChange = event => {
    this.props.orderStore.setComments(event.target.value);
  };

  handleModalToggle = () => {
    if (this.state.openModal && this.state.errorMessage) {
      this.setState({ selectCard: false });
      return;
    }
    this.setState({ openModal: !this.state.openModal });
  };

  handleToggle = key => {
    if (isEasyPaisaMiniApp()) return;
    if (
      this.state.openModal &&
      this.state.errorMessage &&
      key !== "selectCvv"
    ) {
      this.setState({ selectCard: false });
      return;
    }
    this.setState({ [key]: !this.state[key] });
  };

  fetchTimeSlot = () => {
    this.props.customerStore.fetchTimeSlots(() => {
      if (!this.props.customerStore.isTimeSlotValid()) {
        Sentry.captureMessage("Invalid vendor", {
          level: "error",
          extra: {
            vendor: this.props.customerStore.vendor
          }
        });
        consoleError("Invalid vendor", this.props.customerStore.vendor);
      }
    });
  };

  componentDidMount() {
    const {
      props: { orderStore, paymentStore, customerStore, history },
      fetchTimeSlot
    } = this;

    if (!orderStore.getAllArray().length) {
      history.goBack();
    }

    if (customerStore.isLoggedIn) {
      customerStore.fetchCustomerInfo(() => {
        fetchTimeSlot();
        gtmService.checkoutPlaceOrderStep(orderStore.getAllArray(), orderStore);
      });
    } else {
      customerStore.fetchVendor(undefined, () => {
        fetchTimeSlot();
        gtmService.checkoutPlaceOrderStep(orderStore.getAllArray(), orderStore);
      });
    }

    if (isEasyPaisaMiniApp()) {
      this.props.paymentStore.handlePaymentSelection("easypaisa_miniapp");
      window.addEventListener(
        "ep_create_payment_result",
        this.handleEasyPaisaCreatePayment,
        false
      );
    }

    paymentStore.fetchCreditCards();
  }

  handlePlaceOrderBtnClick = () => {
    const {
      props: {
        paymentStore: { selectedCard },
        enqueueSnackbar
      },
      placeOrder,
      handleToggle
    } = this;
    if (customerStore.isLoggedIn && !customerStore.customer.address_2) {
      enqueueSnackbar("Please update your location", {
        variant: "error"
      });
      return;
    }
    if (selectedCard && Object.keys(selectedCard).length) {
      handleToggle("selectCvv");
    } else {
      placeOrder();
    }
  };

  handleEasyPaisaCreatePayment = ({ detail: data }) => {
    this.setState({ receiveEasyPaisaResponse: true });

    logInfoMessage("Payment response from Easypaisa MiniApp", {
      environment: "easypaisa_miniapp",
      orderId:
        this.state.order &&
        this.state.order.id &&
        this.state.order.id.toString(),
      customer: this.props.customerStore.customer,
      data
    });
    if (data) {
      const response = handleEasyPaisaResponse(data.resultCode);
      this.props.paymentStore.confirmEasyPaisaPayment(
        {
          order_id: this.state.order.id.toString(),
          status: response.confirmAPiStatus
        },
        confirmResponse => {
          const epResponse = handleEasyPaisaConfirmResponse(confirmResponse);
          if (epResponse.status !== "error") {
            this.props.orderStore.handleEasyPaisaOrderCleanUp(true);
            this.handlePaymentResponse(false, "");
            this.setState({ isEasyPaisaSuccess: true });
          }
          this.props.enqueueSnackbar(epResponse.message, {
            variant: epResponse.status
          });
        },
        () => {
          this.props.enqueueSnackbar(
            "Your order has been declined! Please try again",
            {
              variant: "error"
            }
          );
        },
        () => {
          this.props.enqueueSnackbar("Something went wrong. Please try again", {
            variant: "error"
          });
        }
      );
    }
  };

  handleShowPaymentMethod = () => {
    const {
      paymentStore: { selectedPaymentMethod, selectedCard }
    } = this.props;
    if (selectedPaymentMethod === "cod") {
      return "Cash On Delivery (COD)";
    } else if (selectedPaymentMethod === "card") {
      return "******" + selectedCard.last4;
    } else if (selectedPaymentMethod === "easypaisa_miniapp") {
      return "EasyPaisa";
    }
  };

  handlePaymentSelect = type => {
    if (type === "cod") {
      this.props.paymentStore.handlePaymentSelection(type);
      this.handlePaymentResponse(false, "");
    } else if (isEasyPaisaMiniApp()) {
      this.props.paymentStore.handlePaymentSelection("easypaisa_miniapp");
    } else {
      this.setState({ selectCard: true });
    }
  };

  handleRetryPayment = cvv => {
    const {
      props: { paymentStore, myOrdersStore },
      state: { order },
      handleToggle,
      handlePaymentResponse
    } = this;

    const retryBody = {
      card_id: paymentStore.selectedCard.id,
      order_id: order.id,
      cvv
    };

    myOrdersStore.retryPayment(
      retryBody,
      order => handlePaymentResponse(false, "", order),
      error => {
        if (error && !error.approved) {
          handlePaymentResponse(true, error.message);
        }
      },
      () => {}
    );
    handleToggle("selectCvv");
  };

  componentWillUnmount() {
    this.props.orderStore.cancel();
    this.props.customerStore.cancel();
    this.props.paymentStore.cancel();
    this.props.myOrdersStore.cancel();
    // if (isEasyPaisaMiniApp()) {
    window.removeEventListener(
      "ep_create_payment_result",
      this.handleEasyPaisaCreatePayment
    );
    // }
  }

  render() {
    const {
      props: {
        classes,
        orderStore,
        customerStore,
        paymentStore: {
          cards,
          selectedCard,
          fetchCreditCards,
          fetchCreditCardState,
          selectedPaymentMethod,
          handlePaymentSelection,
          confirmEasyPaisaPaymentState
        },
        myOrdersStore,
        location: { pathname, search }
      },
      state: {
        selectCvv,
        order,
        openModal,
        errorMessage,
        selectCard,
        isEasyPaisaSuccess
      },
      handleToggle,
      handlePaymentSelect,
      handleShowPaymentMethod,
      handlePlaceOrderBtnClick
    } = this;

    const checkoutSection = (
      <React.Fragment>
        <Paper className={classnames(classes.root)}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item className={classes.padding1}>
              <Typography variant={"h6"}>Checkout</Typography>
            </Grid>
            {customerStore.isLoggedIn && (
              <Grid item className={classes.section}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={9}>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="stretch"
                    >
                      <Grid item className={classes.gutterBottomHalf}>
                        <Typography variant={"body1"}>
                          Your Delivery Address
                        </Typography>
                      </Grid>
                      <Grid item className={classes.gutterBottomHalf}>
                        <Typography variant={"caption"}>
                          {customerStore.customer.address_2}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={"caption"}>
                          {customerStore.customer.address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button
                          variant={"outlined"}
                          className={classes.changeButton}
                          component={Link}
                          to={"/profile?redirect=cart"}
                          color={"primary"}
                        >
                          Change
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item className={classes.marginBottom2}>
              <InputPart
                value={orderStore.comments}
                onChange={this.handleChange}
                label="Instructions for delivery team."
                id="comments"
              />
            </Grid>
          </Grid>
        </Paper>
        <div>
          <Typography
            variant={"subtitle2"}
            className={classes.padding1}
            align={"center"}
          >
            Choose delivery slot.
          </Typography>
          <Paper className={classes.padding2}>
            {!!customerStore.timeSlots.length && (
              <DeliverySlotTabsPart deliveryOptions={customerStore.timeSlots} />
            )}
            {!isEasyPaisaMiniApp() && (
              <>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <Typography variant="body1">
                      Select Payment Method
                    </Typography>
                  </ListItem>
                  {fetchCreditCardState === "fetching" ? (
                    <LoadMorePart />
                  ) : (
                    <Button fullWidth onClick={() => handleToggle("openModal")}>
                      <ListItem>
                        {selectedPaymentMethod === "card" && (
                          <ListItemIcon>
                            <CreditCardIconPart type={selectedCard.scheme} />
                          </ListItemIcon>
                        )}
                        {selectedPaymentMethod === "easypaisa_miniapp" && (
                          <ListItemIcon>
                            <EasyPaisaIcon width="32px" height="32px" />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primaryTypographyProps={{
                            variant: "subtitle2"
                          }}
                          primary={handleShowPaymentMethod()}
                        />
                        <ListItemIcon>
                          <ChevronRightIcon color="primary" />
                        </ListItemIcon>
                      </ListItem>
                    </Button>
                  )}
                </List>
              </>
            )}
          </Paper>
        </div>
        <BottomFixedButton
          onClick={handlePlaceOrderBtnClick}
          state={[
            customerStore.customerInfoState,
            orderStore.placeOrderState,
            fetchCreditCardState,
            customerStore.fetchTimeSlotState,
            isEasyPaisaMiniApp() && confirmEasyPaisaPaymentState
          ]}
          content={
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant={"subtitle2"}
                  className={classes.colorWhite600}
                >
                  {!customerStore.isLoggedIn && "Sign In to "}Place Order
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant={"subtitle2"}
                  className={classes.colorWhite600}
                >
                  Rs. {orderStore.totalBill}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </React.Fragment>
    );

    const emptyAreaSection = (
      <React.Fragment>
        <EmptyAreaPart
          icon={<AddShoppingCartRounded />}
          title="No items in your cart"
          content="Your favourite items are just a click away"
        />
        <BottomFixedButton content="Start Shopping" to={"/"} />
      </React.Fragment>
    );

    const vendorInvalidSection = (
      <React.Fragment>
        <Paper className={classes.section}>
          <Typography variant={"body1"} color={"secondary"}>
            Please chat with customer support to place order. This page is
            temporarily under maintenance.
          </Typography>
          <BottomFixedButton content="Start Shopping" to={"/"} />
        </Paper>
      </React.Fragment>
    );

    const checkoutMainSection = (
      <React.Fragment>
        <RobotsNoIndexPart />
        {orderStore.all.size < 1 &&
          !orderStore.isSuccessfulOrderValid() &&
          selectedPaymentMethod !== "card" &&
          emptyAreaSection}
        {orderStore.all.size >= 1 &&
          customerStore.fetchTimeSlotState !== "fetching" &&
          customerStore.fetchVendorState !== "fetching" &&
          customerStore.fetchVendorState !== "pending" &&
          customerStore.customerInfoState !== "fetching" &&
          !customerStore.isTimeSlotValid() &&
          vendorInvalidSection}
        {orderStore.all.size >= 1 &&
          customerStore.fetchVendorState !== "fetching" &&
          checkoutSection}
        {!isEasyPaisaMiniApp() &&
          (myOrdersStore.retryPaymentState === "fetching" ||
            customerStore.fetchTimeSlotState === "fetching" ||
            customerStore.fetchVendorState === "fetching") && <LoadMorePart />}
        {!errorMessage &&
          ((isEasyPaisaMiniApp() && isEasyPaisaSuccess) ||
            (!isEasyPaisaMiniApp() &&
              myOrdersStore.retryPaymentState !== "fetching")) &&
          orderStore.all.size === 0 &&
          orderStore.isSuccessfulOrderValid() &&
          selectedPaymentMethod !== "card" && (
            <CheckoutPageSuccessPart
              order={orderStore.successfulOrder}
              customer={customerStore.customer}
            />
          )}
        {!isEasyPaisaMiniApp() &&
          myOrdersStore.retryPaymentState !== "fetching" && (
            <>
              <SimpleDialogPart
                open={!selectCvv && openModal}
                fullWidth
                title={!selectCard && errorMessage && "Payment Failed!"}
                content={!selectCard && errorMessage}
                cancelBtnContent={
                  !selectCard && errorMessage && "Use Cash on Delivery"
                }
                onCancel={() => handlePaymentSelect("cod")}
                acceptBtnContent={
                  !selectCard && errorMessage && "Retry Payment"
                }
                onAccept={() => handlePaymentSelect("card")}
                onClose={() => handleToggle("openModal")}
              >
                {!errorMessage && (
                  <PaymentMethodListPart
                    cards={cards}
                    allowSelection
                    showCreditCardList
                    search={search}
                    pathname={pathname}
                    selectedCard={selectedCard}
                    fetchCreditCards={fetchCreditCards}
                    onPaymentSelection={handlePaymentSelection}
                    fetchCreditCardState={fetchCreditCardState}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onToggleModal={() => handleToggle("openModal")}
                  />
                )}
                {selectCard && (
                  <CreditCardListPart
                    showTitleBar
                    cards={cards}
                    allowSelection
                    isRetryPayment
                    orderId={order.id}
                    showCreditCardList
                    selectedCard={selectedCard}
                    title="Credit or Debit Card"
                    fetchCreditCards={fetchCreditCards}
                    fetchCreditCardState={fetchCreditCardState}
                    onPaymentSelection={handlePaymentSelection}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onToggleModal={() => {
                      handleToggle("openModal");
                      handleToggle("selectCvv");
                    }}
                  />
                )}
              </SimpleDialogPart>
              {selectCvv && (
                <AddCardCvvPart
                  open={selectCvv}
                  card={selectedCard}
                  cardIcon={<CreditCardIconPart type={selectedCard.scheme} />}
                  onToggleModal={() => handleToggle("selectCvv")}
                  onAccept={this.placeOrder}
                />
              )}
            </>
          )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {((isEasyPaisaMiniApp() &&
          confirmEasyPaisaPaymentState === "fetching") ||
          customerStore.fetchTimeSlotState === "fetching" ||
          customerStore.customerInfoState === "fetching") && <LoadMorePart />}
        {((isEasyPaisaMiniApp() &&
          confirmEasyPaisaPaymentState !== "fetching") ||
          (customerStore.fetchTimeSlotState !== "fetching" &&
            customerStore.customerInfoState !== "fetching")) &&
          checkoutMainSection}
      </React.Fragment>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(CheckoutPage)));
