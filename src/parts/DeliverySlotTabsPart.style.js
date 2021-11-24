import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  dayLabel: {
    backgroundColor: theme.palette.primary.main
  }
}));

export default withCustomStyles;
