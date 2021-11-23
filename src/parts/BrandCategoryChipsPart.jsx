import React from "react";
import withCustomStyles from "./BrandCategoryChipsPart.style";
import withRouter from "react-router/es/withRouter";
import { getBrandPageUrl } from "../utils/UrlUtils";
import CategoryChipPart from "./CategoryChipPart";

const BrandCategoryChipsPart = props => {
  const { categories, slug, cid } = props;

  const categoryChips = categories.map(category => (
    <CategoryChipPart
      label={`${category.name} (${category.num_of_products})`}
      to={getBrandPageUrl(slug, category)}
      key={category.id}
      isSelected={parseInt(cid) === parseInt(category.id)}
    />
  ));

  return (
    <>
      <CategoryChipPart
        label={"All"}
        to={getBrandPageUrl(slug)}
        isSelected={!cid}
      />
      {categoryChips}
    </>
  );
};

export default withRouter(withCustomStyles(BrandCategoryChipsPart));
