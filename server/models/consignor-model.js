const db = require("../database/db")

const consignorModel = {
  getAllConsignors: getAllConsignors,
  getConsignorByVendor: getConsignorByVendor,
}

function getAllConsignors() {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    let query = "SELECT * FROM consignors"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

function getConsignorByVendor(vendor) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    request.input("vendor", db.VarChar, vendor);
    let query = "SELECT * FROM consignors WHERE qbCompany=@vendor"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })

  })
}

module.exports = consignorModel