import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  },
  padding0: {
    padding: 0
  }
}));

export default withCustomStyles;
