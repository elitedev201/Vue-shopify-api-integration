import axios from "axios"

export default {
  async getConsignors() {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignors")
    return res.data
  },

  async getConsignorByVendor(vendor) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignor", {
      params: {
        vendor: vendor
      }
    })
    return res.data
  }
}