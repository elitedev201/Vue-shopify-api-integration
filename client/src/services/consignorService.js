import axios from "axios"

export default {
  async getConsignors() {
    let res = await axios.get(process.env.VUE_APP_API_URL + "consignors")
    return res.data
  },
}