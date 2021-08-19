<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="font-weight-semibold">
      {{ statistics }}
    </v-card-title>
    <vue-apex-charts
      type="line"
      :height="chartHeight"
      :options="chartOptionsComputed"
      :series="chartSeries"
    ></vue-apex-charts>
    <v-card-text class="font-weight-semibold text-center text--primary">
      {{ statTitle }}
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { computed } from '@vue/composition-api'

export default {
  components: { VueApexCharts },
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
    chartColor: {
      type: String,
      required: true,
    },
    chartHeight: {
      type: String,
      default: 'auto',
    },
  },
  setup(props) {
    const chartOptions = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      grid: {
        strokeDashArray: 7,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: -30,
          right: 20,
          left: 20,
          bottom: -10,
        },
      },
      stroke: {
        width: 3,
      },
      colors: [props.chartColor],
      markers: {
        size: 6,
        colors: 'transparent',
        strokeColors: 'transparent',
        strokeWidth: 4,
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: props.chartSeries[0].data.length - 1,
            fillColor: '#fff',
            strokeColor: props.chartColor,
            size: 6,
          },
        ],
        hover: {
          size: 7,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        enbled: false,
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
