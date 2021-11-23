import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    borderRadius: theme.spacing.unit / 2,
    margin: theme.spacing.unit * 2
  },
  horizontalContainer: {
    overflow: "scroll",
    minWidth: 400,
    margin: 0
  },
  text: {
    marginLeft: -8
  },
  arrow: {
    marginRight: -8
  },
  overflow: {
    overflow: "auto",
    padding: theme.spacing.unit
  }
}));

export default withCustomStyles;
