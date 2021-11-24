import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  paper: {
    margin: 16,
    borderRadius: 8,
    padding: 16
  },
  heading: {
    paddingBottom: 8,
    fontWeight: "bold"
  },
  dialogContent: {
    padding: "8px !important"
  },
  noButton: {
    marginBottom: 8,
    marginRight: 16
  }
}));

export default withCustomStyles;
