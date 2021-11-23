import React from "react";
import withCustomStyles from "./BrandNamesTextLinksPart.style";
import withRouter from "react-router/es/withRouter";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { getBrandPageUrl } from "../utils/UrlUtils";

const BrandNamesTextLinksPart = props => {
  const { classes, brands } = props;

  return (
    <Typography variant="body2" className={classes.unit}>
      Made by{" "}
      {brands.map((brand, index, arr) => {
        if (index === arr.length - 1) {
          return (
            <Link
              component={RouterLink}
              key={brand.id}
              to={getBrandPageUrl(brand.slug)}
            >
              {brand.name}
            </Link>
          );
        }
        return (
          <Link
            key={brand.id}
            component={RouterLink}
            to={getBrandPageUrl(brand.slug)}
          >
            {brand.name},{" "}
          </Link>
        );
      })}
    </Typography>
  );
};

export default withRouter(withCustomStyles(BrandNamesTextLinksPart));
