import React from "react";
import withCustomStyles from "./BreadcrumbsListSchemaPart.style";
import withRouter from "react-router/es/withRouter";
import { Helmet } from "react-helmet";
import { getProductsPageAbsUrl } from "../utils/UrlUtils";

const BreadcrumbsListSchemaPart = props => {
  const { categories } = props;

  const itemsList = categories.map(
    (category, index) =>
      `{
      "@type": "ListItem",
      "position": ${index + 1},
      "name": "${category.name}",
      "item": "${getProductsPageAbsUrl(category)}"
    }`
  );
  return (
    <Helmet>
      <script type="application/ld+json">
        {`{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [${itemsList}]
    }`}
      </script>
    </Helmet>
  );
};

export default withRouter(withCustomStyles(BreadcrumbsListSchemaPart));
