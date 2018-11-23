<style lang="scss">
.post-comment-item {
  &.focused-main-comment {
    background-color: rgba($color-blue-light, 0.1);
  }

  .user {
    position: relative;
    width: 180px;
    float: left;

    .avatar {
      display: block;
      margin: 29px auto 5px auto;
    }

    .nickname {
      display: block;
      width: 98px;
      height: 28px;
      line-height: 24px;
      margin: 0 auto;
      text-align: center;
    }

    .iconfont {
      position: absolute;
    }

    .icon-owner {
      color: gold;
      left: 78px;
      top: 16px;
      font-size: 22px;
    }

    .icon-leader {
      color: $color-pink-deep;
      font-size: 23px;
      left: 103px;
      top: 86px;
    }

    .icon-master {
      color: $color-blue-normal;
      font-size: 20px;
      left: 103px;
      top: 87px;
    }
  }

  .content {
    overflow: hidden;
    border-top: 1px solid #e5e9ef;
    padding-top: 22px;
    margin-top: 14px;

    .main {
      min-height: 84px;
    }

    .image {
      margin-bottom: 12px;
    }

    .text-package {
      line-height: 24px;
      padding: 2px 0;
      font-size: 14px;
      overflow: hidden;
      word-wrap: break-word;
    }

    .likes-wrap {
      text-align: center;
      margin: 50px 0;
    }

    .footer {
      color: #99a2aa;
      line-height: 26px;
      font-size: 12px;

      .info-bar {
        height: 40px;
        line-height: 40px;

        .delete-btn,
        .floor-count,
        .like-btn {
          margin-right: 20px;
        }

        .v-share {
          float: right;
        }
      }
    }
  }
}
</style>

<template>
  <div
    :id="`comment-${post.id}`"
    :class="{ 'focused-main-comment': focusThisComment }"
    class="post-comment-item"
  >
    <div class="user">
      <user-card
        :id="post.from_user_id"
        :zone="post.from_user_zone"
      >
        <v-img
          :src="post.from_user_avatar"
          :avatar="true"
          size="80"
          class="avatar"
        />
        <p
          class="nickname oneline"
          v-text="post.from_user_name"
        />
      </user-card>
      <el-tooltip
        v-if="post.is_owner"
        placement="top"
        effect="dark"
        content="楼主"
      >
        <i class="iconfont icon-owner"/>
      </el-tooltip>
      <el-tooltip
        v-if="post.is_leader"
        placement="right"
        effect="dark"
        content="版主"
      >
        <i class="iconfont icon-leader"/>
      </el-tooltip>
      <el-tooltip
        v-else-if="post.is_master"
        placement="right"
        effect="dark"
        content="代行者"
      >
        <i class="iconfont icon-master"/>
      </el-tooltip>
    </div>
    <div class="content">
      <div class="main">
        <div
          v-for="(img, idx) in post.images"
          :key="idx"
          class="image-package"
        >
          <v-img
            :src="img.url"
            :width="img.width"
            :height="img.height"
            :full="true"
            class="image"
          />
        </div>
        <div
          class="text-package"
          v-html="post.content"
        />
      </div>
      <div class="footer">
        <div class="info-bar">
          <button
            class="like-btn"
            @click="toggleLike"
          >
            {{ post.liked ? '已赞' : '赞' }}
            <span v-if="post.like_count">({{ post.like_count }})</span>
          </button>
          <button
            v-if="canDelete"
            class="delete-btn"
            @click="deleteComment"
          >删除</button>
          <span class="floor-count">{{ post.floor_count }}楼</span>
          <v-time
            :datetime="post.created_at"
            class="floor-count"
          />
          <report-dialog
            :id="post.id"
            type="post_comment"
          >举报</report-dialog>
        </div>
      </div>
    </div>
    <post-sub-comment-list :parent-comment="post"/>
  </div>
</template>

<script>
import PostSubCommentList from './PostSubCommentList.vue'

export default {
  name: 'PostCommentItem',
  components: {
    PostSubCommentList
  },
  props: {
    post: {
      required: true,
      type: Object
    },
    masterId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      deleting: false,
      liking: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isMine() {
      return this.currentUserId === this.post['from_user_id']
    },
    canDelete() {
      return this.isMine || this.currentUserId === this.masterId
    },
    focusThisComment() {
      return parseInt(this.$route.query['comment-id']) === this.post.id
    }
  },
  methods: {
    async toggleLike() {
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
          type: 'post',
          id: this.post.id
        })
      } catch (e) {
      } finally {
        this.liking = false
      }
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
          this.$store.dispatch('comment/deleteMainComment', {
            type: 'post',
            ctx: this,
            id: this.post.id
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
