<style lang="scss">
  .def-comment-item {
    @extend %clearfix;

    .user {
      float: left;
      width: 85px;

      .avatar {
        margin: 24px 0 0 5px;
        @include avatar-2(48px);
      }
    }
    
    .body {
      overflow: hidden;
      padding: 22px 0 14px;
      border-top: 1px solid $color-gray-normal;

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

        .floor-count, time {
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
      }

      .comment-reply-form {
        margin-top: 15px;
        margin-bottom: 5px;
      }
    }
  }
</style>

<template>
  <div class="def-comment-item" :id="`comment-${comment.id}`">
    <div class="user">
      <a target="_blank" :href="$alias.user(comment.from_user_zone)">
        <div class="avatar">
          <img :src="$resize(comment.from_user_avatar, { width: 96 })" :alt="comment.from_user_name">
        </div>
      </a>
    </div>
    <div class="body">
      <div class="header">
        <a class="href-fade-blue" target="_blank" :href="$alias.user(comment.from_user_zone)" v-text="comment.from_user_name"></a>
      </div>
      <div class="content" v-html="comment.content"></div>
      <div class="footer">
        <span class="floor-count">#{{ comment.floor_count }}</span>
        <el-tooltip placement="top" effect="dark" :content="comment.created_at">
          <v-time v-model="comment.created_at"></v-time>
        </el-tooltip>
        <button class="like-btn" @click="toggleLike">
          <i
            class="iconfont"
            :class="[ comment.liked ? 'icon-dianzan1 ic-liked' : 'icon-dianzan' ]"
          ></i>
          <span v-if="comment.like_count" v-text="comment.like_count"></span>
        </button>
        <button class="reply-btn" @click="replyComment">回复</button>
        <button class="delete-btn" v-if="canDelete" @click="deleteComment">
          <i class="iconfont icon-shanchu"></i>
        </button>
      </div>
      <comment-reply-form
        v-model="showReplyArea"
        :id="comment.id"
        :to-user-id="authorId"
        :type="type"
      ></comment-reply-form>
      <sub-comment-list
        :parent-comment="comment"
        :type="type"
      ></sub-comment-list>
    </div>
  </div>
</template>

<script>
  import SubCommentList from './SubCommentList.vue'
  import CommentReplyForm from './CommentReplyForm'

  export default {
    name: 'v-comment-item',
    components: {
      SubCommentList,
      CommentReplyForm
    },
    props: {
      comment: {
        type: Object,
        required: true
      },
      masterId: {
        type: Number,
        default: 0
      },
      type: [String]
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      authorId () {
        return this.comment.from_user_id
      },
      isMine () {
        return this.currentUserId === this.authorId
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.masterId
      }
    },
    data () {
      return {
        deleting: false,
        liking: false,
        showReplyArea: false
      }
    },
    methods: {
      async toggleLike () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.liking) {
          return
        }
        this.liking = true
        try {
          await this.$store.dispatch('comment/toggleLikeMainComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id
          })
        } catch (e) {
        } finally {
          this.liking = false
        }
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
          this.$store.dispatch('comment/deleteMainComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id
          })
        }).catch((e) => {
          this.deleting = false
          if (e === 'cancel') {
            return
          }
          this.$toast.error(e)
        })
      },
      replyComment () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        this.showReplyArea = !this.showReplyArea
      }
    }
  }
</script>
