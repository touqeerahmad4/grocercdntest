import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./ProductListPage.style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import Card from "@material-ui/core/Card";
import BreadcrumbsPart from "../parts/BreadcrumbsPart";
import { handleScroll } from "../utils/AppUtils";
import CategoryChipsPart from "../parts/CategoryChipsPart";
import ProductsListPart from "../parts/ProductsListPart";
import { productListDesc, productListTitle } from "../utils/SEOUtils";
import SEOInfoPart from "../parts/SEOInfoPart";
import { getProductsPageAbsUrl } from "../utils/UrlUtils";
import {
  getCategoryNamesTreeReverse,
  getListingPageName
} from "../utils/CategoryUtils";
import { Helmet } from "react-helmet";
import NotFoundPart from "../parts/NotFoundPart";
import ProductLoadingPart from "./ProductLoadingPart";

@inject(["productsStore"])
@inject(["categoriesStore"])
@observer
class ProductListPage extends Component {
  fetchAll() {
    const {
      productsStore,
      match: {
        params: { cid }
      }
    } = this.props;

    productsStore.fetch(cid);
  }

  componentDidMount() {
    const { productsStore } = this.props;

    this.fetchAll();
    this.scrollListener = handleScroll.bind(this, productsStore);

    window.addEventListener("scroll", this.scrollListener);
  }

  componentDidUpdate(prevProps) {
    const {
      productsStore,
      match: {
        params: { cid }
      }
    } = this.props;

    if (cid !== prevProps.match.params.cid) {
      productsStore.cancel();
      this.fetchAll();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
    this.cancelAll();
  }

  cancelAll() {
    const { productsStore, categoriesStore } = this.props;
    productsStore.cancel();
    categoriesStore.cancel();
  }

  render() {
    const {
      props: {
        classes,
        productsStore,
        categoriesStore,
        match: { params }
      }
    } = this;

    let cid = parseInt(params.cid);
    if (cid === 145 || cid === 99 || cid === 83) {
      cid--;
    }

    const currentCategory = categoriesStore.find(cid);
    const seoDescription = productListDesc(currentCategory.name);
    return (
      <>
        {productsStore.isFailed && <NotFoundPart />}
        {!productsStore.isFailed && (
          <div className={classes.minHeightPage}>
            <Helmet>
              <link
                rel="canonical"
                href={getProductsPageAbsUrl(currentCategory)}
              />
            </Helmet>
            <SEOInfoPart
              title={
                getCategoryNamesTreeReverse(cid) === "Fruits & Vegetables"
                  ? "Buy Fruits & Vegetable online Upto 50% OFF | GrocerApp"
                  : productListTitle(getCategoryNamesTreeReverse(cid))
              }
              description={seoDescription}
              image={currentCategory.image}
              imageAlt={currentCategory.name}
              url={getProductsPageAbsUrl(currentCategory)}
            />
            <BreadcrumbsPart cid={cid} />
            {/* {categoriesStore.all.length === 0 && <LoadMorePart />} */}
            {categoriesStore.children(cid).length > 0 && (
              <Paper className={classes.categories}>
                <CategoryChipsPart categories={categoriesStore.children(cid)} />
              </Paper>
            )}
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
            >
              {productsStore.all.length === 0 &&
                productsStore.state === "fetching" && <ProductLoadingPart />}
              {productsStore.all.length === 0 &&
                productsStore.state === "done" && (
                  <Card>
                    <Typography variant="body1" color={"primary"}>
                      Couldn&apos;t find what you are looking, add it in order
                      comments and we&apos;ll get it for you!
                    </Typography>
                  </Card>
                )}
              <ProductsListPart
                listName={getListingPageName(currentCategory.id)}
                CTListName={"Category Listing Page"}
                products={productsStore.all}
              />
            </Grid>
            {productsStore.all.length > 1 &&
              productsStore.state === "fetching" && <LoadMorePart />}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withCustomStyles(ProductListPage));
