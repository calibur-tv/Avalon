<style lang="scss">
  .sub-comment-item {
    padding: 10px 0;

    .sub-user {
      float: left;

      .avatar {
        margin-top: 5px;
        margin-right: 10px;
        @include avatar-2(24px);
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

        time, span, button {
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
  <div class="sub-comment-item">
    <div class="sub-user">
      <div class="avatar">
        <a
          :href="$alias.user(comment.from_user_zone)"
          target="_blank"
        >
          <img
            :src="$resize(comment.from_user_avatar, { width: 50 })"
            :alt="comment.from_user_name"
          >
        </a>
      </div>
    </div>
    <div class="sub-body">
      <a
        :href="$alias.user(comment.from_user_zone)"
        class="from-user href-fade-blue"
        target="_blank"
        v-text="comment.from_user_name"
      />
      <span class="sub-text">
        <template v-if="comment.to_user_id && comment.to_user_id !== parentUserId">
          回复
          <a
            :href="$alias.user(comment.to_user_zone)"
            class="to-user"
            target="_blank"
          >@{{ comment.to_user_name }}</a>:
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
    data () {
      return {
        showReplyArea: false,
        deleting: false
      }
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.comment.from_user_id
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.parentUserId
      }
    },
    methods: {
      openReplyForm () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        this.showReplyArea = !this.showReplyArea
      },
      deleteComment () {
        if (this.deleting) {
          return
        }
        this.deleting = true
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('comment/deleteSubComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id,
            parentId: this.comment.parent_id
          })
        }).catch((e) => {
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
