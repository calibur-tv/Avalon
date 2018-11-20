<style lang="scss">
#comment-wrap {
  .sub-title {
    margin-bottom: 30px;
  }

  #comment-list-wrap {
    padding-top: 20px;
  }

  .load-more-btn {
    margin-left: 85px;

    button {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .no-content {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 12px;
    color: #99a2aa;
  }
}
</style>

<template>
  <div id="comment-wrap">
    <!-- 主列表的头部 -->
    <slot name="header">
      <h3 class="sub-title">评论{{ total ? `(${total})` : '' }}</h3>
      <comment-create-form
        :id="id"
        :type="type"
        :master-id="masterId"
        @submit="$emit('create-main-comment')"
      />
    </slot>
    <!-- 主列表的 list -->
    <div
      v-if="list.length"
      id="comment-list-wrap"
    >
      <!-- 每条主评论 -->
      <div
        v-for="comment in list"
        :key="comment.id"
        class="comment-item-wrap"
      >
        <!-- 主评论的内容 -->
        <slot
          :comment="comment"
          name="comment-item"
        >
          <comment-item
            :comment="comment"
            :type="type"
            :master-id="masterId"
            @delete="$emit('delete-main-comment')"
          />
        </slot>
      </div>
    </div>
    <p
      v-else-if="emptyText"
      class="no-content"
      v-text="emptyText"
    />
    <div id="comment-list-footer">
      <div class="load-more-btn">
        <el-button
          v-if="!noMore"
          :loading="loading"
          type="info"
          plain
          round
          @click="loadMore(false)"
        >{{ loading ? '加载中...' : '加载更多' }}</el-button>
      </div>
      <!-- 主列表的底部 -->
      <slot name="reply">
        <comment-create-form
          v-if="list.length >= 10"
          :id="id"
          :type="type"
          :master-id="masterId"
          @submit="$emit('create-main-comment')"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentCreateForm from './CommentCreateForm'

export default {
  name: 'VCommentMain',
  components: {
    CommentCreateForm,
    CommentItem
  },
  props: {
    id: {
      required: true,
      type: [Number, String]
    },
    type: {
      required: true,
      type: String,
      validator: val =>
        ~[
          'post',
          'video',
          'image',
          'score',
          'question',
          'answer',
          'role'
        ].indexOf(val)
    },
    onlySeeMaster: {
      type: Boolean,
      default: false
    },
    masterId: {
      type: [Number, String],
      required: true
    },
    emptyText: {
      type: String,
      default: '暂无评论，快来抢沙发吧╮(￣▽￣)╭！'
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    store() {
      return this.$store.state.comment
    },
    list() {
      return this.store.list
    },
    noMore() {
      return this.store.noMore
    },
    total() {
      return this.store.total
    }
  },
  mounted() {
    if (this.auto) {
      this.$channel.$on(`fire-load-comment-${this.type}-${this.id}`, () => {
        this.loadMore(true)
      })
    }
    this.$nextTick(() => {
      this.scrollToReply()
    })
  },
  methods: {
    async loadMore(firstRequest = false) {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('comment/getMainComments', {
          ctx: this,
          type: this.type,
          id: this.id,
          onlySeeMaster: this.onlySeeMaster ? 1 : 0,
          firstRequest
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    },
    scrollToReply() {
      const replyId = this.$route.query['comment-id']
      if (!replyId) {
        return
      }
      const reply = document.getElementById(`comment-${replyId}`)
      if (!reply) {
        return
      }
      this.$nextTick(() => {
        this.$scrollToY(this.$utils.getOffsetTop(reply) - 200, 400)
      })
    }
  }
}
</script>
