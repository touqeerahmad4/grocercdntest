import React from "react";
import withCustomStyles from "./VerticalProductsListPart.style";
import withRouter from "react-router/es/withRouter";
import Grid from "@material-ui/core/Grid";

const VerticalProductsListPart = props => {
  const { products, classes, tile } = props;

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      {products.map(product => (
        <Grid item className={classes.item} xs={12} key={product.id}>
          {React.cloneElement(tile, {
            product
          })}
        </Grid>
      ))}
    </Grid>
  );
};

export default withRouter(withCustomStyles(VerticalProductsListPart));
