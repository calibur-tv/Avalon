<style lang="scss">
.def-comment-item {
  @extend %clearfix;

  .user {
    float: left;
    width: 85px;

    .avatar {
      margin: 24px 0 0 5px;
      @extend %avatar;
    }
  }

  .body {
    overflow: hidden;
    padding: 22px 0 14px;
    border-top: 1px solid $color-gray-normal;

    &:hover {
      .main-comment-report-btn {
        opacity: 1 !important;
      }
    }

    .header {
      margin-bottom: 4px;

      .href-fade-blue {
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
      }
    }

    .content {
      line-height: 20px;
      padding: 2px 0;
      font-size: 14px;
      @extend %breakWord;
    }

    .footer {
      line-height: 26px;
      font-size: 12px;

      .floor-count,
      time {
        margin-right: 20px;
        color: $color-text-light;
      }

      button {
        margin-right: 12px;
        color: $color-text-light;
      }

      i {
        margin-right: 5px;
        font-size: 14px;
      }

      .ic-liked {
        color: $color-blue-normal;
      }

      button:hover {
        i {
          color: $color-blue-normal;
        }
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

      .main-comment-report-btn {
        opacity: 0;
      }
    }

    .comment-reply-form {
      margin-top: 15px;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <div
    :id="`comment-${comment.id}`"
    class="def-comment-item"
  >
    <div class="user">
      <a
        :href="$alias.user(comment.from_user_zone)"
        target="_blank"
      >
        <v-img
          :src="comment.from_user_avatar"
          size="48"
          class="avatar"
        />
      </a>
    </div>
    <div class="body">
      <div class="header">
        <a
          :href="$alias.user(comment.from_user_zone)"
          class="href-fade-blue"
          target="_blank"
          v-text="comment.from_user_name"
        />
      </div>
      <div
        class="content"
        v-html="comment.content"
      />
      <div class="footer">
        <span class="floor-count">#{{ comment.floor_count - 1 }}</span>
        <el-tooltip
          :content="comment.created_at"
          placement="top"
          effect="dark"
        >
          <v-time v-model="comment.created_at"/>
        </el-tooltip>
        <button
          class="like-btn"
          @click="toggleLike"
        >
          <i
            :class="[ comment.liked ? 'icon-dianzan1 ic-liked' : 'icon-dianzan' ]"
            class="iconfont"
          />
          <span
            v-if="comment.like_count"
            v-text="comment.like_count"
          />
        </button>
        <button
          class="reply-btn"
          @click="replyComment"
        >回复</button>
        <button
          v-if="canDelete"
          class="delete-btn"
          @click="deleteComment"
        >
          <i class="iconfont icon-shanchu"/>
        </button>
        <report-dialog
          v-else
          :id="comment.id"
          :type="type + '_comment'"
        >
          <button class="reply-btn main-comment-report-btn">举报</button>
        </report-dialog>
      </div>
      <comment-reply-form
        v-model="showReplyArea"
        :id="comment.id"
        :to-user-id="authorId"
        :type="type"
      />
      <sub-comment-list
        :parent-comment="comment"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import SubCommentList from "./SubCommentList.vue";
import CommentReplyForm from "./CommentReplyForm";

export default {
  name: "VCommentItem",
  components: {
    SubCommentList,
    CommentReplyForm
  },
  props: {
    comment: {
      required: true,
      type: Object
    },
    masterId: {
      required: true,
      type: [Number, String]
    },
    type: {
      required: true,
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deleting: false,
      liking: false,
      showReplyArea: false
    };
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0;
    },
    authorId() {
      return this.comment.from_user_id;
    },
    isMine() {
      return this.currentUserId === this.authorId;
    },
    canDelete() {
      return this.isMine || this.currentUserId === this.masterId;
    }
  },
  methods: {
    async toggleLike() {
      if (!this.currentUserId) {
        this.$channel.$emit("sign-in");
        return;
      }
      if (this.liking) {
        return;
      }
      this.liking = true;
      try {
        await this.$store.dispatch("comment/toggleLikeMainComment", {
          ctx: this,
          type: this.type,
          id: this.comment.id
        });
      } catch (e) {
      } finally {
        this.liking = false;
      }
    },
    deleteComment() {
      if (this.deleting) {
        return;
      }
      this.deleting = true;
      this.$confirm("删除后无法找回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("comment/deleteMainComment", {
            ctx: this,
            type: this.type,
            id: this.comment.id
          });
          this.$emit("delete");
        })
        .catch(e => {
          this.deleting = false;
          if (e === "cancel") {
            return;
          }
          this.$toast.error(e);
        });
    },
    replyComment() {
      if (!this.currentUserId) {
        this.$channel.$emit("sign-in");
        return;
      }
      this.showReplyArea = !this.showReplyArea;
    }
  }
};
</script>
