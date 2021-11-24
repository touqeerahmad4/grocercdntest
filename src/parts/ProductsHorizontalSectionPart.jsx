import React from "react";
import withCustomStyles from "./ProductsHorizontalSectionPart.style";
import PropTypes from "prop-types";
import withRouter from "react-router/es/withRouter";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardIos";
import ArrowBackRounded from "@material-ui/icons/ArrowBackIos";
import HorizontalProductsListPart from "./HorizontalProductsListPart";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import LoadMorePart from "./LoadMorePart";
import classnames from "classnames";
import { inject, observer } from "mobx-react";

@inject(["customerStore"])
@observer
class ProductsHorizontalSectionPart extends React.Component {
  horizontalRef = React.createRef();

  componentDidMount() {
    if (typeof this.props.fetch === "function") {
      this.props.fetch();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { prid }
      },
      customerStore
    } = this.props;
    if (
      (prid &&
        prevProps.match.params.prid &&
        prid !== prevProps.match.params.prid) ||
      customerStore.vendorId !== prevProps.customerStore.vendorId
    ) {
      this.props.cancel();
      this.props.fetch();
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.name !== this.props.name ||
      nextProps.CTListName !== this.props.CTListName ||
      nextProps.match.params.prid !== this.props.match.params.prid ||
      JSON.stringify(nextProps.products) !==
        JSON.stringify(this.props.products) ||
      nextProps.state !== this.props.state ||
      nextProps.customerStore.vendorId !== this.props.customerStore.vendorId
    );
  }

  componentWillUnmount() {
    if (typeof this.props.cancel === "function") {
      this.props.cancel();
    }
  }

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
      props: { classes, name, state, products, onScroll, listName, CTListName },
      handleArrowScroll
    } = this;

    return (
      <Card
        className={classnames(
          classes.root
          // { [classes.minHeight]: state === "fetching" },
          // {
          //   [classes.displayNone]: state !== "fetching" && products.length <= 0
          // }
        )}
      >
        {/* {products.length === 0 && state === "fetching" && <LoadMorePart />} */}
        {/* {products.length > 0 && ( */}
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">{name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs item>
            <Grid
              className={classnames(
                classes.relativePosition,
                classes.scrollbarColor
              )}
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
              wrap="nowrap"
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
              <HorizontalProductsListPart
                horizontalRef={this.horizontalRef}
                onScroll={onScroll}
                onArrowScroll={handleArrowScroll}
                state={state}
                listName={listName}
                CTListName={CTListName}
                products={products}
              />
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
            </Grid>
          </Grid>
        </Grid>
        {/* )} */}
      </Card>
    );
  }
}

ProductsHorizontalSectionPart.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  listName: PropTypes.string,
  CTListName: PropTypes.string
};

export default withRouter(withCustomStyles(ProductsHorizontalSectionPart));
