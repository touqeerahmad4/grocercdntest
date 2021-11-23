import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    borderRadius: theme.spacing.unit / 2,
    margin: `${theme.spacing.unit * 2}px 0`
  },
  item: {
    minWidth: "150px",
    padding: theme.spacing.unit
  },
  categoriesCardMedia: {
    minHeight: "60px",
    minWidth: "80px",
    maxHeight: 100,
    maxWidth: 100
  },
  displayFlex: {
    display: "flex"
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center"
  },
  horizontalContainer: {
    [theme.breakpoints.down(700)]: {
      overflowX: "scroll"
    },
    width: "100%",
    padding: `${theme.spacing.unit}px 0`
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
