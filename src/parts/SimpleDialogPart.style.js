import withSharedStyles from "../theme/Shared.style";

// TODO: Need to fix the root css if possible
const withCustomStyles = withSharedStyles(theme => ({
  root: {
    "& > div > div": {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2
    }
  },
  button: {
    display: "inline-flex",
    justifyContent: "flex-end",
    width: "100%",
    "& button": {
      margin: `0 ${theme.spacing.unit * 0.6}px`,
      padding: `${theme.spacing.unit * 1.2}px ${theme.spacing.unit * 1.3}px`
    }
  }
}));

export default withCustomStyles;
