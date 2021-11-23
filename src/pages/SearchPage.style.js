import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  emptyResults: {
    minHeight: theme.spacing.minHeightPage
  },
  brokenImage: {
    width: "100px",
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2
  },
  tileItem: {
    padding: "12px 6px 0"
  },
  categories: {
    padding: theme.spacing.unit,
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  mainLoader: {
    paddingTop: theme.spacing.unit * 20,
    paddingBottom: theme.spacing.unit * 20
  },
  emptyAreaTitle: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "1.5"
  }
}));

export default withCustomStyles;
