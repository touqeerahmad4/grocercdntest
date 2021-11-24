import React, { lazy, Suspense } from "react";
import withCustomStyles from "./HomePage.style";
import SimpleSliderPart from "../parts/SliderPart";
import withRouter from "react-router/es/withRouter";
import ProductsHorizontalSectionPart from "../parts/ProductsHorizontalSectionPart";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { grocerAppDesc } from "../utils/SEOUtils";
import gtmService from "../services/GTMService";
// import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import OrderTilePart from "../parts/OrderTilePart";
// import MemberShipPromoBanner from "../parts/MemberShipPromoBanner";
import componentLoader from "../utils/ComponentLoader";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";
import CategoriesHorizontalPart from "../parts/CategoriesHorizontalPart";
import { isEasyPaisaMiniApp, UANNUMBER } from "../utils/AppUtils";

const SEOInfoPart = lazy(() => componentLoader(import("../parts/SEOInfoPart")));
const CategoriesPart = lazy(() =>
  componentLoader(import("../parts/CategoriesPart"))
);
const ProductsHorizontalSectionPartLazy = lazy(() =>
  componentLoader(import("../parts/ProductsHorizontalSectionPart"))
);
const YoungPeopleBuyPart = lazy(() =>
  componentLoader(import("../parts/YoungPeopleBuyPart"))
);

@inject(["dealsStore"])
@inject(["customerStore"])
@inject(["memberShipStore"])
@inject(["paymentStore"])
@inject(["myOrdersStore"])
@inject(["productsStore"])
@inject(["categoriesStore"])
@inject(["globalSettingStore"])
@inject(["featuredProductsStore"])
@inject(["userBasedRecommendationsStore"])
@observer
class HomePage extends React.Component {
  fetchAll() {
    const { myOrdersStore, memberShipStore, globalSettingStore } = this.props;
    memberShipStore.fetchMemberShip();
    myOrdersStore.fetchLastOrder();
    myOrdersStore.fetchPreviouslyOrderedProducts();
    globalSettingStore.registerDevice();
  }

  cancelAll() {
    const { myOrdersStore } = this.props;
    myOrdersStore.cancel();
  }

  componentDidMount() {
    this.fetchAll();
  }

  componentWillUnmount() {
    this.cancelAll();
  }

  trackInstallClick() {
    gtmService.event("User", "Home page app install banner clicked");
  }

