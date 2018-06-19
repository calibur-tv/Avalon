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
        font-family: Microsoft Yahei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;
        @extend %breakWord;
      }

      .footer {
        line-height: 26px;
        font-size: 12px;

        span, time, button {
          margin-right: 20px;
          color: #99a2aa;
        }
      }
    }
  }
</style>

<template>
  <div class="def-comment-item" :id="`comment-${comment.id}`">
    <div class="user">
      <div class="avatar">
        <img :src="$resize(comment.from_user_avatar, { width: 96 })" :alt="comment.from_user_name">
      </div>
    </div>
    <div class="body">
      <div class="header">
        <a class="href-fade-blue" :href="$alias.user(comment.from_user_zone)" v-text="comment.from_user_name"></a>
      </div>
      <div class="content" v-html="comment.content"></div>
      <div class="footer">
        <span class="floor-count">#{{ comment.floor_count }}</span>
        <el-tooltip placement="top" effect="dark" :content="comment.created_at">
          <v-time v-model="comment.created_at"></v-time>
        </el-tooltip>
        <button class="like-btn" @click="toggleLike">
          {{ comment.liked ? '已赞' : '赞' }}
          <span v-if="comment.like_count">({{ comment.like_count }})</span>
        </button>
        <button class="delete-btn" v-if="canDelete" @click="deleteComment">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-comment-item',
    props: {
      comment: {
        type: Object,
        required: true
      },
      type: [String]
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.comment['from_user_id']
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.masterId
      }
    },
    data () {
      return {
        deleting: false,
        liking: false
      }
    },
    methods: {
      async toggleLike () {
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
      }
    }
  }
</script>
