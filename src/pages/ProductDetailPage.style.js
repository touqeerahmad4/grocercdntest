import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    border: theme.mixins.borderLine2,
    minHeight: "300px"
  },
  cardContent: {
    padding: theme.spacing.unit
  },
  outOfStock: {
    filter: "grayscale(1)"
  },
  outOfStockSVG: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",
    width: "150px",
    height: "150px",
    [theme.breakpoints.up("sm")]: {
      width: "250px",
      height: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "300px",
      height: "300px"
    },
    opacity: 0.85
  },
  productName: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: "500",
    lineHeight: "1.6"
  },
  cardMediaItem: {
    minHeight: 130,
    [theme.breakpoints.up("sm")]: {
      minHeight: 150
    },
    minWidth: "auto",
    position: "relative"
  },
  cardMedia: {
    width: "100%",
    height: "45vh",
    [theme.breakpoints.up("sm")]: {
      height: "55vh"
    },
    [theme.breakpoints.up("md")]: {
      width: "auto",
      height: "65vh"
    }
  },
  unit: {
    paddingTop: theme.spacing.unit
  },
  price: {
    paddingTop: theme.spacing.unit * 2
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
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    fontSize: theme.typography.fontSize
  },
  addToCartButton: {
    marginTop: theme.spacing.unit
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
    textDecoration: "line-through",
    marginLeft: theme.spacing.unit * 2
  },
  whyShopHeading: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2
  },
  textLineHeight: {
    maxHeight: 22,
    marginBottom: 8
  },
  dynamicHtml: {
    marginTop: theme.spacing.unit,
    overflow: "scroll"
  }
}));

export default withCustomStyles;
