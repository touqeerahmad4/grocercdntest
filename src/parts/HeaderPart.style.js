import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  appBar: {
    width: "100%",
    maxWidth: "100%",
    padding: "5px 0px 6px 6px",
    backgroundColor: theme.palette.common.white
  },
  secondRow: {
    paddingLeft: theme.spacing.unit
  },
  searchContainer: {
    padding: theme.spacing.unit,
    flex: 1
  },
  cart: {
    minWidth: 56,
    minHeight: 48
  },
  logo: {
    width: theme.spacing.unit * 6.5,
    height: theme.spacing.unit * 6,
    borderRadius: theme.spacing.unit * 4
  },
  cartIcon: {
    color: theme.palette.common.black,
    marginRight: theme.spacing.unit
  },
  cartItemsCount: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    padding: 5,
    position: "absolute",
    zIndex: 1,
    right: theme.spacing.unit,
    top: 5,
    minWidth: 24
  },
  countNumber: {
    textAlign: "center"
  },
  mapMarker: {
    marginRight: theme.spacing.unit,
    marginBottom: -2
  },
  deliveryAddress: {
    color: theme.palette.common.black,
    fontWeight: "bold"
  },
  expandMore: {
    marginBottom: -6
  },
  popperUi: {
    zIndex: 99999,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: "300px",
    maxWidth: "520px",
    top: "60px",
    borderRadius: theme.spacing.unit
  },
  dimBackground: {
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: theme.palette.common.black,
    top: 0,
    left: 0,
    opacity: 0.5,
    zIndex: 2
  },
  paddingRight1: {
    paddingRight: theme.spacing.unit
  },
  marginBottom0: {
    marginBottom: 0
  },
  cartIconGrid: {
    position: "relative"
  },
  btnLoading: {
    position: "absolute",
    width: "20px !important",
    height: "20px !important"
  },
  deliveryBtn: {
    padding: "6px 12px"
  }
}));

export default withCustomStyles;
