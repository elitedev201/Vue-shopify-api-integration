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
      <template #[`item.product.name`]="{item}">
        <div class="d-flex align-center">
          <div>
            <v-img :src="item.product.image" height="40" width="40"></v-img>
          </div>
          <div class="d-flex flex-column ms-3">
            <span
              class="d-block font-weight-semibold text-truncate text--primary"
              >{{ item.product.name }}</span
            >
            <span class="text-xs">{{ item.product.brand }}</span>
          </div>
        </div>
      </template>
      <template #[`item.date`]="{item}">
        <span class="text-no-wrap">{{ item.date }}</span>
      </template>
      <!-- category -->
      <template #[`item.category`]="{item}">
        <div class="d-flex align-center">
          <v-avatar
            v-for="(category, index) in categoryIconFilter(
              item.product.category
            )"
            :key="index"
            size="26"
            :color="category.color"
            :class="`${category.color}--text`"
            class="v-avatar-light-bg"
          >
            <v-icon size="20" :color="category.color" class="rounded-0">
              {{ category.icon }}
            </v-icon>
          </v-avatar>
          <span class="ms-1 text-no-wrap">{{ item.product.category }}</span>
        </div>
      </template>
      <!-- buyer -->
      <template #[`item.buyer.name`]="{item}">
        <div class="d-flex align-center">
          <v-avatar
            size="1.875rem"
            color="primary"
            class="v-avatar-light-bg primary--text"
          >
            <v-img v-if="item.buyer.avatar" :src="item.buyer.avatar"></v-img>
            <span v-else>{{ item.buyer.name.slice(0, 2).toUpperCase() }}</span>
          </v-avatar>
          <span class="text-no-wrap font-weight-semibold text--primary ms-2">{{
            item.buyer.name
          }}</span>
        </div>
      </template>
      <!-- payment -->
      <template #[`item.payment`]="{item}">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="primary--text font-weight-medium"
              >${{ item.payment.paid_amount }}</span
            >
            <span v-if="item.payment.paid_amount !== item.payment.total"
              >/{{ item.payment.total }}</span
            >
          </div>
          <span class="text-xs text-no-wrap">{{
            item.payment.received_payment_status
          }}</span>
        </div>
      </template>
      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          :color="statusColor[item.payment.status]"
          :class="`${statusColor[item.payment.status]}--text`"
          class="v-chip-light-bg"
          small
        >
          {{ item.payment.status }}
        </v-chip>
      </template>
      <template #[`item.delete`]="">
        <a
          ><v-icon>{{ icons.mdiDeleteOutline }}</v-icon></a
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api"
import {
  mdiMagnify,
  mdiDeleteOutline,
  mdiMouse,
  mdiGlasses,
  mdiWatchVariant,
  mdiBagPersonalOutline,
  mdiTapeDrive,
  mdiBluetooth,
  mdiControllerClassicOutline,
  mdiHomeOutline,
  mdiVirtualReality,
  mdiShoeSneaker,
  mdiFlash,
  mdiProjector,
  mdiIpod,
  mdiKeyboardVariant,
  mdiCellphone,
  mdiTelevision,
  mdiGoogleHome,
  mdiApple,
  mdiHeadphones,
  mdiDesktopMac,
} from "@mdi/js"
import productService from "@/services/productService.js"

export default {
  setup() {
    const search = ref("")
    const productList = ref([])
    const categoryIcons = [
      { name: "Mouse", icon: mdiMouse, color: "warning" },
      { name: "Glass", icon: mdiGlasses, color: "primary" },
      { name: "Smart Watch", icon: mdiWatchVariant, color: "success" },
      { name: "Bag", icon: mdiBagPersonalOutline, color: "info" },
      { name: "Storage Device", icon: mdiTapeDrive, color: "warning" },
      { name: "Bluetooth", icon: mdiBluetooth, color: "error" },
      { name: "Gaming", icon: mdiControllerClassicOutline, color: "warning" },
      { name: "Home", icon: mdiHomeOutline, color: "error" },
      { name: "VR", icon: mdiVirtualReality, color: "primary" },
      { name: "Shoes", icon: mdiShoeSneaker, color: "success" },
      { name: "Electronics", icon: mdiFlash, color: "info" },
      { name: "Projector", icon: mdiProjector, color: "warning" },
      { name: "IPod", icon: mdiIpod, color: "error" },
      { name: "Keyboard", icon: mdiKeyboardVariant, color: "primary" },
      { name: "Smart Phone", icon: mdiCellphone, color: "success" },
      { name: "Smart TV", icon: mdiTelevision, color: "info" },
      { name: "Google Home", icon: mdiGoogleHome, color: "warning" },
      { name: "Mac", icon: mdiApple, color: "error" },
      { name: "Headphone", icon: mdiHeadphones, color: "primary" },
      { name: "IMac", icon: mdiDesktopMac, color: "success" },
      { name: "IPhone", icon: mdiApple, color: "warning" },
    ]
    const statusColor = {
      Confirmed: "primary",
      Completed: "success",
      Cancelled: "error",
    }

    const categoryIconFilter = categoryName => {
      const index = categoryIcons.findIndex(
        category => category.name === categoryName
      )

      if (index !== -1)
        return [
          {
            icon: categoryIcons[index].icon,
            color: categoryIcons[index].color,
          },
        ]

      return false
    }

    return {
      icons: {
        mdiMagnify,
        mdiDeleteOutline,
      },
      search,
      statusColor,
      headers: [
        { text: "HANDLE", value: "product.name" },
        { text: "TITLE", value: "date" },
        { text: "BODY", value: "category" },
        { text: "VENDOR", value: "buyer.name" },
        { text: "TYPE", value: "payment", sortable: false },
        { text: "PUBLISHED", value: "status", sortable: false },
        { text: "OPTION1NAME", value: "delete", sortable: false },
        { text: "OPTION1VALUE", value: "delete", sortable: false },
        { text: "VARIANT SKU", value: "delete", sortable: false },
        { text: "VARIANT GRAM", value: "delete", sortable: false },
        { text: "VARIANT INVTRACKER", value: "delete", sortable: false },
        { text: "VARIANT INVQTY", value: "delete", sortable: false },
        { text: "VARIANT INVPOLICY", value: "delete", sortable: false },
        { text: "VARIANT FFILLSERVICE", value: "delete", sortable: false },
        { text: "VARIANT PRICE", value: "delete", sortable: false },
        { text: "VARIANT REQSHIPPING", value: "delete", sortable: false },
        { text: "VARIANT TAXABLE", value: "delete", sortable: false },
        { text: "VARIANT BARCODE", value: "delete", sortable: false },
        { text: "VARIANT IMG", value: "delete", sortable: false },
        { text: "VARIANT WTUNIT", value: "delete", sortable: false },
        { text: "COSTPERITEM", value: "delete", sortable: false },
        { text: "IMGSRC", value: "delete", sortable: false },
        { text: "IMGPOSI", value: "delete", sortable: false },
        { text: "GIFTCARD", value: "delete", sortable: false },
        { text: "STATUS", value: "delete", sortable: false }
      ],
      categoryIconFilter,
      productList,
      categoryIcons,
    }
  },
  created() {
    this.getProductsData()
  },
  methods: {
    async getProductsData() {
      // Use the eventService to call the getEvents() method
      productService.getProducts().then(res => {
        this.productList = res
      })
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
