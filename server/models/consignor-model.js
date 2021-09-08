const db = require("../database/db")

const consignorModel = {
  getAllConsignors: getAllConsignors,
  getConsignorByVendor: getConsignorByVendor,
  delConsignor: delConsignor,
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

function delConsignor(id) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    request.input("id", db.Int, id)
    let query = "DELETE FROM consignors WHERE id=@id"

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
    request.input("vendor", db.VarChar, vendor)
    let query =
      "SELECT id, qbCompany, defaultPercentage, qbStAddress1, qbStAddress2, (qbCity + ', ' + qbState + '  ' + qbZip) as bottom_line FROM consignors WHERE qbCompany=@vendor"

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
