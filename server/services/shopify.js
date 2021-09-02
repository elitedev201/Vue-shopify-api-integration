var Shopify = require("shopify-node-api")

var shopName = process.env.SHOPIFY_SHOP_NAME
var apiKey = process.env.SHOPIFY_API_KEY
var password = process.env.SHOPIFY_PASSWORD

var shopify = new Shopify({
  shop: shopName, // MYSHOP.myshopify.com
  shopify_api_key: apiKey, // Your API key
  access_token: password, // Your API password
})

module.exports = shopify