import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  inputElement: {
    height: theme.spacing.unit * 7,
    maxHeight: theme.spacing.unit * 9,
    border: "1px solid",
    borderColor: theme.palette.action.disabled,
    marginBottom: theme.spacing.unit * 2,
    borderRadius: "3px",
    paddingRight: theme.spacing.unit * 2,
    margin: theme.spacing.unit,

    "& .frame--activated": {
      height: "inherit"
    }
  },
  inputHeight: {
    height: theme.spacing.unit * 7,
    maxHeight: theme.spacing.unit * 9
  },
  cardButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  cardIcon: {
    display: "flex",
    justifyContent: "flex-end"
  },
  verifyText: {
    display: "flex",
    paddingTop: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4
  },
  gutterLeft: {
    paddingLeft: theme.spacing.unit
  },
  hide: {
    display: "none"
  }
}));

export default withCustomStyles;
