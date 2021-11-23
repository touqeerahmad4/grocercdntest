import React, { Component, lazy, Suspense } from "react";
import withCustomStyles from "./CategoriesGridPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import * as classnames from "classnames";
// import LoadMorePart from "./LoadMorePart";
import { forceCheck } from "react-lazyload";
import componentLoader from "../utils/ComponentLoader";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";
import loadingCarrot from "../assets/images/loading_carrot.png";
import Skeleton from "react-loading-skeleton";
import ImageWithLoaderPart from "./ImageWithLoaderPart";

const SubCategoriesGridPart = lazy(() =>
  componentLoader(import("./SubCategoriesGridPart"))
);

class CategoriesGridPart extends Component {
  state = {
    expanded: {}
  };

  handleExpandClick = id => {
    this.setState(state => ({
      expanded: {
        [id]: !state.expanded[id]
      }
    }));
  };

  componentDidMount() {
    forceCheck();
  }

  render() {
    const { classes, categories, isSiteMap } = this.props;

    const mainCategoryRow = category => (
      <Grid
        container
        direction="row"
        onClick={this.handleExpandClick.bind(this, category.id)}
        justify="space-between"
        className={classes.mainCategoryRow}
        alignItems="center"
      >
        <Grid item xs={12} className={classes.mainCategoryText}>
          <CardContent>
            <Typography variant="h6">{category.name}</Typography>
            <Typography variant="body2">{category.desc}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    );

    const LoadingPart = () => {
      return (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          {Array(4)
            .fill(null)
            .map((val, index) => (
              <Grid
                item
                key={index}
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
                        src={loadingCarrot}
                        alt="Loading"
                        loaderClass={classes.marginLeft1}
                        className={classes.subCategoriesCardMedia}
                      />
                    </Grid>
                    <Grid item xs sm={8}>
                      <CardContent>
                        <Skeleton height={20} width={100} />
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      );
    };

    const subCategoriesGrid = category => (
      <Suspense fallback={<LoadingPart />}>
        <SubCategoriesGridPart
          isSiteMap={isSiteMap}
          subcats={category.subcat}
        />
      </Suspense>
    );

    const categoryGrid = category => (
      <Grid
        item
        xs={12}
        sm={12}
        className={classes.productItem}
        key={category.id}
      >
        <Card className={classnames(classes.categoryCard)}>
          {mainCategoryRow(category)}
          <Collapse in timeout="auto" unmountOnExit>
            <Paper>{subCategoriesGrid(category)}</Paper>
          </Collapse>
        </Card>
      </Grid>
    );

    return categories.map(category =>
      lazyLoadComponentInViewPort(categoryGrid(category), {
        resize: true,
        scroll: true,
        overflow: true,
        once: true,
        offset: 400,
        key: category.id,
        style: {
          width: "100%"
        }
      })
    );
  }
}

export default withRouter(withCustomStyles(CategoriesGridPart));
