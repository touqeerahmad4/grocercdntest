import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  categoryPageTitle: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: "1.6"
  },
  centerSiteMap: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit
  },
  categoriesContainer: {
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(365)]: {
      maxHeight: 1300
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: 1000
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: 800
    }
  },
  tagLine: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: "1.5"
  }
}));

export default withCustomStyles;
