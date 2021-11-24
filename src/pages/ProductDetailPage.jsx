import React, { Component, lazy, Suspense } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./ProductDetailPage.style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import LoadMorePart from "../parts/LoadMorePart";
import TypographyPart from "../parts/TypographyPart";
import * as classnames from "classnames";
import CardContent from "@material-ui/core/CardContent";
import AddToCartButtonPart from "../parts/AddToCartButtonPart";
import { getImage } from "../utils/UrlUtils";
import BreadcrumbsPart from "../parts/BreadcrumbsPart";
import {
  dealPrice,
  firstBrandName,
  getProductId,
  isDeal,
  productAvailability,
  productIsAvailable,
  productPrice
} from "../utils/ProductUtils";
import {
  getProductAllFullImages,
  getProductPageAbsUrl,
  productFullImage
} from "../utils/UrlUtils";
import MonetizationOnRounded from "@material-ui/icons/MonetizationOnRounded";
import AssignmentReturnedRounded from "@material-ui/icons/AssignmentReturnedRounded";
import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import {
  productDetailDesc,
  productDetailDescStructured,
  productDetailTitle
} from "../utils/SEOUtils";
import SEOInfoPart from "../parts/SEOInfoPart";
import { Helmet } from "react-helmet";
import { getCategoryName, getCategoryNamesTree } from "../utils/CategoryUtils";
import NotFoundPart from "../parts/NotFoundPart";
import BrandNamesTextLinksPart from "../parts/BrandNamesTextLinksPart";
import Slider from "react-slick";
import componentLoader from "../utils/ComponentLoader";
import { ReactComponent as OutOfStock } from "../assets/images/out_of_stock.svg";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";
import CategoriesHorizontalPart from "../parts/CategoriesHorizontalPart";
import loadingCarrot from "../assets/images/loading_carrot.png";
import Skeleton from "react-loading-skeleton";

const SalientFeaturesRowPart = lazy(() =>
  componentLoader(import("../parts/SalientFeaturesRowPart"))
);
const ProductsHorizontalSectionPart = lazy(() =>
  componentLoader(import("../parts/ProductsHorizontalSectionPart"))
);
const DynamicHTMLHorizontalSectionPart = lazy(() =>
  componentLoader(import("../parts/DynamicHTMLHorizontalSectionPart"))
);

@inject(["productStore"])
@inject(["topSellingStore"])
@inject(["globalSettingStore"])
@inject(["similarProductsStore"])
@inject(["productBasedRecommendationsStore"])
@observer
class ProductDetailPage extends Component {
  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    const {
      productStore,
      globalSettingStore,
      match: {
        params: { prid }
      }
    } = this.props;

