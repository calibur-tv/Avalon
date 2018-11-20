<style lang="scss">
#post-flow {
  .img {
    background-color: #0084ff;
  }
}
</style>

<template>
  <div id="post-flow">
    <div class="flow-intro">
      <div class="img">知</div>
      <div class="intro">
        <div>
          <div class="control">
            <el-button
              round
              plain
              @click="openCreateQuestion"
            >
              提问
            </el-button>
          </div>
          <div class="summary">
            <h2 class="title">问答</h2>
            <div
              v-if="meta"
              class="extra"
            >共 <strong v-text="meta.collection"/> 个提问&nbsp;·&nbsp;收到了 <strong v-text="meta.total"/> 个回答</div>
            <el-button
              type="text"
              size="mini"
              @click="showTips = !showTips"
            >
              {{ showTips ? '收起' : '查看' }}板块介绍
              <i :class="showTips ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"/>
            </el-button>
          </div>
        </div>
        <el-alert
          v-if="showTips"
          type="info"
          title=""
          class="detail"
        >
          <p>
            就是动漫版知乎
          </p>
          <p>
            话题内容仅限二次元，其余讨论的一切都会被删除
          </p>
        </el-alert>
      </div>
    </div>
    <question-flow-list/>
  </div>
</template>

<script>
import QuestionFlowList from '~/components/flow/list/QuestionFlowList'

export default {
  name: 'QuestionWorld',
  async asyncData({ store, ctx }) {
    await Promise.all([
      store.dispatch('world/getData', {
        type: 'question',
        sort: 'active',
        ctx
      }),
      store.dispatch('world/getMeta', { type: 'question' })
    ])
  },
  components: {
    QuestionFlowList
  },
  data() {
    return {
      showTips: false
    }
  },
  computed: {
    meta() {
      return this.$store.state.world.question.meta
    }
  },
  methods: {
    openCreateQuestion() {
      this.$channel.$emit('show-create-question-modal')
    }
  }
}
</script>
