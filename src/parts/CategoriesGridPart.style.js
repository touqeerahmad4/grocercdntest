import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  categoryCard: {
    padding: theme.spacing.unit,
    boxShadow: "none",
    borderTop: theme.mixins.borderLine2,
    borderBottom: theme.mixins.borderLine2
  },
  mainCategoryRow: {
    maxHeight: 150
  },
  mainCategoryItem: {
    maxHeight: 150,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 4
    }
  },
  mainCategoryText: {
    backgroundColor: theme.palette.common.yellow,
    borderRadius: theme.shape.borderRadius
  },
  cardMedia: {
    maxHeight: 150,
    maxWidth: 150
  },
  productItem: {
    paddingBottom: theme.spacing.unit
  },
  expandMoreIcon: {
    width: "1.25em",
    height: "1.25em"
  },
  expand: {
    transform: "rotate(0deg)",
    paddingLeft: 0,
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  subCategoriesCardMedia: {
    minHeight: "60px",
    minWidth: "80px",
    maxHeight: 150,
    maxWidth: 150
  },
  subCategoryCard: {
    padding: theme.spacing.unit,
    boxShadow: "none",
    textAlign: "center"
  }
}));

export default withCustomStyles;
