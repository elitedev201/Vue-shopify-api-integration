const db = require("../database/db")
const shopify = require("../services/shopify")
const azureStorage = require("azure-storage")
const getStream = require("into-stream")

const blobService = azureStorage.createBlobService(
  process.env.AZURE_ACCOUNT_NAME,
  process.env.AZURE_ACCOUNT_KEY
)

uploadFileToBlob = async (directoryPath, title, file) => {
  return new Promise((resolve, reject) => {
    const blobName = file.originalname
    const stream = getStream(file.buffer)
    const streamLength = file.buffer.length

    blobService.createBlockBlobFromStream(
      process.env.AZURE_CONTAINER_NAME,
      `${directoryPath}/${title}/${blobName}`,
      stream,
      streamLength,
      err => {
        if (err) {
          reject(err)
        } else {
          resolve({
            filename: blobName,
            originalname: file.originalname,
            size: streamLength,
            path: `${process.env.AZURE_CONTAINER_NAME}/${directoryPath}/${title}/${blobName}`,
            url: `${process.env.AZURE_BLOB_URL}${process.env.AZURE_CONTAINER_NAME}/${directoryPath}/${title}/${blobName}`,
          })
        }
      }
    )
  })
}

const productModel = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  getProductsByVendor: getProductsByVendor,
  setProducts: setProducts,
  updateProducts: updateProducts,
  deleteProduct: deleteProduct,
}

function getAllProducts() {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    let query = "SELECT * FROM products"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

function getProductById(id) {
  const product_id = id
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    request.input("product_id", db.Int, product_id)
    let query = "SELECT * FROM products WHERE product_id=@product_id"

    request.query(query, (error, rows) => {
      var shopify_id = ""
      if (error) {
        reject(error.message)
      } else {
        shopify_id = rows.recordset[0].shopify_id
        shopify.get(
          "/admin/products/" + shopify_id + ".json",
          function (err, product_data, headers) {
            var product = product_data.product
            // send records as a response
            resolve({ data: rows.recordset[0], shopifyData: product })
          }
        )
      }
    })
  })
}

function getProductsByVendor(vendor) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    request.input("vendor", db.VarChar, vendor)
    let query = "SELECT * FROM products WHERE vendor=@vendor"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve({ data: rows.recordset })
      }
    })
  })
}

function setProducts(req, shopify_id) {
  //Assign value to variable of product from request
  const title = req.body.title
  const consignor_id = req.body.consignor_id
  const description = req.body.description
  const product_type = req.body.product_type
  const size = req.body.size
  const color = req.body.color
  const material = req.body.material
  const price = req.body.price
  const base_price = req.body.base_price
  const notes = req.body.notes
  const published_at = req.body.published_at
  const discountSchedule = req.body.discountSchedule

  var request = new db.Request()
  var datetime = new Date()
  var images = ""

  //setting variables for mssql
  request.input("consignor_id", db.Int, consignor_id)
  request.input("title", db.VarChar, title)
  request.input("description", db.VarChar, description)
  request.input("product_type", db.VarChar, product_type)
  request.input("base_price", db.Numeric, base_price)
  request.input("size", db.Int, size)
  request.input("color", db.VarChar, color)
  request.input("material", db.VarChar, material)
  request.input("price", db.Numeric, price)
  request.input("notes", db.VarChar, notes)
  request.input("published_at", db.VarChar, published_at)
  request.input("discountSchedule", db.VarChar, discountSchedule)
  request.input("datetime", db.DateTime, datetime)
  request.input("shopify_id", db.VarChar, shopify_id)

  for (var i = 0; i < req.files.length; i++) {
    images += req.files[i].originalname + ","
    uploadFileToBlob("products", title, req.files[i])
  }

  let query =
    "INSERT INTO products(consignorID, shopify_id, vendor, title, description, product_type, size, color, material, price, base_price, notes, published_at, discountSchedule, created_at, updated_at, main_img_src) VALUES (@consignor_id, @shopify_id, 'Tacoma Consignment', @title, @description, @product_type, @size, @color, @material, @price, @base_price, @notes, @published_at, @discountSchedule, @datetime, @datetime, @main_img_src)"

  request.input("main_img_src", db.VarChar, images)
  return new Promise((resolve, reject) => {
    request.query(query, function (err, rows) {
      if (err) {
        reject(error.message)
      } else {
        resolve({ code: 200 })
      }
    })
  })
}

