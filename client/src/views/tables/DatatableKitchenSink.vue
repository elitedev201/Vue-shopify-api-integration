<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col cols="12" offset-md="8" md="4">
          <v-text-field
            v-model="search"
            :append-icon="icons.mdiMagnify"
            label="Search"
            single-line
            hide-details
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="productList"
      :search="search"
      :items-per-page="5"
      class="table-kitchen-sink"
    >
      <!-- product -->
      <template #[`item.shopify_id`]="{item}">
        <span class="text-no-wrap">{{ item.shopify_id }}</span>
      </template>
      <template #[`item.main_img_src`]="{item}">
        <div class="d-flex align-center">
          <div>
            <v-img :src="item.main_img_src" height="40" width="40"></v-img>
          </div>
        </div>
      </template>
      <template #[`item.title`]="{item}">
        <span class="text-no-wrap">{{ item.title }}</span>
      </template>
      <template #[`item.description`]="{item}">
        <span class="text-no-wrap">{{ item.description }}</span>
      </template>
      <template #[`item.vendor`]="{item}">
        <span class="text-no-wrap">{{ item.vendor }}</span>
      </template>
      <template #[`item.consignorID`]="{item}">
        <span class="text-no-wrap">{{ item.consignorID }}</span>
      </template>
      <template #[`item.price`]="{item}">
        <span class="text-no-wrap">${{ item.price }}</span>
      </template>
      <template #[`item.color`]="{item}">
        <span class="text-no-wrap">{{ item.color }}</span>
      </template>
      <template #[`item.material`]="{item}">
        <span class="text-no-wrap">{{ item.material }}</span>
      </template>
      <template #[`item.size`]="{item}">
        <span class="text-no-wrap">{{ item.size }}</span>
      </template>
      <template #[`item.product_type`]="{item}">
        <span class="text-no-wrap">{{ item.product_type }}</span>
      </template>
      <template #[`item.qb_sku`]="{item}">
        <span class="text-no-wrap">{{ item.qb_sku }}</span>
      </template>
      <template #[`item.barcode`]="{item}">
        <span class="text-no-wrap">{{ item.barcode }}</span>
      </template>
      <template #[`item.sale_price`]="{item}">
        <span class="text-no-wrap">{{ item.sale_price }}</span>
      </template>
      <template #[`item.sale_price_set`]="{item}">
        <span class="text-no-wrap">{{ item.sale_price_set | formatDate }}</span>
      </template>
      <template #[`item.sale_price_system`]="{item}">
        <span class="text-no-wrap">{{ item.sale_price_system }}</span>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="me-2" @click="editItem(item)">
          {{ icons.mdiPencilOutline }}
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          {{ icons.mdiDeleteOutline }}
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.title"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.vendor"
                  label="Vendor"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.price"
                  label="Price"
                  prefix="$"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.size"
                  label="Size"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.sale_price"
                  label="Sale Price"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.status"
                  :items="selectOptions"
                  label="Standard"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.product_type"
                  label="Product Type"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.color"
                  label="Color"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.qb_sku"
                  label="QB SKU"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.material"
                  label="Material"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.main_img_src"
                  label="Image"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.description"
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="close">
            Cancel
          </v-btn>
          <v-btn color="success" @click="save">
            Save
          </v-btn>
        </v-card-actions>
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
          <v-btn color="error" outlined @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="success" @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api"
import { mdiMagnify, mdiDeleteOutline, mdiPencilOutline } from "@mdi/js"
import productService from "@/services/productService.js"

export default {
  setup() {
    const search = ref("")
    const productList = ref([])

    return {
      dialog: false,
      dialogDelete: false,
      icons: {
        mdiMagnify,
        mdiDeleteOutline,
        mdiPencilOutline,
      },
      search,
      headers: [
        { text: "SHOPIFY_ID", value: "shopify_id" },
        { text: "IMAG", value: "main_img_src", sortable: false },
        { text: "TITLE", value: "title" },
        { text: "DESCRIPTION", value: "description" },
        { text: "VENDOR", value: "vendor" },
        { text: "CONSIGNOR_ID", value: "consignorID" },
        { text: "PRICE", value: "price" },
        { text: "COLOR", value: "color" },
        { text: "MATERIAL", value: "material" },
        { text: "SIZE", value: "size" },
        { text: "TYPE", value: "product_type" },
        { text: "QB_SKU", value: "qb_sku" },
        { text: "BARCODE", value: "barcode" },
        { text: "SALE_PRICE", value: "sale_price" },
        { text: "SALE_PRICE_SET", value: "sale_price_set" },
        { text: "SALE_PRICE_SYSTEM", value: "sale_price_system" },
        { text: "ACTION", value: "actions", sortable: false },
      ],
      selectOptions: [
        { text: "Current", value: 1 },
        { text: "Professional", value: 2 },
        { text: "Rejected", value: 3 },
        { text: "Resigned", value: 4 },
        { text: "Applied", value: 5 },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      // categoryIconFilter,
      productList,
    }
  },
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
  },
  methods: {
    async getProductsData() {
      // Use the eventService to call the getEvents() method
      productService.getProducts().then((res) => {
        this.productList = res
      })
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
      this.userList.splice(this.editedIndex, 1)
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

<style lang="scss" scoped>
.table-kitchen-sink ::v-deep {
  .v-data-table-header {
    white-space: nowrap;
  }
}
</style>
