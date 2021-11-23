import React from "react";
import withCustomStyles from "./EmptyAreaPart.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EmptyAreaPart extends React.Component {
  render() {
    const {
      props: { classes, icon, title, content, buttonText, onButtonClick }
    } = this;

    return (
      <Paper>
        <Grid
          container
          className={classes.minHeightPage}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item className={classes.marginBottom1}>
            {React.cloneElement(icon, {
              className: classes.largeIcon
            })}
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h1"
                  align={"center"}
                  className={classes.emptyAreaTitle}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align={"center"}>
                  {content}
                </Typography>
              </Grid>
              {buttonText && onButtonClick && (
                <Grid item className={classes.marginTop2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onButtonClick}
                  >
                    {buttonText}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withRouter(withCustomStyles(EmptyAreaPart));
