import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  formControl: {
    margin: "16px 8px"
  },
  padding0: {
    padding: 0
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  },
  mapItem: {
    height: "50vh",
    marginBottom: 16
  },
  mapCont: {
    minWidth: "300px"
  },
  btnDanger: {
    color: theme.palette.error.main,
    "&:hover": {
      textDecoration: "underline",
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  }
}));

export default withCustomStyles;
