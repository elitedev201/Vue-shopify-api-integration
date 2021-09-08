<template>
  <div>
    <v-row>
      <!-- kitchen sink -->
      <v-col cols="3"></v-col>
      <v-col cols="3">
        <div class="d-flex justify-end create-button">
            <v-btn class="ma-2 white-col" color="primary" href="/payouts">
              View Payouts
            </v-btn>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="d-flex justify-end create-button">
            <v-btn class="ma-2 white-col" color="primary" href="/create_consignor">
              <v-icon left> mdi-plus </v-icon>
              Create Consignor
            </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <consignor-datatable class="custom-spacing"></consignor-datatable>
      </v-col>
    </v-row>
  </div>
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
