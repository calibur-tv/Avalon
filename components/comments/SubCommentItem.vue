<style lang="scss">
.sub-comment-item {
  padding: 10px 0;

  &.focused-sub-comment {
    background-color: rgba($color-blue-light, 0.2);
  }

  .sub-user {
    float: left;

    .avatar {
      margin-top: 5px;
      margin-right: 10px;
      @extend %avatar;
    }
  }

  .sub-body {
    overflow: hidden;

    .from-user {
      color: $color-text-normal;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      vertical-align: middle;
      display: inline-block;
      margin-top: -2px;
      margin-right: 2px;

      &:hover {
        color: $color-blue-normal;
      }
    }

    &:hover {
      .report-btn {
        opacity: 1 !important;
      }
    }

    .sub-text {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 4px;
      @extend %breakWord;

      .to-user {
        color: $color-blue-normal;
      }
    }

    .sub-extra {
      line-height: 26px;
      font-size: 12px;

      time,
      span,
      button {
        margin-right: 12px;
        color: $color-text-light;
      }

      .reply-btn {
        padding: 0 5px;
        border-radius: 4px;
        line-height: 26px;

        &:hover {
          color: $color-blue-normal;
          background-color: $color-gray-normal;
        }
      }

      .report-btn {
        opacity: 0;
      }

      button:hover {
        i {
          color: $color-blue-normal;
        }
      }
    }
  }
}
</style>

<template>
  <div
    :id="`sub-comment-${comment.id}`"
    :class="{ 'focused-sub-comment': focusThisComment }"
    class="sub-comment-item"
  >
    <div class="sub-user">
      <div class="avatar">
        <user-card
          :id="comment.from_user_id"
          :zone="comment.from_user_zone"
        >
          <v-img
            :src="comment.from_user_avatar"
            size="24"
          />
        </user-card>
      </div>
    </div>
    <div class="sub-body">
      <user-card
        :id="comment.from_user_id"
        :zone="comment.from_user_zone"
        custom-class="from-user href-fade-blue"
      >
        {{ comment.from_user_name }}
      </user-card>
      <span class="sub-text">
        <template v-if="comment.to_user_id && comment.to_user_id !== parentUserId">
          回复
          <user-card
            :id="comment.to_user_id"
            :zone="comment.to_user_zone"
            custom-class="to-user"
          >
            @{{ comment.to_user_name }}
          </user-card>
        </template>
        {{ comment.content }}
      </span>
      <div class="sub-extra">
        <el-tooltip
          :content="comment.created_at"
          placement="top"
          effect="dark"
        >
          <v-time v-model="comment.created_at"/>
        </el-tooltip>
        <button
          class="reply-btn"
          @click="openReplyForm"
        >回复</button>
        <button
          v-if="canDelete"
          @click="deleteComment"
        >
          <i class="iconfont icon-shanchu"/>
        </button>
        <report-dialog
          v-else
          :id="comment.id"
          :type="type + '_reply'"
        >
          <button class="reply-btn">举报</button>
        </report-dialog>
      </div>
      <comment-reply-form
        v-model="showReplyArea"
        :type="type"
        :id="comment.parent_id"
        :to-user-id="comment.from_user_id"
      />
    </div>
  </div>
</template>

<script>
import CommentReplyForm from './CommentReplyForm'

export default {
  name: 'VSubCommentItem',
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
    },
    type: {
      required: true,
      type: String,
      default: ''
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
    openReplyForm() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
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
            ctx: this,
            type: this.type,
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
