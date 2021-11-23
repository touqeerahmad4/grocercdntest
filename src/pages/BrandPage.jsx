import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./BrandPage.style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import Card from "@material-ui/core/Card";
import classnames from "classnames";
import { handleScroll } from "../utils/AppUtils";
import ProductsListPart from "../parts/ProductsListPart";
import { brandDesc, brandTitle } from "../utils/SEOUtils";
import SEOInfoPart from "../parts/SEOInfoPart";
import { getBrandPageAbsUrl, getQueryParam } from "../utils/UrlUtils";
import { getListingPageName } from "../utils/CategoryUtils";
import BrandCategoryChipsPart from "../parts/BrandCategoryChipsPart";
import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import NotFoundPart from "../parts/NotFoundPart";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import _get from "lodash/get";

@inject(["brandStore"])
@inject(["categoriesStore"])
@observer
class BrandPage extends Component {
  fetchAll() {
    const {
      brandStore,
      match: {
        params: { slug, cid }
      },
      location: { search }
    } = this.props;

    brandStore.brandDetail(slug);
    const newCid = cid ? cid : getQueryParam(search, "cid");

    brandStore.brandProducts(slug, newCid);
  }

  componentDidMount() {
    const { brandStore } = this.props;

    this.fetchAll();
    this.scrollListener = handleScroll.bind(this, brandStore);
    window.addEventListener("scroll", this.scrollListener);
  }

  componentDidUpdate(prevProps) {
    const {
      brandStore,
      match: {
        params: { slug, cid }
      },
      location: { search }
    } = this.props;

    const newCid = cid ? cid : getQueryParam(search, "cid");
    const oldCid = prevProps.match.params.cid
      ? prevProps.match.params.cid
      : getQueryParam(prevProps.location.search, "cid");

    if (slug !== prevProps.match.params.slug || newCid !== oldCid) {
      brandStore.cancel();
      brandStore.brandProducts(slug, newCid);
    }

    if (slug !== prevProps.match.params.slug) {
      brandStore.brandDetail(slug);
    }
  }

  cancelAll() {
    const { brandStore, categoriesStore } = this.props;
    brandStore.cancel();
    categoriesStore.cancel();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
    this.cancelAll();
  }

  render() {
    const {
      props: {
        classes,
        brandStore,
        categoriesStore,
        match: {
          params: { slug, cid }
        },
        location: { search }
      }
    } = this;

    const newCid = cid ? cid : getQueryParam(search, "cid");

    if (!brandStore.brand) {
      return null;
    }
    const currentCategory = categoriesStore.find(newCid);

    const cn = _get(currentCategory, "name", false);

    let tagline = (
      <>
        <b>{brandStore.brand.name}</b> products on grocerapp
      </>
    );

    if (cn) {
      tagline = (
        <>
          <b>
            {brandStore.brand.name} ({cn})
          </b>{" "}
          on grocerapp
        </>
      );
    }

    return (
      <>
        {brandStore.brandDetailState === "fetching" && <LoadMorePart />}
        {brandStore.isFailed(brandStore.brandDetailState) && <NotFoundPart />}
        {!brandStore.isFailed(brandStore.brandDetailState) && (
          <div className={classes.minHeightPage}>
            <SEOInfoPart
              title={
                brandStore.brand.name === "K&N's"
                  ? "Buy K&Ns products online up to 50% OFF | Save with GrocerApp"
                  : brandTitle(brandStore.brand.name, cn)
              }
              description={brandDesc(brandStore.brand.name, cn)}
              image={brandStore.brand.image}
              imageAlt={brandStore.brand.name}
              url={getBrandPageAbsUrl(brandStore.brand.slug, currentCategory)}
            />

            <link
              rel="canonical"
              href={getBrandPageAbsUrl(slug, currentCategory)}
            />

            {brandStore.brand.brand_slider_image && (
              <ImageWithLoaderPart
                width="1025"
                height="351"
                className={classes.brandBanner}
                alt={brandStore.brand.name}
                src={brandStore.brand.brand_slider_image}
              />
            )}
            <Paper className={classes.breadCrumbs}>
              <Breadcrumbs
                separator="›"
                className={classes.marginLeft1}
                arial-label="Breadcrumb"
              >
                <Link color="inherit" component={RouterLink} to="/">
                  Home
                </Link>
                <Link color="inherit">{slug}</Link>
              </Breadcrumbs>
              {brandStore.brand && brandStore.brand.name && (
                <Typography
                  variant="h1"
                  className={classnames(classes.marginLeft1, classes.tagLine)}
                >
                  {tagline}
                </Typography>
              )}
            </Paper>
            <Paper className={classes.categories}>
              {brandStore.categories.length > 0 && (
                <BrandCategoryChipsPart
                  current={currentCategory}
                  slug={slug}
                  cid={newCid}
                  categories={brandStore.categories}
                />
              )}
            </Paper>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
            >
              {brandStore.all.length === 0 &&
                brandStore.brandProductsState === "fetching" && (
                  <LoadMorePart className={classes.productsLoadMore} />
                )}
              {brandStore.all.length === 0 &&
                brandStore.brandProductsState === "done" && (
                  <Card>
                    <Typography variant="body1" color={"primary"}>
                      Couldn&apos;t find what you are looking, add it in order
                      comments and we&apos;ll get it for you!
                    </Typography>
                  </Card>
                )}
              <ProductsListPart
                listName={getListingPageName(currentCategory.id)}
                products={brandStore.all}
              />
            </Grid>
            {brandStore.all.length > 1 && brandStore.state === "fetching" && (
              <LoadMorePart />
            )}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withCustomStyles(BrandPage));
