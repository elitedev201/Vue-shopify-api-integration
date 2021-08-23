<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <v-btn class="ma-2" color="primary" dark>
        <v-icon dark left>
          {{ icons.mdiPlus }}
        </v-icon>
        Create Product
      </v-btn>

      <app-card-code title="Produts list">
        <demo-datatable-kitchen-sink></demo-datatable-kitchen-sink>
      </app-card-code>
    </v-col>
  </v-row>
</template>

<script>
import AppCardCode from "@/@core/components/app-card-code/AppCardCode.vue"
import { mdiPlus } from "@mdi/js"
// demos
import DemoDatatableKitchenSink from "./tables/DatatableKitchenSink.vue"

export default {
  components: {
    AppCardCode,
    DemoDatatableKitchenSink,
  },
  setup() {
    return {
      icons: {
        mdiPlus,
      },
    }
  },
}
</script>
