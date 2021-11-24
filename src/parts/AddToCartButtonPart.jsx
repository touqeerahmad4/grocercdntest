import React, { Component } from "react";
import withCustomStyles from "./AddToCartButtonPart.style";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AddRounded from "@material-ui/icons/AddRounded";
import RemoveRounded from "@material-ui/icons/RemoveRounded";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import { maxPurchaseLimitReached } from "../utils/ProductUtils";
import Tooltip from "@material-ui/core/Tooltip";
import withRouter from "react-router/es/withRouter";

@inject(["orderStore"])
@inject(["customerStore"])
@observer
class AddToCartButtonPart extends Component {
  componentWillUnmount() {
    this.props.orderStore.cancel();
  }

  addOne = () => {
    const {
      props: { orderStore, listName, query, CTListName },
      getProduct
    } = this;
    orderStore.addOne(getProduct(), listName, CTListName, query);
  };

  removeOne = () => {
    const {
      props: { orderStore, listName, CTListName },
      getProduct
    } = this;

    orderStore.removeOne(getProduct(), listName, CTListName);
  };

  getProduct = () => {
    const { product, orderStore } = this.props;
    const orderStoreProduct = orderStore.all.get(product.id);
    if (
      orderStoreProduct &&
      orderStoreProduct.id &&
      product.order_quantity !== orderStoreProduct.order_quantity
    ) {
      return { ...product, order_quantity: orderStoreProduct.order_quantity };
    }
    return { ...product };
  };

  componentDidMount() {
    const { orderStore } = this.props;
    const clonedProduct = this.getProduct();
    if (maxPurchaseLimitReached(clonedProduct)) {
      clonedProduct.order_quantity = clonedProduct.max_purchase_limit;
      orderStore.all.set(clonedProduct.id, clonedProduct);
    }
  }

  render() {
    const {
      props: {
        classes,
        className,
        orderStore,
        product,
        fixedWidthAddRemove,
        small
      },
      getProduct
    } = this;

    const large = (
      <Button
        variant="contained"
        className={classes.largeButton}
        color="primary"
        onClick={this.addOne}
      >
        Add to cart
      </Button>
    );

    const addButton = (
      <IconButton
        color="primary"
        className={classnames({
          [classes.smallIconButton]: small,
          [classes.largeIconButton]: !small,
          [classes.iconButtonDisabled]: maxPurchaseLimitReached(getProduct()),
          [classes.iconButton]: !maxPurchaseLimitReached(getProduct())
        })}
      >
        <AddRounded
          className={classnames({
            [classes.iconDisabled]: maxPurchaseLimitReached(getProduct()),
            [classes.icon]: !maxPurchaseLimitReached(getProduct())
          })}
        />
      </IconButton>
    );

    const smalls = (
      <Grid
        container
        direction="row"
        justify={fixedWidthAddRemove ? "flex-start" : "space-between"}
        alignItems="center"
        className={classnames({
          [classes.marginBottom1]: !small
        })}
      >
        <Grid item onClick={this.removeOne}>
          <IconButton
            color="primary"
            className={classnames(
              {
                [classes.smallIconButton]: small,
                [classes.largeIconButton]: !small
              },
              classes.iconButton
            )}
          >
            <RemoveRounded className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid
          item
          className={classnames(
            {
              [classes.fixedWidthQuantity]: fixedWidthAddRemove
            },
            classes.quantity
          )}
        >
          <Typography variant="subtitle2">
            {orderStore.getQuantity(product)}
          </Typography>
        </Grid>
        <Grid aria-disabled onClick={this.addOne} item>
          {maxPurchaseLimitReached(getProduct()) && (
            <Tooltip enterTouchDelay={0} title="Limited products">
              {addButton}
            </Tooltip>
          )}
          {!maxPurchaseLimitReached(getProduct()) && addButton}
        </Grid>
      </Grid>
    );

    return (
      <div className={classnames(classes.root, className || "")}>
        {orderStore.all.has(product.id) ? smalls : large}
      </div>
    );
  }
}

AddToCartButtonPart.propTypes = {
  product: PropTypes.object.isRequired,
  listName: PropTypes.string,
  CTListName: PropTypes.string,
  query: PropTypes.string
};

export default withRouter(withCustomStyles(AddToCartButtonPart));
