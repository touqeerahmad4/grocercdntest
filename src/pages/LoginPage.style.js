import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  blockScreen: {
    position: "fixed",
    height: "100vh",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 9999
  }
}));

export default withCustomStyles;
