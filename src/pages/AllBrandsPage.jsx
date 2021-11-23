import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./AllBrandsPage.style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import SEOInfoPart from "../parts/SEOInfoPart";
import { getAllBrandsPageAbsUrl } from "../utils/UrlUtils";
import NotFoundPart from "../parts/NotFoundPart";
import BrandNamesListPart from "../parts/BrandNamesListPart";
import { UANNUMBER } from "../utils/AppUtils";

@inject(["allBrandsStore"])
@observer
class AllBrandsPage extends Component {
  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    this.props.allBrandsStore.fetch();
  }

  cancelAll() {
    this.props.allBrandsStore.cancel();
  }

  componentWillUnmount() {
    this.cancelAll();
  }

  render() {
    const {
      props: { classes, allBrandsStore }
    } = this;
    return (
      <>
        {allBrandsStore.isFailed && <NotFoundPart />}
        {!allBrandsStore.isFailed && (
          <Paper>
            <SEOInfoPart
              title={"Brand stores at GrocerApp"}
              description={
                "Find products of unilever, nestle, national, prema, olpers, reckitt and many more brands"
              }
              url={getAllBrandsPageAbsUrl()}
            />
            <Typography variant="h6">Brand stores at GrocerApp</Typography>
            <Typography variant="body2">
              Want your brand store? Please contact at info@grocerapps.com or
              call {UANNUMBER}
            </Typography>
            {allBrandsStore.all.length === 0 &&
              allBrandsStore.state === "fetching" && <LoadMorePart />}
            <Grid container className={classes.brandsContainer}>
              <BrandNamesListPart brands={allBrandsStore.all} />
            </Grid>
          </Paper>
        )}
      </>
    );
  }
}

export default withRouter(withCustomStyles(AllBrandsPage));
