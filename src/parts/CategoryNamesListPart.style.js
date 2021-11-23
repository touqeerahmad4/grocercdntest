import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  catSection: {
    [theme.breakpoints.up(365)]: {
      maxWidth: "50vw"
    }
  }
}));

export default withCustomStyles;
