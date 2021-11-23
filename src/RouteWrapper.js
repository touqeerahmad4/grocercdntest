import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router";
import * as Sentry from "@sentry/browser";
import gtmService from "./services/GTMService";
import {
  consoleError,
  isEasyPaisaMiniApp,
  isHeadless,
  isLightHouse
} from "./utils/AppUtils";
import { inject, observer } from "mobx-react";
import PrivateRouteService from "./services/PrivateRouteService";
import "lazysizes";
import _startsWith from "lodash/startsWith";
import { when } from "mobx";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getQueryParam, isStandalonePage } from "./utils/UrlUtils";
import componentLoader from "./utils/ComponentLoader";
import Intercom from "react-live-chat-loader/module/components/Intercom";
import Fade from "react-reveal/Fade";

const CategoriesPage = lazy(() =>
  componentLoader(import("./pages/CategoriesPage"))
);
const HomePage = lazy(() => componentLoader(import("./pages/HomePage")));
const ProductListPage = lazy(() =>
  componentLoader(import("./pages/ProductListPage"))
);
const ProductDetailPage = lazy(() =>
  componentLoader(import("./pages/ProductDetailPage"))
);
const RedirectPage = lazy(() =>
  componentLoader(import("./pages/RedirectPage"))
);
const CartPage = lazy(() => componentLoader(import("./pages/CartPage")));
const SearchPage = lazy(() => componentLoader(import("./pages/SearchPage")));
const NotFoundPage = lazy(() =>
  componentLoader(import("./pages/NotFoundPage"))
);
const TermsPage = lazy(() => componentLoader(import("./pages/TermsPage")));
const FAQsPage = lazy(() => componentLoader(import("./pages/FAQsPage")));
const PrivacyPolicyPage = lazy(() =>
  componentLoader(import("./pages/PrivacyPolicyPage"))
);
const ProfilePage = lazy(() => componentLoader(import("./pages/ProfilePage")));
const LoginPage = lazy(() => componentLoader(import("./pages/LoginPage")));
const CheckoutPage = lazy(() =>
  componentLoader(import("./pages/CheckoutPage"))
);
const MyOrdersPage = lazy(() =>
  componentLoader(import("./pages/MyOrdersPage"))
);
const ReturnRefundPolicyPage = lazy(() =>
  componentLoader(import("./pages/ReturnRefundPolicyPage"))
);
const ChangeLocationPage = lazy(() =>
  componentLoader(import("./pages/ChangeLocationPage"))
);
const BrandPage = lazy(() => componentLoader(import("./pages/BrandPage")));
const AllBrandsPage = lazy(() =>
  componentLoader(import("./pages/AllBrandsPage"))
);
const ThreeDSSuccessPaymentPage = lazy(() =>
  componentLoader(import("./pages/ThreeDSSuccessPaymentPage"))
);
const WalletPage = lazy(() => componentLoader(import("./pages/WalletPage")));
const AddCardPage = lazy(() => componentLoader(import("./pages/AddCardPage")));
const MemberShipPage = lazy(() =>
  componentLoader(import("./pages/MemberShipPage"))
);
const CategoriesSiteMapPage = lazy(() =>
  componentLoader(import("./pages/CategoriesSiteMapPage"))
);
const ProductSiteMapPage = lazy(() =>
  componentLoader(import("./pages/ProductSiteMapPage"))
);
const UnsubscribePage = lazy(() =>
  componentLoader(import("./pages/UnsubscribePage"))
);
const FooterPart = lazy(() => componentLoader(import("./parts/FooterPart")));

@inject(["routerStore"])
@inject(["uiStore"])
@inject(["orderStore"])
@inject(["customerStore"])
@inject(["categoriesStore"])
@inject(["globalSettingStore"])
@inject(["allBrandsStore"])
@observer
class RouteWrapper extends Component {
  vendorId = null;

  fetchCategoriesAndBrands = () => {
    const { categoriesStore, allBrandsStore } = this.props;

    categoriesStore.fetch();
    allBrandsStore.fetchLimited(50);
  };

  cancelAll = () => {
    this.props.categoriesStore.cancel();
    this.props.allBrandsStore.cancel();
  };

  fetchCustomerAndVendor = () => {
    const {
      props: { customerStore },
      fetchCategoriesAndBrands
    } = this;
    if (customerStore.isLoggedIn) {
      customerStore.fetchCustomerInfo(() => {
        fetchCategoriesAndBrands();
        this.vendorId = customerStore.vendorId;
      });
    } else {
      customerStore.fetchVendor(undefined, () => {
        fetchCategoriesAndBrands();
        this.vendorId = customerStore.vendorId;
      });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      props: { uiStore, customerStore },
      vendorId,
      fetchCustomerAndVendor
    } = this;
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("height", "100%", "important");

    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
    if (vendorId !== customerStore.vendorId) {
      fetchCustomerAndVendor();
    }

    if (window && window.innerWidth) {
      uiStore.setScreenWidth(window.innerWidth);
    }
  }

  handleResize = uiStore => {
    uiStore.setScreenWidth(window.innerWidth);
  };

  handleScroll = () => {
    const interComElement = document.getElementsByClassName(
      "intercom-lightweight-app"
    );
    if (!interComElement || !interComElement.length) return;
    if (
      window.innerHeight + window.scrollY >
      document.body.clientHeight - 100
    ) {
      interComElement[0].style.display = "none";
    } else {
      interComElement[0].style.display = "block";
    }
  };

