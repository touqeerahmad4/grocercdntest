import React from "react";
import withCustomStyles from "./CartPage.style";
import withRouter from "react-router/es/withRouter";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as classnames from "classnames";
import { inject, observer } from "mobx-react";
import VerticalProductsListPart from "../parts/VerticalProductsListPart";
import CartProductTilePart from "../parts/CartProductTilePart";
import AddShoppingCartRounded from "@material-ui/icons/AddShoppingCartRounded";
import EmptyAreaPart from "../parts/EmptyAreaPart";
import BottomFixedButton from "../parts/BottomFixedButton";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import LoadMorePart from "../parts/LoadMorePart";
import { isServerVendor } from "../utils/CustomerUtils";
import Switch from "@material-ui/core/Switch";
import SimpleDialogPart from "../parts/SimpleDialogPart";
import MemberShipPromoBanner from "../parts/MemberShipPromoBanner";
import { isEasyPaisaMiniApp } from "../utils/AppUtils";

@inject(["orderStore"])
@inject(["customerStore"])
@inject(["memberShipStore"])
@inject(["globalSettingStore"])
@observer
class CartPage extends React.Component {
  state = {
    openModal: false
  };

  componentDidMount() {
    const {
      props: { orderStore, customerStore }
    } = this;
    if (
      isEasyPaisaMiniApp() &&
      ![
        ...Array.from(orderStore.all.keys()),
        ...Array.from(orderStore.notFound.keys())
      ].length
    ) {
      return;
    }

    const vendorId = customerStore.vendorId;

    customerStore.fetchVendor(undefined, () => {
      customerStore.fetchCustomerWithWallet(() =>
        orderStore.checkAvailability()
      );
      vendorId !== customerStore.vendorId && orderStore.persistData();
    });
    orderStore.checkAvailability();
  }

  componentWillUnmount() {
    this.props.orderStore.cancel();
    this.props.customerStore.cancel();
  }

  toggleModal() {
    this.setState({ openModal: !this.state.openModal });
  }

  removeWallet() {
    this.props.orderStore.setShouldUseWallet(false);
    this.toggleModal();
  }

  handleShopMore() {
    this.props.history.push("/");
  }

  navigateToCheckout() {
    const {
      props: { orderStore, customerStore, history }
    } = this;
    if (!customerStore.isLoggedIn && isEasyPaisaMiniApp()) {
      //INFO call easyPaisa auth code if the app is in easypaisa container and it's not authenticated
      history.push("/login?redirect=/change-location?redirect=checkout");
      return;
    }
    if (
      isEasyPaisaMiniApp() &&
      customerStore.isLoggedIn &&
      !customerStore.customer.address_2
    ) {
      history.push("/change-location?redirect=/checkout");
      return;
    }
    if (
      orderStore.shouldUseWallet &&
      !orderStore.canUseWallet &&
      customerStore.isLoggedIn
    ) {
      this.setState({ openModal: true });
      return;
    }

    history.push("/checkout");
  }

