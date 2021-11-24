import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  breadCrumbs: {
    borderBottom: theme.mixins.borderLine3,
    padding: theme.spacing.unit * 2,
    minHeight: 86
  },
  categoryName: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: "500",
    lineHeight: "1.6"
  }
}));

export default withCustomStyles;
