<style lang="scss">
#answer-flow-list {
  overflow: hidden;

  .load-more-btn {
    width: 100%;
    background-color: #fff;
    border: none;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    border-radius: 2px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div
    v-if="source"
    id="answer-flow-list"
  >
    <ul>
      <answer-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
        :bangumi-id="bangumiId"
        :user-zone="userZone"
      />
    </ul>
    <load-more-btn
      :no-more="source.noMore"
      :loading="loading"
      :auto="true"
      @fetch="loadMore"
    />
  </div>
</template>

<script>
import AnswerFlowItem from '../item/AnswerFlowItem'

export default {
  name: 'AnswerFlowList',
  components: {
    AnswerFlowItem
  },
  props: {
    bangumiId: {
      type: Number,
      default: 0
    },
    userZone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    source() {
      return this.$store.state.question.answers
    }
  },
  methods: {
    async loadMore() {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('question/getAnswers', {
          ctx: this,
          userZone: this.userZone,
          questionId: this.bangumiId
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
