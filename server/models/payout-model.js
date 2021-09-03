const db = require("../database/db")

const payoutModel = {
  getPayouts: getPayouts,
  getPayoutDetailsByVendor: getPayoutDetailsByVendor,
  getPayoutByVendor: getPayoutByVendor,
}

function getPayouts() {
  return new Promise((resolve, reject) => {
    var request = new db.Request()

    //get first and last date
    var date = new Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    const firstDate = new Date(year, month - 2, 0)
    const lastDate = new Date(year, month - 1, 1)

    request.input("firstDate", db.DateTime, firstDate)
    request.input("lastDate", db.DateTime, lastDate)

    let query =
      "SELECT distinct(spfy_vendor), sum(spfy_line_item_qty) as items_sold, sum(spfy_line_item_qty * spfy_line_item_price) as total_sales, \
    defaultPercentage, sum(spfy_line_item_qty * spfy_line_item_price * defaultPercentage/100) as net_sales from tstSpfyOrderItems items \
    inner join consignors csn on csn.qbCompany = items.spfy_vendor where spfy_created_at > @firstDate and spfy_created_at < @lastDate \
    group by spfy_vendor, defaultPercentage order by total_sales desc"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

function getPayoutDetailsByVendor(vendor) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()

    //get first and last date
    var date = new Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    const firstDate = new Date(year, month - 2, 0)
    const lastDate = new Date(year, month - 1, 1)

    request.input("firstDate", db.DateTime, firstDate)
    request.input("lastDate", db.DateTime, lastDate)
    request.input("vendor", db.VarChar, vendor)

    let query =
      "SELECT spfy_order_id, spfy_line_item_name, spfy_line_item_qty, spfy_line_item_price,	spfy_line_item_qty * spfy_line_item_price as total_amount, \
    defaultPercentage, defaultPercentage / 100 * spfy_line_item_qty * spfy_line_item_price as net_amount from tstSpfyOrderItems items \
    inner join consignors csn on csn.qbCompany = items.spfy_vendor where spfy_vendor=@vendor and spfy_created_at > @firstDate and spfy_created_at < @lastDate \
    group by spfy_order_id, spfy_vendor, spfy_line_item_name, defaultPercentage, spfy_line_item_price, spfy_line_item_qty order by spfy_vendor asc, total_amount desc"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

function getPayoutByVendor(vendor) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()

    //get first and last date
    var date = new Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    const firstDate = new Date(year, month - 2, 0)
    const lastDate = new Date(year, month - 1, 1)

    request.input("firstDate", db.DateTime, firstDate)
    request.input("lastDate", db.DateTime, lastDate)
    request.input("vendor", db.VarChar, vendor)

    let query =
      "SELECT distinct(spfy_vendor), sum(spfy_line_item_qty) as items_sold, sum(spfy_line_item_qty * spfy_line_item_price) as total_sales, \
    defaultPercentage, sum(spfy_line_item_qty * spfy_line_item_price * defaultPercentage/100) as net_sales from tstSpfyOrderItems items \
    inner join consignors csn on csn.qbCompany = items.spfy_vendor where spfy_created_at > @firstDate and spfy_created_at < @lastDate and spfy_vendor=@vendor\
    group by spfy_vendor, defaultPercentage order by total_sales desc"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

module.exports = payoutModel
