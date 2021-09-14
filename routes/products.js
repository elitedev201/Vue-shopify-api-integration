var router = require("express").Router()
const multer = require("multer")
const checkAuth = require("../middleware/auth")

const productService = require("../services/productService")

const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).array("files", 10)

// router.get("/products", checkJwt, (req, res) => {
//   res.send(data)
// })

router.get("/products", checkAuth, getAllProducts)
router.get("/product", getProductById)
router.get("/productsbyvendor", getProductsByVendor)
router.post("/products", uploadStrategy, setProducts)
router.put("/products", uploadStrategy, updateProducts)
router.delete("/products", deleteProduct)

//get all product info from mssql
function getAllProducts(req, res) {
  productService
    .getAllProducts()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

//get product info by product_id from shopify and mssql
function getProductById(req, res) {
  const product_id = req.query.product_id
  productService
    .getProductById(product_id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

//get products info by vendor from shopify and mssql
function getProductsByVendor(req, res) {
  const vendor = req.query.vendor
  productService
    .getProductsByVendor(vendor)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

//Adding product info to shopify and mssql
function setProducts(req, res) {
  productService
    .setProducts(req)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

//updating product on shopify and mssql
function updateProducts(req, res) {
  productService
    .updateProducts(req)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

//delete product from shopify and mssql
function deleteProduct(req, res) {
  productService
    .deleteProduct(req)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = router
