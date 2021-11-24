import React from "react";
import withCustomStyles from "./SearchPart.style";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { inject, observer } from "mobx-react";
import _debounce from "lodash/debounce";
import withRouter from "react-router/es/withRouter";
import { getSearchPageUrl } from "../utils/UrlUtils";
// import { DEFAULT_DEBOUNCE } from "../constatns/AppConstants";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

@inject(["searchProductsStore"])
@observer
class SearchPart extends React.Component {
  state = {
    query: ""
  };
  searchRef = React.createRef();
  // How to use debounce in react: https://stackoverflow.com/questions/51177064/how-to-use-debounce-in-reactjs?rq=1
  search = _debounce(query => {
    this.setState({
      ...this.state,
      query
    });
    if (query) {
      this.props.history.push(getSearchPageUrl(query));
    }
  }, 400);

  handleChange = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.focus();

    this.search(event.target.value);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname !== "/search" &&
      this.state.query &&
      this.searchRef.current
    ) {
      this.search("");
      this.searchRef.current.value = "";
    }
  }

  render() {
    const {
      props: { classes },
      state: { query }
    } = this;

    return (
      <div className={classes.search}>
        <Grid
          direction="row"
          justify="space-between"
          alignItems="stretch"
          container
        >
          <Grid item className={classes.inputItem} xs>
            <InputBase
              inputRef={this.searchRef}
              placeholder="Search"
              onKeyDown={e =>
                (e.which === 13 || e.keyCode === 13) && e.target.blur()
              }
              onChange={this.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </Grid>
          <Grid item className={classes.iconItem}>
            <Link
              component={RouterLink}
              to={getSearchPageUrl(query)}
              color={"inherit"}
              aria-label="Search button"
              className={classes.searchIcon}
            >
              <SearchIcon className={classes.marginTop1} />
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withCustomStyles(SearchPart));
