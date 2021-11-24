import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  formControl: {
    margin: "16px 8px"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  },
  containerMargin: {
    marginTop: "8vh"
  }
}));

export default withCustomStyles;
