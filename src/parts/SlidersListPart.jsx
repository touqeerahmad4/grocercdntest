import React from "react";
import withCustomStyles from "./SlidersListPart.style";
import withRouter from "react-router/es/withRouter";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAbsUrl, getUrlPath } from "../utils/UrlUtils";
import gtmService from "../services/GTMService";
import { getStandardAnalyticsSlider } from "../utils/SliderUtils";
import * as classnames from "classnames";

const SlidersListPart = props => {
  const { sliders, classes } = props;

  const link = slider => {
    if (
      slider.landing_page &&
      slider.landing_page.startsWith("https://grocerapp.pk")
    ) {
      return getUrlPath(slider.landing_page);
    }
    return slider.link_type === "category"
      ? `cn/category/cid/${slider.link_id}`
      : "#";
  };
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToScroll: true,
    initialSlide: 0,
    centerPadding: 60
  };

  return (
    <div className={classes.root}>
      <Slider {...settings}>
        {sliders.map(slider => (
          <Link
            key={slider.id}
            component="div"
            to={link(slider)}
            onClick={() =>
              gtmService.pageView(
                "/slider-click",
                getStandardAnalyticsSlider(slider, getAbsUrl(link(slider)))
              )
            }
          >
            <img
              width="1025"
              height="341"
              src={slider.image_url}
              alt="Slider"
              className={classnames("lazyload", classes.image)}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default withRouter(withCustomStyles(SlidersListPart));
