import React from "react";
import withCustomStyles from "./CategoryChipsPart.style";
import withRouter from "react-router/es/withRouter";
import {
  getProductsPageUrl,
  getSiteMapProductsPageUrl
} from "../utils/UrlUtils";
import CategoryChipPart from "./CategoryChipPart";

const CategoryChipsPart = props => {
  const { categories, isSiteMap } = props;

  return categories.map(category => (
    <CategoryChipPart
      label={category.name}
      to={
        isSiteMap
          ? getSiteMapProductsPageUrl(category)
          : getProductsPageUrl(category)
      }
      key={category.id}
    />
  ));
};

export default React.memo(withRouter(withCustomStyles(CategoryChipsPart)));
