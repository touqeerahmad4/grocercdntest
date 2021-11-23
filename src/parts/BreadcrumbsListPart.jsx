import React from "react";
import withCustomStyles from "./BreadcrumbsListPart.style";
import withRouter from "react-router/es/withRouter";
import gtmService from "../services/GTMService";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import {
  getProductsPageUrl,
  getSiteMapProductsPageUrl
} from "../utils/UrlUtils";
import Typography from "@material-ui/core/Typography";

const BreadcrumbsListPart = props => {
  const {
    categories,
    classes,
    isSiteMap,
    location: { pathname }
  } = props;

  const handleCategoryClick = () => {
    gtmService.event("Navigation", "breadcrumbs used", pathname);
  };

  const getUrl = category => {
    return isSiteMap
      ? getSiteMapProductsPageUrl(category)
      : getProductsPageUrl(category);
  };

  return (
    <Breadcrumbs separator="›" arial-label="Breadcrumb">
      <Link color="inherit" component={RouterLink} to="/">
        Home
      </Link>
      {categories.map(category =>
        getUrl(category) !== pathname ? (
          <Link
            color="inherit"
            key={category.id}
            component={RouterLink}
            to={getUrl(category)}
            className={classes.link}
            onClick={handleCategoryClick}
          >
            {category.name}
          </Link>
        ) : (
          <Typography>{category.name}</Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default withRouter(withCustomStyles(BreadcrumbsListPart));
