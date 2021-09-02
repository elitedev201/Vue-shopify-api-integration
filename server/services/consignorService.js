const consignorModel = require("../models/consignor-model")
const shopify = require("./shopify")

const consignorService = {
  getAllConsignors: getAllConsignors,
}

function getAllConsignors() {
  return new Promise((resolve, reject) => {
    consignorModel
      .getAllConsignors()
      .then(data => {
        resolve({ code: 200, data })
      })
      .catch(err => {
        reject(err.message)
        console.log(err)
      })
  })
}

module.exports = consignorService
