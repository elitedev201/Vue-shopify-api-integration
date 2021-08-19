<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="font-weight-semibold">
      {{ statistics }}
    </v-card-title>

    <vue-apex-charts
      id="sessions-chart"
      class="flex-grow-1"
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
  },
  setup(props) {
    const chartOptions = {
      chart: {
        stacked: true,
        type: 'bar',
        height: '120',
        offsetX: -5,
        toolbar: { show: false },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10,
        },
        yaxis: {
          lines: { show: false },
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#8a8d93', '#ff4c51'],
      plotOptions: {
        bar: {
          columnWidth: '25%',
          borderRadius: 4,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
        distributed: true,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      stroke: {
        lineCap: 'round',
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

<style lang="scss">
#sessions-chart {
  .apexcharts-series {
    &[seriesName='Earning'] {
      transform: scaleY(0.965);
    }
    &[seriesName='Expense'] {
      transform: scaleY(1.035);
    }
  }
}
</style>
