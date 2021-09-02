const db = require("../database/db")

const orderModel = {
  createOrders: createOrders,
  createOrderItem: createOrderItem,
}

function createOrders(req) {
  return new Promise((resolve, reject) => {
    var request = new db.Request()

    const spfy_order_id = req.body.id
    const spfy_email = req.body.contact_email
    const spfy_financial_status = req.body.financial_status
    const spfy_paid_at = req.body.processed_at
    const spfy_fulfillment_status = req.body.fulfillment_status
    const spfy_fulfilled_at = req.body.updated_at
    const spfy_accepts_marketing = req.body.buyer_accepts_marketing
    const spfy_currency = req.body.currency
    const spfy_subtotal = req.body.subtotal_price
    const spfy_shipping = req.body.requires_shipping
    const spfy_taxes = req.body.total_tax
    const spfy_total = req.body.total_price
    const spfy_discount_amount = req.body.total_discounts
    const spfy_created_at = req.body.created_at

    var spfy_billing_name = ""
    var spfy_billing_street = ""
    var spfy_billing_address_1 = ""
    var spfy_billing_address_2 = ""
    var spfy_billing_company = ""
    var spfy_billing_city = ""
    var spfy_billing_zip = ""
    var spfy_billing_state = ""
    var spfy_billing_province = ""
    var spfy_billing_country = ""
    var spfy_billing_phone = ""
    var spfy_billing_province_name = ""

    if (req.body.billing_address) {
      spfy_billing_name = req.body.billing_address.name
      spfy_billing_street = req.body.billing_address.address1
      spfy_billing_address_1 = req.body.billing_address.address1
      spfy_billing_address_2 = req.body.billing_address.address2
      spfy_billing_company = req.body.billing_address.company
      spfy_billing_city = req.body.billing_address.city
      spfy_billing_zip = req.body.billing_address.zip
      spfy_billing_state = req.body.billing_address.province
      spfy_billing_province = req.body.billing_address.province
      spfy_billing_country = req.body.billing_address.country
      spfy_billing_phone = req.body.billing_address.phone
      spfy_billing_province_name = req.body.billing_address.province
    }

    var spfy_shipping_name = ""
    var spfy_shipping_street = ""
    var spfy_shipping_address_1 = ""
    var spfy_shipping_address_2 = ""
    var spfy_shipping_company = ""
    var spfy_shipping_city = ""
    var spfy_shipping_zip = ""
    var spfy_shipping_state = ""
    var spfy_shipping_province = ""
    var spfy_shipping_country = ""
    var spfy_shipping_phone = ""
    var spfy_shipping_province_name = ""

    if (req.body.shipping_address) {
      spfy_shipping_name = req.body.shipping_address.name
      spfy_shipping_street = req.body.shipping_address.adress1
      spfy_shipping_address_1 = req.body.shipping_address.adress1
      spfy_shipping_address_2 = req.body.shipping_address.adress2
      spfy_shipping_company = req.body.shipping_address.company
      spfy_shipping_city = req.body.shipping_address.city
      spfy_shipping_zip = req.body.shipping_address.zip
      spfy_shipping_state = req.body.shipping_address.province
      spfy_shipping_province = req.body.shipping_address.province
      spfy_shipping_province_name = req.body.shipping_address.province
      spfy_shipping_country = req.body.shipping_address.country
      spfy_shipping_phone = req.body.shipping_address.phone
    }

    const spfy_notes = req.body.note
    const spfy_note_attributes = req.body.note_attributes
    const spfy_cancelled_at = req.body.cancelled_at
    const spfy_payment_method = req.body.processing_method
    const spfy_payment_reference_id = req.body.reference
    const spfy_refunded_amount = req.body.refunds.price
    const spfy_outstanding_balance = req.body.total_outstanding
    const spfy_employee = req.body.name
    const spfy_location = req.body.location_id
    const spfy_device_id = req.body.device_id
    const spfy_id = req.body.id
    const spfy_risk_level = ""
    const spfy_source = req.body.source_url
    var spfy_tax_1_name = ""
    var spfy_tax_1_amount = 0
    var spfy_tax_2_name = ""
    var spfy_tax_2_amount = 0
    var spfy_tax_3_name = ""
    var spfy_tax_3_amount = 0
    var spfy_tax_4_name = ""
    var spfy_tax_4_amount = 0
    var spfy_tax_5_name = ""
    var spfy_tax_5_amount = 0

    for (let i = 0; i < req.body.tax_lines.length; i++) {
      if (i == 0) {
        spfy_tax_1_name = req.body.tax_lines[0].title
        spfy_tax_1_amount = req.body.tax_lines[0].price
      } else if (i == 1) {
        spfy_tax_2_name = req.body.tax_lines[1].title
        spfy_tax_2_amount = req.body.tax_lines[1].price
      } else if (i == 2) {
        spfy_tax_3_name = req.body.tax_lines[2].title
        spfy_tax_3_amount = req.body.tax_lines[2].price
      } else if (i == 3) {
        spfy_tax_4_name = req.body.tax_lines[3].title
        spfy_tax_4_amount = req.body.tax_lines[3].price
      } else if (i == 4) {
        spfy_tax_5_name = req.body.tax_lines[4].title
        spfy_tax_5_amount = req.body.tax_lines[4].price
      }
    }

    const spfy_phone = req.body.phone
    const spfy_receipt_number = req.body.number
    const spfy_duties = req.body.current_total_duties_set

    const spfy_payment_terms_name = req.body.payment_gateway_names[0]
    const spfy_next_payment_due_at = ""
    const last_updated = req.body.updated_at
    const spfy_json_response = req.body

    request.input("spfy_order_id", db.VarChar, spfy_order_id)
    request.input("spfy_email", db.VarChar, spfy_email)
    request.input("spfy_financial_status", db.VarChar, spfy_financial_status)
    request.input("spfy_paid_at", db.DateTime, spfy_paid_at)
    request.input(
      "spfy_fulfillment_status",
      db.VarChar,
      spfy_fulfillment_status
    )
    request.input("spfy_fulfilled_at", db.DateTime, spfy_fulfilled_at)
    request.input("spfy_accepts_marketing", db.VarChar, spfy_accepts_marketing)
    request.input("spfy_currency", db.VarChar, spfy_currency)
    request.input("spfy_subtotal", db.Numeric, spfy_subtotal)
    request.input("spfy_shipping", db.Numeric, spfy_shipping)
    request.input("spfy_taxes", db.Numeric, spfy_taxes)
    request.input("spfy_total", db.Numeric, spfy_total)
    request.input("spfy_discount_amount", db.Numeric, spfy_discount_amount)
    request.input("spfy_created_at", db.DateTime, spfy_created_at)
    request.input("spfy_billing_name", db.VarChar, spfy_billing_name)
    request.input("spfy_billing_street", db.VarChar, spfy_billing_street)
    request.input("spfy_billing_address_1", db.VarChar, spfy_billing_address_1)
    request.input("spfy_billing_address_2", db.VarChar, spfy_billing_address_2)
    request.input("spfy_billing_company", db.VarChar, spfy_billing_company)
    request.input("spfy_billing_city", db.VarChar, spfy_billing_city)
    request.input("spfy_billing_zip", db.VarChar, spfy_billing_zip)
    request.input("spfy_billing_state", db.VarChar, spfy_billing_state)
    request.input("spfy_billing_province", db.VarChar, spfy_billing_province)
    request.input("spfy_billing_country", db.VarChar, spfy_billing_country)
    request.input("spfy_billing_phone", db.Int, spfy_billing_phone)
    request.input(
      "spfy_billing_province_name",
      db.VarChar,
      spfy_billing_province_name
    )
    request.input("spfy_shipping_name", db.VarChar, spfy_shipping_name)
    request.input("spfy_shipping_street", db.VarChar, spfy_shipping_street)
    request.input(
      "spfy_shipping_address_1",
      db.VarChar,
      spfy_shipping_address_1
    )
    request.input(
      "spfy_shipping_address_2",
      db.VarChar,
      spfy_shipping_address_2
    )
    request.input("spfy_shipping_company", db.VarChar, spfy_shipping_company)
    request.input("spfy_shipping_city", db.VarChar, spfy_shipping_city)
    request.input("spfy_shipping_zip", db.VarChar, spfy_shipping_zip)
    request.input("spfy_shipping_state", db.VarChar, spfy_shipping_state)
    request.input("spfy_shipping_province", db.VarChar, spfy_shipping_province)
    request.input(
      "spfy_shipping_province_name",
      db.VarChar,
      spfy_shipping_province_name
    )
    request.input("spfy_shipping_country", db.VarChar, spfy_shipping_country)
    request.input("spfy_shipping_phone", db.VarChar, spfy_shipping_phone)
    request.input("spfy_notes", db.VarChar, spfy_notes)
    request.input("spfy_note_attributes", db.VarChar, spfy_note_attributes)
    request.input("spfy_cancelled_at", db.DateTime, spfy_cancelled_at)
    request.input("spfy_payment_method", db.VarChar, spfy_payment_method)
    request.input(
      "spfy_payment_reference_id",
      db.VarChar,
      spfy_payment_reference_id
    )
    request.input("spfy_refunded_amount", db.Numeric, spfy_refunded_amount)
    request.input(
      "spfy_outstanding_balance",
      db.Numeric,
      spfy_outstanding_balance
    )
    request.input("spfy_employee", db.VarChar, spfy_employee)
    request.input("spfy_location", db.VarChar, spfy_location)
    request.input("spfy_device_id", db.Int, spfy_device_id)
    request.input("spfy_id", db.VarChar, spfy_id)
    request.input("spfy_risk_level", db.VarChar, spfy_risk_level)
    request.input("spfy_source", db.VarChar, spfy_source)
    request.input("spfy_tax_1_name", db.VarChar, spfy_tax_1_name)
    request.input("spfy_tax_1_amount", db.Numeric, spfy_tax_1_amount)
    request.input("spfy_tax_2_name", db.VarChar, spfy_tax_2_name)
    request.input("spfy_tax_2_amount", db.Numeric, spfy_tax_2_amount)
    request.input("spfy_tax_3_name", db.VarChar, spfy_tax_3_name)
    request.input("spfy_tax_3_amount", db.Numeric, spfy_tax_3_amount)
    request.input("spfy_tax_4_name", db.VarChar, spfy_tax_4_name)
    request.input("spfy_tax_4_amount", db.Numeric, spfy_tax_4_amount)
    request.input("spfy_tax_5_name", db.VarChar, spfy_tax_5_name)
    request.input("spfy_tax_5_amount", db.Numeric, spfy_tax_5_amount)
    request.input("spfy_phone", db.VarChar, spfy_phone)
    request.input("spfy_receipt_number", db.VarChar, spfy_receipt_number)
    request.input("spfy_duties", db.Numeric, spfy_duties)
    request.input(
      "spfy_payment_terms_name",
      db.VarChar,
      spfy_payment_terms_name
    )
    request.input(
      "spfy_next_payment_due_at",
      db.VarChar,
      spfy_next_payment_due_at
    )
    request.input("last_updated", db.DateTime, last_updated)
    request.input("spfy_json_response", db.VarChar, spfy_json_response)

    let query =
      "INSERT INTO spfyOrders(spfy_order_id, spfy_email, spfy_financial_status, spfy_paid_at, \
      spfy_fulfillment_status, spfy_fulfilled_at, spfy_accepts_marketing, spfy_currency, \
      spfy_subtotal, spfy_shipping, spfy_taxes, spfy_total, spfy_discount_amount, spfy_created_at, \
      spfy_billing_name, spfy_billing_street, spfy_billing_address_1, spfy_billing_address_2, \
      spfy_billing_company, spfy_billing_city, spfy_billing_zip, spfy_billing_state, spfy_billing_province, \
      spfy_shipping_name, spfy_shipping_street, spfy_shipping_address_1, spfy_shipping_address_2, spfy_shipping_company, \
      spfy_shipping_city, spfy_shipping_zip, spfy_shipping_state, spfy_shipping_province, spfy_shipping_province_name, \
      spfy_shipping_country, spfy_shipping_phone, spfy_notes, spfy_note_attributes, spfy_cancelled_at, \
      spfy_payment_method, spfy_payment_reference_id, spfy_refunded_amount, spfy_outstanding_balance, spfy_employee, \
      spfy_location, spfy_device_id, spfy_id, spfy_risk_level, spfy_source, spfy_tax_1_name,spfy_tax_1_amount, \
      spfy_tax_2_name, spfy_tax_2_amount, spfy_tax_3_name, spfy_tax_3_amount, spfy_tax_4_name, spfy_tax_4_amount, \
      spfy_tax_5_name, spfy_tax_5_amount, spfy_phone, spfy_receipt_number, spfy_duties, spfy_payment_terms_name, \
      spfy_next_payment_due_at, last_updated, spfy_json_response) VALUES (@spfy_order_id, @spfy_email, @spfy_financial_status, @spfy_paid_at, \
        @spfy_fulfillment_status, @spfy_fulfilled_at, @spfy_accepts_marketing, @spfy_currency, \
        @spfy_subtotal, @spfy_shipping, @spfy_taxes, @spfy_total, @spfy_discount_amount, @spfy_created_at, \
        @spfy_billing_name, @spfy_billing_street, @spfy_billing_address_1, @spfy_billing_address_2, \
        @spfy_billing_company, @spfy_billing_city, @spfy_billing_zip, @spfy_billing_state, @spfy_billing_province, \
        @spfy_shipping_name, @spfy_shipping_street, @spfy_shipping_address_1, @spfy_shipping_address_2, @spfy_shipping_company, \
        @spfy_shipping_city, @spfy_shipping_zip, @spfy_shipping_state, @spfy_shipping_province, @spfy_shipping_province_name, \
        @spfy_shipping_country, @spfy_shipping_phone, @spfy_notes, @spfy_note_attributes, @spfy_cancelled_at, \
        @spfy_payment_method, @spfy_payment_reference_id, @spfy_refunded_amount, @spfy_outstanding_balance, @spfy_employee, \
        @spfy_location, @spfy_device_id, @spfy_id, @spfy_risk_level, @spfy_source, @spfy_tax_1_name, @spfy_tax_1_amount, \
        @spfy_tax_2_name, @spfy_tax_2_amount, @spfy_tax_3_name, @spfy_tax_3_amount, @spfy_tax_4_name, @spfy_tax_4_amount, \
        @spfy_tax_5_name, @spfy_tax_5_amount, @spfy_phone, @spfy_receipt_number, @spfy_duties, @spfy_payment_terms_name, \
        @spfy_next_payment_due_at, @last_updated, @spfy_json_response)"

    request.query(query, (error, rows) => {
      if (error) {
        reject(error.message)
      } else {
        resolve(rows.recordset)
      }
    })
  })
}

