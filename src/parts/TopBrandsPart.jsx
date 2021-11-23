import React from "react";
import Grid from "@material-ui/core/Grid";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { getBrandPageUrl, getImageWithBaseUrl } from "../utils/UrlUtils";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import Card from "@material-ui/core/Card";
import withCustomStyles from "./TopBrandsPart.style";
import { inject, observer } from "mobx-react";
import Skeleton from "react-loading-skeleton";
import loadingCarrot from "../assets/images/loading_carrot.png";

@inject(["allBrandsStore"])
@observer
class TopBrandsPart extends React.Component {
  render() {
    const { allBrandsStore, classes } = this.props;

    const brandDetail = brand => (
      <Grid
        key={brand.id}
        container
        direction="column"
        justify="center"
        className={classnames(classes.item, classes.noDecoration)}
        component={Link}
        to={getBrandPageUrl(brand.slug)}
      >
        <Grid
          item
          xs
          sm={12}
          className={classnames(classes.justifyCenter, classes.marginBottom1)}
        >
          <ImageWithLoaderPart
            width="60"
            height="60"
            src={getImageWithBaseUrl(brand.brand_slider_image)}
            alt={brand.name}
            loaderClass={classes.marginLeft1}
            className={classes.categoriesCardMedia}
          />
        </Grid>
        <Typography
          variant="body2"
          align="center"
          className={classes.brandTitle}
        >
          {brand.name}
        </Typography>
      </Grid>
    );

    const loadingPart = Array(3)
      .fill(null)
      .map((val, index) => (
        <Grid
          key={index}
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classnames(classes.item, classes.noDecoration)}
        >
          <Grid
            item
            xs
            sm={12}
            className={classnames(classes.justifyCenter, classes.marginBottom1)}
          >
            <ImageWithLoaderPart
              src={loadingCarrot}
              width="60"
              height="60"
              style={{ width: "auto" }}
              loaderClass={classes.marginLeft1}
              className={classes.categoriesCardMedia}
            />
          </Grid>
          <Skeleton style={{ marginTop: 10, width: 100 }} />
        </Grid>
      ));

    return (
      <Card className={classnames(classes.root)}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">Top Brands</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Paper className={classnames(classes.displayFlex, classes.padding1)}>
            {allBrandsStore.topBrands.slice(0, 3).map(brandDetail)}
            {allBrandsStore.topBrands.length === 0 && loadingPart}
          </Paper>
          <Paper className={classnames(classes.displayFlex, classes.padding1)}>
            {allBrandsStore.topBrands.slice(3, 6).map(brandDetail)}
            {allBrandsStore.topBrands.length === 0 && loadingPart}
          </Paper>
        </Grid>
      </Card>
    );
  }
}

export default withCustomStyles(TopBrandsPart);
