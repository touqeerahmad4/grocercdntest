import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    borderRadius: theme.spacing.unit / 2,
    margin: `${theme.spacing.unit * 2}px 0`
  },
  item: {
    minWidth: "90px",
    padding: theme.spacing.unit
  },
  categoriesCardMedia: {
    minHeight: "60px",
    minWidth: "60px",
    maxHeight: "100px"
  },
  displayFlex: {
    display: "flex"
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "0%"
  },
  brandTitle: {
    lineHeight: "1.5rem",
    height: "3rem",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2
  }
}));

export default withCustomStyles;
