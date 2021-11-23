import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  cssLabel: {
    "&$cssFocused": {
      color: theme.palette.primary.main
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: theme.palette.primary.main
    }
  },
  notchedOutline: {},
  inputRoot: {
    width: "100%"
  },
  root: {
    padding: theme.spacing.unit
  }
}));

export default withCustomStyles;
