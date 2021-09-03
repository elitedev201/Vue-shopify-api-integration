const consignorModel = require("../models/consignor-model")
const shopify = require("./shopify")

const consignorService = {
  getAllConsignors: getAllConsignors,
  getConsignorByVendor: getConsignorByVendor,
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

function getConsignorByVendor(vendor) {
  return new Promise((resolve, reject) => {
    consignorModel
      .getConsignorByVendor(vendor)
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
