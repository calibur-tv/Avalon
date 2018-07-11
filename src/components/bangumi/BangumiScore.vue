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
    <el-row>
      <el-col
        :span="12"
        class="bangumi-score-wrap"
      >
        <bangumi-score-chart
          :source="scores"
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
            <span class="count">{{ scoreCount }}人评价</span>
          </div>
        </div>
        <div class="ladder">
          <div
            v-for="(star, index) in percent"
            :key="index"
            class="star"
          >
            <span class="label">{{ star.key }}星</span>
            <div
              :style="{ width: star.data }"
              class="score"
            />
            <span
              class="percent"
              v-text="star.data"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <create-score-form
      :bangumi-id="info.id"
      :bangumi-name="info.name"
    />
  </div>
</template>

<script>
  import CreateScoreForm from '~/components/bangumi/forms/CreateScoreForm'
  import BangumiScoreChart from '~/components/bangumi/charts/BangumiScoreChart'

  export default {
    name: 'BangumiScore',
    components: {
      CreateScoreForm,
      BangumiScoreChart
    },
    data () {
      return {
        scores: {
          'total': 67,
          'lol': 8.4,
          'cry': 7.7,
          'fight': 8.1,
          'moe': 5.4,
          'sound': 6.2,
          'vision': 10.0,
          'story': 1,
          'role': 1.5,
          'express': 3.8,
          'style': 9
        },
        scoreCount: 10,
        percent: [
          {
            key: 1,
            data: '10%'
          },
          {
            key: 2,
            data: '21%'
          },
          {
            key: 3,
            data: '44%'
          },
          {
            key: 4,
            data: '13%'
          },
          {
            key: 5,
            data: '12%'
          }
        ]
      }
    },
    computed: {
      totalRate () {
        return this.scores.total / 20
      },
      totalScore () {
        return this.scores.total / 10
      },
      info () {
        return this.$store.state.bangumi.info
      },
    },
    watch: {

    },
    created () {

    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-score', () => {
      })
    },
    methods: {

    }
  }
</script>
