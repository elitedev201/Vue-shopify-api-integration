const orderModel = require("../models/order-model")
const shopify = require("./shopify")

const orderService = {
  createOrders: createOrders,
}

function createOrders(req) {
  return new Promise((resolve, reject) => {
    var order_id = req.body.id
    var created_at = req.body.created_at
    var qty = 0
    var name = ""
    var price = 0
    var compare_at_price = ""
    var sku = ""
    var shipping = ""
    var taxable = ""
    var fulfillment_status = ""
    var vendor = ""
    var discount_amount = 0
    var last_updated = req.body.updated_at
    orderModel
      .createOrders(req)
      .then(data => {
        for (let i = 0; i < req.body.line_items.length; i++) {
          qty = req.body.line_items[i].quantity
          name = req.body.line_items[i].name
          price = req.body.line_items[i].price
          compare_at_price = 0
          sku = req.body.line_items[i].sku
          shipping = req.body.line_items[i].requires_shipping
          taxable = req.body.line_items[i].taxable
          fulfillment_status = req.body.line_items[i].fulfillment_status
          vendor = req.body.line_items[i].vendor
          orderModel
            .createOrderItem(
              order_id,
              created_at,
              qty,
              name,
              price,
              compare_at_price,
              sku,
              shipping,
              taxable,
              fulfillment_status,
              vendor,
              discount_amount,
              last_updated
            )
            .then(data => {
              console.log(data)
            })
            .catch(err => {
              reject(err.message)
              console.log(err)
            })
        }
        console.log(data)
      })
      .catch(err => {
        reject(err.message)
        console.log(err)
      })

    resolve({ code: 200 })
  })
}

module.exports = orderService
