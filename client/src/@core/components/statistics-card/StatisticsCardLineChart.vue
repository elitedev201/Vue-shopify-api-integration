<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="font-weight-semibold">
      {{ statistics }}
    </v-card-title>

    <vue-apex-charts
      :height="chartHeight"
      :options="chartOptionsComputed"
      class="flex-grow-1"
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
      grid: {
        show: false,
      },
      chart: {
        type: 'line',
        offsetX: -8,
        dropShadow: {
          enabled: true,
          top: 10,
          blur: 4,
          color: props.chartColor,
          opacity: 0.09,
        },
        toolbar: {
          show: false,
        },
      },
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
      stroke: {
        width: 5,
        curve: 'smooth',
        lineCap: 'round',
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      colors: [props.chartColor],
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
