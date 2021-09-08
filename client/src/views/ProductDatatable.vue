<template>
  <v-card>
    <v-card-title>
      ProductList
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="productList" :search="search">
      <!-- product -->
      <template #[`item.shopify_id`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.shopify_id }}</span></a
        >
      </template>
      <template #[`item.main_img_src`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/product/' + item.product_id" class="custom-link"
            ><span class="">{{ item.main_img_src }}</span></a
          >
        </div>
      </template>
      <template #[`item.title`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.title }}</span></a
        >
      </template>
      <template #[`item.description`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.description }}</span></a
        >
      </template>
      <template #[`item.vendor`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.vendor }}</span></a
        >
      </template>
      <template #[`item.consignorID`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.consignorID }}</span></a
        >
      </template>
      <template #[`item.price`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">${{ item.price }}</span></a
        >
      </template>
      <template #[`item.color`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.color }}</span></a
        >
      </template>
      <template #[`item.material`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.material }}</span></a
        >
      </template>
      <template #[`item.size`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.size }}</span></a
        >
      </template>
      <template #[`item.product_type`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.product_type }}</span></a
        >
      </template>
      <template #[`item.qb_sku`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.qb_sku }}</span></a
        >
      </template>
      <template #[`item.barcode`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.barcode }}</span></a
        >
      </template>
      <template #[`item.sale_price`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.sale_price }}</span></a
        >
      </template>
      <template #[`item.sale_price_set`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{
            item.sale_price_set | formatDate
          }}</span></a
        >
      </template>
      <template #[`item.sale_price_system`]="{ item }">
        <a :href="'/product/' + item.product_id" class="custom-link"
          ><span class="text-no-wrap">{{ item.sale_price_system }}</span></a
        >
      </template>
      <template #[`item.actions`]="{ item }">
        <span class="text-no-wrap">
          <v-icon small class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </span>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="">
        <v-card-title class="create-title">Edit Product</v-card-title>
        <div class="create-product">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <validation-provider
                v-slot="{ errors }"
                name="Title"
                rules="required|max:20"
              >
                <v-text-field
                  v-model="editedItem.title"
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
                  v-model="editedItem.description"
                  label="Description"
                  required
                ></v-textarea>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="consignorSelect"
                rules="required"
              >
                <v-select
                  v-model="editedItem.consignorID"
                  :items="consignorList"
                  :item-text="'qbCompany'"
                  :item-value="'id'"
                  :error-messages="errors"
                  label="Consignor Select"
                  data-vv-name="consignorSelect"
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
              <v-text-field
                v-model="editedItem.product_type"
                label="ProductType"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.color"
                label="Color"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.size"
                label="Size"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.material"
                label="Material"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.base_price"
                label="BasePrice"
                prefix="$"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.price"
                label="Cost"
                prefix="$"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.notes"
                label="Notes"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.published_at"
                label="PublishDate"
                type="date"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.discountSchedule"
                label="DiscountSchedule"
              ></v-text-field>
              <div class="create-footer">
                <v-btn class="mr-4" type="submit" :disabled="invalid">
                  Update
                </v-btn>
                <v-btn @click="clear"> Cancel </v-btn>
              </div>
            </form>
          </validation-observer>
        </div>
      </v-card>
    </v-dialog>

    <!-- dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import productService from "../services/productService"
import consignorService from "../services/consignorService"
import { required, digits, email, max, regex } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate"

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
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Shopify_id", value: "shopify_id" },
      { text: "Images", value: "main_img_src", sortable: false },
      { text: "Title", value: "title" },
      { text: "Description", value: "description" },
      { text: "Vendor", value: "vendor" },
      { text: "Consignor_id", value: "consignorID" },
      { text: "Price", value: "price" },
      { text: "Color", value: "color" },
      { text: "Material", value: "material" },
      { text: "Size", value: "size" },
      { text: "Type", value: "product_type" },
      { text: "Qb_sku", value: "qb_sku" },
      { text: "Barcode", value: "barcode" },
      { text: "Sale_price", value: "sale_price" },
      { text: "Base_price", value: "base_price" },
      { text: "Sale_set", value: "sale_price_set" },
      { text: "Sale_system", value: "sale_price_system" },
      { text: "Action", value: "actions", sortable: false },
    ],
    productList: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    productImgs: null,
  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },
  created() {
    this.getProductsData()
    this.getConsignors()
  },

  methods: {
    async getProductsData() {
      //Get accessToken
      const accessToken = await this.$auth.getTokenSilently()

      // Use the productService to call the getProducts() method
      productService.getProducts(accessToken).then(res => {
        this.productList = res.data
      })
    },

    async getConsignors() {
      consignorService.getConsignors().then(res => {
        this.consignorList = res.data
      })
    },

    submit() {
      let formData = new FormData()
      let product_id = this.editedItem.product_id
      let consignor_id = this.editedItem.consignorID
      let title = this.editedItem.title
      let description = this.editedItem.description
      let product_type = this.editedItem.product_type
      let color = this.editedItem.color
      let size = this.editedItem.size
      let material = this.editedItem.material
      let price = this.editedItem.price
      let base_price = this.editedItem.base_price
      let notes = this.editedItem.notes
      let published_at = this.editedItem.published_at
      let discountSchedule = this.editedItem.discountSchedule

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

      productService
        .updateProduct(formData)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully updated product!")
            this.getProductsData()
          } else {
            alert("Unfortunately, can't update product!")
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })

      this.close()
    },

    clear() {
      this.$refs.observer.reset()
      this.close()
    },

    editItem(item) {
      this.editedIndex = this.productList.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.productList.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.productList.splice(this.editedIndex, 1)
      let product_id = this.editedItem.product_id
      let title = this.editedItem.title
      productService
        .deleteProduct(product_id, title)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully deleted product!")
            this.getProductsData()
          } else {
            alert("Unfortunately, can't delete product!")
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productList[this.editedIndex], this.editedItem)
      } else {
        this.productList.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
