var router = require("express").Router()
const checkAuth = require("../middleware/auth")
const consignorService = require("../services/consignorService")

router.get("/consignors", getAllConsignors)
router.get("/consignor", getConsignorByVendor)

function getAllConsignors(req, res) {
  consignorService
    .getAllConsignors()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

function getConsignorByVendor(req, res) {
  const vendor = req.query.vendor
  consignorService
    .getConsignorByVendor(vendor)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = router
