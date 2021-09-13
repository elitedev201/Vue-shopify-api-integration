<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <div class="d-flex justify-end create-button"></div>
      <template>
        <v-card class="ma-16">
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
          <v-data-table
            :headers="headers"
            :items="productList"
            :search="search"
          >
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
                ><span class="text-no-wrap">{{
                  item.sale_price_system
                }}</span></a
              >
            </template>
          </v-data-table>
        </v-card>
      </template>
      <div class="create-footer mr-16">
        <v-btn @click="back"> Back </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import productService from "../services/productService"

export default {
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
    ],
    productList: [],
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
    this.getProductsDataByVendor()
  },

  methods: {
    async getProductsDataByVendor() {
      //Get accessToken
      // const accessToken = await this.$auth.getTokenSilently()
      const vendor = this.$route.params.vendor
      // Use the productService to call the getProducts() method
      productService.getProductsByVendor(vendor).then(res => {
        this.productList = res.data
      })
    },

    back() {
      window.history.back()
    },
  },
}
</script>
