import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: 488,
    scrollBehavior: "smooth",
    borderRadius: theme.spacing.unit / 2,
    margin: `${theme.spacing.unit * 2}px 0`,
    "&:hover button": {
      [theme.breakpoints.up(1000)]: {
        display: "block"
      }
    }
  },
  horizontalContainer: {
    overflowX: "scroll",
    minWidth: 400
  },
  minHeight: {
    minHeight: "350px"
  },
  rightFloatingBtn: {
    display: "none",
    "&:hover": {
      backgroundColor: theme.palette.common.white
    },
    position: "absolute",
    top: "140px",
    height: "100px",
    bottom: 0,
    right: 0,
    zIndex: 10,
    boxShadow: "-5px 0px 7px -2px #888"
  },
  leftFloatingBtn: {
    "&:hover": {
      backgroundColor: theme.palette.common.white
    },
    display: "none",
    position: "absolute",
    top: "140px",
    height: "100px",
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
