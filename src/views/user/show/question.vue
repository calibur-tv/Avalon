<style lang="scss">
#user-question {
  #no-content {
    margin-top: 25px;
  }
}
</style>

<template>
  <div id="user-question">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="提问"/>
        <el-radio-button label="回答"/>
      </el-radio-group>
    </div>
    <question-flow-list
      v-if="active === '提问'"
      :user-zone="zone"
    />
    <div v-else>
      <ul>
        <question-flow-item
          v-for="item in answerList"
          :key="item.id"
          :item="item"
        />
      </ul>
      <no-content v-if="!answerList.length && noMoreAnswer"/>
      <load-more-btn
        v-else
        :auto="true"
        :no-more="noMoreAnswer"
        :loading="loadingAnswer"
        @fetch="getUserAnswers(false)"
      />
    </div>
  </div>
</template>

<script>
import QuestionFlowList from '~/components/flow/list/QuestionFlowList'
import QuestionFlowItem from '~/components/flow/item/QuestionFlowItem'
import Api from '~/api/flowApi'

export default {
  name: 'UserQuestion',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('flow/initData', {
      type: 'question',
      sort: 'news',
      userZone: route.params.zone,
      ctx
    })
  },
  components: {
    QuestionFlowList,
    QuestionFlowItem
  },
  data() {
    return {
      active: '提问',
      answerList: [],
      loadingAnswer: false,
      fetchedAnswer: false,
      noMoreAnswer: false,
      page: 0
    }
  },
  computed: {
    zone() {
      return this.$route.params.zone
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === '回答') {
        this.getUserAnswers(true)
      }
    },
    async getUserAnswers(init = false) {
      if (init && this.fetchedAnswer) {
        return
      }
      if (this.loadingAnswer) {
        return
      }
      this.loadingAnswer = true
      const api = new Api(this)
      try {
        const data = await api.fetch({
          sort: 'news',
          type: 'answer',
          take: 10,
          page: this.page,
          minId: 0,
          seenIds: '',
          bangumiId: 0,
          userZone: this.zone
        })
        this.fetchedAnswer = true
        this.answerList = this.answerList.concat(data.list)
        this.noMoreAnswer = data.noMore
        this.page++
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingAnswer = false
      }
    }
  }
}
</script>
