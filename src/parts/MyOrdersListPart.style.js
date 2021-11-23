import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  tileItem: {
    padding: "12px 6px 0"
  }
}));

export default withCustomStyles;
