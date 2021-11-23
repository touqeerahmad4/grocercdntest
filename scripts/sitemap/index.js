const Sentry = require('@sentry/browser');
const sm = require('sitemap');
const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const getSlug = require("speakingurl");
const dayjs = require("dayjs");

const hostName = 'https://grocerapp.pk';
const siteMapConfig = {
  hostname: hostName,
  cacheTime: 600000,        // 600 sec - cache purge period
};
const SITEMAP_PATH = "./public";

Sentry.init({
  dsn: "https://108ed878c5854240b96f51bf6b28a33e@sentry.io/1388734",
});

(function robotsTxt() {
  fs.writeFile(
    './public/robots.txt',
    `User-agent: *

# Sitemap files
`, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Robots.txt re-initialized');
      }
    });
})();

(async function dynamicSitemap() {
  try {
    const categoriesSitemap = sm.createSitemap(siteMapConfig);
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
    const nestedCategories = res.data.data.tree;

    _.forEach(nestedCategories, async (category) => {
      categoriesSitemap.add({
        url: `/cn/${getSlug(category.name)}/cid/${category.id}`,
        changefreq: 'daily',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 1
      });
      const productsSitemap = sm.createSitemap(siteMapConfig);
      try {
        res = await axios
          .get(endpointUrl("v2/products/sitemap/listByParent"), {
            params: {
              vendor_id: vendor.id,
              category_id: category.id,
              per: 999999,
            }
          });
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
      }

      if (res.data.status !== 'success') {
        Sentry.captureMessage(res.data.message, {
          level: 'info',
          extra: {
            uri: res.request.path
          }
        });
        throw new Error(res.request.path + res.data.message);
      }
      const products = res.data.data.data;
      _.forEach(products, product => {
        productsSitemap.add({
          url: `/prn/${getSlug(product.name)}/prid/${product.id}`,
          changefreq: 'hourly',
          lastmod: dayjs()
            .format('YYYY-MM-DD'),
          priority: 0.6
        });
      });
      saveToXML(productsSitemap, `products_of_${getSlug(category.name)}.xml`);
    });
    saveToXML(categoriesSitemap, 'categories.xml');

    const subcategoriesSitemap = sm.createSitemap(siteMapConfig);
    _.forEach(flatCategories, category => {
      if (category.parent_id !== 0) {
        subcategoriesSitemap.add({
          url: `/cn/${getSlug(category.name)}/cid/${category.id}`,
          changefreq: 'weekly',
          lastmod: dayjs()
            .format('YYYY-MM-DD'),
          priority: 0.8
        });
      }
    });
    saveToXML(subcategoriesSitemap, 'subcategories.xml');


    res = await axios
      .get(endpointUrl("v1/brands/all"), {
        params: {
          vendor_id: vendor.id,
        }
      });
    const brands = res.data.data;

    const brandsSitemap = sm.createSitemap(siteMapConfig);
    await Promise.all(_.map(brands, async (brand) => {
      return new Promise(async (resolve) => {
        brandsSitemap.add({
          url: getBrandPageUrl(brand.slug),
          changefreq: 'hourly',
          lastmod: dayjs()
            .format('YYYY-MM-DD'),
          priority: 0.8
        });

        try {
          res = await axios
            .get(endpointUrl("v1/brands/products"), {
              params: {
                vendor_id: vendor.id,
                slug: brand.slug,
                per: 1,
              }
            });
        } catch (error) {
          console.error(error);
          Sentry.captureException(error);
        }

        const brandCategories = res.data.data.categories;

        _.forEach(brandCategories, category => {
          brandsSitemap.add({
            url: getBrandPageUrl(brand.slug, category),
            changefreq: 'hourly',
            lastmod: dayjs()
              .format('YYYY-MM-DD'),
            priority: 0.8
          });
        });
        resolve('done');
      });
    }));

    saveToXML(brandsSitemap, 'brands.xml');

  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
})();

(function generateIndexSitemap() {
  const sitemap = sm.createSitemap(_.merge({
    urls: [
      {
        url: '/privacy-policy/',
        changefreq: 'monthly',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 0.3
      },
      {
        url: '/terms',
        changefreq: 'monthly',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 0.3
      },
      {
        url: '/categories',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        changefreq: 'weekly',
        priority: 0.5
      },
      {
        url: '/login',
        changefreq: 'weekly',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 0.5
      },
      {
        url: '/search',
        changefreq: 'weekly',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 0.7
      },
      {
        url: '/sitemap',
        changefreq: 'weekly',
        lastmod: dayjs()
          .format('YYYY-MM-DD'),
        priority: 0.5
      }
    ]
  }, siteMapConfig));
  saveToXML(sitemap, 'index.xml');
})();

function getSitemapName(filename) {
  return `sitemap_${filename}`;
}

function getSiteMapPath(filename) {
  return `${SITEMAP_PATH}/${getSitemapName(filename)}`;
}

function getSitemapLink(filename) {
  return `${hostName}/${getSitemapName(filename)}`;
}

function saveToXML(sitemap, fileName) {
  sitemap.toXML((err, xml) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(
      getSiteMapPath(fileName),
      xml,
      function (error) {
        if (error) {
          console.error(error);
        } else {
          console.log("Sitemap Successfully generated: ", getSiteMapPath(fileName));
          fs.appendFile('./public/robots.txt',
            `Sitemap: ${getSitemapLink(fileName)}\n`,
            function (err) {
              if (err) throw err;
              console.log("Added to robots.txt: ", getSitemapLink(fileName));
            });
        }
      }
    );
  });
}

function endpointUrl(path) {
  return `https://endpoints.grocerapps.com/${path}`;
}


function getBrandPageUrl (slug, category = null) {
  let url = `/shop/${getSlug(slug)}`;
  const cid = _.get(category, 'id', false);
  const cn = _.get(category, 'name', 'category');

  if (cid) {
    url += `/${getSlug(cn)}/${cid}`
  }
  return url;
}