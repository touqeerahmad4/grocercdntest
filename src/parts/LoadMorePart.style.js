import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  loadMore: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    position: "relative",
    width: "100%",
    height: "inherit",
    backgroundColor: "transparent"
  }
}));

export default withCustomStyles;
