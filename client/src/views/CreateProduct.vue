<template>
  <div>
    <v-card class="create-card">
      <v-card-title class="create-title">Create Product</v-card-title>
      <div class="create-product">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit" id="create-product">
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
            <v-text-field
              v-model="cost"
              label="Cost"
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
                Add
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
  created() {
    this.getConsignors()
  },
  data: () => ({
    title: "",
    description: "",
    notes: "",
    consignor: null,
    consignorList: [],
    product_type: null,
    productType: ["Sofa", "Chair", "Table"],
    color: "",
    material: "",
    base_price: 0,
    size: 0,
    cost: 0,
    published_at: "",
    discountSchedule: "",
    productImgs: null,
    loading: false,
  }),

  methods: {
    submit() {
      // this.$refs.observer.validate()
      let formData = new FormData()
      let consignor_id = this.consignor
      let title = this.title
      let description = this.description
      let product_type = this.product_type
      let color = this.color
      let size = this.size
      let material = this.material
      let price = this.cost
      let base_price = this.base_price
      let notes = this.notes
      let published_at = this.published_at
      let discountSchedule = this.discountSchedule

      if (this.productImgs) {
        for (let file of this.productImgs) {
          formData.append("files", file, file.name)
        }
      } else {
        console.log("there are no files.")
      }

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
      this.loading = true

      productService
        .addProduct(formData)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully added product!")
            this.loading = false
          } else {
            alert("Unfortunately, can't add product!")
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
