var router = require("express").Router()
const checkAuth = require("../middleware/auth")
const orderService = require("../services/orderService")

//webhook routes
router.post("/order/create", createOrders)

// router.post("/order/update", (req, res) => {
//   console.log(req.body)
// })

// router.post("/order/delete", (req, res) => {
//   console.log(req.body)
// })

// router.post("/order/cancel", (req, res) => {
//   console.log(req.body)
// })

// router.post("/order/fulfillment", (req, res) => {
//   console.log(req.body)
// })

// router.post("/order/payment", (req, res) => {
//   console.log(req.body)
// })

// router.post("/order/create", createOrders)

function createOrders(req, res) {
  orderService
    .createOrders(req)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = router
