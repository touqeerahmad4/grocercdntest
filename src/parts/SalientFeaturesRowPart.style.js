import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  salientFeaturesRow: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  iconItem: {
    paddingRight: theme.spacing.unit * 2
  }
}));

export default withCustomStyles;
