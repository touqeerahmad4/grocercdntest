import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./NotFoundPart.style";
import { withRouter } from "react-router";
import LoadMorePart from "./LoadMorePart";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ProductsListPart from "./ProductsListPart";
import Grid from "@material-ui/core/Grid";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

@inject(["topSellingStore"])
@observer
class NotFoundPart extends Component {
  componentDidMount() {
    const { topSellingStore } = this.props;
    topSellingStore.fetch();
  }

  componentWillUnmount() {
    this.props.topSellingStore.cancel();
  }

  render() {
    const { classes, topSellingStore, showText } = this.props;

    return (
      <>
        <Helmet>
          <meta name="prerender-status-code" content="404" />
        </Helmet>
        {showText && (
          <Paper>
            <Typography variant={"h6"}>
              <CancelPresentationOutlinedIcon className={classes.icon} /> This
              page could not be found
            </Typography>
            <Divider />
            <Typography variant={"body1"}>
              You might want to look at the most popular products.
            </Typography>
          </Paper>
        )}
        {topSellingStore.all.length === 0 &&
          topSellingStore.state === "fetching" && <LoadMorePart />}
        {topSellingStore.all.length > 0 && (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <ProductsListPart
              listName={"Not Found - Most popular"}
              products={topSellingStore.all}
            />
          </Grid>
        )}
      </>
    );
  }
}

NotFoundPart.propTypes = {
  showText: PropTypes.bool
};

NotFoundPart.defaultProps = {
  showText: true
};

export default withRouter(withCustomStyles(NotFoundPart));
