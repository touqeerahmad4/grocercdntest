import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  image: {
    width: "100%",
    height: "auto"
  }
}));

export default withCustomStyles;
