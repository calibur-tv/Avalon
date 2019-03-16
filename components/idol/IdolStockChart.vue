<style lang="scss">
#idol-stock-chart {
  .table-wrap {
    overflow: hidden;

    .table {
      background-color: $color-gray-light;
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      margin-top: 20px;
      user-select: none;

      thead {
        margin-bottom: 5px;
        margin-top: 5px;
        display: block;
      }

      tbody {
        margin-bottom: 15px;
        margin-top: 5px;
        display: block;
      }

      tr {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      th,
      td {
        font-size: 14px;
        display: block;
        width: 100%;
        font-weight: normal;
        text-align: center;
      }
    }
  }

  .chart-wrap {
    width: 300px;
    float: right;

    .control {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 32px;
      padding-left: 13px;
      padding-right: 13px;

      button {
        flex-grow: 1;
        text-align: center;
        color: $color-text-normal;
        background-color: $color-gray-light;
        height: 32px;

        &.active {
          color: $color-text-deep;
          background-color: transparent;
        }
      }
    }
  }
}
</style>

<template>
  <div id="idol-stock-chart">
    <div class="chart-wrap">
      <canvas id="chart-node" />
      <div class="control">
        <button :class="{ active: index === 0 }" @click="switchChart(0)">
          24 小时
        </button>
        <button :class="{ active: index === 1 }" @click="switchChart(1)">
          近 7 天
        </button>
        <button :class="{ active: index === 2 }" @click="switchChart(2)">
          近 30 天
        </button>
      </div>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>当前市值</th>
            <th>每股价格</th>
            <th>持股人数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ idol.company_state ? `￥${idol.market_price}` : '未上市' }}
            </td>
            <td>￥{{ idol.stock_price }}</td>
            <td>{{ idol.fans_count }}人</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>总发行股</th>
            <th>已认购股</th>
            <th>我持有股</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ hasLimited ? idol.max_stock_count : '无上限' }}</td>
            <td>{{ idol.star_count }}</td>
            <td>
              {{
                hasBuyStock
                  ? `${idol.has_star}（${computedPercent}）`
                  : '未入股'
              }}
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>产品支出</th>
            <th>产品收入</th>
            <th>公司盈利</th>
          </tr>
        </thead>
        <tbody style="margin-bottom:5px">
          <tr>
            <td>{{ idol.company_state ? idol.total_pay : '-' }}</td>
            <td>{{ idol.company_state ? idol.total_income : '-' }}</td>
            <td>{{ idol.company_state ? productBalance : '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import F2 from '@antv/f2'
import { getIdolChart } from '~/api/cartoonRoleApi'

export default {
  name: 'IdolStockChart',
  props: {
    idol: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      index: 0,
      list: [this.idol.chart, [], []]
    }
  },
  computed: {
    hasLimited() {
      return this.idol.max_stock_count !== '0.00'
    },
    hasBuyStock() {
      return this.idol.has_star !== '0.00'
    },
    computedPercent() {
      if (!this.idol.has_star) {
        return ''
      }
      return `${parseFloat(
        (this.idol.has_star / this.idol.star_count) * 100
      ).toFixed(2)}%`
    },
    productBalance() {
      const balance = this.idol.total_pay - this.idol.total_income
      const percent = `${parseFloat(
        (balance / this.idol.market_price) * 100
      ).toFixed(2)}%`
      return `￥${parseFloat(balance).toFixed(2)}（${percent}）`
    }
  },
  mounted() {
    this.initF2Animation()
    this.drawChart(this.list[this.index])
    this.getIdolChartData(7, 1)
    this.getIdolChartData(30, 2)
  },
  methods: {
    initF2Animation() {
      F2.Animate.registerAnimation('lineUpdate', function(
        updateShape,
        animateCfg
      ) {
        const cacheShape = updateShape.get('cacheShape') // 该动画 shape 的前一个状态
        const cacheAttrs = cacheShape.attrs // 上一个 shape 属性
        const geomType = cacheShape.geomType // 图形类型

        const oldPoints = cacheAttrs.points // 上一个状态的关键点
        const newPoints = updateShape.attr('points') // 当前 shape 的关键点

        const oldLength = oldPoints.length
        const newLength = newPoints.length
        let deltaLength =
          geomType === 'area'
            ? (oldLength - newLength) / 2
            : oldLength - newLength

        if (deltaLength > 0) {
          const firstPoint = newPoints[0]
          const lastPoint = newPoints[newPoints.length - 1]

          for (let i = 0; i < deltaLength; i++) {
            newPoints.splice(0, 0, firstPoint)
          }

          if (geomType === 'area') {
            for (let j = 0; j < deltaLength; j++) {
              newPoints.push(lastPoint)
            }
          }
        } else {
          deltaLength = Math.abs(deltaLength)
          const firstPoint1 = oldPoints[0]
          const lastPoint1 = oldPoints[oldPoints.length - 1]

          for (let k = 0; k < deltaLength; k++) {
            oldPoints.splice(0, 0, firstPoint1)
          }

          if (geomType === 'area') {
            for (let p = 0; p < deltaLength; p++) {
              oldPoints.push(lastPoint1)
            }
          }

          cacheAttrs.points = oldPoints
        }
        updateShape.attr(cacheAttrs)
        updateShape.animate().to({
          attrs: {
            points: newPoints
          },
          duration: 800,
          easing: animateCfg.easing
        })
      })
    },
    getIdolChartData(days, index) {
      getIdolChart(this, {
        days,
        idol_id: this.idol.id
      })
        .then(data => {
          this.list[index] = data
        })
        .catch(() => {})
    },
    switchChart(index) {
      this.index = index
      this.chart.changeData(this.list[index])
    },
    drawChart(resource) {
      const data = resource.map(_ => {
        return {
          time: +_.time * 1000,
          value: parseFloat(_.value).toFixed(2)
        }
      })
      if (!data.length) {
        return
      }
      const chart = new F2.Chart({
        id: 'chart-node',
        pixelRatio: window.devicePixelRatio
      })
      this.chart = chart
      chart.source(data, {
        time: {
          type: 'timeCat',
          tickCount: 5,
          range: [0, 1],
          mask: 'HH:mm'
        },
        value: {
          type: 'linear',
          alias: '市值',
          tickCount: 5
        }
      })
      chart.tooltip({
        showCrosshairs: true
      })
      chart.axis('time', {
        label: function label(text, index, total) {
          const cfg = {
            textAlign: 'center'
          }
          // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
          if (index === 0) {
            cfg.textAlign = 'start'
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = 'end'
          }
          return cfg
        }
      })

      chart
        .line({
          sortable: false
        })
        .position('time*value')
        .shape('smooth')
        .animate({
          update: {
            animation: 'lineUpdate'
          }
        })
      chart
        .area({
          sortable: false
        })
        .position('time*value')
        .shape('smooth')
        .animate({
          update: {
            animation: 'lineUpdate'
          }
        })
      chart.render()
    }
  }
}
</script>