  render() {
    const {
      props: {
        classes,
        dealsStore,
        productsStore,
        // memberShipStore,
        paymentStore: {
          cards,
          selectedCard,
          fetchCreditCards,
          fetchCreditCardState,
          selectedPaymentMethod,
          handlePaymentSelection
        },
        customerStore: { vendor, customer, isLoggedIn },
        myOrdersStore,
        categoriesStore,
        featuredProductsStore,
        userBasedRecommendationsStore
      },
      trackInstallClick
    } = this;

    const horizontalSecUnderBanner = (
      <>
        <Suspense fallback={<div />}>
          <ProductsHorizontalSectionPartLazy
            name="Featured Products"
            fetch={featuredProductsStore.fetch}
            cancel={featuredProductsStore.cancel}
            state={featuredProductsStore.fetchState}
            listName="Home Page - Featured Products"
            CTListName="Horizontal Section - Featured Products"
            products={featuredProductsStore.all}
          />
        </Suspense>
        {userBasedRecommendationsStore.all.length > 0 && (
          <Suspense fallback={<div />}>
            <ProductsHorizontalSectionPartLazy
              onScroll={userBasedRecommendationsStore.loadMore}
              name="More To Love"
              fetch={userBasedRecommendationsStore.fetch}
              cancel={userBasedRecommendationsStore.cancel}
              state={userBasedRecommendationsStore.fetchState}
              listName="Home Page - More To Love"
              CTListName="Horizontal Section - More To Love"
              products={userBasedRecommendationsStore.all}
            />
          </Suspense>
        )}
      </>
    );

    return (
      <div className={classes.root}>
        <Suspense fallback={<div />}>
          <SEOInfoPart />
          <Helmet>
            <script type="application/ld+json">
              {`[
                  {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": "https://grocerapp.pk/",
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://grocerapp.pk/search?q={search_term_string}",
                      "query-input": "required name=search_term_string"
                    }
                  },
                  {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "name": "GrocerApp",
                    "description": "${grocerAppDesc()}",
                    "url": "https://grocerapp.pk",
                    "logo": "https://pictures.grocerapps.com/original/grocerapp-large-logo-5e6d96218036a.png",
                    "contactPoint": [{
                      "@type": "ContactPoint",
                      "telephone": "${UANNUMBER}",
                      "contactType": "customer service",
                      "areaServed": "PK",
                      "availableLanguage": "Urdu"
                    }],
                    "sameAs": [
                      "https://web.facebook.com/GrocerApp.pk",
                      "https://twitter.com/grocerapppk",
                      "https://www.instagram.com/grocerapp.pk",
                      "https://www.youtube.com/channel/UC8YtYLZMrsnpRsK8LzCNPOQ",
                      "https://www.linkedin.com/company/grocerapp"
                    ]
                  }
                ]`}
            </script>
            <link rel="canonical" href="https://grocerapp.pk" />
          </Helmet>
        </Suspense>
        <CategoriesHorizontalPart />
        {isLoggedIn && myOrdersStore.lastOrder && myOrdersStore.lastOrder.id && (
          <Grid item className={classes.lastOrder}>
            <OrderTilePart
              cards={cards}
              selectedCard={selectedCard}
              order={myOrdersStore.lastOrder}
              fetchCreditCards={fetchCreditCards}
              retryOrderId={myOrdersStore.retryOrderId}
              fetchCreditCardState={fetchCreditCardState}
              onRetryPayment={myOrdersStore.retryPayment}
              onPaymentSelection={handlePaymentSelection}
              selectedPaymentMethod={selectedPaymentMethod}
              retryPaymentState={myOrdersStore.retryPaymentState}
            />
          </Grid>
        )}
        {!isEasyPaisaMiniApp() && (
          <Link
            component="div"
            onClick={trackInstallClick}
            className={classes.mobileOnly}
            to={"/redirect.html"}
          >
            <img
              className={classes.memberBannerImg}
              alt="install_banner"
              src={
                "https://pictures.grocerapps.com/original/grocerapp-grocerapp-mobile-banner-6049ffe24bb99.jpeg"
              }
              width="600"
              height="165"
            />
          </Link>
        )}
        {isLoggedIn && myOrdersStore.previouslyOrderedList.length > 0 && (
          <ProductsHorizontalSectionPart
            name="Previously Order"
            listName="Home Page - Previously Order"
            fetch={myOrdersStore.fetchPreviouslyOrderedProducts}
            cancel={myOrdersStore.cancelPrevOrders}
            onScroll={myOrdersStore.loadMorePrevOrders}
            state={myOrdersStore.fetchPreviouslyOrderedProductsState}
            CTListName={"Horizontal Section - Previously Order"}
            products={myOrdersStore.previouslyOrderedList}
          />
        )}
        <ProductsHorizontalSectionPartLazy
          name={vendor.deals_section_name || "Top Deals"}
          listName="Home Page - Top Deals"
          fetch={dealsStore.fetch}
          cancel={dealsStore.cancel}
          state={dealsStore.fetchState}
          CTListName={`Horizontal Section - ${vendor.deals_section_name ||
            "Top Deals"}`}
          products={dealsStore.all}
        />
        {!isEasyPaisaMiniApp() && <SimpleSliderPart />}
        {lazyLoadComponentInViewPort(horizontalSecUnderBanner, {
          once: true,
          resize: true,
          style: { width: "100%" },
          offset: 500
        })}
        {!isEasyPaisaMiniApp() && !(customer && customer.is_member) && (
          <Link component="div" to={"/membership"}>
            <img
              width="600"
              height="160"
              alt="membership_banner"
              className={classes.memberBannerImg}
              src={
                "https://pictures.grocerapps.com/original/grocerapp-grocerclub-5f605e06d58b7.jpeg"
              }
            />
          </Link>
        )}
        {lazyLoadComponentInViewPort(
          <Suspense fallback={<div />}>
            <ProductsHorizontalSectionPartLazy
              name={"Fruits & Vegetables"}
              listName="Home Page - Fruits & Vegetables"
              fetch={productsStore.fetchFruitsAndVegetables}
              onScroll={productsStore.loadMoreFruitsAndVegetables}
              cancel={productsStore.cancelFruitsAndVegetables}
              state={productsStore.fruitsAndVegetablesState}
              CTListName={"Horizontal Section - Fruits & Vegetables"}
              products={productsStore.fruitsAndVegetables}
            />
          </Suspense>,
          {
            once: true,
            resize: true,
            style: { width: "100%" },
            offset: 400
          }
        )}
        {lazyLoadComponentInViewPort(
          <Suspense fallback={<div />}>
            <>
              <YoungPeopleBuyPart
                fetchState={categoriesStore.state}
                categories={categoriesStore.youngPeopleBuy}
              />
              <ProductsHorizontalSectionPartLazy
                name={"Daalain, Rice & Flour"}
                listName="Home Page - Daalain, Rice & Flour"
                fetch={productsStore.fetchDaalainAndRice}
                onScroll={productsStore.loadMoreDaalainAndRice}
                cancel={productsStore.cancelDaalainAndRice}
                state={productsStore.daalainAndRiceState}
                CTListName={"Horizontal Section - Daalain, Rice & Flour"}
                products={productsStore.daalainAndRice}
              />
            </>
          </Suspense>,
          {
            once: true,
            resize: true,
            style: { width: "100%" },
            offset: 400
          }
        )}
        {lazyLoadComponentInViewPort(
          <Suspense fallback={<div />}>
            <CategoriesPart />
          </Suspense>,
          {
            once: true,
            resize: true,
            style: { width: "100%" },
            offset: 500
          }
        )}
        {/* {!isEasyPaisaMiniApp() &&
          !(
            customer &&
            customer.is_member &&
            (memberShipStore.fetchMemberShipState !== "fetching" ||
              memberShipStore.fetchMemberShipState !== "pending")
          ) && (
            <MemberShipPromoBanner
              isHome
              plan={memberShipStore.all[0]}
              isClose={memberShipStore.showBanner}
            />
          )} */}
      </div>
    );
  }
}

export default withRouter(withCustomStyles(HomePage));
