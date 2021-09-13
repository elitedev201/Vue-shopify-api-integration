var router = require("express").Router()
const checkAuth = require("../middleware/auth")
const consignorService = require("../services/consignorService")

router.get("/consignors", getAllConsignors)
router.post("/consignor", addConsignor)
router.put("/consignor", updateConsignor)
router.get("/consignorbyid", getConsignorById)
router.get("/consignor", getConsignorByVendor)
router.delete("/consignor", deleteConsignor)

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

function addConsignor(req, res) {
  var data = req.body
  consignorService
    .addConsignor(data)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

function updateConsignor(req, res) {
  var data = req.body
  consignorService
    .updateConsignor(data)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

function getConsignorById(req, res) {
  const id = req.query.id
  consignorService
    .getConsignorById(id)
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

function deleteConsignor(req, res) {
  const id = req.query.id
  consignorService
    .delConsignor(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = router
