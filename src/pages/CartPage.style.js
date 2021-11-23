import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: theme.spacing.minHeightPage
  },
  titleCaption: {
    marginTop: 5,
    marginLeft: 5
  }
}));

export default withCustomStyles;
