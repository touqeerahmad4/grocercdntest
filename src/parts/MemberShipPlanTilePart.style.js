import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    cursor: "pointer",
    borderRadius: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 1.3,
    width: "170px",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing.unit,
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 0.6}px`,
      width: "110px",
      minWidth: "100px"
    }
  },
  header: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down("md")]: {
      padding: 0
    },
    paddingBottom: 0
  },
  content: {
    paddingTop: theme.spacing.unit * 1,
    "& :nth-child(1)": {
      textDecoration: "line-through"
    }
  }
}));

export default withCustomStyles;
