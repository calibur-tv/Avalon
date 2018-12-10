<template>
  <not-ssr :style="{ height: size }">
    <ve-radar
      :data="chartData"
      :setting="chartSettings"
      :extend="chartExtend"
      :loading="loading"
      :width="size"
      :height="size"
      :legend-visible="false"
      :tooltip-visible="false"
      :resizeable="false"
    />
  </not-ssr>
</template>

<script>
export default {
  components: {
    VeRadar: () => {
      if (typeof window === 'undefined') {
        return import('~/assets/js/empty')
      }
      return import('v-charts/lib/radar.common')
    }
  },
  props: {
    source: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '400px'
    }
  },
  data() {
    const labelMap = {
      total: '总分',
      lol: '笑点',
      cry: '泪点',
      fight: '燃点',
      moe: '萌点',
      sound: '音乐',
      vision: '画面',
      story: '情节',
      role: '人设',
      express: '内涵',
      style: '美感'
    }
    const dimension = 'total'
    const columns = Object.keys(labelMap)
    const metrics = columns.filter(_ => _ !== dimension)
    const indicator = metrics.map(_ => {
      return {
        name: labelMap[_],
        max: 10
      }
    })
    return {
      chartExtend: {
        radar: {
          indicator,
          shape: 'polygon',
          splitArea: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '##ccd0d7',
              type: 'dotted'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccd0d7',
              type: 'dotted'
            }
          },
          silent: false,
          splitNumber: 10
        },
        series: {
          areaStyle: { normal: {} },
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      chartSettings: { labelMap, dimension, metrics },
      chartData: {
        columns,
        rows: [this.source]
      }
    }
  }
}
</script>
