import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  section: {
    padding: "0px 24px 4px 0px"
  }
}));

export default withCustomStyles;
