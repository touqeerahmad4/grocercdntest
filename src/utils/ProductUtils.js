import { isSameOrAfterNow } from "./DateUtils";
import { getCategoryName } from "./CategoryUtils";
import { _map } from "./HelperUtils";
import _get from "lodash/get";

export const dealPrice = product => {
  return Math.ceil(
    productPrice(product) -
      productPrice(product) * (product.deal_percentage / 100)
  );
};

export const productPrice = product => product.price || product.vendor_price;

export const productActivePrice = product =>
  isDeal(product) ? dealPrice(product) : productPrice(product);

export const productName = (str, allowedChars = 50) => {
  let subStr = str.substring(0, allowedChars);
  if (str[allowedChars]) {
    return subStr + "...";
  }
  return subStr;
};

export const trimStr = (str, allowedChars = 50) => {
  return str.substring(0, allowedChars);
};

export const isDeal = product => {
  if (!product.is_deal) {
    return false;
  }
  return isSameOrAfterNow(product.deal_expiry);
};

export const pushCategoryNode = node => {
  if (!node || node.id === 145 || node.id === 99 || node.id === 83) {
    return [];
  }
  return [node];
};

export const getProductId = product => product.vendor_id + "-" + product.id;

export const maxPurchaseLimitReached = product =>
  product.max_purchase_limit &&
  isDeal(product) &&
  product.order_quantity >= product.max_purchase_limit;

export const getStandardAnalyticsProduct = product => {
  if (!product) return {};
  const productId = product.product_id ? product.product_id : product.id;
  return {
    id: product.vendor_id + "-" + productId,
    name: product.name,
    brand: product.brand,
    quantity: product.quantity ? product.quantity : 1,
    price: product.vendor_price ? product.vendor_price : product.price,
    category: getCategoryName(product.category_id),
    categoryId: product.category_id
  };
};

export const mapToStandardAnalyticsProducts = products => {
  return _map(products, product => getStandardAnalyticsProduct(product));
};

const availabilityMapping = {
  "in stock": {
    json: "http://schema.org/InStock",
    text: "In Stock"
  },
  discontinued: {
    json: "http://schema.org/Discontinued",
    text: "Discontinued"
  },
  "out of stock": {
    json: "http://schema.org/OutOfStock",
    text: "Out Of Stock"
  }
};

export const productAvailability = product => {
  if (!product || !product.availability) {
    return availabilityMapping["out of stock"];
  }
  return availabilityMapping[product.availability];
};

export const productIsAvailable = product => {
  return product && product.availability && product.availability === "in stock";
};

export const firstBrandName = item => {
  return _get(item, "brands[0].name", "");
};