function createOrderItem(
  order_id,
  created_at,
  qty,
  name,
  price,
  compare_at_price,
  sku,
  shipping,
  taxable,
  fulfillment_status,
  vendor,
  discount_amount,
  last_updated
) {
  var request = new db.Request()
  request.input("spfy_order_id", db.VarChar, order_id)
  request.input("spfy_created_at", db.DateTime, created_at)
  request.input("spfy_line_item_qty", db.Numeric, qty)
  request.input("spfy_line_item_name", db.VarChar, name)
  request.input("spfy_line_item_price", db.Numeric, price)
  request.input("spfy_line_item_compare_at_price", db.Numeric, compare_at_price)
  request.input("spfy_line_item_sku", db.VarChar, sku)
  request.input("spfy_line_item_taxable", db.VarChar, taxable)
  request.input("spfy_line_item_req_shipping", db.VarChar, shipping)
  request.input(
    "spfy_line_item_fulfillment_status",
    db.VarChar,
    fulfillment_status
  )
  request.input("spfy_line_item_discount_amount", db.Numeric, discount_amount)
  request.input("spfy_vendor", db.VarChar, vendor)
  request.input("last_updated", db.DateTime, last_updated)

  let subQuery =
    "INSERT INTO spfyOrderItems(spfy_order_id, spfy_created_at, spfy_line_item_qty, spfy_line_item_name, \
    spfy_line_item_price, spfy_line_item_compare_at_price, spfy_line_item_sku, spfy_line_item_taxable, \
    spfy_line_item_req_shipping, spfy_line_item_fulfillment_status, spfy_line_item_discount_amount, spfy_vendor, \
  last_updated) VALUES (@spfy_order_id, @spfy_created_at, @spfy_line_item_qty, @spfy_line_item_name, \
    @spfy_line_item_price, @spfy_line_item_compare_at_price, @spfy_line_item_sku, @spfy_line_item_taxable, \
    @spfy_line_item_req_shipping, @spfy_line_item_fulfillment_status, @spfy_line_item_discount_amount, @spfy_vendor, @last_updated)"

  return new Promise((resolve, reject) => {
    request.query(subQuery, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        resolve({ code: 200 })
      }
    })
  })
}

module.exports = orderModel
