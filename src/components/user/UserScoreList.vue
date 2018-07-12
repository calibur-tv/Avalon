<style lang="scss">

</style>

<template>
  <div id="user-score-list">
    <template v-if="total">
      <score-flow
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
      <el-button
        v-if="!noMore"
        :loading="loading"
        class="load-more-btn"
        type="info"
        plain
        @click="getData"
      >{{ loading ? '加载中' : '加载更多' }}</el-button>
    </template>
    <no-content v-else/>
  </div>
</template>

<script>
  import Api from '~/api/scoreApi'
  import ScoreFlow from '~/components/score/ScoreFlow'

  export default {
    name: 'UserScoreList',
    components: {
      ScoreFlow
    },
    props: {
      userId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        state: {
          loading: false,
          fetched: false
        },
        list: [],
        noMore: false,
        total: 0,
        page: 0,
        take: 10
      }
    },
    mounted () {
      this.$channel.$on('user-tab-switch-score', () => {
        if (!this.state.fetched) {
          this.getData();
        }
      })
    },
    methods: {
      async getData () {
        if (this.state.loading) {
          return
        }
        this.state.loading = true;
        const api = new Api(this);
        try {
          const data = await api.getUsersScore({
            user_id: this.userId,
            page: this.page,
            take: this.take
          });
          this.list = this.list.concat(data.list);
          this.total = data.total;
          this.noMore = data.noMore;
          this.page++;
          this.state.fetched = true
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.state.loading = false
        }
      }
    }
  }
</script>
