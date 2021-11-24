import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  loader: {
    margin: 0
  }
}));

export default withCustomStyles;
