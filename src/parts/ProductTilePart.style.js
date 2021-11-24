import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  card: {
    border: theme.mixins.borderLine2,
    padding: theme.spacing.unit,
    width: "100%"
  },
  cardMediaItem: {
    minHeight: 130,
    [theme.breakpoints.up("sm")]: {
      minHeight: 150
    },
    minWidth: "100%",
    marginBottom: theme.spacing.unit,
    position: "relative"
  },
  cardMedia: {
    maxHeight: 130,
    maxWidth: 130,
    [theme.breakpoints.up("sm")]: {
      maxHeight: 150,
      maxWidth: 150
    }
  },
  cardMediaHorizontal: {
    maxHeight: 130,
    maxWidth: 130,
    minHeight: 130,
    minWidth: 130,
    [theme.breakpoints.up("sm")]: {
      maxHeight: 150,
      maxWidth: 150
    }
  },
  outOfStock: {
    filter: "grayscale(1)",
    fontWeight: 750,
    marginBottom: theme.spacing.unit,
    padding: "10px 20px"
  },
  outOfStockSVG: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",
    width: "100px",
    height: "100px",
    opacity: 0.75
  },
  dealFlash: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    border: theme.mixins.borderLine5,
    display: "inline-block",
    lineHeight: "1",
    visibility: "initial",
    marginTop: "1px",
    position: "relative",
    zIndex: "1",
    textTransform: "uppercase",
    top: "0px",
    left: "0px",
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`
  },
  hiddenDeal: {
    visibility: "hidden",
    lineHeight: "1",
    marginTop: "1px",
    position: "relative",
    zIndex: "1",
    top: "0px",
    left: "0px",
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit * 2}px`
  },
  nonDealPrice: {
    textDecoration: "line-through"
  },
  textLineHeight: {
    maxHeight: 22,
    marginBottom: 4
  }
}));

export default withCustomStyles;
