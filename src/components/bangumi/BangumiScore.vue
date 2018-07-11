<style lang="scss">
  #bangumi-score {

  }
</style>

<template>
  <div id="bangumi-score">
    <el-row>
      <el-col :span="12">
        <ve-radar
          ref="radar"
          :data="chartData"
          :setting="chartSettings"
          :loading="loading"
          :legend-visible="false"
          :tooltip-visible="false"
          :resizeable="false"
          :extend="chartExtend"
          width="100%"
          height="400px"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'BangumiScore',
    components: {

    },
    props: {

    },
    data () {
      return {
        loading: true,
        chartExtend: {
          radar: {
            indicator: [
              { name: '笑点', max: 10 },
              { name: '泪点', max: 10 },
              { name: '燃点', max: 10 },
              { name: '萌点', max: 10 },
              { name: '音乐', max: 10 },
              { name: '画面', max: 10 },
              { name: '情节', max: 10 },
              { name: '人物', max: 10 },
              { name: '内涵', max: 10 },
              { name: '风格', max: 10 },
            ],
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
            splitNumber: 10
          }
        },
        chartSettings: {
          dimension: '',
          metrics: ['笑点', '泪点', '燃点', '萌点', '音乐', '画面', '情节', '人物', '内涵', '风格']
        },
        chartData: {
          columns: ['笑点', '泪点', '燃点', '萌点', '音乐', '画面', '情节', '人物', '内涵', '风格'],
          rows: [
            {
              '笑点': 8.4,
              '泪点': 7.7,
              '燃点': 8.1,
              '萌点': 5.4,
              '音乐': 6.2,
              '画面': 10.0,
              '情节': 0,
              '人物': 1.5,
              '内涵': 3.8,
              '风格': 4.6
            }
          ]
        }
      }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-score', () => {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.radar.echarts.resize()
        })
      })
    },
    methods: {

    }
  }
</script>
