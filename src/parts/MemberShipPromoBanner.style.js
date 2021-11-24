import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    backgroundColor: "#FFE0CD"
  },
  bottomBanner: {
    zIndex: 40,
    display: "block",
    position: "fixed",
    bottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      paddingLeft: theme.spacing.unit * 0.7,
      paddingRight: theme.spacing.unit * 0.7
    },
    transition: "all 0.4s ease-in"
  },
  closeAnim: {
    transform: "translateY(100%)",
    opacity: 0.5
  },
  closeButton: {
    display: "block"
  },
  marginLeft1: {
    marginLeft: "15px"
  },
  text: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    }
  },
  headText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      maxWidth: "200px"
    }
  },
  subText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
      maxWidth: "200px"
    }
  },
  price: {
    textDecoration: "line-through",
    paddingLeft: theme.spacing.unit * 0.6
  },
  linkButton: {
    padding: 0,
    width: "100%",
    textTransform: "capitalize"
  },
  membership: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.contrastText
  }
}));

export default withCustomStyles;
