import { strLimit } from "./HelperUtils";

export const brandTitle = (name, cn) => {
  if (!cn) {
    return `Buy ${name} products online | Save with GrocerApp`;
  }
  return `Buy ${name} ${cn} online | Save with GrocerApp`;
};

export const brandDesc = (name, cn) => {
  if (!cn) {
    return `Shop through a wide selection of ${name} products - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`;
  }
  let brandDescription = `Shop ${name} ${cn} - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`;
  return brandDescription.length <= 110
    ? `Shop ${name} ${cn} - Pakistan’s best and largest online grocery website - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`
    : brandDescription;
};

export const productDetailTitle = (name, category) =>
  `Buy ${name}: ${category} online - GrocerApp`;

export const productDetailDesc = (name, unit, category) => {
  return `Shop ${name}: ${category} (${unit}) online - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`;
};

export const productDetailDescStructured = (
  name,
  unit,
  category,
  desc,
  desc_article
) => {
  if (desc_article || desc) {
    let str = stripHtml(desc + desc_article);
    str = strLimit(str, 200);
    if (str) {
      str = str.replace(/[^a-zA-Z0-9% ]/g, "");
    }
    return str;
  }
  return `Shop ${name}: ${category} (${unit}) online - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`;
};

function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export const productListTitle = categoryTree =>
  `Buy ${categoryTree} online - GrocerApp`;

export const productListDesc = name =>
  `Shop through a wide selection of ${name} at Grocerapp.pk. ✓ 20% Cashback on first order using android or ios app`;

export const searchQueryTitle = query => `Buy ${query} online - GrocerApp`;

export const searchQueryDesc = query =>
  `Shop ${query} online - Grocerapp.pk ✓ 20% Cashback on first order using android or ios app`;

export const grocerAppDesc = () =>
  "Pakistan’s best and largest online grocery website: Shop from a wide range of grocery, vegetables, beauty & wellness, household care, baby care, pet care, meats & more.";

export const commonBrand = () => "GrocerApp";
