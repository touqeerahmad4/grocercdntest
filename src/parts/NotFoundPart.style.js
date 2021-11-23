import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  icon: {
    marginBottom: -5
  }
}));

export default withCustomStyles;
