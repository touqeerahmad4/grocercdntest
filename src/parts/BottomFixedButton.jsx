import React, { Component } from "react";
import withCustomStyles from "./BottomFixedButton.style";
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import LoadMorePart from "./LoadMorePart";
import PropTypes from "prop-types";
import { _isUndefined, stringOrArraytoArray } from "../utils/HelperUtils";
import { isFetching } from "../utils/StoreUtils";
import { Link } from "react-router-dom";

@inject(["routerStore"])
@observer
class BottomFixedButton extends Component {
  render() {
    const {
      props: { classes, content, onClick, state, to }
    } = this;

    let stateArr = stringOrArraytoArray(state);

    const button = !_isUndefined(to) ? (
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={to}
        className={classes.largeButton}
        onClick={onClick}
      >
        {content}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        className={classes.largeButton}
        onClick={onClick}
      >
        {content}
      </Button>
    );

    return (
      <Card className={classes.root}>
        {isFetching(stateArr) && <LoadMorePart className={classes.loadMore} />}
        {!isFetching(stateArr) && button}
      </Card>
    );
  }
}

BottomFixedButton.propTypes = {
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

BottomFixedButton.defaultProps = {
  state: "pending"
};

export default withRouter(withCustomStyles(BottomFixedButton));
