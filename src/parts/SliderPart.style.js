import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    minHeight: "180px",
    boxShadow: "none"
  },
  loadingSkeleton: {
    height: "auto",
    width: "100%",
    maxHeight: "45vw",
    minHeight: "45vw",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "35vw",
      minHeight: "35vw"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "25vw",
      minHeight: "25vw"
    }
  }
}));

export default withCustomStyles;
