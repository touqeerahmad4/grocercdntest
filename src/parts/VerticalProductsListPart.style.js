import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  item: {
    borderBottom: theme.mixins.borderLine1
  }
}));

export default withCustomStyles;
