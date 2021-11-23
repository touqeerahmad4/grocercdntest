import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// lib
import withCustomStyles from "./CategoryHorizontalTilePart.style";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import { getProductsPageUrl } from "../utils/UrlUtils";
import gtmService from "../services/GTMService";

class CategoryHorizontalTilePart extends React.Component {
  handleEventClick = () => {
    if (!this.props.sendEvent) return;
    gtmService.event(
      "Navigation",
      "Top Level Categories Banner on Detail Page",
      this.props.isBottom ? "bottom" : "top"
    );
  };
  render() {
    const {
      props: { classes, category },
      handleEventClick
    } = this;

    return (
      <Grid
        container
        justify="center"
        direction="column"
        className={classnames(classes.item, classes.noDecoration)}
        component={Link}
        to={getProductsPageUrl(category)}
        onClick={handleEventClick}
      >
        <Grid item xs sm={12} className={classes.justifyCenter}>
          <ImageWithLoaderPart
            width="100"
            height="100"
            src={category.image}
            alt={category.name}
            loaderClass={classes.marginLeft1}
            className={classes.categoriesCardMedia}
          />
        </Grid>
        <Typography variant="body2" align="center">
          {category.name}
        </Typography>
      </Grid>
    );
  }
}

export default withCustomStyles(CategoryHorizontalTilePart);
