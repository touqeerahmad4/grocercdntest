import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  root: {
    minHeight: 200
  }
}));

export default withCustomStyles;
