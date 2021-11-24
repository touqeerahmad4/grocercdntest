import React from "react";
import withCustomStyles from "./ProductTilePart.style";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TypographyPart from "../parts/TypographyPart";
import * as classnames from "classnames";
import withRouter from "react-router/es/withRouter";
// import LoadMorePart from "./LoadMorePart";
import { inject, observer } from "mobx-react";
import { ReactComponent as OutOfStock } from "../assets/images/out_of_stock.svg";
import { getImage, getProductPageUrl } from "../utils/UrlUtils";
import {
  dealPrice,
  isDeal,
  productName,
  productPrice
} from "../utils/ProductUtils";
import ImageWithLoaderPart from "./ImageWithLoaderPart";
import AddToCartButtonPart from "./AddToCartButtonPart";
import { Link } from "react-router-dom";
import { isHeadless } from "../utils/AppUtils";
import gtmService from "../services/GTMService";
import { getCategoryName } from "../utils/CategoryUtils";
import { forceCheck } from "react-lazyload";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";

@inject(["productStore"])
@observer
class ProductTilePart extends React.Component {
  handleProductClick = product => {
    this.props.productStore.setProduct(product);
  };

  handleTileClick = () => {
    const {
      props: { product, listName, CTListName }
    } = this;

    if (CTListName && CTListName.split(" - ")[0] === "Horizontal Section") {
      gtmService.pageView("/horizontal-product-click", {
        name: CTListName.split(" - ")[1],
        "category id": product.category_id.toString(),
        "category name": getCategoryName(product.category_id)
      });
    }
    gtmService.productClick(product, listName);
  };

  componentDidMount() {
    forceCheck();
  }

  render() {
    const {
      props: {
        classes,
        product,
        isHorizontal,
        nameCharLimit,
        listName,
        CTListName,
        query
      }
    } = this;

    const getPrice = product => {
      if (isDeal(product)) {
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="baseline"
            className={classes.textLineHeight}
          >
            <Grid item>
              <Typography variant="subtitle2">
                Rs. {dealPrice(product)}
              </Typography>
            </Grid>
            <Grid item className={classes.marginLeft1}>
              <Typography variant="caption" className={classes.nonDealPrice}>
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

    const productCard = (
      <Card
        onClick={this.handleTileClick}
        className={classnames(classes.card, {
          [classes.fillHeight]: !isHeadless()
        })}
      >
        {/* {!product.name && <LoadMorePart />} */}
        {product.name && (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classnames({
              [classes.fillHeight]: !isHeadless()
            })}
            wrap="nowrap"
          >
            <Grid item className={classes.textLineHeight} xs={12}>
              <TypographyPart
                variant="smallBoldWhite"
                className={classnames({
                  [classes.dealFlash]: isDeal(product),
                  [classes.hiddenDeal]: !isDeal(product)
                })}
              >
                {product.deal_title || "DEFAULT"}
              </TypographyPart>
            </Grid>
            <Grid item xs>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                className={classnames({
                  [classes.fillHeight]: !isHeadless()
                })}
              >
                <Grid
                  item
                  className={classnames(classes.noDecoration, {
                    [classes.gutterBottom2]: !isHorizontal,
                    [classes.gutterBottom1]: isHorizontal
                  })}
                  component={Link}
                  to={getProductPageUrl(product)}
                  onClick={this.handleProductClick.bind(this, product)}
                  xs
                >
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={classes.cardMediaItem}>
                      <ImageWithLoaderPart
                        alt={product.name}
                        src={getImage(product)}
                        width="130"
                        height="130"
                        loaderClass={classes.marginLeft1}
                        className={classnames(classes.centerAlignedImage, {
                          [classes.cardMediaHorizontal]: isHorizontal,
                          [classes.cardMedia]: !isHorizontal,
                          [classes.outOfStock]: product.vendor_status === 0
                        })}
                      />
                      {product.vendor_status === 0 && (
                        <OutOfStock className={classes.outOfStockSVG} />
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {productName(product.name, nameCharLimit)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs>
                  <Grid
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="stretch"
                    className={classnames({
                      [classes.fillHeight]: !isHeadless()
                    })}
                  >
                    <Grid
                      item
                      className={classnames(
                        classes.gutterBottom1,
                        classes.noDecoration
                      )}
                    >
                      <Typography variant="caption">{product.unit}</Typography>
                    </Grid>
                    <Grid
                      item
                      className={classnames(
                        classes.gutterBottom1,
                        classes.noDecoration
                      )}
                    >
                      {getPrice(product)}
                    </Grid>
                    {product.vendor_status === 0 ? (
                      <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Typography
                          variant={"caption"}
                          className={classes.outOfStock}
                        >
                          OUT OF STOCK
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item>
                        <AddToCartButtonPart
                          listName={listName}
                          query={query}
                          CTListName={CTListName}
                          product={product}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Card>
    );

    return lazyLoadComponentInViewPort(productCard, {
      once: true,
      resize: true,
      height: 200,
      style: { height: "100%" }
    });
  }
}

ProductTilePart.propTypes = {
  product: PropTypes.object.isRequired,
  isHorizontal: PropTypes.bool,
  nameCharLimit: PropTypes.number,
  listName: PropTypes.string,
  CTListName: PropTypes.string,
  query: PropTypes.string
};
ProductTilePart.defaultProps = {
  isHorizontal: false,
  nameCharLimit: 50
};

export default withRouter(withCustomStyles(ProductTilePart));
