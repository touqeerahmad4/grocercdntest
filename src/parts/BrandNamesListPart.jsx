import React from "react";
import withCustomStyles from "./BrandNamesListPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gtmService from "../services/GTMService";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { getBrandPageUrl } from "../utils/UrlUtils";

const BrandNamesListPart = props => {
  const { brands, classes } = props;

  const handleClick = () => {
    gtmService.event("Navigation", "footer brands used");
  };

  return brands.map(brand => (
    <Grid item className={classes.section} key={brand.id}>
      <Typography variant="body2">
        <Link
          to={getBrandPageUrl(brand.slug)}
          color="inherit"
          onClick={handleClick}
          component={RouterLink}
          aria-label={brand.name}
          className={classes.noDecoration}
        >
          {brand.name} ({brand.products})
        </Link>
      </Typography>
    </Grid>
  ));
};

export default withRouter(withCustomStyles(BrandNamesListPart));
