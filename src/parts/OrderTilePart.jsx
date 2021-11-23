import React from "react";
import withCustomStyles from "./OrderTilePart.style";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withRouter from "react-router/es/withRouter";
import LoadMorePart from "./LoadMorePart";
import CalendarTodayRounded from "@material-ui/icons/CalendarTodayRounded";
import CloseRounded from "@material-ui/icons/CloseRounded";
import DoneRounded from "@material-ui/icons/DoneRounded";
import FiberNewRounded from "@material-ui/icons/FiberNewRounded";
import TimerRounded from "@material-ui/icons/TimerRounded";
import { getDeliveryTime, readableDate } from "../utils/DateUtils";
import Typography from "@material-ui/core/Typography";
import { DELIVERY_STATUS_MESSAGES } from "../constatns/AppConstants";
import { _get } from "../utils/HelperUtils";
import * as classnames from "classnames";
import Button from "@material-ui/core/Button";
import SimpleDialogPart from "./SimpleDialogPart";
import CreditCardListPart from "./CreditCardListPart";
import AddCardCvvPart from "./AddCardCvvPart";
import CreditCardIconPart from "./CreditCardIconPart";

class OrderTilePart extends React.Component {
  state = {
    openModal: false,
    errorMessage: "",
    selectCvv: false
  };

  handleModalToggle = () => {
    const state = { openModal: !this.state.openModal };
    if (this.state.openModal) {
      state.errorMessage = "";
      // !this.state.errorMessage && this.handleCvvModal()
    }
    this.setState(state);
  };

  // eslint-disable-next-line no-unused-vars
  handlePaymentResponse = (isError, message, order) => {
    this.setState({ errorMessage: message, openModal: isError });
  };

  handleCvvModal = () => this.setState({ selectCvv: !this.state.selectCvv });

  handleRetryPayment = cvv => {
    const {
      props: { order, selectedCard, onRetryPayment },
      handleCvvModal,
      handlePaymentResponse
    } = this;
    const retryBody = {
      card_id: selectedCard.id,
      order_id: order.id,
      cvv
    };
    handleCvvModal();
    onRetryPayment(
      retryBody,
      order => handlePaymentResponse(false, "", order),
      error => {
        if (error && !error.approved) {
          handlePaymentResponse(true, error.message);
        }
      },
      () => {}
    );
  };

  render() {
    const {
      props: {
        order,
        cards,
        classes,
        retryOrderId,
        isFirstOrder,
        selectedCard,
        fetchCreditCards,
        retryPaymentState,
        onPaymentSelection,
        fetchCreditCardState,
        selectedPaymentMethod
      },
      state: { selectCvv, openModal, errorMessage },
      handleRetryPayment,
      handleCvvModal,
      handlePaymentResponse,
      handleModalToggle
    } = this;

    return (
      <Card className={classes.card}>
        {/* {!order.id && <LoadMorePart />} */}
        {order.id && (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item className={classes.mainRow}>
              <Grid
                container
                direction="row"
                spacing={8}
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item className={classes.marginRightHalf}>
                      <CalendarTodayRounded className={classes.fontSize2} />
                    </Grid>
                    <Grid item className={classes.marginRight1}>
                      <Typography variant="caption">
                        {readableDate(order.delivery_end_time)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item className={classes.timer}>
                      <TimerRounded className={classes.fontSize2} />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {order.time_slot ||
                          getDeliveryTime(
                            order.delivery_start_time,
                            order.delivery_end_time
                          )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.mainRow}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    spacing={8}
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography variant="body2">
                        Order #{order.display_id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        Payment Mode: {order.payment_status_message}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    spacing={8}
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography variant="body2">
                        {order.total_items} item(s)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Rs. {order.application_total}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classnames(classes.gutter)}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  {(order.status === "declined" ||
                    order.status === "dorment") && (
                    <CloseRounded
                      className={classnames(classes.doneIcon, classes.red)}
                    />
                  )}
                  {order.status === "delivered" && (
                    <DoneRounded
                      className={classnames(classes.doneIcon, classes.green)}
                    />
                  )}
                  {isFirstOrder &&
                    order.status !== "delivered" &&
                    order.status !== "declined" &&
                    order.status !== "dorment" && (
                      <FiberNewRounded
                        className={classnames(classes.newIcon, classes.main)}
                      />
                    )}
                </Grid>
                <Grid item>
                  <Typography variant="body1" align={"center"}>
                    {_get(
                      DELIVERY_STATUS_MESSAGES,
                      order.status,
                      "Your order has been received"
                    )}
                  </Typography>
                </Grid>
              </Grid>
              {order.payment_mode === "card" &&
                order.transaction_status === "FAILED" && (
                  <>
                    {retryPaymentState === "fetching" &&
                      retryOrderId === order.id && <LoadMorePart />}
                    {Boolean(order.should_retry_payment) && (
                      <Grid item className={classes.retryMain}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleModalToggle}
                        >
                          Retry Payment
                        </Button>
                      </Grid>
                    )}
                  </>
                )}
            </Grid>
          </Grid>
        )}
        {!selectCvv && (
          <SimpleDialogPart
            open={openModal}
            fullWidth
            title={errorMessage && "Error"}
            content={errorMessage}
            onClose={handleModalToggle}
          >
            {!errorMessage && (
              <CreditCardListPart
                showTitleBar
                cards={cards}
                allowSelection
                isRetryPayment
                showCreditCardList
                title="Credit or Debit Card"
                orderId={order.id}
                selectedCard={selectedCard}
                onPayment={handlePaymentResponse}
                fetchCreditCards={fetchCreditCards}
                onPaymentSelection={onPaymentSelection}
                fetchCreditCardState={fetchCreditCardState}
                selectedPaymentMethod={selectedPaymentMethod}
                onToggleModal={() => {
                  handleModalToggle();
                  handleCvvModal();
                }}
              />
            )}
          </SimpleDialogPart>
        )}
        {selectCvv && (
          <AddCardCvvPart
            open={selectCvv}
            card={selectedCard}
            cardIcon={<CreditCardIconPart type={selectedCard.scheme} />}
            onToggleModal={handleCvvModal}
            onAccept={handleRetryPayment}
          />
        )}
      </Card>
    );
  }
}

export default withRouter(withCustomStyles(OrderTilePart));
