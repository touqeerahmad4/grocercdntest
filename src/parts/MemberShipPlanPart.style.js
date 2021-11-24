import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down("md")]: {
      padding: `${theme.spacing.unit * 2}px 0px`
    }
  },
  memberShipIcon: {
    marginBottom: theme.spacing.unit * 2
  },
  plan: {
    maxWidth: "700px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}));

export default withCustomStyles;
