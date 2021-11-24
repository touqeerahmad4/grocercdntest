import withSharedStyles from "./theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  app: {
    width: "100%",
    maxWidth: "100%"
  },
  upLift: {
    marginBottom: theme.spacing.unit * 8
  },
  mdWidth: {
    width: theme.breakpoints.values.md
  }
}));

export default withCustomStyles;
