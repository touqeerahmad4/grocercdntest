import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: "800px"
  },
  categories: {
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
  },
  centerSiteMap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit
  },
  fullWidth: {
    width: "100%"
  },
  siteMapContainer: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1
  },
  categoryName: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: "500",
    lineHeight: "1.6"
  }
}));

export default withCustomStyles;
