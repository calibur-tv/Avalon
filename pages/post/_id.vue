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
      padding: 18px 0 14px;
      overflow: hidden;

      .main {
        min-height: 80px;
      }

      .content {
        min-height: 300px;

        .text-area {
          line-height: 24px;
          font-size: 14px;
          overflow: hidden;
          word-wrap: break-word;

          p {
            margin-bottom: 10px;
          }
        }

        .image-package {
          margin-bottom: 20px;
          margin-top: 5px;

          .image {
            margin-bottom: 10px;
          }
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

          .fen-think {
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
      <el-alert
        v-if="post.deleted_at"
        title="该内容已被删除"
        type="error"
        center
        show-icon
      />
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
                :width="80"
                :height="80"
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
                v-for="(img, idx) in post.images"
                :key="idx"
                class="image-package"
              >
                <v-img
                  :src="img.url"
                  :width="img.width"
                  :height="img.height"
                  :mime="img.type"
                  :blur="true"
                  :full="true"
                  class="image"
                />
              </div>
              <div
                class="text-area"
                v-html="post.content"
              />
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
              :is-mine="isMaster"
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
        <bangumi-panel
          :id="bangumi.id"
          :avatar="bangumi.avatar"
          :name="bangumi.name"
          :summary="bangumi.summary"
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
import { getPostInfo, deletePost } from '~/api/postApi'

export default {
  name: 'PostShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ query, store, params, app, error }) {
    const { id } = params
    const { hash, time, only } = query
    return getPostInfo(app, {
      id,
      hash,
      time,
      only: only ? (parseInt(only, 10) ? 1 : 0) : 0
    })
      .then(data => {
        const { post, bangumi } = data
        store.commit('social/SET_STATE', {
          type: 'post',
          id,
          data: {
            like: post.liked,
            reward: post.rewarded,
            mark: post.marked,
            like_users: post.like_users,
            mark_users: post.mark_users,
            reward_users: post.reward_users
          }
        })
        store.commit('social/SET_STATE', {
          type: 'bangumi',
          id: bangumi.id,
          data: {
            follow: bangumi.followed
          }
        })
        return {
          post,
          bangumi,
          master: data.user,
          shareData: data.share_data
        }
      })
      .catch(error)
  },
  async fetch({ store, query, params }) {
    try {
      await store.dispatch('comment/getMainComments', {
        id: params.id,
        type: 'post',
        onlySeeMaster: query.only ? (parseInt(query.only, 10) ? 1 : 0) : 0,
        seeReplyId: query['comment-id']
      })
    } catch (e) {}
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
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bangumi: null,
      post: null,
      master: null
    }
  },
  computed: {
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
          await deletePost(this, { id: this.id })
          window.location.reload()
        })
        .catch(e => {
          this.$toast.error(e)
        })
    }
  }
}
</script>
