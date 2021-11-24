import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: theme.spacing.minHeightPage
  },
  link: {
    display: "block"
  }
}));

export default withCustomStyles;
