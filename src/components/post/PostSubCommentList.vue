<style lang="scss">
.post-sub-comment-list-wrap {
  position: relative;
  background-color: #f7f8fa;
  margin-left: 175px;
  padding: 0 15px;
  border-radius: 5px;

  .comments-collapsed-btn {
    position: absolute;
    right: 5px;
    top: -27px;
    font-size: 13px;
  }

  .sub-comment-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    .more {
      button {
        margin-left: 5px;
      }

      .total {
        margin-left: 10px;
        color: #99a2aa;
        font-size: 12px;
      }
    }

    .toggle {
      font-size: 13px;
    }
  }

  .footer-reply-area {
    padding: 15px 0;
  }
}
</style>

<template>
  <div class="post-sub-comment-list-wrap">
    <button
      class="comments-collapsed-btn"
      @click="clickCollapsedBtn"
      v-text="computeCollapsedBtnText"
    />
    <el-collapse-transition>
      <div
        v-if="hasComment && !collapsed"
        class="post-sub-comment-list"
      >
        <post-sub-comment-item
          v-for="comment in comments.list"
          :key="comment.id"
          :comment="comment"
          :parent-user-id="authorId"
        />
      </div>
    </el-collapse-transition>
    <div
      v-if="hasComment && !collapsed"
      class="sub-comment-footer"
    >
      <div class="more">
        <el-button
          v-if="!comments.noMore"
          :loading="loading"
          size="mini"
          round
          @click="loadMore"
        >点击加载更多</el-button>
        <span class="total">共{{ comments.total }}条</span>
      </div>
      <button
        class="toggle"
        @click="toggleCommentArea"
      >我也说一句</button>
    </div>
    <comment-reply-form
      v-model="showReplyArea"
      :id="parentId"
      :to-user-id="authorId"
      type="post"
      class="footer-reply-area"
    />
  </div>
</template>

<script>
import PostSubCommentItem from '~/components/post/PostSubCommentItem'
import CommentReplyForm from '~/components/comments/CommentReplyForm'

export default {
  name: 'PostSubCommentList',
  components: {
    PostSubCommentItem,
    CommentReplyForm
  },
  props: {
    parentComment: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      collapsed: false,
      showReplyArea: false,
      loading: false
    }
  },
  computed: {
    comments() {
      return this.parentComment.comments
    },
    parentId() {
      return this.parentComment.id
    },
    authorId() {
      return this.parentComment.from_user_id
    },
    computeCollapsedBtnText() {
      if (this.hasComment) {
        if (this.collapsed) {
          return `回复(${this.comments.total})`
        }
        return '收起回复'
      }
      if (this.showReplyArea) {
        return '收起'
      }
      return '回复'
    },
    hasComment() {
      return !!this.comments.list.length
    }
  },
  methods: {
    clickCollapsedBtn() {
      if (this.hasComment) {
        this.collapsed = !this.collapsed
      } else {
        this.showReplyArea = !this.showReplyArea
      }
    },
    toggleCommentArea() {
      this.showReplyArea = !this.showReplyArea
    },
    async loadMore() {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('comment/getSubComments', {
          ctx: this,
          type: 'post',
          id: this.parentId
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
