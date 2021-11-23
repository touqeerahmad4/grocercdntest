import React from "react";
import withCustomStyles from "./CategoryChipPart.style";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { _isUndefined } from "../utils/HelperUtils";

class CategoryChipPart extends React.Component {
  render() {
    const {
      props: { classes, label, onClick, isSelected, to }
    } = this;

    return _isUndefined(to) ? (
      <Chip
        label={label}
        clickable
        onClick={onClick}
        className={classes.margin1}
        color="primary"
        variant={isSelected ? "default" : "outlined"}
      />
    ) : (
      <Chip
        label={label}
        clickable
        component={Link}
        to={to}
        onClick={onClick}
        className={classes.margin1}
        color="primary"
        variant={isSelected ? "default" : "outlined"}
      />
    );
  }
}

CategoryChipPart.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

export default withCustomStyles(CategoryChipPart);
