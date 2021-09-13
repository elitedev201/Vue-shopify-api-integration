const payoutModel = require("../models/payout-model")

const payoutService = {
  getPayouts: getPayouts,
  getPayoutDetailsByVendor: getPayoutDetailsByVendor,
  getPayoutByVendor: getPayoutByVendor,
}

function getPayouts(flag) {
  return new Promise((resolve, reject) => {
    payoutModel
      .getPayouts(flag)
      .then(data => {
        resolve({ code: 200, data })
      })
      .catch(err => {
        reject(err.message)
        console.log(err)
      })
  })
}

function getPayoutDetailsByVendor(vendor) {
  return new Promise((resolve, reject) => {
    payoutModel
      .getPayoutDetailsByVendor(vendor)
      .then(data => {
        resolve({ code: 200, data })
      })
      .catch(err => {
        reject(err.message)
        console.log(err)
      })
  })
}

function getPayoutByVendor(vendor) {
  return new Promise((resolve, reject) => {
    payoutModel
      .getPayoutByVendor(vendor)
      .then(data => {
        resolve({ code: 200, data })
      })
      .catch(err => {
        reject(err.message)
        console.log(err)
      })
  })
}

module.exports = payoutService