function updateProducts(req) {
  var request = new db.Request()
  const title = req.body.title
  const product_id = req.body.product_id
  var images = ""

  var datetime = new Date()

  const consignor_id = req.body.consignor_id
  const description = req.body.description
  const product_type = req.body.product_type
  const size = req.body.size
  const color = req.body.color
  const material = req.body.material
  const price = req.body.price
  const base_price = req.body.base_price
  const notes = req.body.notes
  const published_at = req.body.published_at
  const discountSchedule = req.body.discountSchedule
  const status = req.body.status

  const shopify_published_at = new Date(published_at)

  request.input("consignor_id", db.Int, consignor_id)
  request.input("title", db.VarChar, title)
  request.input("description", db.VarChar, description)
  request.input("product_type", db.VarChar, product_type)
  request.input("base_price", db.Numeric, base_price)
  request.input("size", db.Int, size)
  request.input("color", db.VarChar, color)
  request.input("material", db.VarChar, material)
  request.input("price", db.Numeric, price)
  request.input("notes", db.VarChar, notes)
  request.input("published_at", db.VarChar, published_at)
  request.input("discountSchedule", db.VarChar, discountSchedule)
  request.input("datetime", db.DateTime, datetime)
  request.input("status", db.VarChar, status)

  request.input("product_id", db.Int, product_id)
  return new Promise((resolve, reject) => {
    request.query(
      "SELECT main_img_src, title, shopify_id FROM products WHERE product_id=@product_id",
      function (err, data) {
        if (err) console.log(err)
        var old_images = data.recordset[0].main_img_src
        var old_title = data.recordset[0].title
        var shopify_id = data.recordset[0].shopify_id

        var updated_data = {
          product: {
            id: shopify_id,
            title: title,
            body_html: description,
            vendor: "Tacoma Consignment",
            product_type: product_type,
            published_at: shopify_published_at,
          },
        }

        var image_array = old_images.split(",")
        const blobPath = "products/" + old_title + "/"
        for (let i = 0; i < image_array.length - 1; i++) {
          var imageBlob = blobPath + image_array[i]
          blobService.deleteBlob(
            process.env.AZURE_CONTAINER_NAME,
            imageBlob,
            function (error, response) {
              if (!error) {
                console.log("deleted!")
              }
            }
          )
        }

        shopify.get(
          "/admin/products/" + shopify_id + ".json",
          function (error, shopify_data) {
            var temp_images = shopify_data.product.images
            var temp_variants = shopify_data.product.variants
            for (let i = 0; i < temp_images.length; i++) {
              shopify.delete(
                "/admin/products/" +
                  shopify_id +
                  "/images/" +
                  temp_images[i].id +
                  ".json",
                function (error, shopify_data) {
                  console.log("deleted!")
                }
              )
            }
            for (let i = 0; i < temp_variants.length; i++) {
              shopify.delete(
                "/admin/products/" +
                  shopify_id +
                  "/variants/" +
                  temp_variants[i].id +
                  ".json",
                function (error, shopify_data) {
                  console.log("deleted!")
                }
              )
            }

            for (var i = 0; i < req.files.length; i++) {
              images += req.files[i].originalname + ","
              var tempImage = {
                image: {
                  position: i + 1,
                  attachment: req.files[i].buffer.toString("base64"),
                  width: 640,
                  height: 480,
                  filename: req.files[i].originalname,
                },
              }
              shopify.post(
                "/admin/products/" + shopify_id + "/images.json",
                tempImage,
                function (error, shopify_data) {
                  console.log(shopify_data)
                }
              )
              uploadFileToBlob("products", title, req.files[i])
            }

            var tempVariant = {
              variant: {
                Color: color,
                Size: size,
              },
            }

            shopify.post(
              "admin/products/" + shopify_id + "/variants.json",
              tempVariant,
              function (error, shopify_data) {
                console.log(shopify_data)
              }
            )

            request.input("main_img_src", db.VarChar, images)

            shopify.put(
              "/admin/products/" + shopify_id + ".json",
              updated_data,
              function (error, shopify_data) {
                request.query(
                  "UPDATE products SET consignorID=@consignor_id, title=@title, description=@description, product_type=@product_type, \
                  size=@size, color=@color, material=@material, price=@price, notes=@notes, published_at=@published_at, discountSchedule=@discountSchedule, status=@status,\
                  updated_at=@datetime, main_img_src=@main_img_src, base_price=@base_price WHERE product_id=@product_id",
                  function (err, rows) {
                    if (err) console.log(err.message)
                    // send records as a response
                    resolve({ code: 200 })
                  }
                )
              }
            )
          }
        )
      }
    )
  })
}

function deleteProduct(req) {
  var request = new db.Request()
  const product_id = req.query.product_id
  const title = req.query.title
  const blobPath = "products/" + title + "/"
  request.input("product_id", db.Int, product_id)
  return new Promise((resolve, reject) => {
    request.query(
      "SELECT main_img_src, shopify_id FROM products WHERE product_id=@product_id",
      function (err, data) {
        if (err) console.log(err)
        var images = data.recordset[0].main_img_src
        var shopify_id = data.recordset[0].shopify_id
        var image_array = images.split(",")
        for (let i = 0; i < image_array.length - 1; i++) {
          var imageBlob = blobPath + image_array[i]
          blobService.deleteBlob(
            process.env.AZURE_CONTAINER_NAME,
            imageBlob,
            function (error, response) {
              if (!error) {
                console.log("deleted!")
              }
            }
          )
        }
        shopify.delete(
          "/admin/products/" + shopify_id + ".json",
          function (error, shopify_data, headers) {
            request.query(
              "DELETE FROM products WHERE product_id=@product_id",
              function (err, data) {
                if (err) reject(error.message)
                // send records as a response
                resolve({ code: 200 })
              }
            )
          }
        )
      }
    )
  })
}

module.exports = productModel
