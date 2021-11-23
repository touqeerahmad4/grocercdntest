import React from "react";
import withCustomStyles from "./DynamicHTMLHorizontalSectionPart.style";
import PropTypes from "prop-types";
import withRouter from "react-router/es/withRouter";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardRounded";
import LazyLoad from "react-lazyload";

class DynamicHTMLHorizontalSectionPart extends React.PureComponent {
  render() {
    const {
      props: { classes, name, dynamicHTML }
    } = this;

    return (
      <LazyLoad
        resize
        throttle={200}
        height="100%"
        style={{ width: "100%" }}
        once
        offset={200}
      >
        <Card className={classes.root}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.overflow}
          >
            <Grid item xs>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item className={classes.text}>
                  <Typography variant="h6">{name}</Typography>
                </Grid>
                <Grid item className={classes.arrow}>
                  <ArrowForwardRounded />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
                wrap="nowrap"
                className={classes.horizontalContainer}
              >
                <Typography variant="body2" component="div" gutterBottom>
                  <div dangerouslySetInnerHTML={{ __html: dynamicHTML }} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </LazyLoad>
    );
  }
}

DynamicHTMLHorizontalSectionPart.propTypes = {
  dynamicHTML: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default withRouter(withCustomStyles(DynamicHTMLHorizontalSectionPart));
