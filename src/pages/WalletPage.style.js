import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  greenColor: {
    color: theme.palette.secondary.main
  },
  centerContent: {
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default withCustomStyles;
