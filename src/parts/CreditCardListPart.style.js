import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    marginBottom: theme.spacing.unit
  },
  disableGutters: {
    padding: "0px"
  },
  addCard: {
    width: "100%",
    "&:hover": {
      backgroundColor: "inherit"
    },
    "&:focus": {
      backgroundColor: "inherit"
    }
  }
}));

export default withCustomStyles;
