import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: "800px"
  },
  categories: {
    minHeight: 65,
    borderBottom: theme.mixins.borderLine3,
    padding: theme.spacing.unit,
    overflow: "scroll",
    whiteSpace: "nowrap"
  },
  productsLoadMore: {
    paddingTop: theme.spacing.unit * 20,
    paddingBottom: theme.spacing.unit * 40
  },
  navigationLoadMore: {
    minHeight: theme.spacing.unit * 16,
    paddingTop: theme.spacing.unit * 8
  }
}));

export default withCustomStyles;
