<template>
  <v-card class="stats-card-radial-bar d-flex flex-column">
    <v-card-title class="font-weight-semibold">
      {{ statistics }}
    </v-card-title>

    <vue-apex-charts
      id="stats-card-radial-bar-chart"
      type="radialBar"
      class="d-flex align-center flex-grow-1 "
      :options="chartOptionsComputed"
      :series="chartSeries"
      :height="chartHeight"
    ></vue-apex-charts>

    <v-card-text class="font-weight-semibold text-center text--primary mt-10">
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
        sparkline: {
          enabled: true,
        },
      },
      colors: [props.chartColor],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: '65%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '1.25rem',
              fontWeight: '600',
              offsetY: 0,
            },
          },
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
@import '~@core/preset/preset/mixins.scss';

@include theme--child(stats-card-radial-bar) using ($material) {
  #stats-card-radial-bar-chart {
    .apexcharts-canvas {
      .apexcharts-text {
        &.apexcharts-datalabel-value {
          fill: map-deep-get($material, 'text', 'primary');
          font-weight: 600;
        }
      }
    }
  }
}
</style>
