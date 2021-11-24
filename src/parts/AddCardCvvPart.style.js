import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  cardIcon: {
    position: "absolute",
    right: "34px"
  },
  paper: {
    padding: "0px",
    paddingTop: theme.spacing.unit * 2
  },
  gutter: {
    padding: `0 ${theme.spacing.unit}px`,
    paddingBottom: theme.spacing.unit * 2
  }
}));

export default withCustomStyles;
