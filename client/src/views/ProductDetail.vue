<template>
  <div>
    <v-card class="create-card">
      <v-card-title class="create-title"> Product Detail </v-card-title>
      <div class="create-product">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit" id="create-product">
            <v-row class="mb-12" no-gutters>
              <v-col md="5">
                <validation-provider
                  v-slot="{ errors }"
                  name="Title"
                  rules="required|max:20"
                >
                  <v-text-field
                    v-model="title"
                    :counter="20"
                    :error-messages="errors"
                    label="Title"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col md="5" offset-md="2">
                <validation-provider
                  v-slot="{ errors }"
                  name="status"
                  rules="required"
                >
                  <v-select
                    v-model="status"
                    :items="statusList"
                    :error-messages="errors"
                    label="Status Select"
                    data-vv-name="statusSelect"
                    required
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <validation-provider
              v-slot="{ errors }"
              name="consignor"
              rules="required"
            >
              <v-select
                v-model="consignor"
                :items="consignorList"
                :item-text="'qbCompany'"
                :item-value="'id'"
                :error-messages="errors"
                label="Consignor"
                required
              ></v-select>
            </validation-provider>
            <v-row class="mb-12" no-gutters>
              <v-col md="5">
                <a
                  :href="
                    'https://spfy-connection-app-store.myshopify.com/products/' +
                    handle
                  "
                >
                  ShopifyUrl
                </a>
              </v-col>
              <v-col md="5" offset-md="2">
                <v-text-field
                  v-model="price"
                  label="Current Shopify Price"
                  prefix="$"
                ></v-text-field>
              </v-col>
            </v-row>

            <validation-provider
              v-slot="{ errors }"
              name="description"
              rules="required"
            >
              <v-textarea
                :error-messages="errors"
                v-model="description"
                label="Description"
                required
              ></v-textarea>
            </validation-provider>
            <div class="image-label">Product Images:</div>
            <v-row>
              <v-col md="4" v-for="(item, index) in shopifyImgs" :key="index">
                <v-card class="mx-auto my-3">
                  <v-img height="100" :src="item.src"></v-img>
                </v-card>
              </v-col>
            </v-row>

            <v-file-input
              label="Product Image"
              dense
              multiple
              chips
              v-model="productImgs"
            ></v-file-input>
            <validation-provider
              v-slot="{ errors }"
              name="productType"
              rules="required"
            >
              <v-select
                v-model="product_type"
                :items="productType"
                :error-messages="errors"
                label="ProductType"
                data-vv-name="productType"
                required
              ></v-select>
            </validation-provider>
            <v-text-field v-model="color" label="Color"></v-text-field>
            <v-text-field
              v-model="size"
              label="Size"
              type="number"
            ></v-text-field>
            <v-text-field v-model="material" label="Material"></v-text-field>
            <v-text-field
              v-model="base_price"
              label="BasePrice"
              prefix="$"
              type="number"
            ></v-text-field>
            <v-text-field v-model="notes" label="Notes"></v-text-field>
            <v-text-field
              v-model="published_at"
              label="PublishedDate"
              type="date"
            ></v-text-field>
            <v-text-field
              v-model="discountSchedule"
              label="DiscountSchedule"
            ></v-text-field>
            <div class="create-footer">
              <v-btn class="mr-4" type="submit" :disabled="invalid">
                Update
              </v-btn>
              <v-btn @click="clear"> Back </v-btn>
            </div>
          </form>
        </validation-observer>
      </div>
    </v-card>
    <div v-if="loading" class="text-center loading-button">
      <v-progress-circular
        :size="30"
        color="primary"
        indeterminate
      ></v-progress-circular>
      Adding Product...
    </div>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate"
import consignorService from "../services/consignorService"
import productService from "../services/productService"

setInteractionMode("eager")

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
})

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
})

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
})

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
})

extend("email", {
  ...email,
  message: "Email must be valid",
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    title: "",
    description: "",
    notes: "",
    consignor: null,
    consignorList: [],
    product_type: null,
    productType: ["Sofa", "Chair", "Table"],
    status: "Draft",
    statusList: ["Active", "Draft"],
    color: "",
    material: "",
    base_price: 0,
    size: 0,
    price: 0,
    published_at: "",
    discountSchedule: "",
    productImgs: null,
    loading: false,
    shopifyUrl: "",
    handle: "",
    shopifyImgs: null,
  }),
  created() {
    this.getProductInfo()
    this.getConsignors()
  },
  methods: {
    async getProductInfo() {
      const productId = this.$route.params.productid
      productService.getProductById(productId).then(res => {
        this.title = res.data.title
        this.description = res.data.description
        this.price = res.data.price
        this.consignor = res.data.consignorID
        this.product_type = res.data.product_type
        this.color = res.data.color
        this.size = res.data.size
        this.material = res.data.material
        this.base_price = res.data.base_price
        this.status = res.data.status
        this.discountSchedule = res.data.discountSchedule
        this.notes = res.data.notes
        this.handle = res.shopifyData.handle
        this.shopifyImgs = res.shopifyData.images
        this.product_id = res.data.product_id
        var d = new Date(res.data.published_at)
        if (d.getMonth() < 9) {
          this.published_at = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate()
        } else {
          this.published_at = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
        }
      })
    },
    submit() {
      // this.$refs.observer.validate()
      let formData = new FormData()
      let product_id = this.product_id
      let consignor_id = this.consignor
      let title = this.title
      let description = this.description
      let product_type = this.product_type
      let color = this.color
      let size = this.size
      let material = this.material
      let price = this.price
      let base_price = this.base_price
      let notes = this.notes
      let published_at = this.published_at
      let discountSchedule = this.discountSchedule
      let status = this.status

      if (this.productImgs) {
        for (let file of this.productImgs) {
          formData.append("files", file, file.name)
        }
      } else {
        console.log("there are no files.")
      }

      formData.append("product_id", product_id)
      formData.append("consignor_id", consignor_id)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("product_type", product_type)
      formData.append("color", color)
      formData.append("size", size)
      formData.append("material", material)
      formData.append("price", price)
      formData.append("base_price", base_price)
      formData.append("notes", notes)
      formData.append("published_at", published_at)
      formData.append("discountSchedule", discountSchedule)
      formData.append("status", status)
      this.loading = true

      productService
        .updateProduct(formData)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully updated product!")
            this.loading = false
            this.getProductInfo()
          } else {
            alert("Unfortunately, can't update product!")
            this.loading = false
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })
    },

    clear() {
      window.location.href = "/products"
    },
    async getConsignors() {
      consignorService.getConsignors().then(res => {
        this.consignorList = res.data
      })
    },
  },
}
</script>
