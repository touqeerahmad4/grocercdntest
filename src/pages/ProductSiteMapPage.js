import React from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./ProductSiteMapPage.style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import Card from "@material-ui/core/Card";
import BreadcrumbsPart from "../parts/BreadcrumbsPart";
import CategoryChipsPart from "../parts/CategoryChipsPart";
import classnames from "classnames";
import { productListDesc, productListTitle } from "../utils/SEOUtils";
import SEOInfoPart from "../parts/SEOInfoPart";
import { getProductPageUrl, getProductsPageAbsUrl } from "../utils/UrlUtils";
import { getCategoryNamesTreeReverse } from "../utils/CategoryUtils";
import { Helmet } from "react-helmet";
import NotFoundPart from "../parts/NotFoundPart";
import Link from "react-router-dom/Link";

@inject(["productsStore"])
@inject(["categoriesStore"])
@observer
class ProductSiteMapPage extends React.Component {
  fetchAll() {
    const {
      productsStore,
      match: {
        params: { cid }
      }
    } = this.props;

    productsStore.fetchInternalSiteMap(cid);
  }

  componentDidMount() {
    this.fetchAll();
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
    this.cancelAll();
  }

  cancelAll() {
    const { productsStore, categoriesStore } = this.props;
    productsStore.cancelAll();
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
              title={productListTitle(getCategoryNamesTreeReverse(cid))}
              description={seoDescription}
              image={currentCategory.image}
              imageAlt={currentCategory.name}
              url={getProductsPageAbsUrl(currentCategory)}
            />
            <BreadcrumbsPart isSiteMap cid={cid} />
            {categoriesStore.all.length === 0 && <LoadMorePart />}
            {categoriesStore.children(cid).length > 0 && (
              <Paper className={classes.categories}>
                <CategoryChipsPart
                  isSiteMap
                  categories={categoriesStore.children(cid)}
                />
              </Paper>
            )}
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
            >
              {productsStore.siteMapProductState === "fetching" && (
                <LoadMorePart className={classes.productsLoadMore} />
              )}
              {productsStore.siteMapProducts.length === 0 &&
                productsStore.siteMapProductState === "done" && (
                  <Card>
                    <Typography variant="body1" color={"primary"}>
                      Couldn&apos;t find what you are looking, add it in order
                      comments and we&apos;ll get it for you!
                    </Typography>
                  </Card>
                )}
              {productsStore.siteMapProductState === "done" && (
                <Paper className={classes.fullWidth}>
                  <Typography variant={"h2"} className={classes.categoryName}>
                    Sitemap - {currentCategory.name}
                  </Typography>
                  <Grid
                    container
                    spacing={8}
                    className={classes.siteMapContainer}
                  >
                    {productsStore.siteMapProducts.map(product => (
                      <Grid key={product.id} item xs={6}>
                        <Link
                          to={getProductPageUrl(product)}
                          className={classnames(
                            classes.marginLeft1,
                            classes.noDecoration
                          )}
                        >
                          <Typography
                            variant="body2"
                            className={classes.centerSiteMap}
                          >
                            - {product.name}
                          </Typography>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Grid>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withCustomStyles(ProductSiteMapPage));
