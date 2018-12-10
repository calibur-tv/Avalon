<style lang="scss">
#post-flow {
  .img {
    background-color: #0084ff;
  }
}
</style>

<template>
  <div id="post-flow">
    <!--
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
    -->
    <flow-list
      func="getWorldQAQ"
      type="seenIds"
      sort="active"
    >
      <ul slot-scope="{ flow }">
        <question-flow-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import QuestionFlowItem from '~/components/flow/item/QuestionFlowItem'

export default {
  name: 'QuestionWorld',
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('flow/initData', {
        func: 'getWorldQAQ',
        type: 'seenIds',
        sort: 'active'
      })
      // store.dispatch('flow/getMeta', { type: 'question' })
    ])
  },
  components: {
    QuestionFlowItem
  },
  data() {
    return {
      showTips: false
    }
  },
  methods: {
    openCreateQuestion() {
      this.$channel.$emit('show-create-question-modal')
    }
  }
}
</script>
