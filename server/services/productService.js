const productModel = require("../models/product-model")
const shopify = require("./shopify")

const productService = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  setProducts: setProducts,
  updateProducts: updateProducts,
  deleteProduct: deleteProduct,
}

function getAllProducts() {
  return new Promise((resolve, reject) => {
    shopify.get(
      "/admin/products.json",
      function (error, shopify_data, headers) {
        var products = shopify_data.products
        productModel
          .getAllProducts()
          .then(data => {
            resolve({ code: 200, data: data, shopifyData: products })
          })
          .catch(err => {
            reject(err.message)
          })
      }
    )
  })
}

function getProductById(id) {
  const product_id = id
  return new Promise((resolve, reject) => {
    productModel
      .getProductById(product_id)
      .then(data => {
        resolve({ code: 200, data: data.data, shopifyData: data.shopifyData })
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

function setProducts(req) {
  const title = req.body.title
  const description = req.body.description
  const product_type = req.body.product_type
  const size = req.body.size
  const color = req.body.color
  const price = req.body.price
  const published_at = req.body.published_at
  const shopify_published_at = new Date(published_at)

  //declare post_data for adding product to shopify
  var post_data = {
    product: {
      title: title,
      body_html: description,
      vendor: "Tacoma Consignment",
      product_type: product_type,
      published_at: shopify_published_at,
      variants: [
        {
          Color: color,
          Size: size,
          price: price,
        },
      ],
      images: [],
    },
  }

  for (var i = 0; i < req.files.length; i++) {
    var tempImage = {
      position: i + 1,
      attachment: req.files[i].buffer.toString("base64"),
      width: 640,
      height: 480,
      filename: req.files[i].originalname,
    }
    post_data.product.images.push(tempImage)
  }

  return new Promise((resolve, reject) => {
    //adding products to shopify
    shopify.post(
      "/admin/products.json",
      post_data,
      function (error, shopify_data, headers) {
        var shopify_id = shopify_data.product.id
        productModel
          .setProducts(req, shopify_id)
          .then(data => {
            resolve({ code: 200, data: shopify_data })
          })
          .catch(err => {
            reject(err.message)
          })
      }
    )
  })
}

function updateProducts(req) {
  return new Promise((resolve, reject) => {
    //updating products to shopify and mssql
    productModel
      .updateProducts(req)
      .then(data => {
        resolve({ code: 200 })
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

function deleteProduct(req) {
  return new Promise((resolve, reject) => {
    //delete product from shopify and mssql
    productModel
      .deleteProduct(req)
      .then(data => {
        resolve({ code: 200 })
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

module.exports = productService
