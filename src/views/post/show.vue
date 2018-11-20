<style lang="scss">
#post-show {
  .title-wrap {
    height: 56px;
    border-bottom: 1px solid #bbbdbf;

    h1 {
      font-weight: 400;
      font-size: 16px;
      margin-left: 20px;
      line-height: 55px;
      overflow: hidden;
    }

    .nice_badge,
    .creator_badge {
      float: left;
      height: 22px;
      line-height: 20px;
      color: #fff;
      cursor: default;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 1px 6px;
      border-radius: 4px;
      margin: 16px 5px 0 0;
    }

    .nice_badge {
      background-color: $color-pink-deep;
    }

    .creator_badge {
      background-color: goldenrod;
    }

    .control {
      float: right;
      line-height: 55px;
      margin-left: 15px;

      .floor {
        font-size: 12px;
        color: #5a5e66;
        margin-left: 10px;
      }
    }
  }

  .post-main {
    .user {
      width: 180px;
      float: left;

      .avatar {
        display: block;
        margin: 20px auto 5px auto;
      }

      .nickname {
        display: block;
        background: #fff;
        width: 98px;
        height: 28px;
        line-height: 24px;
        margin: 0 auto;
        text-align: center;
      }
    }

    .body {
      background: #fff;
      padding: 22px 0 14px;
      border-top: 1px solid #e5e9ef;
      overflow: hidden;

      .main {
        min-height: 80px;
      }

      .content {
        min-height: 300px;

        .image {
          margin-bottom: 12px;
        }

        .text-area {
          line-height: 24px;
          padding: 2px 0;
          font-size: 14px;
          overflow: hidden;
          word-wrap: break-word;
        }
      }

      .tags {
        font-size: 12px;
        margin-bottom: -10px;
        margin-top: 10px;

        > * {
          display: inline-block;
          height: 20px;
          border-radius: 10px;
          line-height: 20px;
          background-color: $color-gray-normal;
          color: $color-text-normal;
          padding-left: 10px;
          padding-right: 10px;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .tag {
          cursor: default;
          user-select: none;
        }

        i {
          margin-right: 3px;
        }
      }

      .footer {
        color: #99a2aa;
        line-height: 26px;
        font-size: 12px;

        .info-bar {
          height: 40px;
          line-height: 40px;

          .footer-item {
            margin-right: 20px;
            display: inline-block;
            float: left;
          }

          .v-share {
            float: right;
          }
        }
      }
    }
  }

  .col-aside {
    padding: 20px;

    .bangumi-panel {
      margin-top: 30px;
      margin-left: 30px;
    }
  }

  .create-post-form {
    margin-left: -50px;

    button {
      width: 100%;
    }
  }

  #comment-wrap {
    .sub-comment-list-wrap {
      background-color: #f7f8fa;
      position: relative;
      margin-left: 180px;

      .comments {
        padding: 4px 15px;

        li {
          display: block;
          width: 100%;
        }

        .avatar {
          @include avatar(32px);
        }
      }

      .comment-reply-area {
        padding: 0 15px 10px;
        height: 45px;
        line-height: 35px;

        .open-comment {
          float: right;
          font-size: 13px;
          margin-top: 10px;
        }

        .total {
          margin-left: 10px;
        }
      }
    }

    #comment-list-footer {
      margin-left: 180px;
      margin-right: 5px;
    }
  }

  .load-more-btn {
    margin-left: 0 !important;
  }
}
</style>

