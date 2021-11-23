import React, { Component } from "react";
import * as classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import withRouter from "react-router/withRouter";
import withCustomStyles from "./AddPaymentCardPart.style";
import LoadMorePart from "./LoadMorePart";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";
import loadFrames from "../utils/CardPaymentUtils";
import { ReactComponent as VisaCard } from "../assets/images/visa.svg";
import { ReactComponent as MasterCard } from "../assets/images/mastercard.svg";
import { ReactComponent as AmericanExpressCard } from "../assets/images/american express.svg";
import InputPart from "./InputPart";
import Typography from "@material-ui/core/Typography";
import SimpleDialogPart from "./SimpleDialogPart";
import CreditCardIconPart from "./CreditCardIconPart";

class AddPaymentCardPart extends Component {
  state = {
    error: {
      card: "",
      cvv: "",
      expiry_date: "",
      card_number: "",
      name: "",
      isLoading: true
    },
    cardType: "",
    name: "",
    openModal: false,
    errorMessage: "",
    scriptLoaded: null
  };

  componentDidMount() {
    this.setState({ scriptLoaded: true });
    loadFrames(() => {
      this.setState({ scriptLoaded: false });
    });
  }

  handleFormInputChange = (key, event) => {
    const val = event.target.value;
    this.setState({
      ...this.state,
      [key]: val
    });
    if (key === "name") {
      this.handleValidation({ element: key, isValid: val });
    }
  };

  handleCardSupport = e => {
    const state = {
      cardType: (e.paymentMethod && e.paymentMethod.toLowerCase()) || "",
      error: this.state.error
    };
    if (
      !e.paymentMethod ||
      !["visa", "mastercard", "american express"].includes(
        e.paymentMethod.toLowerCase()
      )
    ) {
      state.error.card = "Card type is not supported";
    } else {
      delete state.error.card;
    }
    this.setState(state);
  };

  handleValidation = e => {
    if (e && e.element) {
      const error = {
        ...this.state.error,
        [e.element.replace(/-/g, "_")]: !e.isValid
      };
      if (e.isValid) {
        delete error[e.element.replace(/-/g, "_")];
      }
      this.setState({
        error
      });
    }
  };

  verifyCard = e => {
    this.props.verifyCreditCard(
      { ...e, checkout: this.props.redirectCheckout },
      data => {
        this.props.enqueueSnackbar(data.message, {
          variant: "info"
        });
        this.props.redirectPage();
      },
      e => {
        this.setState({ errorMessage: e });
        this.handleModalToggle();
      }
    );
  };

  handleModalToggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleSubmit = () => {
    Frames.enableSubmitForm();
    Frames.submitCard();
    this.props.setVerifyCreditCardState("fetching");
    this.setState({ scriptLoaded: null });
  };

  render() {
    const {
      props: { classes, verifyCreditCardState },
      state: { name, error, cardType, openModal, errorMessage, scriptLoaded },
      verifyCard,
      handleSubmit,
      handleValidation,
      handleModalToggle,
      handleCardSupport,
      handleFormInputChange
    } = this;

    return (
      <>
        {(verifyCreditCardState === "fetching" || error.isLoading) &&
          scriptLoaded && <LoadMorePart />}

        <Grid
          container
          wrap="nowrap"
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          className={classnames({
            [classes.hide]:
              verifyCreditCardState === "fetching" || error.isLoading
          })}
        >
          {!scriptLoaded && (
            <Frames
              config={{
                cardholder: {
                  name: name
                },
                publicKey: process.env.REACT_APP_CHECKOUT_API_KEY,
                localization: {
                  cardNumberPlaceholder: "Card number",
                  expiryMonthPlaceholder: "MM",
                  expiryYearPlaceholder: "YY",
                  cvvPlaceholder: "CVV"
                },
                style: {
                  base: {
                    fontSize: "17px",
                    height: "54px",
                    maxHeight: "54px",
                    padding: "8px"
                  }
                }
              }}
              ready={() =>
                handleValidation({ element: "isLoading", isValid: true })
              }
              frameActivated={() => {}}
              frameFocus={() => {}}
              frameBlur={() => {}}
              frameValidationChanged={handleValidation}
              paymentMethodChanged={handleCardSupport}
              cardValidationChanged={() => {}}
              cardSubmitted={() => {}}
              cardTokenized={verifyCard}
              cardTokenizationFailed={() => {}}
            >
              <Grid item>
                <InputPart
                  label={"Card Holder Name"}
                  rootClassName={classes.inputClass}
                  onChange={handleFormInputChange.bind(this, "name")}
                  value={name}
                />
              </Grid>
              <Grid container className={classes.gutterLeft}>
                <Typography color="error">
                  {error.name && "Enter card holder's name"}
                </Typography>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.inputElement}
                >
                  <Grid item xs={8} className={classes.inputHeight}>
                    <CardNumber />
                  </Grid>
                  <Grid item xs={4} className={classes.cardIcon}>
                    <CreditCardIconPart type={cardType} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.gutterLeft}>
                <Typography color="error">
                  {error.card || (error.card_number && "Invalid Card number")}
                </Typography>
              </Grid>

              <Grid
                container
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={6} className={classes.inputElement}>
                  <ExpiryDate />
                </Grid>
                <Grid item xs={6} className={classes.inputElement}>
                  <Cvv />
                </Grid>
              </Grid>
              <Grid
                container
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={6} className={classes.gutterLeft}>
                  <Typography color="error" gutterBottom>
                    {error.expiry_date && "Invalid expiry date"}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gutterLeft}>
                  <Typography color="error" gutterBottom>
                    {error.cvv && "Invalid CVV"}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                className={classnames(classes.largeButton, classes.cardButton)}
                variant="contained"
                disabled={Boolean(Object.keys(error).length)}
                onClick={handleSubmit}
                color="primary"
              >
                Add Card
              </Button>
            </Frames>
          )}
          <Grid container spacing={16} className={classes.verifyText}>
            <Typography variant="body2">
              To verify your card, a small amount will be charged to it. After
              verification the amount will be automatically refunded.
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
            spacing={16}
            className={classes.verifyText}
          >
            <Typography variant="body2" gutterBottom>
              We accept:
            </Typography>
            <Grid item>
              <VisaCard width="50px" height="32px" />
            </Grid>
            <Grid item>
              <MasterCard width="50px" height="32px" />
            </Grid>
            <Grid item>
              <AmericanExpressCard width="50px" height="32px" />
            </Grid>
          </Grid>
        </Grid>

        <SimpleDialogPart
          open={openModal}
          fullWidth
          title={"Uh Oh!"}
          content={errorMessage}
          onClose={handleModalToggle}
          acceptBtnContent="Done"
          onAccept={handleModalToggle}
        ></SimpleDialogPart>
      </>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(AddPaymentCardPart)));
