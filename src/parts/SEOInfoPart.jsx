import React from "react";
import withCustomStyles from "./SEOInfoPart.style";
import withRouter from "react-router/es/withRouter";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { grocerAppDesc } from "../utils/SEOUtils";
import { limitByWord } from "../utils/HelperUtils";

const SEOInfoPart = props => {
  const { title, description, url, image, imageAlt } = props;

  return (
    <Helmet>
      <title>{limitByWord(title)}</title>
      <meta content={title} property="og:title" />
      <meta content={title} name="twitter:title" />
      <meta content={title} name="twitter:text:title" />

      <meta content={description} name="description" />
      <meta content={description} property="og:description" />
      <meta content={description} name="twitter:description" />

      <meta content={url} property="og:url" />

      <meta content={image} property="og:image" />
      <meta content={image} property="twitter:image" />

      <meta content={imageAlt} property="og:image:alt" />

      <meta content={imageAlt} property="twitter:image:alt" />

      <meta content="website" property="og:type" />

      <meta content="GrocerApp Pvt. Ltd" property="og:site_name" />

      <meta
        content={process.env.REACT_APP_FACEBOOK_APP_ID}
        property="fb:app_id"
      />
      <meta
        content={process.env.REACT_APP_ANDROID_APP_ID}
        property="twitter:app:id:googleplay"
      />
      <meta
        content={process.env.REACT_APP_IPHONE_APP_ID}
        property="twitter:app:id:iphone"
      />
      <meta
        content={process.env.REACT_APP_IPAD_APP_ID}
        property="twitter:app:id:ipad"
      />

      <meta
        content={process.env.REACT_APP_ANDROID_APP_NAME}
        property="twitter:app:name:googleplay"
      />
      <meta
        content={process.env.REACT_APP_IPHONE_APP_NAME}
        property="twitter:app:name:iphone"
      />
      <meta
        content={process.env.REACT_APP_IPAD_APP_NAME}
        property="twitter:app:name:ipad"
      />

      <meta
        content={process.env.REACT_APP_ANDROID_APP_URL}
        property="twitter:app:url:googleplay"
      />
      <meta
        content={process.env.REACT_APP_IPHONE_APP_URL}
        property="twitter:app:url:iphone"
      />
      <meta
        content={process.env.REACT_APP_IPAD_APP_URL}
        property="twitter:app:url:ipad"
      />

      <meta content="app" name="twitter:card" />

      <meta content="@grocerapppk" name="twitter:site" />

      <meta content="@GsadiqG" name="twitter:creator" />
    </Helmet>
  );
};

SEOInfoPart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  isProduct: PropTypes.bool
};

SEOInfoPart.defaultProps = {
  title: "GrocerApp: Online Grocery Delivery up to 50% OFF",
  description: grocerAppDesc(),
  url: "https://grocerapp.pk",
  image:
    "https://pictures.grocerapps.com/original/grocerapp-large-logo-5e6d96218036a.png",
  imageAlt: "GrocerApp logo",
  isProduct: false
};

export default withRouter(withCustomStyles(SEOInfoPart));
