import React from "react";
import withCustomStyles from "./SampleStatelessPart.style";
import withRouter from "react-router/es/withRouter";

const SampleStateLess = props => {
  const { classes } = props;

  return <div className={classes.root}>Sample</div>;
};

export default withRouter(withCustomStyles(SampleStateLess));
