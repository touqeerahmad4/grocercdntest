import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  emptyAreaTitle: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: "1.6"
  }
}));

export default withCustomStyles;
