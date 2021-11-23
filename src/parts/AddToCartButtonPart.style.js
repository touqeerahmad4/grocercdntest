import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {},
  largeButton: {
    width: "100%",
    padding: "8px 16px",
    border: theme.mixins.borderLine6,
    fontWeight: 600,
    marginBottom: theme.spacing.unit,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  icon: {
    color: theme.palette.common.white
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: theme.mixins.borderLine6,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  iconDisabled: {
    color: theme.palette.common.grey
  },
  iconButtonDisabled: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: theme.mixins.borderLine4,
    "&:hover": {
      backgroundColor: theme.palette.common.white
    }
  },
  fixedWidthQuantity: {
    width: 32
  },
  quantity: {
    textAlign: "center"
  },
  smallIconButton: {
    padding: "4px 8px"
  },
  largeIconButton: {
    padding: "8px 16px"
  }
}));

export default withCustomStyles;
