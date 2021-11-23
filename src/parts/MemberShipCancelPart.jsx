import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const MemberShipCancelPart = ({ classes, onCancel }) => {
  return useMemo(
    () => (
      <Paper>
        <Typography align="center" className={classes.marginBottom2}>
          If you are not satisfied with the membership program, you can cancel
          it.
        </Typography>
        <Grid container justify="center" className={classes.marginBottom2}>
          <Button align="center" variant="contained" onClick={() => onCancel()}>
            CANCEL MEMBERSHIP
          </Button>
        </Grid>
        <Typography align="center" gutterBottom>
          *Some charges may apply.
        </Typography>
      </Paper>
    ),
    []
  );
};

export default MemberShipCancelPart;
