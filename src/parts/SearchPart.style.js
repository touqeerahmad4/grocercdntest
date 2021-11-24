import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white
  },
  searchIcon: {
    padding: "10px 0px 1px 11px"
  },
  inputRoot: {
    display: "flex",
    height: 40
  },
  inputItem: {
    border: theme.mixins.borderLine6,
    borderRadius: "3px 0px 0px 3px"
  },
  inputInput: {
    padding: "8px 8px 8px 16px",
    ...theme.typography.body2
  },
  iconItem: {
    minWidth: "48px",
    maxWidth: "48px",
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
  }
}));

export default withCustomStyles;
