import React, { Component } from "react";
import withCustomStyles from "./ProductsListPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";
import ProductTilePart from "./ProductTilePart";
import { inject, observer } from "mobx-react";

@inject(["uiStore"])
@observer
class ProductsListPart extends Component {
  render() {
    const {
      products,
      classes,
      algolia,
      listName,
      CTListName,
      query,
      uiStore
    } = this.props;

    const getStandardProduct = product => {
      if (!product) return {};
      return {
        ...product,
        id: product.product_id,
        image: product.image_v2
      };
    };

    return products.map(product => (
      <Grid
        item
        xs={uiStore.extraSmall() ? 12 : 6}
        sm={4}
        className={classes.tileItem}
        key={product.id}
      >
        <ProductTilePart
          product={algolia ? getStandardProduct(product) : product}
          listName={listName}
          query={query}
          CTListName={CTListName}
        />
      </Grid>
    ));
  }
}

export default withRouter(withCustomStyles(ProductsListPart));
