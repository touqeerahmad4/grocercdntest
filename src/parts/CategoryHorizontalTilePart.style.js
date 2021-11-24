import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  item: {
    minWidth: "150px",
    minHeight: "150px",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    paddingLeft: 0
  },
  categoriesCardMedia: {
    minHeight: "100px",
    minWidth: "100px",
    maxHeight: 100,
    maxWidth: 100
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default withCustomStyles;
