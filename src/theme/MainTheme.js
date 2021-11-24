import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const spacingUnit = 8;
const offWhite = "#eee";
const lightOffWhite = "#f8f8f8";
const white = "#fff";
const black = "#1C2223";
const green = "#51AA1A";
const lightBlack = "#dbdbdb";
const lightGreen = "#51aa1b";
const grey = "#ccc";
const primaryMain = "#F28029";
export const mainThemeObject = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      lg: 1280,
      sm: 600,
      xl: 1920,
      md: 1025
    }
  },
  mixins: {
    borderLine1: `1px solid ${lightOffWhite}`,
    borderLine2: `1px solid ${offWhite}`,
    borderLine3: `1px solid ${lightBlack}`,
    borderLine4: `1px solid ${grey}`,
    borderLine5: `1px solid ${lightGreen}`,
    borderLine6: `1px solid ${primaryMain}`,
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: 48
      },
      "@media (min-width:600px)": {
        minHeight: 64
      }
    },
    typography: {
      caption2: {
        color: "#999",
        fontSize: "13px",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "normal"
      },
      body3: {
        color: "#666",
        fontSize: "0.9rem",
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: "400",
        lineHeight: "1.35em",
        letterSpacing: "0.00938em"
      },
      captionH5: {
        color: "rgba(0, 0, 0, 0.60)",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "1.35417em",
        fontSize: "1.5rem",
        fontWeight: 700
      },
      smallBoldWhite: {
        color: white,
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "normal"
      },
      smallBoldBlack: {
        color: green,
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "normal"
      }
    }
  },
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
  ],
  direction: "ltr",
  overrides: {
    MuiCard: {
      root: {
        boxShadow:
          "0 1px 1px rgba(0,0,0,.15), -1px 0 0 rgba(0,0,0,.03), 1px 0 0 rgba(0,0,0,.03), 0 1px 0 rgba(0,0,0,.12)"
      }
    },
    MuiCardMedia: {
      root: {
        height: "auto"
      }
    },
    MuiAppBar: {
      root: {
        boxShadow: "none"
      }
    },
    MuiDivider: {
      root: {
        margin: "8px 0px"
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: white
      }
    },
    MuiPaper: {
      root: {
        boxShadow: "none",
        padding: spacingUnit * 3
      },
      elevation2: {
        boxShadow: "none"
      }
    }
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    duration: {
      standard: 300,
      short: 250,
      enteringScreen: 225,
      shorter: 200,
      leavingScreen: 195,
      shortest: 150,
      complex: 375
    }
  },
  typography: {
    useNextVariants: true,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    button: {
      textTransform: "uppercase",
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "0.875rem",
      fontWeight: 500
    },
    body2: {
      color: "rgba(0, 0, 0, 0.54)"
    },
    fontFamily: "'Open Sans', sans-serif",
    caption: {
      color: "rgba(0, 0, 0, 0.54)"
    },
    fontSize: 14,
    fontWeightMedium: 500
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    drawer: 1200,
    appBar: 1100,
    mobileStepper: 1000,
    tooltip: 1500
  },
  shape: {
    borderRadius: 3
  },
  props: {},
  spacing: {
    unit: spacingUnit,
    minHeightPage: "55vh"
  },
  palette: {
    tonalOffset: 0.2,
    background: {
      paper: "#FFFFFF",
      default: "#F9F9F9"
    },
    contrastThreshold: 3,
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      A700: "#616161",
      A100: "#d5d5d5",
      A400: "#303030",
      A200: "#aaaaaa"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    divider: "rgba(0, 0, 0, 0.12)",
    secondary: {
      main: green,
      light: "#f2fef2",
      dark: "rgb(56, 118, 18)",
      contrastText: "#000000"
    },
    common: {
      black: black,
      white: white,
      green,
      yellow: "#fffbc7",
      offWhite,
      lightOffWhite,
      red: "#f34343",
      grey
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    type: "light",
    action: {
      hoverOpacity: 0.08,
      hover: "rgba(0, 0, 0, 0.08)",
      selected: "rgba(0, 0, 0, 0.14)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabled: "rgba(0, 0, 0, 0.26)",
      active: "rgba(0, 0, 0, 0.54)"
    },
    primary: {
      main: primaryMain,
      light: "rgb(244, 153, 83)",
      dark: "rgb(169, 89, 28)",
      contrastText: "#FFFFFF"
    }
  },
  themeName: "GrocerApp Theme"
};
const MainTheme = createMuiTheme(mainThemeObject);

export default MainTheme;
