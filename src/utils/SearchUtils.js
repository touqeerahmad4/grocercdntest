import categoriesStore from "../stores/CategoriesStore";

export const getCategoryName = cid => categoriesStore.find(cid).name;

export const getListingPageName = () => "Search Page";
