<template>
  <div
    v-if="source"
    id="score-flow-list"
  >
    <ul>
      <score-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
        :bangumi-id="bangumiId"
        :user-zone="userZone"
      />
    </ul>
    <no-content v-if="source.nothing">
      <a
        v-if="bangumiId"
        :href="`${$alias.createScore}?bid=${bangumiId}`"
        target="_blank"
      >
        <el-button
          type="primary"
          round
        >写下《{{ bangumiName }}》的第一篇漫评</el-button>
      </a>
      <a
        v-else-if="isMe"
        :href="$alias.createScore"
        target="_blank"
      >
        <el-button
          type="primary"
          round
        >发表第一篇漫评</el-button>
      </a>
    </no-content>
    <load-more-btn
      v-else
      :no-more="source.noMore"
      :loading="source.loading"
      :auto="true"
      @fetch="loadMore"
    />
  </div>
</template>

<script>
import flowMixin from './_flowListMixin'
import ScoreFlowItem from '../item/ScoreFlowItem'

export default {
  name: 'ScoreFlowList',
  components: {
    ScoreFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: 'score'
    }
  }
}
</script>
