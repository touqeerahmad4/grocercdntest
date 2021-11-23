import React from "react";
import withCustomStyles from "./BreadcrumbsPart.style";
import BreadcrumbsListPart from "./BreadcrumbsListPart";
import Paper from "@material-ui/core/Paper";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import withRouter from "react-router/es/withRouter";
// import LoadMorePart from "./LoadMorePart";
import BreadcrumbsListSchemaPart from "./BreadcrumbsListSchemaPart";

@inject(["categoriesStore"])
@observer
class BreadcrumbsPart extends React.Component {
  render() {
    const {
      props: { categoriesStore, cid, isSiteMap, isProductDetailPage, classes }
    } = this;

    const categoryName = categoriesStore.find(cid).name;
    return (
      <Paper className={classes.breadCrumbs}>
        {/* {categoriesStore.all.length === 0 && <LoadMorePart />} */}
        <BreadcrumbsListPart
          isSiteMap={isSiteMap}
          categories={categoriesStore.parents(cid)}
        />
        <Typography
          variant={isProductDetailPage ? "h6" : "h1"}
          className={classes.categoryName}
        >
          {categoryName}
        </Typography>
        <BreadcrumbsListSchemaPart categories={categoriesStore.parents(cid)} />
      </Paper>
    );
  }
}

BreadcrumbsPart.propTypes = {
  cid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withRouter(withCustomStyles(BreadcrumbsPart));
