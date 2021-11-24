import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  link: {
    textDecoration: "none"
  }
}));

export default withCustomStyles;
