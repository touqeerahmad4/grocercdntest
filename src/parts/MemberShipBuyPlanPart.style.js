import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  price: {
    textDecoration: "line-through"
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing.unit,
    border: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing.unit
  }
}));

export default withCustomStyles;
