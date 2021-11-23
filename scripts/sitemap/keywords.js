const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const getSlug = require("speakingurl");
const permutor = require('generatorics');

const catchWord = [
  'online',
  'online buy',
  'online shop',
  'online lahore',
  'online shopping',
];

const catchWordProducts = [
  'online',
  'online buy',
  'online shop',
  'online shopping',
  'online lahore'
];

const catchWordBrands = [];


const catchWordBrandCategories = [
];

function getName(name) {
  return getSlug(name, {
    separator: ' ',
  });
}

const filePath = './public/keywords.txt';

fs.unlinkSync(filePath);

(async function categoriesKeywords() {
  try {
    if (catchWord.length < 1) {
      return;
    }

    let res = await axios
      .post(endpointUrl("v2/vendor/detail"));
    const vendor = res.data.data;
    res = await axios
      .get(endpointUrl("v2/categories/list"), {
        params: {
          vendor_id: vendor.id,
        }
      });
    const flatCategories = res.data.data.flat;
    const finalKeyWords = [];
    _.forEach(flatCategories, (category) => {
      _.forEach(catchWord, word => {
        for (const comb of permutor.permutation([word, getName(category.name)])) {
          finalKeyWords.push(_.join(comb, ' '));
        }
      });
    });
    appendToFile(_.join(_.uniq(finalKeyWords), '\n'), filePath);
  } catch (error) {
    console.error(error);
  }
})();

(async function productsKeywords() {
  try {
    if (catchWordProducts.length < 1) {
      return;
    }

    let res = await axios
      .post(endpointUrl("v2/vendor/detail"));
    const vendor = res.data.data;
    res = await axios
      .get(endpointUrl("v2/categories/list"), {
        params: {
          vendor_id: vendor.id,
        }
      });
    const nestedCategories = res.data.data.tree;
    _.forEach(nestedCategories, async (category) => {
      const finalKeyWords = [];
      res = await axios
        .get(endpointUrl("v2/products/listByParent"), {
          params: {
            per: 999999,
            vendor_id: vendor.id,
            category_id: category.id,
          }
        });
      const products = res.data.data.data;
      _.forEach(products, product => {
        _.forEach(catchWordProducts, word => {
          for (const comb of permutor.combination([word, getProductName(product.name)], 2)) {
            finalKeyWords.push(_.join(comb, ' '));
          }
        });
      });
      appendToFile(_.join(_.uniq(finalKeyWords), '\n'), filePath);
    });

  } catch (error) {
    console.error(error);
  }

})();

(async function brandsKeywords() {
  try {
    if (catchWordBrands.length < 1) {
      return;
    }

    let res = await axios
      .post(endpointUrl("v2/vendor/detail"));
    const vendor = res.data.data;
    res = await axios
      .get(endpointUrl("v1/brands/all"), {
        params: {
          vendor_id: vendor.id,
        }
      });

    const brands = res.data.data;

    _.forEach(brands, async (brand) => {
      const brandKeyWords = [];

      _.forEach(catchWordBrands, word => {
        for (const comb of permutor.combination([word, `${brand.name}\n`], 2)) {
          brandKeyWords.push(_.join(comb, ' '));
        }
      });

      appendToFile(_.join(_.uniq(brandKeyWords), ''), filePath);


      if (catchWordBrandCategories.length > 0) {
        const brandCategoryKeyWords = [];

        res = await axios
          .get(endpointUrl("v1/brands/products"), {
            params: {
              per: 1,
              vendor_id: vendor.id,
              slug: brand.slug
            }
          });
        const brandCategories = res.data.data.categories;

        _.forEach(brandCategories, category => {
          _.forEach(catchWordBrandCategories, word => {
            for (const comb of permutor.combination([word, `${brand.name} ${category.name}\n`], 2)) {
              brandCategoryKeyWords.push(_.join(comb, ' '));
            }
          });
        });

        appendToFile(_.join(_.uniq(brandCategoryKeyWords), ''), filePath);
      }
    });

  } catch (error) {
    console.error(error);
  }

})();

function saveToFile(keywords, path) {
  fs.writeFile(
    path,
    keywords,
    function (error) {
      if (error) {
        console.error(error);
        console.log('=================================');
      } else {
        console.log("Keywords Successfully generated", path);
      }
    }
  );

}

function appendToFile(keywords, path) {
  fs.appendFile(
    path,
    keywords,
    function (error) {
      if (error) {
        console.error(error);
        console.log('=================================');
      } else {
        console.log("Keywords Successfully generated", path);
      }
    }
  );

}

function getProductName(name) {
  const trimmed = _.split(getName(name), '-')[0];
  return _.join(_.take(_.split(trimmed, ' '), 4), ' ');
}

function endpointUrl(path) {
  return `https://endpoints.grocerapps.com/${path}`;
}
