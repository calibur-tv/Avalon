<style lang="scss">
  #bangumi-score {
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

        .label, .percent {
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
</style>

<template>
  <div id="bangumi-score">
    <el-row v-if="bangumiScore">
      <el-col
        :span="12"
        class="bangumi-score-wrap"
      >
        <bangumi-score-chart
          :source="bangumiScore.radar"
          :loading="loading"
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
              :style="{ width: `${130 * star.val / bangumiScore.count}px` }"
              class="score"
            />
            <span
              class="percent"
              v-text="`${star.val / bangumiScore.count * 100}%`"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-else-if="!loading">
      还没有评分
    </template>
    <create-score-form
      :bangumi-id="info.id"
      :bangumi-name="info.name"
    />
  </div>
</template>

<script>
  import CreateScoreForm from '~/components/bangumi/forms/CreateScoreForm'
  import BangumiScoreChart from '~/components/bangumi/charts/BangumiScoreChart'
  import ScoreApi from '~/api/scoreApi'

  export default {
    name: 'BangumiScore',
    components: {
      CreateScoreForm,
      BangumiScoreChart
    },
    data () {
      return {
        loading: false,
        bangumiScore: null
      }
    },
    computed: {
      totalRate () {
        return this.bangumiScore.total / 20
      },
      totalScore () {
        return this.bangumiScore.total / 10
      },
      info () {
        return this.$store.state.bangumi.info
      },
      scores () {
        return this.$store.state.trending.type === 'score'
          ? this.$store.state.trending.active
          : null
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-score', () => {
        this.getData()
        this.getScore()
      })
    },
    methods: {
      async getData () {
        try {
          await this.$store.dispatch('trending/getTrending', {
            type: 'score',
            sort: 'active',
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async loadMore () {
        try {
          await this.$store.dispatch('trending/loadMore', {
            type: 'score',
            sort: 'active',
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async getScore () {
        if (this.loading || this.bangumiScore) {
          return
        }
        this.loading = true;
        const api = new ScoreApi(this);
        try {
          this.bangumiScore = await api.bangumiScore(this.info.id)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
