import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  cardBorder: {
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    border: `1px solid ${theme.palette.divider}`
  },
  detailPart: {
    maxWidth: "250px",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    fontWeight: "500"
  }
}));

export default withCustomStyles;
