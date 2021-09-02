<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <div class="d-flex justify-end create-button">
          <v-btn class="ma-2 white-col" color="primary" href="/create_product">
            <v-icon left> mdi-plus </v-icon>
            Create Product
          </v-btn>
      </div>
      <product-datatable class="custom-spacing"></product-datatable>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import ProductDatatable from "./Datatable.vue"
export default {
  name: "Products",
  components: {
    ProductDatatable,
  },
  setup() {
    return {}
  },
}
</script>
