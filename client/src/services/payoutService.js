import axios from "axios"

export default {
  async getPayouts(accessToken) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "payouts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  },
  async getPayoutDetails(vendor) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "payout_details", {
      params: {
        vendor: vendor,
      },
    })
    return res.data
  },
  async getPayoutByVendor(vendor) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "payout", {
      params: {
        vendor: vendor,
      },
    })
    return res.data
  },
}
