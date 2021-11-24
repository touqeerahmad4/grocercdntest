import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    boxShadow: "0 -2px 12px 0 rgba(0,0,0,.08)",
    borderTop: theme.mixins.borderLine3,
    backgroundColor: theme.palette.common.black,
    maxWidth: theme.breakpoints.values.md,
    zIndex: theme.zIndex.appBar
  },
  action: {
    color: `${theme.palette.common.white} !important`
  },
  root: {
    zIndex: theme.zIndex.appBar,
    position: "fixed",
    bottom: 0,
    width: "100%",
    minHeight: 64,
    maxWidth: theme.breakpoints.values.md,
    backgroundColor: theme.palette.common.offWhite
  }
}));

export default withCustomStyles;
