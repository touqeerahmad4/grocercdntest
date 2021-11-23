export const getStandardAnalyticsSlider = (slider, landingPage) => {
  if (!slider) return {};
  return {
    "slider id": slider.id.toString(),
    "slider name": slider.name,
    "slider image": slider.image_url,
    "landing page link": landingPage
  };
};
