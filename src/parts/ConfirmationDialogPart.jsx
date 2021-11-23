import React, { Component } from "react";
import withCustomStyles from "./ConfirmationDialogPart.style";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class ConfirmationDialogPart extends Component {
  state = {
    isHidden: true
  };
  timer;

  componentDidMount() {
    const wait = this.props.wait;
    if (!wait || wait === 0) {
      this.show();
      return;
    }
    this.timer = setTimeout(() => this.show(), wait);
  }

  show() {
    this.setState({
      isHidden: false
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      props: {
        classes,
        title,
        handleClose,
        handleYes,
        handleNo,
        content,
        open,
        yesText,
        noText
      },
      state: { isHidden }
    } = this;

    const mainDialog = (
      <Dialog
        aria-labelledby={title}
        classes={{
          paper: classes.paper
        }}
        onClose={handleClose}
        open={open}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6" align="center" className={classes.heading}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className={classes.content}
          >
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item className={classes.noButton}>
              <Button
                variant="outlined"
                className={classes.midButton}
                color="primary"
                onClick={handleNo}
              >
                {noText}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={classes.midButton}
                color="primary"
                onClick={handleYes}
              >
                {yesText}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
    return isHidden ? null : mainDialog;
  }
}

export default withMobileDialog()(withCustomStyles(ConfirmationDialogPart));
