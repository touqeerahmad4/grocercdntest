import React from "react";
import withCustomStyles from "./ImageWithLoaderPart.style";
import PropTypes from "prop-types";
import withRouter from "react-router/es/withRouter";
import CardMedia from "@material-ui/core/CardMedia";
import { getLargeBrokenCarrot } from "../utils/UrlUtils";
import * as classnames from "classnames";
import RootRef from "@material-ui/core/RootRef";
import loadingCarrot from "../assets/images/loading_carrot.png";
import { isHeadless } from "../utils/AppUtils";

class ImageWithLoaderPart extends React.Component {
  imageRef = React.createRef();

  state = {
    isLoading: true,
    isError: false
  };

  handleLoad = () => {
    this.setState({
      ...this.state,
      isLoading: false
    });
  };

  componentDidUpdate(prevProps) {
    if (this.imageRef.current && prevProps.src !== this.props.src) {
      this.imageRef.current.classList.add("lazyload");
    }
  }

  handleError = () => {
    this.setState({
      ...this.state,
      isError: true
    });
    this.imageRef.current.src = getLargeBrokenCarrot();
  };

  render() {
    const {
      props: { className, src, alt, width, height }
    } = this;

    return (
      <RootRef rootRef={this.imageRef}>
        {isHeadless() ? (
          <CardMedia
            component="img"
            src={src}
            width={width ? width : "auto"}
            height={height ? height : "auto"}
            alt={alt || "product_img"}
            className={className}
          />
        ) : (
          <CardMedia
            component="img"
            src={loadingCarrot}
            width={width ? width : "auto"}
            height={height ? height : "auto"}
            data-src={!src ? getLargeBrokenCarrot() : src}
            alt={alt || "product_img"}
            onError={this.handleError}
            className={classnames("lazyload", className)}
          />
        )}
      </RootRef>
    );
  }
}

ImageWithLoaderPart.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  loaderClass: PropTypes.string
};

export default withRouter(withCustomStyles(ImageWithLoaderPart));
