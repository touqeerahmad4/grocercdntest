import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  section: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.action.disabledBackground
  },
  faqAnswers: {
    paddingTop: 0,
    "& p": {
      margin: 0
    }
  }
}));

export default withCustomStyles;
