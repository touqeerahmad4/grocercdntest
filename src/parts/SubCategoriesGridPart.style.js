import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  subCategoriesCardMedia: {
    minHeight: "60px",
    minWidth: "80px",
    maxHeight: 150,
    maxWidth: 150
  },
  subCategoryCard: {
    padding: theme.spacing.unit,
    boxShadow: "none"
  }
}));

export default withCustomStyles;
