import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import withCustomStyles from "./AddCardCvvPart.style";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SimpleDialogPart from "./SimpleDialogPart";
import InputPart from "./InputPart";
import Typography from "@material-ui/core/Typography";

const AddCardCvvPart = props => {
  const { classes, open, card, cardIcon, onToggleModal, onAccept } = props;
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");

  const isValid = () => {
    if (
      (card.scheme.toLowerCase() === "american express" && cvv.length !== 4) ||
      (card.scheme.toLowerCase() !== "american express" && cvv.length !== 3)
    ) {
      setCvvError("Please enter correct CVV");
      return false;
    } else {
      setCvvError("");
    }
    return true;
  };

  useEffect(() => {
    cvvError && isValid();
  }, [cvv]);

  const handleAccept = () => {
    if (isValid()) {
      onToggleModal();
      onAccept(cvv);
    }
  };

  return (
    <SimpleDialogPart
      open={open}
      fullWidth
      title={"Enhanced Security"}
      cancelBtnContent="Cancel"
      onCancel={onToggleModal}
      acceptBtnContent="Done"
      onAccept={handleAccept}
      onClose={onToggleModal}
    >
      <Paper className={classes.paper}>
        <Grid>
          <Grid item className={classes.gutter}>
            <Typography gutterBottom>
              Please re-enter the CVV for your card security. You can find this
              on the back of your card.
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <InputPart
                disabled
                label={"Card"}
                value={"******" + card.last4}
              />
            </Grid>
            <Grid item className={classes.cardIcon}>
              {cardIcon}
            </Grid>
          </Grid>
          <InputPart
            type={"number"}
            label={"CVV"}
            onChange={e => setCvv(e.target.value)}
            value={cvv}
          />
          <Grid container className={classes.gutter}>
            <Typography color="error">{cvvError}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </SimpleDialogPart>
  );
};

export default withRouter(withCustomStyles(AddCardCvvPart));
