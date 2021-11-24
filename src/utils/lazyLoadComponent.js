import React from "react";
import LazyLoad from "react-lazyload";
import { isHeadless } from "./AppUtils";

export const lazyLoadComponentInViewPort = (Comp, props) => {
  return isHeadless() ? Comp : <LazyLoad {...props}>{Comp}</LazyLoad>;
};
