import { isHeadless, logMessage } from "../utils/AppUtils";
import { _filter, _forEach, _isArray, _map } from "../utils/HelperUtils";
import {
  getStandardAnalyticsProduct,
  mapToStandardAnalyticsProducts
} from "../utils/ProductUtils";
import { getStandardAnalyticsOrder } from "../utils/OrderUtils";
import { getStandardAnalyticsCategory } from "../utils/CategoryUtils";
import { mapToStandardAnalyticsCustomer } from "../utils/CustomerUtils";
import globalSettingStore from "../stores/GlobalSettingStore";
class GTMService {
  dataLayerPush(data) {
    if (isHeadless()) return;
    if (!window.dataLayer) {
      logMessage("window.dataLayer missing", {
        window,
        data
      });
      return;
    }
    if (!window.dataLayer.push) {
      logMessage("window.dataLayer.push missing", {
        window,
        data
      });
      return;
    }
    window.dataLayer.push(data);
  }

  event(category, action, label = "", value = "", contents = []) {
    if (globalSettingStore.deviceId) {
      this.dataLayerPush({
        event: "custom.GAEvent",
        "dlv.eventCategory": category,
        "dlv.eventAction": action,
        "dlv.eventLabel": label,
        "dlv.eventValue": value,
        "dlv.contents": contents,
        "dlv.deviceId": globalSettingStore.deviceId
      });
    } else {
      globalSettingStore.registerDevice(() =>
        this.event(category, action, label, value, contents)
      );
    }
  }

  productImpressions(products, listName, customer, triggeredFrom) {
    if (!_isArray(products)) {
      logMessage("non array passed to productImpressions", products);
      return;
    }

    if (products.length < 1) {
      return;
    }
    if (globalSettingStore.deviceId) {
      const productImpressions = _map(products, (product, index) => ({
        ...getStandardAnalyticsProduct(product),
        list: listName,
        position: index + 1
      }));

      this.dataLayerPush({
        event: "productImpressions",
        "dlv.listName": listName,
        "dlv.triggeredFrom": triggeredFrom,
        ecommerce: {
          currencyCode: "PKR",
          impressions: productImpressions,
          customer: mapToStandardAnalyticsCustomer(
            customer,
            globalSettingStore.deviceId
          )
        }
      });
    } else {
      globalSettingStore.registerDevice(() =>
        this.productDetail(products, listName, customer)
      );
    }
  }

  productDetail(product, customer) {
    if (!product) {
      return;
    }
    if (globalSettingStore.deviceId) {
      this.dataLayerPush({
        event: "productDetail",
        ecommerce: {
          currencyCode: "PKR",
          detail: {
            products: [getStandardAnalyticsProduct(product)],
            customer: mapToStandardAnalyticsCustomer(
              customer,
              globalSettingStore.deviceId
            ),
            deviceId: globalSettingStore.deviceId
          }
        }
      });
    } else {
      globalSettingStore.registerDevice(() =>
        this.productDetail(product, customer)
      );
    }
  }

  productClick(product, list) {
    if (!product) {
      return;
    }

    this.dataLayerPush({
      event: "productClick",
      ecommerce: {
        currencyCode: "PKR",
        click: {
          actionField: {
            list
          },
          products: [getStandardAnalyticsProduct(product)]
        }
      }
    });
  }

  addToCart(product, list, CTList, query, customer) {
    if (globalSettingStore.deviceId) {
      this.dataLayerPush({
        event: "addToCart",
        ecommerce: {
          currencyCode: "PKR",
          add: {
            actionField: {
              list,
              CTList: CTList && CTList
            },
            query: query,
            products: [getStandardAnalyticsProduct(product)],
            customer: mapToStandardAnalyticsCustomer(
              customer,
              globalSettingStore.deviceId
            ),
            deviceId: globalSettingStore.deviceId
          }
        }
      });
    } else {
      globalSettingStore.registerDevice(() =>
        this.productDetail(product, list, CTList, query, customer)
      );
    }
  }

  removeFromCart(product, list, CTList) {
    this.dataLayerPush({
      event: "removeFromCart",
      ecommerce: {
        currencyCode: "PKR",
        remove: {
          actionField: {
            list,
            CTList: CTList && CTList
          },
          products: [getStandardAnalyticsProduct(product)]
        }
      }
    });
  }

  checkoutCartStep(products, order) {
    this.checkoutStep(
      products,
      {
        step: 1,
        option: "Cart Page"
      },
      order
    );
  }

  checkoutPlaceOrderStep(products, order) {
    this.checkoutStep(
      products,
      {
        step: 2,
        option: "Checkout Page"
      },
      order
    );
  }

  checkoutDoneStep(products, order) {
    this.checkoutStep(
      products,
      {
        step: 3,
        option: "Order Success Page"
      },
      order
    );
  }

  checkoutStep(products, actionField, order) {
    this.dataLayerPush({
      event: "checkout",
      ecommerce: {
        currencyCode: "PKR",
        checkout: {
          actionField,
          products: mapToStandardAnalyticsProducts(products),
          order: getStandardAnalyticsOrder(order)
        }
      }
    });
  }

  purchase(order, products, customer) {
    if (globalSettingStore.deviceId) {
      this.dataLayerPush({
        event: "purchase",
        ecommerce: {
          currencyCode: "PKR",
          purchase: {
            actionField: getStandardAnalyticsOrder(order),
            products: mapToStandardAnalyticsProducts(products),
            customer: mapToStandardAnalyticsCustomer(
              customer,
              globalSettingStore.deviceId
            )
          }
        }
      });
    } else {
      globalSettingStore.registerDevice(() =>
        this.productDetail(order, products, customer)
      );
    }
  }

  refund(order) {
    this.dataLayerPush({
      event: "refund",
      ecommerce: {
        refund: {
          actionField: {
            id: order.id
          }
        }
      }
    });
  }

  refundAllCancelled(orders) {
    const declined = _filter(
      orders,
      order => order.status === "declined" || order.status === "dorment"
    );
    _forEach(declined, order => this.refund(order));
  }

  pageView(path, data) {
    this.dataLayerPush({
      event: "custom.PageChange",
      "dlv.page": path,
      data: data
    });
  }

  userId(id) {
    this.dataLayerPush({
      event: "userId",
      "dlv.userId": [id]
    });
  }

  categoryImpression(categoryId) {
    this.dataLayerPush({
      event: "categoryImpressions",
      ecommerce: {
        currencyCode: "PKR",
        category: getStandardAnalyticsCategory(categoryId)
      }
    });
  }
}

const gtmService = new GTMService();
export default gtmService;
