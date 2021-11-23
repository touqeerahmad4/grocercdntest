import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  categoriesButton: {
    padding: theme.spacing.unit,
    fontSize: "12px",
    marginRight: "10px",
    marginBottom: "10px",
    marginTop: "10px",
    textTransform: "none",
    backgroundColor: "#fff"
  }
}));

export default withCustomStyles;
