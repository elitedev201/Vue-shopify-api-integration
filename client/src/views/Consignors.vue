<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <div class="d-flex justify-end create-button">
          <!-- <v-btn class="ma-2 white-col" color="primary" href="/create_consignor">
            <v-icon left> mdi-plus </v-icon>
            Create Product
          </v-btn> -->
      </div>
      <consignor-datatable class="custom-spacing"></consignor-datatable>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import ConsignorDatatable from "./ConsignorDatatable.vue"
export default {
  name: "Consignors",
  components: {
    ConsignorDatatable,
  },
  setup() {
    return {}
  },
}
</script>
