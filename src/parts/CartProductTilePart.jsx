import React from "react";
import withCustomStyles from "./FoundCartProductTilePart.style";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TypographyPart from "../parts/TypographyPart";
import * as classnames from "classnames";
import withRouter from "react-router/es/withRouter";
import LoadMorePart from "./LoadMorePart";
import { inject, observer } from "mobx-react";
import { getImage, getSearchPageUrl } from "../utils/UrlUtils";
import {
  dealPrice,
  isDeal,
  productActivePrice,
  productName,
  trimStr,
  productPrice
} from "../utils/ProductUtils";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import AddToCartButtonPart from "./AddToCartButtonPart";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { Link } from "react-router-dom";

@inject(["orderStore"])
@observer
class CartProductTilePart extends React.Component {
  removeProduct = () => {
    const {
      props: { product, orderStore }
    } = this;

    orderStore.remove(product, "Cart Page");
  };

  removeNotFoundProduct = () => {
    const {
      props: { product, orderStore }
    } = this;

    orderStore.removeNotFound(product, "Cart Page");
  };

  render() {
    const {
      props: { classes, product, nameCharLimit, variant }
    } = this;

    const getPrice = product => {
      if (isDeal(product)) {
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.textLineHeight}
          >
            <Grid item>
              <Typography variant="subtitle2">
                Rs. {dealPrice(product)}
              </Typography>
            </Grid>
            <Grid item className={classes.marginLeft1}>
              <Typography
                variant="caption"
                className={classnames(classes.nonDealPrice)}
              >
                Rs. {productPrice(product)}
              </Typography>
            </Grid>
          </Grid>
        );
      }
      return (
        <Typography variant="subtitle2">Rs. {productPrice(product)}</Typography>
      );
    };

    return (
      <Card className={classes.card}>
        {!product.name && <LoadMorePart />}
        {product.name && (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid
              item
              className={classnames(classes.cardMediaItem)}
              sm={2}
              xs={2}
            >
              <ImageWithLoaderPart
                width="60"
                height="60"
                alt={product.name}
                src={getImage(product)}
                loaderClass={classes.marginLeft1}
                className={classnames(classes.cardMedia)}
              />
            </Grid>
            <Grid item xs>
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="stretch"
              >
                {variant === "not-found" && (
                  <Grid item>
                    <Typography variant="body1" color={"error"}>
                      Item not available
                    </Typography>
                  </Grid>
                )}
                {isDeal(product) && variant === "found" && (
                  <Grid item>
                    <TypographyPart
                      variant="smallBoldBlack"
                      className={classnames({
                        [classes.dealFlash]: isDeal(product)
                      })}
                    >
                      {product.deal_title || "DEFAULT"}
                    </TypographyPart>
                  </Grid>
                )}
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item xs>
                      <Typography variant="body1">
                        {productName(product.name, nameCharLimit)}
                      </Typography>
                    </Grid>
                    {variant === "found" && (
                      <Grid item xs={1} className={classes.removeItem}>
                        <IconButton onClick={this.removeProduct}>
                          <CloseRounded className={classes.removeIcon} />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid className={classnames(classes.gutterBottom1)} item>
                  <Typography variant="caption">{product.unit}</Typography>
                </Grid>
                {variant === "not-found" && (
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item onClick={this.removeNotFoundProduct}>
                        <Typography variant={"subtitle2"} color={"primary"}>
                          Remove
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        component={Link}
                        className={classes.noDecoration}
                        to={getSearchPageUrl(trimStr(product.name, 13))}
                      >
                        <Typography variant={"subtitle2"} color={"primary"}>
                          Find Similar Items
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {variant === "found" && (
                  <React.Fragment>
                    <Grid className={classnames(classes.gutterBottom1)} item>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="baseline"
                      >
                        <Grid
                          item
                          className={classnames(classes.displayInline)}
                        >
                          {getPrice(product)}
                          <Typography
                            className={classnames(classes.multiply)}
                            variant={"caption"}
                          >
                            &#215;
                          </Typography>
                          <Typography variant={"subtitle2"}>
                            {product.order_quantity}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                      >
                        <Grid item>
                          <Typography variant={"subtitle2"}>
                            Rs.{" "}
                            {product.order_quantity *
                              productActivePrice(product)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                          >
                            <Grid item>
                              <AddToCartButtonPart
                                fixedWidthAddRemove
                                listName="Cart Page"
                                small
                                product={product}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>{" "}
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Card>
    );
  }
}

CartProductTilePart.propTypes = {
  product: PropTypes.object.isRequired,
  isHorizontal: PropTypes.bool,
  nameCharLimit: PropTypes.number,
  variant: PropTypes.string
};
CartProductTilePart.defaultProps = {
  isHorizontal: false,
  nameCharLimit: 80,
  variant: "found"
};

export default withRouter(withCustomStyles(CartProductTilePart));
