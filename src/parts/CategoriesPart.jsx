import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./CategoriesPart.style";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import LoadMorePart from "./LoadMorePart";
import CategoriesGridPart from "./CategoriesGridPart";

@inject(["categoriesStore"])
@observer
class CategoriesPart extends Component {
  render() {
    const { classes, categoriesStore, isSiteMap } = this.props;

    return (
      <div className={classes.root}>
        {categoriesStore.all.length === 0 &&
          categoriesStore.state === "fetching" && <LoadMorePart />}
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <CategoriesGridPart
            isSiteMap={isSiteMap}
            categories={categoriesStore.all}
          />
        </Grid>
      </div>
    );
  }
}

export default withRouter(withCustomStyles(CategoriesPart));