    productStore.fetch(prid);
    globalSettingStore.registerDevice();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { prid }
      }
    } = this.props;
    if (prid !== prevProps.match.params.prid) {
      this.cancelAll();
      this.fetchAll();
    }
  }

  handleLoadMore = () => {
    const {
      match: {
        params: { prid }
      },
      productBasedRecommendationsStore
    } = this.props;
    productBasedRecommendationsStore.loadMore(prid);
  };

  cancelAll() {
    const { productStore } = this.props;
    productStore.cancel();
  }

  componentWillUnmount() {
    this.cancelAll();
  }

  render() {
    const {
      props: {
        classes,
        productStore,
        match,
        topSellingStore,
        similarProductsStore,
        productBasedRecommendationsStore,
        productStore: { item },
        match: {
          params: { prid }
        }
      },
      handleLoadMore
    } = this;

    if (!item) {
      return <div>{match.params.prn}</div>;
    }

    const settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToScroll: true,
      initialSlide: 0,
      centerPadding: 60
    };

    const categoryName = getCategoryName(item.category_id);
    const seoDescription = productDetailDesc(
      item.name,
      item.unit,
      categoryName,
      item.desc,
      item.desc_article
    );
    const seoDescriptionStructured = productDetailDescStructured(
      item.name,
      item.unit,
      categoryName,
      item.desc,
      item.desc_article
    );
    const seoTitle = productDetailTitle(item.name, categoryName);

    const getPrice = product => {
      if (isDeal(product)) {
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="baseline"
          >
            <Grid item>
              <Typography variant="body1">Rs. {dealPrice(product)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" className={classes.nonDealPrice}>
                Rs. {productPrice(product)}
              </Typography>
            </Grid>
          </Grid>
        );
      }
      return (
        <Typography variant="body1">Rs. {productPrice(product)}</Typography>
      );
    };

    const bottomHorizontalSection = (
      <>
        <Suspense fallback={<div />}>
          <ProductsHorizontalSectionPart
            name="You May Also Like"
            onScroll={handleLoadMore}
            fetch={() => productBasedRecommendationsStore.fetch(prid)}
            cancel={productBasedRecommendationsStore.cancel}
            state={productBasedRecommendationsStore.fetchState}
            listName="Home Page - More To Love"
            CTListName="Horizontal Section - More To Love"
            products={productBasedRecommendationsStore.all}
          />
        </Suspense>
        <Suspense fallback={<div />}>
          <ProductsHorizontalSectionPart
            name="Most popular"
            state={topSellingStore.fetchState}
            fetch={topSellingStore.fetch}
            cancel={topSellingStore.cancel}
            listName="Detail Page - Most popular"
            CTListName="Horizontal Section - Top Selling"
            products={topSellingStore.all}
          />
        </Suspense>
      </>
    );

    const LoadingPart = () => (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item xs>
          <div className={classnames(classes.root, classes.marginBottom2)}>
            <ImageWithLoaderPart
              src={loadingCarrot}
              width="374"
              height="374"
              alt="Loading"
              className={classnames(
                classes.cardMedia,
                classes.centerAlignedImage
              )}
            />
          </div>
        </Grid>
        <CardContent className={classes.cardContent}>
          <Skeleton height={30} width={250} />
          <Skeleton height={24} width={120} style={{ marginTop: 40 }} />
        </CardContent>
        <Skeleton height={42} width="100%" />
      </Grid>
    );

    return (
      <>
        {productStore.isFailed && <NotFoundPart />}
        {!productStore.isFailed && (
          <div>
            <Helmet>
              <script type="application/ld+json">
                {`{
                "@context": "http://schema.org",
                "@type": "Product",
                "productID": "${getProductId(item)}",
                "mpn": "${getProductId(item)}",
                "name": "${item.name}",
                "description": "${seoDescriptionStructured}",
                "url": "${getProductPageAbsUrl(item)}",
                "image": "${productFullImage(item)}",
                "category": "${getCategoryNamesTree(item.category_id)}",
                "brand": "${firstBrandName(item)}",
                "sku": "${item.barcode}",
                "offers": [
                  {
                    "@type": "Offer",
                    "url": "${getProductPageAbsUrl(item)}",
                    "price": "${productPrice(item)}",
                    "priceCurrency": "PKR",
                    "itemCondition": "http://schema.org/NewCondition",
                    "availability": "${productAvailability(item)["json"]}",
                    "eligibleQuantity": "${item.unit}",
                    "seller": {
                      "@type": "Organization",
                      "name": "GrocerApp"
                    }
                  }
                ]
              }`}
              </script>
              <script type="application/ld+json">
                {`
              {  
                "@context": "http://www.schema.org",
                "@type": "ImageObject",
                "contentUrl": "${productFullImage(item)}",
                "description": "${seoDescriptionStructured}",
                "name": "${item.name}"
              }
            `}
              </script>
              <link rel="canonical" href={getProductPageAbsUrl(item)} />
            </Helmet>
            <CategoriesHorizontalPart sendEvent />
            {item.name && (
              <BreadcrumbsPart isProductDetailPage cid={item.category_id} />
            )}
            <Paper className={classes.root}>
              {(!item.name || productStore.state === "fetching") && (
                <LoadingPart />
              )}
              {item.name && productStore.state !== "fetching" && (
                <div>
                  <SEOInfoPart
                    title={seoTitle}
                    description={seoDescription}
                    image={productFullImage(item)}
                    imageAlt={item.name}
                    url={getProductPageAbsUrl(item)}
                  />
                  {isDeal(item) && (
                    <Grid item className={classes.textLineHeight} xs={12}>
                      <TypographyPart
                        variant="smallBoldWhite"
                        className={classnames({
                          [classes.dealFlash]: isDeal(item),
                          [classes.hiddenDeal]: !isDeal(item)
                        })}
                      >
                        {item.deal_title || "DEFAULT"}
                      </TypographyPart>
                    </Grid>
                  )}
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                  >
                    <Grid item xs>
                      <div
                        className={classnames(
                          classes.root,
                          classes.marginBottom2
                        )}
                      >
                        {productIsAvailable(item) ? (
                          <Slider {...settings}>
                            {getProductAllFullImages(item).map(
                              (image, index) => (
                                <ImageWithLoaderPart
                                  key={index}
                                  src={image}
                                  width="374"
                                  height="374"
                                  alt={item.name}
                                  className={classnames(
                                    classes.cardMedia,
                                    classes.centerAlignedImage
                                  )}
                                />
                              )
                            )}
                          </Slider>
                        ) : (
                          <Grid item className={classes.cardMediaItem}>
                            <ImageWithLoaderPart
                              alt={item.name}
                              src={getImage(item)}
                              width="374"
                              height="374"
                              loaderClass={classes.marginLeft1}
                              className={classnames(
                                classes.cardMedia,
                                classes.centerAlignedImage,
                                classes.outOfStock
                              )}
                            />
                            <OutOfStock className={classes.outOfStockSVG} />
                          </Grid>
                        )}
                      </div>
                    </Grid>
                    <CardContent className={classes.cardContent}>
                      <Grid item xs>
                        <Typography
                          variant="h1"
                          className={classes.productName}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body2" className={classes.unit}>
                          Available In: {item.unit}
                        </Typography>
                        {item.brands && item.brands.length > 0 && (
                          <BrandNamesTextLinksPart brands={item.brands} />
                        )}
                        <div className={classes.unit}>{getPrice(item)}</div>
                      </Grid>
                    </CardContent>
                    <Grid item xs>
                      {productIsAvailable(item) && (
                        <AddToCartButtonPart
                          className={classes.addToCartButton}
                          listName="Detail Page"
                          CTListName="Product Detail Page"
                          product={item}
                        />
                      )}
                      {!productIsAvailable(item) && (
                        <>
                          <Typography
                            variant="body1"
                            color={"primary"}
                            align={"center"}
                            className={classes.marginTop1}
                          >
                            {productAvailability(item)["text"]}
                          </Typography>
                          {!item.is_current_vendor && (
                            <Typography
                              variant="body1"
                              color={"primary"}
                              align={"center"}
                              className={classes.marginTop1}
                            >
                              Currently Unavailable
                            </Typography>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </div>
              )}
            </Paper>
            {item.desc && (
              <Paper className={classes.dynamicHtml}>
                <Typography variant="h6" gutterBottom>
                  About this item
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                </Typography>
              </Paper>
            )}
            {item.desc_article && (
              <Suspense fallback={<div />}>
                <DynamicHTMLHorizontalSectionPart
                  name="Product Details"
                  dynamicHTML={item.desc_article}
                />
              </Suspense>
            )}
            {lazyLoadComponentInViewPort(
              <Suspense fallback={<div />}>
                <ProductsHorizontalSectionPart
                  name={`More ${categoryName}`}
                  fetch={() => similarProductsStore.fetch(prid)}
                  cancel={similarProductsStore.cancel}
                  state={similarProductsStore.fetchState}
                  listName="Detail Page - Similar Products"
                  CTListName="Horizontal Section - Similar Products"
                  products={similarProductsStore.all}
                />
              </Suspense>,
              {
                once: true,
                resize: true,
                height: 200,
                style: { height: "100%" }
              }
            )}
            <div className={classes.whyShopHeading}>
              <Typography variant="subtitle1" gutterBottom>
                Why shop from GrocerApp
              </Typography>
            </div>
            <Paper>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
              >
                <Suspense fallback={<div />}>
                  <SalientFeaturesRowPart
                    icon={<AssignmentReturnedRounded />}
                    title={"Easy Returns & Refunds"}
                    text={
                      "Return products at doorstep and get refund in seconds."
                    }
                  />
                  <SalientFeaturesRowPart
                    icon={<MonetizationOnRounded />}
                    title={"Best Prices & Offers"}
                    text={
                      "Cheaper prices than your local supermarket, great cashback offers to top it off."
                    }
                  />
                </Suspense>
              </Grid>
            </Paper>
            {lazyLoadComponentInViewPort(bottomHorizontalSection, {
              once: true,
              resize: true,
              height: 200,
              style: { height: "100%" }
            })}
          </div>
        )}
        <div className={classes.displayNone}>
          <CategoriesHorizontalPart isBottom sendEvent />
        </div>
      </>
    );
  }
}

export default withCustomStyles(ProductDetailPage);
