import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit * 2
  },
  mainRow: {
    borderBottom: theme.mixins.borderLine2
  },
  categoriesContainer: {
    overflowX: "auto",
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
  careerPage: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "normal",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  brandsContainer: {
    paddingTop: theme.spacing.unit * 2
  },
  captionH5: {
    paddingBottom: theme.spacing.unit * 2
  },
  mobileOnly: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  homeBannerMargin: {
    marginBottom: theme.spacing.unit * 12
  }
}));

export default withCustomStyles;
