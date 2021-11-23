import categoriesStore from "../stores/CategoriesStore";

export const getCategoryName = cid => categoriesStore.find(cid).name;

export const getCategoryNamesTree = cid => {
  return categoriesStore
    .parents(cid)
    .map(parent => parent.name)
    .join(" > ");
};

export const getCategoryNamesTreeReverse = cid => {
  return categoriesStore
    .parents(cid)
    .map(parent => parent.name)
    .reverse()
    .join(" : ");
};

export const getListingPageName = cid =>
  `Listing Page - ${getCategoryName(cid)}`;

export const getStandardAnalyticsCategory = cid => {
  if (!cid) return {};
  const category = categoriesStore.find(cid);
  return {
    id: category.id,
    name: category.name
  };
};
