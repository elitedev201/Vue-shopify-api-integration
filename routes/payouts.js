var router = require("express").Router()
const checkAuth = require("../middleware/auth")
const checkPermissions = require("../middleware/permission")
const payoutService = require("../services/payoutService")

router.get("/payouts", checkAuth, checkPermissions, getPayouts)
router.get("/payout_details", getPayoutDetailsByVendor)
router.get("/payout", getPayoutByVendor)

function getPayouts(req, res) {
  payoutService
    .getPayouts(req.query.flag)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

function getPayoutDetailsByVendor(req, res) {
  const vendor = req.query.vendor
  payoutService
    .getPayoutDetailsByVendor(vendor)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

function getPayoutByVendor(req, res) {
  const vendor = req.query.vendor
  payoutService
    .getPayoutByVendor(vendor)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = router
