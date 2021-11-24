import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 -2px 12px 0 rgba(0,0,0,.08)",
    borderTop: theme.mixins.borderLine3,
    zIndex: 1,
    padding: theme.spacing.unit * 2
  },
  largeButton: {
    padding: "12px 16px",
    width: "100%"
  },
  loadMore: {
    padding: 0,
    margin: 0
  }
}));

export default withCustomStyles;
