import React from "react";
import Grid from "@material-ui/core/Grid";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getProductsPageUrl } from "../utils/UrlUtils";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import Typography from "@material-ui/core/Typography";
import withCustomStyles from "./YoungPeopleBuyPart.style";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import loadingCarrot from "../assets/images/loading_carrot.png";
import Skeleton from "react-loading-skeleton";

class YoungPeopleBuyPart extends React.Component {
  render() {
    const {
      props: { classes, categories, fetchState }
    } = this;

    const LoadingPart = () => {
      return Array(4)
        .fill(null)
        .map((val, index) => (
          <Grid
            key={index}
            container
            justify="center"
            alignItems="center"
            className={classnames(classes.item, classes.noDecoration)}
          >
            <Grid item xs sm={12} className={classes.justifyCenter}>
              <ImageWithLoaderPart
                src={loadingCarrot}
                width="60"
                height="60"
                style={{ width: "auto" }}
                loaderClass={classes.marginLeft1}
                className={classes.categoriesCardMedia}
              />
            </Grid>
            <Skeleton style={{ marginTop: 10, width: 100 }} />
          </Grid>
        ));
    };

    return (
      <Card className={classnames(classes.root)}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          className={classes.scrollbarColor}
        >
          <Grid item xs>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">Young People buy</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Paper
            className={classnames(
              classes.displayFlex,
              classes.horizontalContainer
            )}
          >
            {categories.length > 0 &&
              categories.map(
                category =>
                  category && (
                    <Grid
                      key={category.id}
                      container
                      justify="center"
                      className={classnames(classes.item, classes.noDecoration)}
                      component={Link}
                      to={getProductsPageUrl(category)}
                    >
                      <Grid item xs sm={12} className={classes.justifyCenter}>
                        <ImageWithLoaderPart
                          width="80"
                          height="60"
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
                  )
              )}
            {fetchState === "fetching" && categories.length === 0 && (
              <LoadingPart />
            )}
          </Paper>
        </Grid>
      </Card>
    );
  }
}

export default withCustomStyles(YoungPeopleBuyPart);
