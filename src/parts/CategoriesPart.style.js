import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: "800px",
    marginTop: theme.spacing.unit * 2
  }
}));

export default withCustomStyles;
