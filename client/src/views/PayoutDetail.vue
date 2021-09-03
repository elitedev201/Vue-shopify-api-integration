<template>
  <div class="payout-layout">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <v-btn class="ma-2 white-col" color="primary" @click="pdfGenerate()">
            <v-icon left> mdi-file-pdf </v-icon>
            PDF Generate
          </v-btn>
        </div>
        <div class="d-flex justify-space-between align-center">
          <div class="p-title">
            <h2>
              <strong>{{ company }}</strong>
            </h2>
          </div>
          <div>
            <h4>{{ date }}</h4>
          </div>
        </div>
        <div class="d-flex flex-column justify-space-between">
          <div class="p-sub-title"><strong>Company: </strong>{{ company }}</div>
          <div class="p-sub-title">
            <strong>StreetAddress1: </strong>{{ streetAddress1 }}
          </div>
          <div class="p-sub-title">
            <strong>StreetAddress2: </strong>{{ streetAddress2 }}
          </div>
          <div class="p-sub-title">
            <div class="d-flex justify-between">
              <div><strong>City:</strong> {{ city }} &nbsp;&nbsp;&nbsp;</div>
              <div><strong>State:</strong> {{ state }}&nbsp;&nbsp;&nbsp;</div>
              <div><strong>Zip:</strong> {{ zip }}</div>
            </div>
          </div>
        </div>
        <v-card>
          <v-card-title>
            PayoutDetails
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="payoutDetails"
            :search="search"
          >
            <!-- payout -->
            <template #[`item.spfy_order_id`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.spfy_order_id }}</span>
              </div>
            </template>
            <template #[`item.spfy_line_item_name`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.spfy_line_item_name }}</span>
              </div>
            </template>
            <template #[`item.spfy_line_item_qty`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.spfy_line_item_qty }}</span>
              </div>
            </template>
            <template #[`item.spfy_line_item_price`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.spfy_line_item_price }}</span>
              </div>
            </template>
            <template #[`item.total_amount`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.total_amount }}</span>
              </div>
            </template>
            <template #[`item.defaultPercentage`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.defaultPercentage }}</span>
              </div>
            </template>
            <template #[`item.net_amount`]="{ item }">
              <div class="d-flex align-center">
                <span class="">{{ item.net_amount }}</span>
              </div>
            </template>
          </v-data-table>
        </v-card>

        <div class="d-flex justify-space-around align-center mt-4">
          <div><strong>Total Items: </strong>{{ totalItems }}</div>
          <div><strong>Total Due: </strong> {{ totalSales }}</div>
        </div>

        <div class="create-footer">
          <v-btn href="/payouts"> Back </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import payoutService from "../services/payoutService"
import moment from "moment"
import consignorService from "../services/consignorService"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Order #", value: "spfy_order_id" },
      { text: "Product Name", value: "spfy_line_item_name" },
      { text: "Qty", value: "spfy_line_item_qty" },
      { text: "Price", value: "spfy_line_item_price" },
      { text: "Subtotal", value: "total_amount" },
      { text: "Comm (%)", value: "defaultPercentage" },
      { text: "Net", value: "net_amount" },
    ],
    payoutDetails: [],
    totalItems: 0,
    totalSales: 0,
    company: "",
    date: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
  }),

  created() {
    this.getPayoutDetailsData()
    this.getConsignorByVendor()
    this.getPayoutByVendor()
  },

  methods: {
    async getPayoutDetailsData() {
      const vendor = this.$route.params.vendor
      payoutService.getPayoutDetails(vendor).then(res => {
        this.payoutDetails = res.data
      })
    },

    async getConsignorByVendor() {
      var c_date = new Date()
      this.date = moment(c_date).format("YYYY-MM-DD")
      const vendor = this.$route.params.vendor
      consignorService.getConsignorByVendor(vendor).then(res => {
        this.company = res.data[0].qbCompany
        this.streetAddress1 = res.data[0].qbStAddress1
        this.streetAddress2 = res.data[0].qbStAddress2
        this.city = res.data[0].qbCity
        this.state = res.data[0].qbState
        this.zip = res.data[0].qbZip
      })
    },

    async getPayoutByVendor() {
      const vendor = this.$route.params.vendor
      payoutService.getPayoutByVendor(vendor).then(res => {
        this.totalItems = res.data[0].items_sold
        this.totalSales = res.data[0].net_sales
      })
    },

    async pdfGenerate() {
      var items = this.payoutDetails
      var address2 = ""

      if (this.streetAddress2) {
        address2 = this.streetAddress1
      }

      var doc = new jsPDF()
      doc.setFont("times", "bold")
      doc.text(this.company, 17, 20)

      doc.setFont("times", "normal")
      doc.setFontSize(12)
      doc.text(this.date, 170, 20)

      doc.text("Company:", 25, 35)
      doc.text(this.company, 45, 35)

      doc.text("Address1:", 25, 44)
      doc.text(this.streetAddress1, 45, 44)

      doc.text("Address2:", 25, 53)
      doc.text(address2, 45, 53)

      doc.text("City:", 25, 62)
      doc.text(this.city, 35, 62)

      doc.text("State:", 53, 62)
      doc.text(this.state, 65, 62)

      doc.text("Zip:", 78, 62)
      doc.text(this.zip, 88, 62)

      var rows = []

      for (var key in items) {
        var temp = [
          items[key].spfy_order_id,
          items[key].spfy_line_item_name,
          items[key].spfy_line_item_qty,
          items[key].spfy_line_item_price,
          items[key].total_amount,
          items[key].defaultPercentage,
          items[key].net_amount,
        ]
        rows.push(temp)
      }

      rows.push([
        "",
        "Total Items",
        this.totalItems,
        "",
        "",
        "Total Due",
        this.totalSales,
      ])

      doc.autoTable({
        margin: { top: 70 },
        didDrawPage: function (data) {
          data.settings.margin.top = 10
        },
        head: [
          [
            "Order #",
            "Product Name",
            "Qty",
            "Price",
            "Subtotal",
            "Comm (%)",
            "Net",
          ],
        ],
        body: rows,
      })

      // doc.autoTable(col, rows)

      doc.save(this.date + "_Payout.pdf")
    },
  },
}
</script>
