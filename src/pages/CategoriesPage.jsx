import React from "react";
import CategoriesPart from "../parts/CategoriesPart";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withCustomStyles from "./CategoriesPage.style";
import SEOInfoPart from "../parts/SEOInfoPart";

export const CategoriesPage = ({ classes }) => (
  <div>
    <Paper>
      <SEOInfoPart />
      <Typography variant="h1" className={classes.categoryPageTitle}>
        Categories
      </Typography>
    </Paper>
    <CategoriesPart />
  </div>
);

export default withCustomStyles(CategoriesPage);
