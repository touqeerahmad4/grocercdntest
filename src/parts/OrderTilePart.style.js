import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  card: {
    height: "100%",
    border: theme.mixins.borderLine2,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  mainRow: {
    borderBottom: theme.mixins.borderLine2,
    padding: theme.spacing.unit
  },
  priceRow: {
    borderBottom: theme.mixins.borderLine2,
    padding: "8px 8px 0px 8px"
  },
  timer: {
    marginRight: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit / 4
  },
  green: {
    backgroundColor: theme.palette.common.green
  },
  red: {
    backgroundColor: theme.palette.error.main
  },
  main: {
    backgroundColor: theme.palette.primary.main
  },
  doneIcon: {
    color: "white",
    borderRadius: theme.spacing.unit * 2
  },
  newIcon: {
    color: "white",
    borderRadius: theme.spacing.unit
  },
  reorder: {
    padding: "5px 8px"
  },
  retryMain: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 1.25,
    "& button": {
      minWidth: "max-content"
    }
  }
}));

export default withCustomStyles;
