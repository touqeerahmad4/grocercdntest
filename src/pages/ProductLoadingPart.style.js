import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  loadingSkeleton: {
    minHeight: 368,
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    padding: "10px 10px 20px"
  },
  skeletonImg: {
    width: "auto",
    maxHeight: 150,
    margin: "auto"
  },
  marginSkeleton: {
    marginBottom: 10
  },
  tileItem: {
    padding: "12px 6px 0"
  }
}));

export default withCustomStyles;
