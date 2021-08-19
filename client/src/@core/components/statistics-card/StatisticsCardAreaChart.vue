<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="font-weight-semibold">
      {{ statistics }}
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <vue-apex-charts
        type="area"
        :height="chartHeight"
        :options="chartOptionsComputed"
        :series="chartSeries"
      ></vue-apex-charts>
    </v-card-text>

    <v-card-text class="font-weight-semibold text-center text--primary">
      {{ statTitle }}
    </v-card-text>
  </v-card>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  components: { VueApexCharts: () => import('vue-apexcharts') },
  props: {
    statistics: { type: String, default: '' },
    statTitle: { type: String, default: '' },
    chartSeries: {
      type: Array,
      default: () => [],
    },
    chartConfig: {
      type: Object,
      default: null,
    },
    chartHeight: {
      type: String,
      default: 'auto',
    },
  },

  setup(props) {
    const chartOptions = {
      grid: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2.5,
      },

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 80, 100],
        },
      },
      xaxis: {
        type: 'numeric',
        lines: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: { show: false },
      },
      yaxis: [
        {
          y: 0,
          offsetX: 0,
          offsetY: 0,
          padding: {
            left: 0,
            right: 0,
          },
        },
      ],
      tooltip: {
        x: { show: false },
      },
      theme: {
        monochrome: {
          enabled: true,

          color: '#56ca00',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
    }

    const chartOptionsComputed = computed(() => {
      if (props.chartConfig === null) {
        const options = JSON.parse(JSON.stringify(chartOptions))

        return options
      }

      return props.chartConfig
    })

    return {
      chartOptionsComputed,
    }
  },
}
</script>
