import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing.unit * 1.2,
    textAlign: "center",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  text: {
    color: theme.palette.primary.contrastText
  }
}));

export default withCustomStyles;
