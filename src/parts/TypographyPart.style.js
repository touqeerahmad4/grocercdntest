import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  captionH5: {
    ...theme.mixins.typography.captionH5
  },
  body3: {
    ...theme.mixins.typography.body3
  },
  caption2: {
    ...theme.mixins.typography.caption2
  },
  smallBoldWhite: {
    ...theme.mixins.typography.smallBoldWhite
  },
  smallBoldBlack: {
    ...theme.mixins.typography.smallBoldBlack
  }
}));

export default withCustomStyles;
