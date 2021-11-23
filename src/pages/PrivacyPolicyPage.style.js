import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  privacyTitle: {
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "1.33"
  }
}));

export default withCustomStyles;
