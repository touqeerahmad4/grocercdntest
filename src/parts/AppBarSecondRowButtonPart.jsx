import React from "react";
import withCustomStyles from "./AppBarSecondRowButtonPart.style";
import classNames from "classnames";
import ListOutlined from "@material-ui/icons/ListOutlined";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AppBarSecondRowButtonPart = props => {
  const { classes } = props;

  return (
    <Button
      variant="contained"
      color="default"
      component={Link}
      to={props.to}
      onClick={props.onClick}
      className={classNames(classes.categoriesButton, props.className || "")}
    >
      <ListOutlined color="primary" />
      {props.children}
    </Button>
  );
};

AppBarSecondRowButtonPart.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
};

export default withCustomStyles(AppBarSecondRowButtonPart);
