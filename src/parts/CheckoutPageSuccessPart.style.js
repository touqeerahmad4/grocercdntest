import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  logo: {
    width: 72,
    height: 72
  }
}));

export default withCustomStyles;
