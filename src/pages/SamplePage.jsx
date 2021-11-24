import React from "react";
import withCustomStyles from "./SamplePage.style";
import withRouter from "react-router/es/withRouter";

class SamplePage extends React.Component {
  render() {
    const {
      props: { classes }
    } = this;

    return <div className={classes.minHeightPage}>Sample</div>;
  }
}

export default withRouter(withCustomStyles(SamplePage));
