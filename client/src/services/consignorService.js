import axios from "axios"

export default {
  async getConsignors() {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignors")
    return res.data
  },

  async addConsignor(data) {
    let res = await axios.post(process.env.VUE_APP_API_URL + "consignor", data)
    return res.data
  },

  async updateConsignor(data) {
    let res = await axios.put(process.env.VUE_APP_API_URL + "consignor", data)
    return res.data
  },

  async deleteConsignor(id) {
    let res = await axios.delete(process.env.VUE_APP_API_URL + "consignor", {
      params: {
        id: id,
      },
    })
    return res.data
  },

  async getConsignorById(id) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignorbyid", {
      params: {
        id: id,
      },
    })
    return res.data
  },

  async getConsignorByVendor(vendor) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignor", {
      params: {
        vendor: vendor,
      },
    })
    return res.data
  },
}