<template>
  <div id="post-show">
    <v-header/>
    <v-layout>
      <header>
        <div class="title-wrap">
          <div class="control">
            <el-button
              size="mini"
              plain
              @click="switchOnlyMaster"
            >{{ onlySeeMaster ? '取消只看楼主' : '只看楼主' }}</el-button>
            <el-button
              size="mini"
              plain
              @click="scrollToReplyForm"
            >回复</el-button>
            <el-button
              v-if="isMaster"
              size="mini"
              plain
              @click="deletePost"
            >删除</el-button>
            <span class="floor">共{{ total }}条</span>
          </div>
          <div
            v-if="post.is_nice"
            class="nice_badge"
          >精</div>
          <div
            v-if="post.is_creator"
            class="creator_badge"
          >原创</div>
          <h1
            class="oneline"
            v-text="post.title"
          />
        </div>
      </header>
      <main>
        <el-row class="post-main">
          <div class="user">
            <user-card
              :id="master.id"
              :zone="master.zone"
            >
              <v-img
                :src="master.avatar"
                :avatar="true"
                :lazy="false"
                size="80"
                class="avatar"
              />
              <p
                class="nickname oneline"
                v-text="master.nickname"
              />
            </user-card>
          </div>
          <div class="body">
            <div class="content">
              <div
                class="text-area"
                v-html="post.content"
              />
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
            </div>
            <div class="tags">
              <a
                :href="$alias.bangumi(bangumi.id)"
                target="_blank"
              >
                <i class="iconfont icon-biaoqian"/>
                <span v-text="bangumi.name"/>
              </a>
              <span
                v-for="tag in post.tags"
                :key="tag.id"
                class="tag"
                v-text="tag.name"
              />
            </div>
            <social-panel
              :id="post.id"
              :is-creator="post.is_creator"
              :user-id="master.id"
              :liked="post.liked"
              :marked="post.marked"
              :rewarded="post.rewarded"
              :reward-users="post.reward_users"
              :like-users="post.like_users"
              :mark-users="post.mark_users"
              type="post"
            />
            <div class="footer">
              <div class="info-bar">
                <span class="footer-item">1楼</span>
                <v-time
                  v-model="post.created_at"
                  class="footer-item"
                />
                <report-dialog
                  :id="post.id"
                  :is-creator="post.is_creator"
                  type="post"
                  title="帖子违规举报"
                >举报</report-dialog>
                <v-share
                  :desc="post.desc"
                  type="panel"
                />
              </div>
            </div>
          </div>
        </el-row>
        <comment-main
          :id="post.id"
          :only-see-master="onlySeeMaster"
          :master-id="master.id"
          empty-text=""
          type="post"
        >
          <div slot="header"/>
          <post-comment-item
            slot="comment-item"
            slot-scope="{ comment }"
            :post="comment"
            :master-id="master.id"
          />
          <div
            id="bottom-comment-post-form"
            slot="reply"
          >
            <post-comment-form
              :id="post.id"
              :master-id="master.id"
            />
          </div>
        </comment-main>
      </main>
      <aside slot="aside">
        <v-bangumi-panel
          :id="bangumi.id"
          :avatar="bangumi.avatar"
          :name="bangumi.name"
          :followed="bangumi.followed"
          :summary="bangumi.summary"
          class="bangumi-panel"
          @follow="handleBangumiFollow"
        />
      </aside>
    </v-layout>
  </div>
</template>

<script>
import CommentMain from '~/components/comments/CommentMain'
import PostCommentItem from '~/components/post/PostCommentItem'
import PostCommentForm from '~/components/post/PostCommentForm'
import SocialPanel from '~/components/common/SocialPanel'

export default {
  name: 'PostShow',
  async asyncData({ route, store, ctx }) {
    const only = route.query.only ? (parseInt(route.query.only, 10) ? 1 : 0) : 0
    const id = route.params.id
    await Promise.all([
      store.dispatch('post/getPost', {
        id,
        ctx,
        only
      }),
      store.dispatch('comment/getMainComments', {
        ctx,
        id,
        type: 'post',
        onlySeeMaster: only,
        seeReplyId: route.query['comment-id']
      })
    ])
  },
  components: {
    CommentMain,
    PostCommentItem,
    PostCommentForm,
    SocialPanel
  },
  head() {
    return {
      title: `${this.post.title} - 帖子`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$utils.truncate(this.post.content)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,帖子,天下漫友是一家,${this.post.title},${
            this.bangumi.name
          }`
        }
      ]
    }
  },
  data() {
    return {
      loadingToggleLike: false,
      loadingToggleMark: false
    }
  },
  computed: {
    resource() {
      return this.$store.state.post.info
    },
    bangumi() {
      return this.resource.bangumi
    },
    post() {
      return this.resource.post
    },
    master() {
      return this.resource.user
    },
    total() {
      return this.$store.state.comment.total + 1
    },
    onlySeeMaster() {
      return !!parseInt(this.$route.query.only, 10)
    },
    isMaster() {
      if (!this.$store.state.login) {
        return false
      }
      return this.$store.state.user.id === this.master.id
    }
  },
  methods: {
    scrollToReplyForm() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      const wrap = document.getElementById('bottom-comment-post-form')
      if (wrap) {
        this.$scrollToY(this.$utils.getOffsetTop(wrap), 400)
        wrap.querySelector('textarea').focus()
      }
    },
    switchOnlyMaster() {
      window.location = this.$alias.post(this.post.id, {
        only: this.onlySeeMaster ? 0 : 1
      })
    },
    deletePost() {
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store.dispatch('post/deletePost', {
            ctx: this,
            id: this.post.id
          })
          window.location = this.$alias.bangumi(this.bangumi.id)
        })
        .catch(e => {
          this.$toast.error(e)
        })
    },
    async toggleLike() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.isMaster) {
        this.$toast.info('不能赞赏自己的帖子')
        return
      }
      if (this.loadingToggleLike) {
        return
      }
      this.loadingToggleLike = true
      try {
        const result = await this.$store.dispatch('post/toggleLike', {
          ctx: this,
          id: this.post.id
        })
        if (result) {
          this.$store.commit('USE_COIN')
        }
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.loadingToggleLike = false
      }
    },
    async toggleMark() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.isMaster) {
        this.$toast.info('不能收藏自己的帖子')
        return
      }
      if (this.loadingToggleMark) {
        return
      }
      this.loadingToggleMark = true
      try {
        await this.$store.dispatch('post/toggleMark', {
          ctx: this,
          id: this.post.id
        })
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.loadingToggleMark = false
      }
    },
    handleBangumiFollow(result) {
      this.$store.commit('post/FOLLOW_BANGUMI', result)
    }
  }
}
</script>
