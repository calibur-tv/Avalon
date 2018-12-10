<style lang="scss">
#bangumi-score {
  #bangumi-score-panel {
    .bangumi-score-wrap {
      border-right: 1px solid $color-gray-normal;
    }

    .bangumi-score-total {
      padding-left: 80px;

      .intro {
        margin-bottom: 15px;

        .total {
          float: left;
          font-size: 28px;
          line-height: 56px;
          margin-right: 15px;
        }

        .rate {
          overflow: hidden;
          padding-top: 10px;

          span {
            font-size: 12px;
            color: $color-text-normal;
          }
        }
      }

      .ladder {
        width: 200px;

        .label,
        .percent {
          margin-right: 10px;
          font-size: 13px;
          line-height: 14px;
          color: $color-text-normal;
          vertical-align: middle;
        }

        .score {
          display: inline-block;
          height: 10px;
          background-color: rgb(247, 186, 42);
          margin-right: 5px;
          border-radius: 3px;
          vertical-align: middle;
        }
      }
    }
  }

  #score-list {
    margin-top: 30px;

    .sub-title {
      button {
        float: right;
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-score">
    <el-row
      v-if="bangumiScore"
      id="bangumi-score-panel"
    >
      <el-col
        :span="12"
        class="bangumi-score-wrap"
      >
        <bangumi-score-chart
          :source="bangumiScore.radar"
          size="300px"
        />
      </el-col>
      <el-col
        :span="12"
        class="bangumi-score-total"
      >
        <div class="intro">
          <div
            class="total"
            v-text="totalScore"
          />
          <div class="rate">
            <el-rate
              v-model="totalRate"
              disabled
            />
            <span class="count">{{ bangumiScore.count }}人评价</span>
          </div>
        </div>
        <div class="ladder">
          <div
            v-for="(star, index) in bangumiScore.ladder"
            :key="index"
            class="star"
          >
            <span class="label">{{ star.key }}星</span>
            <div
              :style="{ width: `${118 * star.val / bangumiScore.count}px` }"
              class="score"
            />
            <span
              class="percent"
              v-text="`${(star.val / bangumiScore.count * 100).toFixed(1)}%`"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <div
      v-if="scores && scores.total"
      id="score-list"
    >
      <h3 class="sub-title">
        共 {{ scores.total }} 条漫评
        <a
          :href="`${$alias.createScore}?bid=${info.id}`"
          target="_blank"
        >
          <el-button
            v-if="!info.scored"
            plan
            round
            type="primary"
            size="mini"
          >
            写漫评
          </el-button>
        </a>
      </h3>
    </div>
    <score-flow-list
      v-if="info"
      :bangumi-id="info.id"
      :bangumi-name="info.name"
    />
  </div>
</template>

<script>
import BangumiScoreChart from '~/components/bangumi/charts/BangumiScoreChart'
import ScoreFlowList from '~/components/flow/list/ScoreFlowList'

export default {
  name: 'BangumiScore',
  async asyncData({ store, route, ctx }) {
    const id = route.params.id
    await Promise.all([
      store.dispatch('bangumi/getBangumiScore', { ctx, id }),
      store.dispatch('flow/initData', {
        type: 'score',
        sort: 'active',
        bangumiId: id,
        ctx
      })
    ])
  },
  components: {
    BangumiScoreChart,
    ScoreFlowList
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    },
    bangumiScore() {
      return this.$store.state.bangumi.score
    },
    totalRate() {
      return this.bangumiScore.total / 20
    },
    totalScore() {
      return this.bangumiScore.total / 10
    },
    scores() {
      return this.$store.state.flow.score.active
    }
  }
}
</script>
