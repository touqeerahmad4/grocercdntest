import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: theme.spacing.minHeightPage
  },
  lastOrder: {
    paddingTop: theme.spacing.unit
  },
  mobileOnly: {
    [theme.breakpoints.up("sm")]: {
      display: "none !important"
    }
  },
  memberBannerImg: {
    width: "100%",
    height: "auto"
  }
}));

export default withCustomStyles;
