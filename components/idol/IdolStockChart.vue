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
  }
}
</style>

<template>
  <div id="idol-stock-chart">
    <div class="chart-wrap">
      <canvas id="chart-node" />
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

export default {
  name: 'IdolStockChart',
  props: {
    idol: {
      type: Object,
      required: true
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
    this.drawChart()
  },
  methods: {
    drawChart() {
      const chart = new F2.Chart({
        id: 'chart-node',
        pixelRatio: window.devicePixelRatio
      })
      const data = this.idol.chart.map(_ => {
        return {
          time: +_.time * 1000,
          value: parseFloat(_.value).toFixed(2)
        }
      })
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
