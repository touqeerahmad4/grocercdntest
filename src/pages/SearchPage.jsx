import React from "react";
import withCustomStyles from "./SearchPage.style";
import { inject, observer } from "mobx-react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import LoadMorePart from "../parts/LoadMorePart";
import withRouter from "react-router/es/withRouter";
import {
  getBrokenCarrot,
  getSearchPageAbsUrl,
  getSearchQuery
} from "../utils/UrlUtils";
import { handleScroll } from "../utils/AppUtils";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import SearchCategoryChipsPart from "../parts/SearchCategoryChipsPart";
import ProductsListPart from "../parts/ProductsListPart";
import { searchQueryDesc, searchQueryTitle } from "../utils/SEOUtils";
import SEOInfoPart from "../parts/SEOInfoPart";
import { getListingPageName } from "../utils/SearchUtils";
import NotFoundPart from "../parts/NotFoundPart";
import Divider from "@material-ui/core/Divider";
import ProductLoadingPart from "./ProductLoadingPart";

@inject(["searchProductsStore"])
@observer
class SearchPage extends React.Component {
  fetchAll() {
    const {
      searchProductsStore,
      location: { search }
    } = this.props;

    searchProductsStore.fetch(getSearchQuery(search));
  }
  componentDidMount() {
    const { searchProductsStore } = this.props;

    this.fetchAll();
    this.scrollListener = handleScroll.bind(this, searchProductsStore);
    window.addEventListener("scroll", this.scrollListener);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search }
    } = this.props;

    if (search !== prevProps.location.search) {
      this.fetchAll();
    }
  }

  componentWillUnmount() {
    this.cancelAll();
    window.removeEventListener("scroll", this.scrollListener);
  }

  cancelAll() {
    const { searchProductsStore } = this.props;
    searchProductsStore.cancel();
  }

  render() {
    const {
      props: { searchProductsStore, classes }
    } = this;

    const initialArea = (
      <React.Fragment>
        <Grid item>
          <SearchOutlined className={classes.largeIcon} />
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.emptyAreaTitle}>
            Try searching eggs, bread, jam, onion etc.
          </Typography>
        </Grid>
      </React.Fragment>
    );

    const noResultFound = (
      <React.Fragment>
        <Grid item>
          <CardMedia
            component="img"
            src={getBrokenCarrot()}
            title="Broken"
            alt="broken"
            className={classes.brokenImage}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Sorry! No matching results found
          </Typography>
          <Typography variant="body2" align="center">
            Try a different keyword maybe?
          </Typography>
          <Typography variant="body2" align="center">
            Or have a look at our most popular products.
          </Typography>
        </Grid>
        <Divider />
        <NotFoundPart showText={false} />
      </React.Fragment>
    );

    return (
      <div>
        {searchProductsStore.totalRecords !== 0 && (
          <React.Fragment>
            <Paper className={classes.categories}>
              <SEOInfoPart
                title={searchQueryTitle(searchProductsStore.algoliaQuery)}
                description={searchQueryDesc(searchProductsStore.algoliaQuery)}
                url={getSearchPageAbsUrl(searchProductsStore.algoliaQuery)}
              />
              <Breadcrumbs
                separator="›"
                className={classes.marginLeft1}
                arial-label="Breadcrumb"
              >
                <Link color="inherit" component={RouterLink} to="/">
                  Home
                </Link>
                <Link color="inherit">{searchProductsStore.algoliaQuery}</Link>
              </Breadcrumbs>
              <Typography variant="body1" className={classes.marginLeft1}>
                Showing {searchProductsStore.totalRecords} results for &quot;
                {searchProductsStore.algoliaQuery}&quot;
              </Typography>
            </Paper>
            <Paper className={classes.categories}>
              <SearchCategoryChipsPart
                categories={searchProductsStore.facets}
              />
            </Paper>
          </React.Fragment>
        )}

        {searchProductsStore.totalRecords === 0 && (
          <Paper>
            <Grid
              container
              className={classes.minHeightPage}
              direction="column"
              justify="center"
              alignItems="center"
            >
              {searchProductsStore.state === "pending" && initialArea}
              {searchProductsStore.state === "done" && noResultFound}
              {searchProductsStore.state === "fetching" && <LoadMorePart />}
            </Grid>
          </Paper>
        )}

        {searchProductsStore.totalRecords !== 0 && (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            {/* {searchProductsStore.state === "fetching" && (
            <LoadMorePart className={classes.mainLoader} />
          )} */}
            {searchProductsStore.state === "fetching" && <ProductLoadingPart />}
            <ProductsListPart
              algolia
              query={searchProductsStore.query}
              listName={getListingPageName()}
              CTListName={getListingPageName()}
              products={searchProductsStore.all}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default withRouter(withCustomStyles(SearchPage));
