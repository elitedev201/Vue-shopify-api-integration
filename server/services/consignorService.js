const consignorModel = require("../models/consignor-model")

const consignorService = {
  getAllConsignors: getAllConsignors,
  getConsignorByVendor: getConsignorByVendor,
  delConsignor: delConsignor,
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
      })
  })
}

function delConsignor(id) {
  return new Promise((resolve, reject) => {
    consignorModel
      .delConsignor(id)
      .then(data => {
        resolve({ code: 200, data })
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

module.exports = consignorService
