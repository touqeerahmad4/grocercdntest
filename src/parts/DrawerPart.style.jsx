import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  listItem: {
    borderBottom: theme.mixins.borderLine3,
    textDecoration: "none"
  },
  drawer: {
    "& > div": {
      padding: 0
    }
  },
  closeIcon: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "flex-end",
    height: "30px",
    "& > button": {
      width: "30px"
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawerChild: {
    padding: theme.spacing.unit * 2.5
  }
}));

export default withCustomStyles;