  render() {
    const {
      props: {
        classes,
        orderStore,
        customerStore,
        memberShipStore,
        globalSettingStore: { settings }
      },
      state: { openModal },
      toggleModal,
      removeWallet,
      handleShopMore,
      navigateToCheckout
    } = this;

    const content = (
      <React.Fragment>
        <RobotsNoIndexPart />
        {orderStore.all.size < 1 && orderStore.notFound.size < 1 && (
          <EmptyAreaPart
            icon={<AddShoppingCartRounded />}
            title="No items in your cart"
            content="Your favourite items are just a click away"
          />
        )}
        {(orderStore.all.size > 0 || orderStore.notFound.size > 0) && (
          <div>
            <Paper className={classnames(classes.section)}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid
                  item
                  className={classnames(
                    classes.displayInline,
                    classes.padding1
                  )}
                >
                  <Typography variant={"h6"}>My Cart</Typography>
                  <Typography
                    variant={"body1"}
                    className={classes.titleCaption}
                  >
                    ({orderStore.all.size} items)
                  </Typography>
                </Grid>
                <Grid
                  item
                  className={classnames(classes.mainRow, classes.marginBottom1)}
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        variant={"body1"}
                        className={classes.titleCaption}
                      >
                        Sub Total
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant={"body1"}
                        className={classes.titleCaption}
                      >
                        Rs. {orderStore.subTotal}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classnames(classes.mainRow)}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography variant={"body1"}>
                            Delivery Charges
                          </Typography>
                        </Grid>
                        {!orderStore.isDeliveryFree && (
                          <Grid item>
                            <Typography variant={"caption"}>
                              Shop {orderStore.shopMoreForFreeDelivery} more to
                              get free delivery
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant={"body1"}
                        color={
                          orderStore.isDeliveryFree ? "secondary" : "error"
                        }
                      >
                        {orderStore.isDeliveryFree
                          ? "Free"
                          : "Rs. " + orderStore.deliveryCharges}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {!isEasyPaisaMiniApp() &&
                  customerStore.wallet &&
                  Boolean(customerStore.wallet.amount) && (
                    <Grid item className={classnames(classes.mainRow)}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        disabled={!orderStore.canUseWallet}
                      >
                        <Grid item>
                          <Typography
                            inline
                            variant={"body1"}
                            className={classnames(
                              classes.titleCaption,
                              classes.marginBottom1
                            )}
                          >
                            {customerStore.pendingWallet
                              ? "Pending Payment"
                              : "Use Credit"}
                          </Typography>
                          {!customerStore.pendingWallet && (
                            <Typography
                              inline
                              align={"center"}
                              color="secondary"
                              className={classes.titleCaption}
                            >
                              PKR {customerStore.wallet.amount || 0}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item>
                          {customerStore.pendingWallet ? (
                            <Typography
                              align={"center"}
                              className={classnames(
                                classes.titleCaption,
                                classes.marginBottom1
                              )}
                            >
                              PKR {customerStore.wallet.amount || 0}
                            </Typography>
                          ) : (
                            <Switch
                              checked={orderStore.shouldUseWallet}
                              onChange={() =>
                                orderStore.setShouldUseWallet(
                                  !orderStore.shouldUseWallet
                                )
                              }
                              name="shouldUseWallet"
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox"
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                <Grid item className={classnames(classes.mainRow)}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant={"body1"}>Total bill</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={"body1"}>
                        Rs. {orderStore.totalBill}
                      </Typography>
                    </Grid>
                  </Grid>
                  {orderStore.subTotalSavings > 0 && (
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant={"body1"}>
                          Your total savings
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={"body1"} color={"secondary"}>
                          Rs. {orderStore.subTotalSavings}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Paper>
            {!isEasyPaisaMiniApp() && !customerStore.customer.is_member && (
              <MemberShipPromoBanner
                footer
                sticky
                plan={memberShipStore.all[0]}
              />
            )}

            {orderStore.notFound.size > 0 && (
              <Paper className={classnames(classes.section)}>
                <Typography
                  variant={"subtitle2"}
                  className={classnames(classes.subRow)}
                >
                  Item(s) not available will be removed on checkout.
                </Typography>
                <VerticalProductsListPart
                  products={Array.from(orderStore.notFound.values())}
                  tile={<CartProductTilePart variant="not-found" />}
                />
              </Paper>
            )}

            {orderStore.all.size > 0 && (
              <Paper className={classes.section}>
                <VerticalProductsListPart
                  products={Array.from(orderStore.all.values())}
                  tile={<CartProductTilePart variant="found" />}
                />
              </Paper>
            )}
          </div>
        )}

        {orderStore.all.size > 0 && (
          <BottomFixedButton
            onClick={navigateToCheckout.bind(this)}
            state={orderStore.checkAvailabilityState}
            content={
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.colorWhite600}
                  >
                    Proceed to Checkout
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.colorWhite600}
                  >
                    Rs. {orderStore.totalBill}
                  </Typography>
                </Grid>
              </Grid>
            }
          />
        )}

        <SimpleDialogPart
          title="Wallet"
          open={openModal}
          onClose={toggleModal.bind(this)}
          content={`Wallet Credit can only be used on orders above Rs ${
            settings.wallet_order_limit
          }. Shop Rs ${settings.wallet_order_limit -
            orderStore.subTotal +
            1} more.`}
          isDownloadLinks={false}
          acceptBtnContent="Shop More"
          cancelBtnContent="Remove Wallet"
          onAccept={handleShopMore.bind(this)}
          onCancel={removeWallet.bind(this)}
        ></SimpleDialogPart>
        {orderStore.all.size < 1 && (
          <BottomFixedButton content="Start Shopping" to={"/"} />
        )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {isServerVendor(orderStore.vendor) && content}
        {!isServerVendor(orderStore.vendor) && <LoadMorePart />}
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(CartPage));
