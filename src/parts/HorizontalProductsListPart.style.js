import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  item: {
    minWidth: "180px",
    padding: theme.spacing.unit,
    paddingLeft: 0
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  lastItem: {
    display: "flex",
    overflowY: "hidden",
    width: "400px !important"
  },
  loadingSkeleton: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    padding: "8px 10px 15px"
  },
  marginSkeleton: {
    marginBottom: 10
  }
}));

export default withCustomStyles;
