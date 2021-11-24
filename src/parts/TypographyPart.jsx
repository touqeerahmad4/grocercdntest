import React from "react";
import PropTypes from "prop-types";
import withCustomStyles from "./TypographyPart.style";
import { consoleError } from "../utils/AppUtils";

const TypographyPart = props => {
  const { classes, variant, className } = props;
  if (!classes[variant]) {
    consoleError(`TypographyPart: Unknown variant ${variant}`);
  }
  return (
    <div className={`${classes[variant]} ${className || ""}`}>
      {props.children}
    </div>
  );
};

TypographyPart.propTypes = {
  variant: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default withCustomStyles(TypographyPart);
