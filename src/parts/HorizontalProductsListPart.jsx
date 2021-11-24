import React from "react";
import classnames from "classnames";
import withCustomStyles from "./HorizontalProductsListPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import ProductTilePart from "./ProductTilePart";
import { FixedSizeList as List } from "react-window";
import { handleHorizontalScroll, isHeadless } from "../utils/AppUtils";
import RootRef from "@material-ui/core/RootRef";
// import LoadMorePart from "./LoadMorePart";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import loadingCarrot from "../assets/images/loading_carrot.png";
import Card from "@material-ui/core/Card";
import Skeleton from "react-loading-skeleton";

class HorizontalProductsListPart extends React.PureComponent {
  componentDidMount() {
    if (this.props.onScroll) {
      this.scrollListener = handleHorizontalScroll.bind(
        this,
        this.props.horizontalRef.current,
        this.props.onScroll
      );

      this.props.horizontalRef.current.addEventListener(
        "scroll",
        this.scrollListener
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: {
        horizontalRef,
        match: {
          params: { prid }
        }
      }
    } = this;
    if (
      prid !== prevProps.match.params.prid &&
      horizontalRef &&
      horizontalRef.current &&
      horizontalRef.current.scrollLeft > 0
    ) {
      horizontalRef.current.scrollLeft = 0;
    }
  }

  componentWillUnmount() {
    this.props.horizontalRef.current.removeEventListener("scroll");
  }

  render() {
    const {
      products,
      state,
      classes,
      listName,
      CTListName,
      horizontalRef
    } = this.props;

    const LoadingPart = () => {
      return (
        <Card
          className={classnames(classes.card, classes.loadingSkeleton, {
            [classes.fillHeight]: !isHeadless()
          })}
        >
          <ImageWithLoaderPart
            alt="loading Image"
            src={loadingCarrot}
            loaderClass={classes.marginLeft1}
          />
          <Skeleton
            height={20}
            width="100%"
            className={classes.marginSkeleton}
          />
          <Skeleton height={20} width={90} />
          <div style={{ marginTop: "auto" }}>
            <Skeleton
              height={20}
              width={70}
              className={classes.marginSkeleton}
            />
            <Skeleton height={42} width="100%" />
          </div>
        </Card>
      );
    };

    return (
      <RootRef rootRef={horizontalRef}>
        <List
          height={408}
          width={isHeadless() ? 1351 : 1025}
          layout="horizontal"
          itemSize={200}
          itemCount={products.length || 7}
          itemData={products}
        >
          {({ index, style, data: products }) => (
            <Grid
              item
              className={classnames(classes.item)}
              xs={12}
              style={style}
              key={products[index] ? products[index].id : index}
            >
              {products.length > 0 && (
                <ProductTilePart
                  product={products[index]}
                  nameCharLimit={32}
                  listName={listName}
                  CTListName={CTListName}
                  isHorizontal
                />
              )}
              {products.length === 0 && state === "fetching" && <LoadingPart />}
              {/* {index === products.length - 1 && state === "fetching" && (
                <LoadMorePart className={classes.center} />
              )} */}
            </Grid>
          )}
        </List>
      </RootRef>
    );
  }
}

export default withRouter(withCustomStyles(HorizontalProductsListPart));