  hideFakeChatIcon = () => {
    const intercomWrapper = document.getElementById("intercomWrapper");
    intercomWrapper.style.display = "none";
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener);
    window.removeEventListener("scroll", this.scrollListner);
    this.cancelAll();
  }

  componentDidMount() {
    const {
      props: {
        location,
        history,
        routerStore,
        customerStore,
        globalSettingStore,
        uiStore,
        location: { search }
      },
      fetchCustomerAndVendor
    } = this;
    globalSettingStore.fetch();

    if (_startsWith(location.pathname, "/redirect")) {
      return;
    }

    if (isHeadless() || isLightHouse()) {
      fetchCustomerAndVendor();
    }

    this.resizeListener = this.handleResize.bind(this, uiStore);
    window.addEventListener("resize", this.resizeListener);

    this.scrollListner = this.handleScroll;
    window.addEventListener("scroll", this.scrollListner);

    gtmService.pageView(location.pathname + location.search);
    routerStore.setCurrentPath(location.pathname + location.search);

    this.disposeWhen = when(
      () => customerStore.isTokenLoaded && customerStore.isCustomerLoaded,
      () => {
        fetchCustomerAndVendor();
      }
    );

    when(
      () =>
        isEasyPaisaMiniApp() &&
        getQueryParam(search, "openId") &&
        customerStore.isCustomerLoaded &&
        customerStore.isTokenLoaded &&
        !customerStore.isLoggedIn,
      () =>
        history.replace(
          `/login?openId=${getQueryParam(search, "openId")}&redirect=/`
        )
    );

    history.listen(location => {
      const fullPath = location.pathname + location.search;
      routerStore.setCurrentPath(fullPath);
      gtmService.pageView(fullPath);
    });
  }

  componentDidCatch(error, errorInfo) {
    consoleError(error);
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const {
      props: {
        customerStore,
        location: { pathname }
      }
    } = this;

    const shouldLoadMainSite = !!customerStore.vendor.id;

    if (customerStore.isLoggedIn) {
      window.intercomSettings = {
        app_id: process.env.REACT_APP_INTERCOMM_ID,
        user_id: customerStore.customer.id,
        email: customerStore.phone_number,
        name: customerStore.name
      };
      gtmService.userId(customerStore.customer.id);
    }

    return (
      <React.Fragment>
        {/* {!_startsWith(pathname, "/redirect") && !shouldLoadMainSite && (
          <LoadMorePart />
        )} */}
        {(_startsWith(pathname, "/redirect") || shouldLoadMainSite) && (
          <>
            <Suspense fallback={<LinearProgress />}>
              <Fade>
                <>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login*" component={LoginPage} />
                    <Route
                      exact
                      path="/return-and-refund-policy"
                      component={ReturnRefundPolicyPage}
                    />
                    <Route exact path="/faqs" component={FAQsPage} />
                    <Route exact path="/faqs.html" component={FAQsPage} />
                    <Route
                      exact
                      path="/privacy-policy"
                      component={PrivacyPolicyPage}
                    />
                    <Route
                      exact
                      path="/privacy_policy.html"
                      component={PrivacyPolicyPage}
                    />
                    <Route path="/terms*" component={TermsPage} />
                    <Route path="/redirect*" component={RedirectPage} />
                    <Route
                      exact
                      path="/categories"
                      component={CategoriesPage}
                    />
                    <Route path="/search" component={SearchPage} />
                    <Route
                      exact
                      path="/sitemap"
                      component={CategoriesSiteMapPage}
                    />
                    <Route
                      exact
                      path="/sitemap/cn/:cn/cid/:cid?"
                      component={ProductSiteMapPage}
                    />
                    <Route
                      exact
                      path="/cn/:cn/cid/:cid?"
                      component={ProductListPage}
                    />
                    <Route exact path="/cart" component={CartPage} />
                    <Route
                      exact
                      path="/change-location"
                      component={ChangeLocationPage}
                    />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <PrivateRouteService
                      exact
                      path="/myorders"
                      component={MyOrdersPage}
                      isAuthenticated={customerStore.isLoggedIn}
                    />
                    <PrivateRouteService
                      exact
                      path="/profile"
                      component={ProfilePage}
                      isAuthenticated={customerStore.isLoggedIn}
                    />
                    <PrivateRouteService
                      exact
                      path="/wallet"
                      component={WalletPage}
                      isAuthenticated={customerStore.isLoggedIn}
                    />
                    <Route
                      exact
                      path="/prn/:prn/prid/:prid"
                      component={ProductDetailPage}
                    />
                    <PrivateRouteService
                      exact
                      path="/add-card"
                      component={AddCardPage}
                      isAuthenticated={customerStore.isLoggedIn}
                    />
                    <Route
                      exact
                      path="/membership"
                      component={MemberShipPage}
                    />
                    <Route
                      path="/shop/:slug/:cn?/:cid?"
                      component={BrandPage}
                    />
                    <Route path="/shops" component={AllBrandsPage} />
                    <Route
                      path="/order/success-payment/:order"
                      component={ThreeDSSuccessPaymentPage}
                    />
                    <Route path="/unsubscribe" component={UnsubscribePage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                  {!isStandalonePage(pathname) && (
                    <Suspense fallback={<div />}>
                      <FooterPart />
                    </Suspense>
                  )}
                </>
              </Fade>
            </Suspense>
          </>
        )}
        <button id="intercomWrapper" onClick={this.hideFakeChatIcon}>
          <Intercom color={"#f7600f"} />
        </button>
      </React.Fragment>
    );
  }
}

export default withRouter(RouteWrapper);
