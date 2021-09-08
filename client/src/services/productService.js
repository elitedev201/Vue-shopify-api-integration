import axios from "axios"

export default {
  async getProducts(accessToken) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "products", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  },

  async getProductById(product_id) {
    let res = await axios.get(process.env.VUE_APP_API_URL + "product", {
      params: {
        product_id: product_id,
      },
    })
    return res.data
  },

  async addProduct(formData) {
    let res = await axios.post(
      process.env.VUE_APP_API_URL + "products",
      formData
    )
    return res.data
  },

  async updateProduct(formData) {
    let res = await axios.put(
      process.env.VUE_APP_API_URL + "products",
      formData
    )
    return res.data
  },

  async deleteProduct(product_id, title) {
    let res = await axios.delete(process.env.VUE_APP_API_URL + "products", {
      params: {
        title: title,
        product_id: product_id,
      },
    })
    return res.data
  },

  async getEventSingle(eventId, accessToken) {
    let res = await axios.get(
      process.env.VUE_APP_API_URL + "events/" + eventId,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return res.data
  },
}
