import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  card: {
    height: "100%",
    boxShadow: "none",
    padding: "16px 8px 16px 0px"
  },
  cardMedia: {
    marginLeft: "calc(100% - 60px)",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "calc(100% - 100px)"
    },
    height: 60,
    width: 60
  },
  cardMediaItem: {
    height: 60,
    width: 60,
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit / 2
  },
  removeItem: {
    marginBottom: -theme.spacing.unit * 2
  },
  removeIcon: {
    color: theme.typography.caption.color
  },
  dealFlash: {
    backgroundColor: theme.palette.secondary.light,
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
    padding: "2px 8px",
    marginBottom: theme.spacing.unit / 2
  },
  nonDealPrice: {
    textDecoration: "line-through"
  },
  multiply: {
    margin: "2px 8px 0px 8px"
  }
}));

export default withCustomStyles;
