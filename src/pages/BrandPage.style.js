import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: "800px"
  },
  brandBanner: {
    padding: 8
  },
  categories: {
    borderBottom: theme.mixins.borderLine3,
    padding: theme.spacing.unit,
    overflow: "scroll",
    whiteSpace: "nowrap"
  },
  tagLine: {
    color: theme.palette.text.primary,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "1.5"
  },
  breadCrumbs: {
    borderBottom: theme.mixins.borderLine3,
    padding: theme.spacing.unit
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
