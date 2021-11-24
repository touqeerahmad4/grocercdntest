import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  unit: {
    paddingTop: theme.spacing.unit
  }
}));

export default withCustomStyles;
