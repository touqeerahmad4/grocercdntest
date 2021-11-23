import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: 175,
    scrollBehavior: "smooth",
    borderRadius: theme.spacing.unit / 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    "&:hover": {
      "& > button": {
        [theme.breakpoints.up(1000)]: {
          display: "flex"
        }
      }
    }
  },
  item: {
    minWidth: "150px",
    minHeight: "150px",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    paddingLeft: 0,
    textAlign: "center"
  },
  categoriesCardMedia: {
    minHeight: "100px",
    minWidth: "100px",
    maxHeight: 100,
    maxWidth: 100
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center"
  },
  horizontalContainer: {
    overflowX: "scroll"
  },
  rightFloatingBtn: {
    display: "none",
    "&:hover": {
      backgroundColor: theme.palette.common.white
    },
    position: "absolute",
    top: "40px",
    height: "70px",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 0.5,
    bottom: 0,
    minWidth: "unset",
    right: 16,
    zIndex: 10,
    boxShadow: "-5px 0px 7px -2px #888"
  },
  leftFloatingBtn: {
    "&:hover": {
      backgroundColor: theme.palette.common.white
    },
    display: "none",
    minWidth: "unset",
    position: "absolute",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 0.5,
    top: "40px",
    height: "70px",
    bottom: 0,
    zIndex: 10,
    boxShadow: "4px 0px 7px -2px #888"
  },
  scrollbarColor: {
    "& > div::-webkit-scrollbar": {
      width: theme.spacing.unit * 1.2,
      height: theme.spacing.unit * 1.2,
      borderRadius: theme.spacing.unit * 2.5,
      backgroundColor: "#F5F5F5"
    },
    "& > div::-webkit-scrollbar-track": {
      background: "#F5F5F5",
      borderRadius: theme.spacing.unit * 1.2
    },
    "& > div::-webkit-scrollbar-thumb": {
      backgroundColor: "#9c9c9c" /* color of the scroll thumb */,
      borderRadius: theme.spacing.unit * 2.5
    }
  }
}));

export default withCustomStyles;
