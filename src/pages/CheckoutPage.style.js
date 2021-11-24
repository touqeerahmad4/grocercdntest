import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    padding: theme.spacing.unit
  },
  changeButton: {
    padding: "5px 8px"
  }
}));

export default withCustomStyles;
