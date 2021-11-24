import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  link: {
    cursor: "pointer"
  }
}));

export default withCustomStyles;
