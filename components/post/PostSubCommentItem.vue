<style lang="scss">
.post-sub-comment-item {
  padding-top: 15px;
  line-height: 20px;
  color: #99a2aa;

  &.focused-sub-comment {
    background-color: rgba($color-blue-light, 0.2);
  }

  &:hover {
    .report-btn {
      opacity: 1 !important;
    }
  }

  .comment-content {
    font-size: 14px;
    color: #222;
    word-break: break-all;
  }

  .avatar {
    margin-right: 10px;
    vertical-align: middle;
    display: inline-block;
    @extend %avatar;
  }

  .reply-area {
    text-align: right;
    line-height: 13px;
    font-size: 12px;

    button,
    time {
      margin-left: 5px;
    }

    .report-btn {
      opacity: 0;
    }
  }

  .comment-reply-form {
    margin-top: 10px;
    padding: 15px 0 15px 5px;
    height: 58px;
  }
}
</style>

<template>
  <div
    :id="`sub-comment-${comment.id}`"
    :class="{ 'focused-sub-comment': focusThisComment }"
    class="post-sub-comment-item"
  >
    <user-card
      :zone="comment.from_user_zone"
      :id="comment.from_user_id"
    >
      <v-img
        :src="comment.from_user_avatar"
        size="30"
        class="avatar"
      />
      <span
        class="href-fade-blue"
        v-text="comment.from_user_name"
      />
    </user-card>
    <template
      v-if="comment.to_user_id && comment.to_user_id !== parentUserId"
    >
      回复
      <user-card
        :id="comment.to_user_id"
        :zone="comment.to_user_zone"
        custom-class="href-fade-blue"
      >
        {{ comment.to_user_name }}
      </user-card>
    </template>
    :
    <span class="comment-content">{{ comment.content }}</span>
    <div class="reply-area">
      <report-dialog
        :id="comment.id"
        type="post_reply"
      >举报</report-dialog>
      <v-time v-model="comment.created_at"/>
      <button
        v-if="canDelete"
        @click="deleteComment"
      >删除</button>
      <button
        v-if="!isMine"
        @click="toggleCommentArea"
      >
        {{ showReplyArea ? '收起' : '回复' }}
      </button>
    </div>
    <comment-reply-form
      v-model="showReplyArea"
      :id="comment.parent_id"
      :to-user-id="comment.from_user_id"
      type="post"
    />
  </div>
</template>

<script>
import CommentReplyForm from '~/components/comments/CommentReplyForm'

export default {
  name: 'PostSubCommentItem',
  components: {
    CommentReplyForm
  },
  props: {
    comment: {
      required: true,
      type: Object
    },
    parentUserId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      showReplyArea: false,
      deleting: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isMine() {
      return this.currentUserId === this.comment.from_user_id
    },
    canDelete() {
      return this.isMine || this.currentUserId === this.parentUserId
    },
    focusThisComment() {
      return parseInt(this.$route.query['reply-id']) === this.comment.id
    }
  },
  methods: {
    toggleCommentArea() {
      this.showReplyArea = !this.showReplyArea
    },
    deleteComment() {
      if (this.deleting) {
        return
      }
      this.deleting = true
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('comment/deleteSubComment', {
            type: 'post',
            ctx: this,
            id: this.comment.id,
            parentId: this.comment.parent_id
          })
        })
        .catch(e => {
          this.deleting = false
          if (e === 'cancel') {
            return
          }
          this.$toast.error(e)
        })
    }
  }
}
</script>
