import React from "react";
import withCustomStyles from "./RobotsNoIndexPart.style";
import { Helmet } from "react-helmet";

const RobotsNoIndexPart = () => {
  return (
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
  );
};

export default withCustomStyles(RobotsNoIndexPart);
