import React from "react";
import withCustomStyles from "./FooterPart.style";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssignmentReturnedRounded from "@material-ui/icons/AssignmentReturnedRounded";
import MonetizationOnRounded from "@material-ui/icons/MonetizationOnRounded";
import PanoramaWideAngleRounded from "@material-ui/icons/PanoramaWideAngleRounded";
import withRouter from "react-router/es/withRouter";
import { inject, observer } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import LoadMorePart from "./LoadMorePart";
import SalientFeaturesRowPart from "./SalientFeaturesRowPart";
import CategoryNamesListPart from "./CategoryNamesListPart";
import BrandNamesListPart from "./BrandNamesListPart";
import gtmService from "../services/GTMService";
import ImageWithLoaderPart from "../parts/ImageWithLoaderPart";
import { ReactComponent as VisaCard } from "../assets/images/visa.svg";
import { ReactComponent as MasterCard } from "../assets/images/mastercard.svg";
import { ReactComponent as AmericanExpressCard } from "../assets/images/american express.svg";
import { lazyLoadComponentInViewPort } from "../utils/lazyLoadComponent";
import { isEasyPaisaMiniApp, UANNUMBER } from "../utils/AppUtils";

@inject(["categoriesStore"])
@inject(["allBrandsStore"])
@inject(["customerStore"])
@observer
class FooterPart extends React.Component {
  trackInstallClick() {
    gtmService.event("User", "Footer install banner clicked");
  }

