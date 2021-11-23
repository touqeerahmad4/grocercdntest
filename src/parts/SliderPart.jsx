import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import withCustomStyles from "./SliderPart.style";
import Card from "@material-ui/core/Card";
// import LoadMorePart from "./LoadMorePart";
import SlidersListPart from "./SlidersListPart";
import Skeleton from "react-loading-skeleton";

@inject(["slidersStore"])
@observer
class SliderPart extends Component {
  fetchAll() {
    this.props.slidersStore.fetch();
  }

  componentDidMount() {
    this.fetchAll();
  }

  render() {
    const { classes, slidersStore } = this.props;

    const LoadingPart = () => {
      return <Skeleton className={classes.loadingSkeleton} />;
    };

    return (
      <Card className={classes.root}>
        {/* {slidersStore.all.length === 0 && slidersStore.state === "fetching" && (
          <LoadMorePart />
        )} */}
        {slidersStore.all.length === 0 && slidersStore.state === "fetching" && (
          <LoadingPart />
        )}
        <SlidersListPart sliders={slidersStore.all} />
      </Card>
    );
  }
}

export default withCustomStyles(SliderPart);
