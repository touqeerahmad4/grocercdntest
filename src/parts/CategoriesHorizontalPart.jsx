// 3rd party
import React from "react";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import RootRef from "@material-ui/core/RootRef";
import ArrowBackRounded from "@material-ui/icons/ArrowBackIos";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardIos";
import loadingCarrot from "../assets/images/loading_carrot.png";
import Skeleton from "react-loading-skeleton";
import ImageWithLoaderPart from "./ImageWithLoaderPart";

// lib
import withCustomStyles from "./CategoriesHorizontalPart.style";
import CategoryHorizontalTilePart from "./CategoryHorizontalTilePart";

@inject(["categoriesStore"])
@observer
class CategoriesHorizontalPart extends React.Component {
  horizontalRef = React.createRef();

  handleArrowScroll = isScrollLeft => {
    if (this.horizontalRef && this.horizontalRef.current) {
      window.data = this.horizontalRef.current;
      this.horizontalRef.current.scrollTo({
        left: isScrollLeft
          ? this.horizontalRef.current.scrollLeft - 1000
          : this.horizontalRef.current.scrollLeft + 1000,
        behavior: "smooth"
      });
    }
  };

  render() {
    const {
      props: { classes, isBottom, sendEvent, categoriesStore },
      horizontalRef,
      handleArrowScroll
    } = this;

    const LoadingPart = () => {
      return (
        <>
          {Array(18)
            .fill(null)
            .map((val, index) => (
              <Grid
                key={index}
                container
                justify="center"
                direction="column"
                className={classnames(classes.item, classes.noDecoration)}
              >
                <Grid item xs sm={12} className={classes.justifyCenter}>
                  <ImageWithLoaderPart
                    src={loadingCarrot}
                    alt={"Category Loading"}
                    loaderClass={classes.marginLeft1}
                    className={classes.categoriesCardMedia}
                  />
                </Grid>
                <Skeleton height={20} width={110} />
              </Grid>
            ))}
        </>
      );
    };

    return (
      <Paper
        className={classnames(
          classes.root,
          classes.relativePosition,
          classes.scrollbarColor
        )}
      >
        <Button
          className={classnames(
            classes.leftFloatingBtn,
            classes.backgroundWhite
          )}
          variant="text"
          onClick={() => handleArrowScroll(true)}
        >
          <ArrowBackRounded />
        </Button>
        <RootRef rootRef={horizontalRef}>
          <Grid
            className={classes.horizontalContainer}
            container
            alignItems="center"
            wrap="nowrap"
          >
            {categoriesStore.all.length > 0 &&
              categoriesStore.all.map(category => (
                <CategoryHorizontalTilePart
                  key={category.id}
                  isBottom={isBottom}
                  sendEvent={sendEvent}
                  category={category}
                />
              ))}
            {categoriesStore.all.length === 0 &&
              categoriesStore.state === "fetching" && <LoadingPart />}
          </Grid>
        </RootRef>
        <Button
          className={classnames(
            classes.rightFloatingBtn,
            classes.backgroundWhite
          )}
          variant="text"
          onClick={() => handleArrowScroll(false)}
        >
          <ArrowForwardRounded />
        </Button>
      </Paper>
    );
  }
}

export default withCustomStyles(CategoriesHorizontalPart);
