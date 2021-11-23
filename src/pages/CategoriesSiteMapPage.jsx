import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withCustomStyles from "./CategoriesSiteMapPage.style";
import SEOInfoPart from "../parts/SEOInfoPart";
import { inject, observer } from "mobx-react";
import LoadMorePart from "../parts/LoadMorePart";
import Grid from "@material-ui/core/Grid";
import CategoryNamesListPart from "../parts/CategoryNamesListPart";

@inject(["categoriesStore"])
@inject(["customerStore"])
@observer
class CategoriesSiteMapPage extends React.Component {
  render() {
    const { classes, categoriesStore, customerStore } = this.props;
    const shouldLoadMainSite = !!customerStore.vendor.id;
    return (
      <div>
        <Paper>
          <SEOInfoPart />
          <Grid item>
            <Typography variant="h1" className={classes.tagLine}>
              Sitemap - Categories
            </Typography>
            {(!shouldLoadMainSite ||
              (categoriesStore.all.length === 0 &&
                categoriesStore.state === "fetching")) && <LoadMorePart />}
            {shouldLoadMainSite && categoriesStore.all.length !== 0 && (
              <Grid
                container
                direction="column"
                wrap={"wrap"}
                spacing={8}
                className={classes.categoriesContainer}
              >
                <CategoryNamesListPart
                  isSiteMap
                  categories={categoriesStore.all}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withCustomStyles(CategoriesSiteMapPage);
