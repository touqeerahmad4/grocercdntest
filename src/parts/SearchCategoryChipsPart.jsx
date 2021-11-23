import React from "react";
import withCustomStyles from "./SearchCategoryChipsPart.style";
import withRouter from "react-router/es/withRouter";
import { getSearchQuery } from "../utils/UrlUtils";
import CategoryChipPart from "./CategoryChipPart";
import { inject, observer } from "mobx-react";

@inject(["searchProductsStore"])
@observer
class SearchCategoryChipsPart extends React.Component {
  handleCategoryClick = category => {
    const {
      searchProductsStore,
      location: { search }
    } = this.props;

    searchProductsStore.fetch(getSearchQuery(search), category);
  };

  render() {
    const {
      props: { categories, searchProductsStore },
      handleCategoryClick
    } = this;
    return (
      <React.Fragment>
        <CategoryChipPart
          label={`All (${searchProductsStore.totalRecords})`}
          onClick={handleCategoryClick.bind(this, "")}
          isSelected={!searchProductsStore.selectedFacet}
        />
        {categories.map(category => (
          <CategoryChipPart
            label={`${category[0]} (${category[1]})`}
            key={category[0]}
            onClick={handleCategoryClick.bind(this, category[0])}
            isSelected={searchProductsStore.selectedFacet === category[0]}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default withRouter(withCustomStyles(SearchCategoryChipsPart));
