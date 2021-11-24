import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { loginRouteWithRedirect } from "../utils/UrlUtils";

const PrivateRouteService = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={loginRouteWithRedirect(props.location)} />
        )
      }
    />
  );
};

PrivateRouteService.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
    .isRequired
};

export default PrivateRouteService;
