import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit
  }
}));

export default withCustomStyles;
