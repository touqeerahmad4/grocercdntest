import React from "react";
import withCustomStyles from "./CategoryNamesListPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gtmService from "../services/GTMService";
import {
  getProductsPageUrl,
  getSiteMapProductsPageUrl
} from "../utils/UrlUtils";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const CategoryNamesListPart = props => {
  const { categories, classes, isSiteMap } = props;

  const handleCategoryClick = () => {
    gtmService.event("Navigation", "footer categories used");
  };

  return categories.map(category => (
    <Grid item className={classes.catSection} key={category.id}>
      <Typography variant="body2">
        <Link
          to={
            isSiteMap
              ? getSiteMapProductsPageUrl(category)
              : getProductsPageUrl(category)
          }
          color="inherit"
          onClick={handleCategoryClick}
          component={RouterLink}
          aria-label={category.name}
          className={classes.noDecoration}
        >
          <b>{category.name}</b>
        </Link>
      </Typography>
      {category.subcat.map(subcat => (
        <Grid item className={classes.catSection} key={subcat.id}>
          <Typography variant="body2">
            <Link
              to={
                isSiteMap
                  ? getSiteMapProductsPageUrl(category)
                  : getProductsPageUrl(subcat)
              }
              color="inherit"
              onClick={handleCategoryClick}
              component={RouterLink}
              aria-label={subcat.name}
              className={classes.noDecoration}
            >
              - {subcat.name}
            </Link>
          </Typography>
        </Grid>
      ))}
    </Grid>
  ));
};

export default withRouter(withCustomStyles(CategoryNamesListPart));
