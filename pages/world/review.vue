<style lang="scss">
#score-flow {
  .img {
    background-color: #30a080;
  }
}
</style>

<template>
  <div id="score-flow">
    <!--
    <div class="flow-intro">
      <div class="img">评</div>
      <div class="intro">
        <div>
          <div class="control">
            <a
              :href="$alias.createScore"
              target="_blank"
            >
              <el-button
                round
                plain
              >
                写漫评
              </el-button>
            </a>
          </div>
          <div class="summary">
            <h2 class="title">漫评</h2>
            <div
              v-if="meta"
              class="extra"
            >共 <strong v-text="meta.collection"/> 个番剧&nbsp;·&nbsp;收获了 <strong v-text="meta.total"/> 条漫评</div>
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
            很自豪的讲，「calibur.tv」现在的漫评功能应该是业界领先的，虽然我们还是个小站，o(￣┰￣*)ゞ；
          </p>
          <p>
            要发表一篇优秀的漫评是比较困难的，它需要你具备一定的 “文采” 和 “看番量”，但不用怕，我们是支持创作的过程中将你的作品
            存成草稿的，并且发布后也是可以编辑的，你完全可以精心构思你要表达的每一句话；
          </p>
          <p>
            我们的评分需要从多个维度来进行，它虽然能够辅助你找到分析动漫的起点，但是却会限制你的思维，因此不要太在意你的 “总分”，
            将注意力放在<strong>文字的表达</strong>与<strong>图片的选取</strong>上；
          </p>
          <p>
            不要担心会剧透，尽情的表达你的观点就好！但是也请你保持 “友善” 与 “理智”，不要去恶意贬低自己比喜欢的作品，不要去没有依据的吹捧你喜欢的作品，
            尽可能的客观吧；
          </p>
          <p>
            说了这么多，快点来试试看吧，ο(=•ω＜=)ρ⌒☆
          </p>
        </el-alert>
      </div>
    </div>
    -->
    <flow-list func="getWorldScore" type="seenIds" sort="active">
      <ul slot-scope="{ flow }">
        <score-flow-item v-for="item in flow" :key="item.id" :item="item" />
      </ul>
      <no-content slot="nothing" />
    </flow-list>
  </div>
</template>

<script>
import ScoreFlowItem from '~/components/flow/item/ScoreFlowItem'

export default {
  name: 'ScoreWorld',
  components: {
    ScoreFlowItem
  },
  data() {
    return {
      showTips: false
    }
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('flow/initData', {
        func: 'getWorldScore',
        type: 'seenIds',
        sort: 'active'
      })
      // store.dispatch('flow/getMeta', { type: 'score' })
    ])
  },
  head: {
    title: '漫评区'
  }
}
</script>
