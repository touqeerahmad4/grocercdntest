import withSharedStyles from "../theme/Shared.style";

const withCustomStyles = withSharedStyles(() => ({
  input: {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "calc(100% - 18px)",
    height: "40px",
    margin: "8px",
    padding: "0 12px",
    borderRadius: "3px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipses"
  }
}));

export default withCustomStyles;
