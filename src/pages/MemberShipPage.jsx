import { inject, observer } from "mobx-react";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { withRouter } from "react-router";
import LoadMorePart from "../parts/LoadMorePart";
import MemberShipBenefitPart from "../parts/MemberShipBenefitPart";
import MemberShipBuyPlanPart from "../parts/MemberShipBuyPlanPart";
import MemberShipDetailPart from "../parts/MemberShipDetailPart";
import MemberShipFAQPart from "../parts/MemberShipFAQPart";
import MemberShipPlanPart from "../parts/MemberShipPlanPart";
import SimpleDialogPart from "../parts/SimpleDialogPart";
import { loginRouteWithRedirect } from "../utils/UrlUtils";
import MemberShipCancelPart from "../parts/MemberShipCancelPart";
import withCustomStyles from "./MemberShipPage.style";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

@inject(["memberShipStore"])
@inject(["customerStore"])
@observer
class MemberShipPage extends Component {
  state = {
    openModal: false,
    success: false,
    selectPlan: null
  };

  componentDidMount() {
    const {
      memberShipStore: { fetchMemberShip, fetchMemberShipStats }
    } = this.props;
    fetchMemberShip();
    fetchMemberShipStats();
  }

  handleSelectPlan = plan => {
    this.setState({ selectPlan: plan });
  };

  handleToggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleSuccess = () => {
    this.setState({ success: !this.state.success });
  };

  handleBuyPlan = id => {
    const {
      props: { memberShipStore, customerStore, enqueueSnackbar, history },
      handleSelectPlan,
      handleSuccess
    } = this;
    if (!customerStore.isLoggedIn) {
      history.push(loginRouteWithRedirect(history.location));
      return;
    }
    memberShipStore.buyPlan(
      id,
      () =>
        customerStore.fetchCustomerInfo(() =>
          memberShipStore.fetchMemberShipStats(() => {
            handleSuccess();
            handleSelectPlan(null);
          })
        ),
      fail => {
        enqueueSnackbar(fail, {
          variant: "error"
        });
        handleSelectPlan(null);
      }
    );
  };

  handleCancelMemberShip = () => {
    this.handleToggleModal();
    if (this.state.success) {
      this.handleSuccess();
    }
    const { memberShipStore, customerStore, enqueueSnackbar } = this.props;
    memberShipStore.cancelMemberShip(
      data =>
        customerStore.fetchCustomerInfo(() =>
          enqueueSnackbar(data, {
            variant: "info"
          })
        ),
      fail => {
        enqueueSnackbar(fail, {
          variant: "error"
        });
      }
    );
  };

  render() {
    const {
      state: { openModal, selectPlan, success },
      props: { classes, memberShipStore, customerStore },
      handleCancelMemberShip,
      handleToggleModal,
      handleSelectPlan
    } = this;
    const membershipSuccess = (
      <Paper className={classes.root}>
        <Typography className={classes.text} variant="subtitle2">
          Congrats {customerStore.customer.name}, start using your GrocerClub
          benefits!
        </Typography>
        <Typography variant="h6" className={classes.text}>
          Enjoy your GrocerClub benefits for{" "}
          {memberShipStore.currentPlan.plan_name}
        </Typography>
      </Paper>
    );

    return (
      <>
        {success && membershipSuccess}
        {!memberShipStore.customer.is_member && !selectPlan && (
          <MemberShipPlanPart
            plans={memberShipStore.all}
            onSelectPlan={handleSelectPlan}
            fetchMemberShipState={memberShipStore.fetchMemberShipState}
          />
        )}
        {(memberShipStore.buyPlanState === "fetching" ||
          customerStore.customerInfoState === "fetching") && <LoadMorePart />}
        {memberShipStore.buyPlanState !== "fetching" &&
          customerStore.customerInfoState !== "fetching" &&
          !memberShipStore.customer.is_member &&
          selectPlan && (
            <MemberShipBuyPlanPart
              plan={selectPlan}
              isLogin={customerStore.isLoggedIn}
              onBuyPlan={this.handleBuyPlan}
            />
          )}
        <MemberShipBenefitPart
          memberFst={customerStore.vendor && customerStore.vendor.member_fst}
        />
        {memberShipStore.customer.is_member &&
          memberShipStore.cancelState !== "fetching" &&
          customerStore.customerInfoState !== "fetching" && (
            <MemberShipDetailPart
              plan={memberShipStore.currentPlan}
              memberShipStatsState={memberShipStore.memberShipStatsState}
            />
          )}
        {!selectPlan && <MemberShipFAQPart />}
        {(memberShipStore.cancelState === "fetching" ||
          customerStore.customerInfoState === "fetching") && <LoadMorePart />}
        {!(
          memberShipStore.cancelState === "fetching" ||
          customerStore.customerInfoState === "fetching"
        ) &&
          memberShipStore.customer &&
          memberShipStore.customer.is_member && (
            <MemberShipCancelPart
              classes={classes}
              onCancel={handleToggleModal}
            />
          )}
        <SimpleDialogPart
          open={openModal}
          title={"Warning!"}
          content={
            "Are you sure? Your membership fee will be credited to your grocer wallet within 48 hours. Any free deliveries availed during membership will also be charged."
          }
          onClose={handleToggleModal}
          cancelBtnContent="Cancel"
          onCancel={handleToggleModal}
          acceptBtnContent="Confirm"
          onAccept={handleCancelMemberShip}
        />
      </>
    );
  }
}

export default withRouter(withSnackbar(withCustomStyles(MemberShipPage)));
