import React, { Component } from "react";
import withRouter from "react-router/withRouter";
import * as classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import withCustomStyles from "./CreditCardListPart.style";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import LoadMorePart from "./LoadMorePart";
import ConfirmationDialogPart from "./ConfirmationDialogPart";
import CreditCardIconPart from "./CreditCardIconPart";

class CreditCardListPart extends Component {
  state = {
    card: {},
    allowDelete: false,
    openModal: false
  };

  componentDidMount() {
    this.props.fetchCreditCards();
  }

  handleManage = () => {
    if (this.props.cards.length) {
      this.setState({ allowDelete: !this.state.allowDelete });
    }
  };

  handleToggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleDelete = card => {
    this.setState({ card });
    this.handleToggleModal();
  };

  handleConfirmDelete = () => {
    this.props.deleteCreditCard(this.state.card.id);
    this.handleToggleModal();
  };

  handleCardSelect(card) {
    const {
      onToggleModal,
      allowSelection,
      isRetryPayment,
      onPaymentSelection
    } = this.props;

    if (allowSelection || isRetryPayment) {
      onPaymentSelection("card", card);
      onToggleModal();
    }
  }

  render() {
    const {
      props: {
        cards,
        title,
        classes,
        pathname,
        search,
        selectedCard,
        showTitleBar,
        allowSelection,
        isRetryPayment,
        showDeleteButton,
        fetchCreditCardState,
        deleteCreditCardState,
        selectedPaymentMethod
      },
      state: { openModal, allowDelete },
      handleConfirmDelete,
      handleToggleModal,
      handleCardSelect,
      handleDelete,
      handleManage
    } = this;

    return (
      <Paper
        className={classnames(classes.root, {
          [classes.disableGutters]: !showTitleBar
        })}
      >
        {showTitleBar && (
          <Grid container justify="space-between" alignItems="center">
            <Typography variant={"h6"} color={"textSecondary"}>
              {title}
            </Typography>
            {showDeleteButton && (
              <Button color="secondary" onClick={handleManage}>
                {allowDelete ? "Done" : "Manage Cards"}
              </Button>
            )}
          </Grid>
        )}
        <List disablePadding>
          {(showTitleBar && deleteCreditCardState === "fetching") ||
          fetchCreditCardState === "fetching" ? (
            <LoadMorePart />
          ) : (
            cards.map(card => (
              <div key={card.id}>
                <ListItem
                  disableGutters
                  button={allowSelection}
                  onClick={handleCardSelect.bind(this, card)}
                >
                  <ListItemIcon>
                    <CreditCardIconPart type={card.scheme} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle2">{card.scheme}</Typography>
                    <Typography variant="subtitle2">
                      ******{card.last4}
                    </Typography>
                  </ListItemText>
                  {!isRetryPayment &&
                    allowSelection &&
                    selectedPaymentMethod === "card" &&
                    selectedCard.id === card.id && (
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    )}
                  {allowDelete && (
                    <ListItemIcon color="primary">
                      <IconButton onClick={() => handleDelete(card)}>
                        <RemoveCircleIcon width="30px" color="error" />
                      </IconButton>
                    </ListItemIcon>
                  )}
                </ListItem>
                <Divider />
              </div>
            ))
          )}
          <ListItem
            disableGutters
            component={Link}
            to={`/add-card?redirect=${pathname}${search}`}
          >
            <Button
              variant="contained"
              size="small"
              color={cards.length ? "default" : "primary"}
            >
              <AddIcon fontSize="small" />
            </Button>
            <ListItemText>
              <Typography variant="subtitle2">Add a new Card</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <ConfirmationDialogPart
          title="Delete Card"
          content="Are you sure you want to delete this card."
          open={openModal}
          yesText="Confirm"
          noText="Cancel"
          handleClose={handleToggleModal}
          handleNo={handleToggleModal}
          handleYes={handleConfirmDelete}
        />
      </Paper>
    );
  }
}

export default withRouter(withCustomStyles(CreditCardListPart));
