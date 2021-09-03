<template>
  <v-card>
    <v-card-title>
      ConsignorPayoutList
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="payoutList" :search="search">
      <!-- payout -->
      <template #[`item.spfy_vendor`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/payout/' + item.spfy_vendor" class="custom-link"
            ><span class="">{{ item.spfy_vendor }}</span></a
          >
        </div>
      </template>
      <template #[`item.items_sold`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/payout/' + item.spfy_vendor" class="custom-link"
            ><span class="text-no-wrap">{{ item.items_sold }}</span></a
          >
        </div>
      </template>
      <template #[`item.total_sales`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/payout/' + item.spfy_vendor" class="custom-link"
            ><span class="text-no-wrap">{{ item.total_sales }}</span></a
          >
        </div>
      </template>
      <template #[`item.defaultPercentage`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/payout/' + item.spfy_vendor" class="custom-link"
            ><span class="text-no-wrap">{{ item.defaultPercentage }}</span></a
          >
        </div>
      </template>
      <template #[`item.net_sales`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/payout/' + item.spfy_vendor" class="custom-link"
            ><span class="text-no-wrap">{{ item.net_sales }}</span></a
          >
        </div>
      </template>
      <!-- <template #[`item.actions`]="{ item }">
        <span class="text-no-wrap">
          <v-icon small class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </span>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script>
import payoutService from "../services/payoutService"

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Shopify_vendor", value: "spfy_vendor" },
      { text: "Items_sold", value: "items_sold" },
      { text: "Total_sales", value: "total_sales" },
      { text: "Default_percentage", value: "defaultPercentage" },
      { text: "Net_sales", value: "net_sales" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    payoutList: [],
  }),

  created() {
    this.getPayoutData()
  },

  methods: {
    async getPayoutData() {
      // Use the eventService to call the getEvents() method
      payoutService.getPayouts().then(res => {
        this.payoutList = res.data
      })
    },
  },
}
</script>
