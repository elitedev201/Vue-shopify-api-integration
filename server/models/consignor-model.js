const db = require("../database/db")

const consignorModel = {
  getAllConsignors: getAllConsignors,
  addConsignor: addConsignor,
  getConsignorById: getConsignorById,
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

function addConsignor(data) {
  var request = new db.Request()
  request.input("qbCompany", db.VarChar, data.company)
  request.input("defaultPercentage", db.Numeric, 50)
  request.input("qbFirst", db.VarChar, data.first)
  request.input("qbLast", db.VarChar, data.last)
  request.input("qbStAddress1", db.VarChar, data.stAddress1)
  request.input("qbStAddress2", db.VarChar, data.stAddress2)
  request.input("qbCity", db.VarChar, data.city)
  request.input("qbState", db.VarChar, data.state)
  request.input("qbZip", db.VarChar, data.zip)
  request.input("qbEmail", db.VarChar, data.email)
  request.input("qbPhone", db.VarChar, data.phone)
  let query =
    "INSERT INTO consignors(qbCompany, defaultPercentage, qbFirst, qbLast, qbStAddress1, qbStAddress2, qbCity, qbState, qbZip, qbEmail, qbPhone ) VALUES (@qbCompany, @defaultPercentage, @qbFirst, @qbLast, @qbStAddress1, @qbStAddress2, @qbCity, @qbState, @qbZip, @qbEmail, @qbPhone)"

  return new Promise((resolve, reject) => {
    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve({ code: 200 })
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

function getConsignorById(id) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()
    request.input("id", db.Int, id)
    let query =
      "SELECT * FROM consignors WHERE id=@id"

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
