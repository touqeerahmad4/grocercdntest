import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./ProductLoadingPart.style";
import Grid from "@material-ui/core/Grid";
import withRouter from "react-router/es/withRouter";
import Card from "@material-ui/core/Card";
import { isHeadless } from "../utils/AppUtils";
import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import loadingCarrot from "../assets/images/loading_carrot.png";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";

@inject(["uiStore"])
@observer
class ProductLoadingPart extends Component {
  render() {
    const {
      props: { classes, uiStore }
    } = this;

    const LoadingPart = () => {
      return Array(12)
        .fill(null)
        .map((val, index) => (
          <Grid
            item
            key={index}
            xs={uiStore.extraSmall() ? 12 : 6}
            sm={4}
            className={classes.tileItem}
          >
            <Card
              className={classNames(classes.card, classes.loadingSkeleton, {
                [classes.fillHeight]: !isHeadless()
              })}
            >
              <ImageWithLoaderPart
                alt="loading Image"
                src={loadingCarrot}
                loaderClass={classes.marginLeft1}
                className={classes.skeletonImg}
              />
              <Skeleton
                height={20}
                width="100%"
                className={classes.marginSkeleton}
              />
              <div style={{ marginTop: "auto" }}>
                <Skeleton
                  height={20}
                  width={70}
                  className={classes.marginSkeleton}
                />
                <Skeleton height={42} width="100%" />
              </div>
            </Card>
          </Grid>
        ));
    };

    return <LoadingPart />;
  }
}

export default withRouter(withCustomStyles(ProductLoadingPart));
