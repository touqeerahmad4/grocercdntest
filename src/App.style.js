import withSharedStyles from "./theme/Shared.style";
import { mainThemeObject } from "./theme/MainTheme";

const withCustomStyles = withSharedStyles(() => ({
  notistackText: {
    color: mainThemeObject.palette.primary.contrastText
  },
  info: {
    backgroundColor: mainThemeObject.palette.primary.main
  }
}));

export default withCustomStyles;
