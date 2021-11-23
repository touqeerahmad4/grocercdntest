import React from "react";
import withCustomStyles from "./SubCategoriesGridPart.style";
import { Link } from "react-router-dom";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  getProductsPageUrl,
  getSiteMapProductsPageUrl
} from "../utils/UrlUtils";
import Card from "@material-ui/core/Card";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import CardContent from "@material-ui/core/CardContent";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";

const SubCategoriesGridPart = props => {
  const { subcats, classes, isSiteMap } = props;

  const subCategoryComp = (
    <Grid container direction="row" justify="flex-start" alignItems="stretch">
      {subcats.map(subcat => (
        <Grid
          item
          key={subcat.id}
          component={Link}
          to={
            isSiteMap
              ? getSiteMapProductsPageUrl(subcat)
              : getProductsPageUrl(subcat)
          }
          className={classes.noDecoration}
          sm={3}
          xs={4}
        >
          <Card className={classes.subCategoryCard}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs sm={12}>
                <ImageWithLoaderPart
                  width="80"
                  height="60"
                  src={subcat.image}
                  alt={subcat.name}
                  loaderClass={classes.marginLeft1}
                  className={classes.subCategoriesCardMedia}
                />
              </Grid>
              <Grid item xs sm={8}>
                <CardContent>
                  <Typography variant="body2" align="center">
                    {subcat.name}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return lazyLoadComponentInViewPort(subCategoryComp, {
    once: true,
    resize: true,
    height: 200,
    offset: 400,
    style: { width: "100%" }
  });
};

export default withRouter(withCustomStyles(SubCategoriesGridPart));
