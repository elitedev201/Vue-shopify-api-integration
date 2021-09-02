var router = require("express").Router()

const products = require('./products')
const consignors = require('./consignors')
const orders = require('./orders')

router.use(products)
router.use(consignors)
router.use(orders)

router.get("/", (req, res) => {
  res.send(`Hi! Server is listening on port ${process.env.PORT}`)
})

router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message

        return errors
      }, {}),
    })
  }

  return next(err)
})

module.exports = router