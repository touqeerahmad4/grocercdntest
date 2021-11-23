import React from "react";
import withCustomStyles from "./SamplePart.style";
import withRouter from "react-router/es/withRouter";
import * as classnames from "classnames";

class SamplePart extends React.Component {
  render() {
    const {
      props: { classes }
    } = this;

    return <div className={classnames(classes.root)}>Sample</div>;
  }
}

export default withRouter(withCustomStyles(SamplePart));
