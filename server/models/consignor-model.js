const db = require("../database/db")

const consignorModel = {
  getAllConsignors: getAllConsignors,
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

module.exports = consignorModel