  render() {
    const {
      props: {
        categoriesStore,
        allBrandsStore,
        customerStore,
        classes,
        location: { pathname }
      },
      trackInstallClick
    } = this;

    const shouldLoadMainSite = !!customerStore.vendor.id;

    const banner =
      pathname === "/" || isEasyPaisaMiniApp() ? (
        <></>
      ) : (
        <RouterLink
          component="div"
          onClick={trackInstallClick}
          className={classes.mobileOnly}
          to={"/redirect.html"}
        >
          <ImageWithLoaderPart
            className={classes.marginTop2}
            alt="install_banner"
            src={
              "https://pictures.grocerapps.com/original/grocerapp-grocerapp-mobile-banner-6049ffe24bb99.jpeg"
            }
          />
        </RouterLink>
      );

    const footerComp = (
      <div
        className={classnames({
          [classes.homeBannerMargin]:
            pathname === "/" &&
            !isEasyPaisaMiniApp() &&
            customerStore.isLoggedIn &&
            !customerStore.customer.is_member
        })}
      >
        {banner}

        <Paper className={classes.root}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={32}
          >
            <Grid item className={classes.mainRow}>
              <Typography variant="body1">
                GrocerApp aims to deliver household happiness by trying to be
                the best in following 3 things.
              </Typography>
            </Grid>
            <Grid item className={classes.mainRow}>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
              >
                <SalientFeaturesRowPart
                  icon={<MonetizationOnRounded />}
                  title={"Best Prices & Offers"}
                  text={
                    "Cheaper prices than your local supermarket, great cashback offers to top it off."
                  }
                />
                <SalientFeaturesRowPart
                  icon={<PanoramaWideAngleRounded />}
                  title={"Wide Assortment"}
                  text={
                    "Choose from 5000+ products across food, personal care, household & other categories."
                  }
                />
                <SalientFeaturesRowPart
                  icon={<AssignmentReturnedRounded />}
                  title={"Easy Returns"}
                  text={
                    "Not satisfied with a product? Return it at the doorstep & get a refund within hours."
                  }
                />
              </Grid>
            </Grid>
            <Grid item className={classes.mainRow}>
              <Typography variant="body1">Categories</Typography>
              {(!shouldLoadMainSite ||
                (categoriesStore.all.length === 0 &&
                  categoriesStore.state === "fetching")) && <LoadMorePart />}
              {shouldLoadMainSite && categoriesStore.all.length !== 0 && (
                <Grid
                  container
                  direction="column"
                  wrap={"wrap"}
                  spacing={8}
                  className={classes.categoriesContainer}
                >
                  <CategoryNamesListPart categories={categoriesStore.all} />
                </Grid>
              )}
            </Grid>
            <Grid item className={classes.mainRow}>
              <Typography variant="body1">Top Brands</Typography>
              {(!shouldLoadMainSite ||
                (allBrandsStore.limited.length === 0 &&
                  allBrandsStore.fetchLimitedState === "fetching")) && (
                <LoadMorePart />
              )}
              {shouldLoadMainSite && allBrandsStore.limited.length > 0 && (
                <Grid container className={classes.brandsContainer}>
                  <BrandNamesListPart brands={allBrandsStore.limited} />
                </Grid>
              )}
            </Grid>
            <Grid item className={classes.mainRow}>
              <Typography variant="body1">Useful Links</Typography>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={8}
                className={classes.categoriesContainer}
              >
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/shops"
                      color="inherit"
                      aria-label="Privacy Policy"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Brand Stores
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/privacy-policy"
                      color="inherit"
                      aria-label="Privacy Policy"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/terms"
                      color="inherit"
                      aria-label="Terms & Conditions"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Terms & Conditions
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/faqs"
                      aria-label="FAQs"
                      color="inherit"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      FAQs
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/return-and-refund-policy"
                      color="inherit"
                      aria-label="Return & Refund"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Return & Refund
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2">
                    <Link
                      to="/categories"
                      color="inherit"
                      aria-label="Categories"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Categories
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" className={classes.marginBottom2}>
                    <Link
                      to="/sitemap"
                      color="inherit"
                      component={RouterLink}
                      className={classes.noDecoration}
                    >
                      Category Sitemap
                    </Link>
                  </Typography>
                </Grid>
                {!isEasyPaisaMiniApp() && (
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="body2"
                      className={classes.marginBottom2}
                    >
                      <a
                        href="https://grocerapp.skillate.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        className={classnames(
                          classes.noDecoration,
                          classes.careerPage
                        )}
                      >
                        Careers
                      </a>
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.captionH5}>
                GrocerApp - Online Grocery Shopping
              </Typography>
              <Typography variant="body2">
                GrocerApp makes shopping easier and more convenient than ever.
              </Typography>
              <List>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Online grocery store in Pakistan"
                    secondary="Order online. All your favourite products from the low price online supermarket for grocery home delivery in Lahore, Pakistan. Best experience guaranteed."
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="One stop shop for all your daily needs"
                    secondary="GrocerApp is a low-price online supermarket that allows you to order products across categories like grocery, vegetables, beauty & wellness, household care, baby care, pet care and meats & seafood and gets them delivered to your doorstep."
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="For best of prices, deals and offers; order online in Lahore, Islamabad, Rawalpindi and Faisalabad"
                    secondary="The delivery service is operational in all areas of Lahore: Ravi, Shalimar, Data Gunj Bakhsh, Samanabad, Gulberg, Allama Iqbal, Nishtar, Pak arab society, Bahria town, SA Gardens, DHA 1 to 7, wapda town, Capital Housing, Cantt and all other areas, Islamabad: Pakistan Secretariat Diplomatic Enclave A-17, Islamabad A-18, Islamabad B-17, Islamabad B-18, Islamabad C-15, Islamabad C-16, Islamabad"
                  />
                </ListItem>
                {!isEasyPaisaMiniApp() && (
                  <ListItem disableGutters className={classes.flexWrap}>
                    <ListItemText primary="Payment Options" />
                    <Grid
                      container
                      alignItems="center"
                      spacing={8}
                      className={classes.marginTop1}
                    >
                      <Grid item>
                        <VisaCard width="50px" height="32px" />
                      </Grid>
                      <Grid item>
                        <MasterCard width="50px" height="32px" />
                      </Grid>
                      <Grid item>
                        <AmericanExpressCard width="50px" height="32px" />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          Credit and Debit Cards, Cash on Delivery (COD) and
                          EasyPaisa (Coming Soon)
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
              </List>
              <Typography variant="caption">
                info@grocerapps.com, {UANNUMBER}
              </Typography>
              <Typography variant="caption">
                Peco Rd, 110 - M Quaid e Azam Industrial Estate, Lahore, Punjab
              </Typography>
              <Typography variant="caption" className={classes.marginTop1}>
                © GrocerApp Pakistan Pvt. Ltd., 2016-2021
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );

    return lazyLoadComponentInViewPort(footerComp, {
      resize: true,
      height: 300,
      offset: 300,
      placeholder: <LoadMorePart />
    });
  }
}

export default withRouter(withCustomStyles(FooterPart));
