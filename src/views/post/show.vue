<style lang="scss">
  #post-show {
    .title-wrap {
      height: 56px;
      border-bottom: 1px solid #BBBDBF;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-weight: 400;
        font-size: 16px;
        margin-left: 20px;
        line-height: 55px;
        float: left;
      }

      .control {
        width: 400px;
        text-align: right;

        .floor {
          font-size: 12px;
          color: #5a5e66;
          margin-left: 10px;
        }
      }
    }

    .post-item {
      .user {
        .avatar {
          display: block;
          margin: 20px auto 5px auto;
          @include avatar(80px)
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

      .content {
        background: #fff;
        padding: 22px 0 14px;
        border-top: 1px solid #e5e9ef;

        .main {
          min-height: 80px;
        }

        .image {
          width: 100%;
          height: auto;
          margin-bottom: 12px;
          cursor: zoom-in;
        }

        .text-area {
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
            height: 30px;
            line-height: 30px;

            .delete-btn,
            .floor-count,
            .like-btn {
              margin-right: 20px;
            }
          }
        }
      }
    }

    .load-post-btn {
      margin-top: 20px;
      margin-bottom: 20px;
      width: 100%;
    }

    .col-aside {
      padding: 20px;

      .bangumi {
        text-align: center;

        .avatar {
          width: 80px;
          height: 80px;
          display: block;
          margin: 0 auto 10px auto;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }

    .create-post-form {
      margin-left: -50px;

      button {
        width: 100%;
      }
    }
  }
</style>

<template>
  <div id="post-show">
    <v-banner></v-banner>
    <div class="container">
      <section class="col-main">
        <header>
          <div class="title-wrap">
            <h1 class="oneline" v-text="post.title"></h1>
            <div class="control">
              <el-button size="mini" plain @click="switchOnlyMaster">{{ onlySeeMaster ? '取消只看楼主' : '只看楼主' }}</el-button>
              <el-button size="mini" plain @click="scrollToReplyForm">回复</el-button>
              <el-button size="mini" plain v-if="isMaster" @click="deletePost(post.id)">删除</el-button>
              <span class="floor">共{{ total }}条</span>
            </div>
          </div>
        </header>
        <main>
          <el-row class="post-item">
            <el-col class="user" :span="5">
              <a :href="$alias.user(master.zone)" target="_blank">
                <v-img class="avatar" :src="master.avatar" :width="80" :height="80"></v-img>
              </a>
              <a class="nickname oneline" :href="$alias.user(master.zone)" target="_blank" v-text="master.nickname"></a>
            </el-col>
            <el-col class="content" :span="19">
              <div class="image-package" v-for="(img, idx) in post.images" :key="img" @click="$previewImages(post.images, idx)">
                <v-img class="image" :src="img" width="500" mode="2"></v-img>
              </div>
              <div class="text-area" v-html="post.content"></div>
              <div class="likes-wrap">
                <el-button type="danger"
                           @click="toggleLike"
                           :loading="loadingToggleLike"
                           round>
                  <i class="iconfont icon-guanzhu"></i>
                  {{ post.liked ? '已喜欢' : '喜欢' }}{{ post.like_count ? `(${post.like_count})` : '' }}
                </el-button>
                <el-button
                  type="warning"
                  @click="toggleMark"
                  :loading="loadingToggleMark"
                  round
                >
                  <i class="iconfont icon-buoumaotubiao44"></i>
                  {{ post.marked ? '已收藏' : '收藏' }}{{ post.mark_count ? `(${post.mark_count})` : '' }}
                </el-button>
              </div>
              <div class="footer">
                <div class="info-bar">
                  <button class="delete-btn" v-if="isMaster" @click="deletePost(post.id)">删除</button>
                  <span class="floor-count">1楼</span>
                  <v-time v-model="post.created_at"></v-time>
                </div>
              </div>
            </el-col>
          </el-row>
          <post-item v-for="item in list"
                     :key="item.id"
                     :post="item"
                     @delete="deletePost(item.id)"
          ></post-item>
        </main>
        <el-col :span="19" :offset="5">
          <el-button :loading="loadingLoadMore"
                     v-if="!noMore"
                     class="load-post-btn"
                     @click="getPosts"
                     type="info"
                     plain
          >{{ loadingLoadMore ? '加载中' : '加载更多' }}</el-button>
          <div id="post-reply-form">
            <post-create-form :post-id="post.id"
                              :bangumi-id="bangumi.id"
                              :master-id="masterId"
                              id="test"
            ></post-create-form>
          </div>
        </el-col>
      </section>
      <aside class="col-aside">
        <div class="bangumi">
          <a class="avatar" :href="$alias.bangumi(bangumi.id)" target="_blank">
            <v-img :src="bangumi.avatar" width="80" height="80"></v-img>
          </a>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank">《{{ bangumi.name }}》</a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
  import PostCreateForm from '~/components/creates/Post'
  import PostItem from '~/components/items/Post'

  export default {
    name: 'post-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('post/getPost', {
        id: route.params.id,
        ctx,
        only: route.query.only
          ? parseInt(route.query.only, 10) ? 1 : 0
          : 0
      })
    },
    components: {
      PostCreateForm, PostItem
    },
    head () {
      return {
        title: `${this.post.title} - 帖子`
      }
    },
    computed: {
      resource () {
        return this.$store.state.post.show
      },
      list () {
        return this.$orderBy(this.resource.data.list, 'id', 'asc')
      },
      total () {
        return this.resource.data.total
      },
      noMore () {
        return this.resource.data.noMore
      },
      bangumi () {
        return this.resource.info.bangumi
      },
      post () {
        return this.resource.info.post
      },
      master () {
        return this.resource.info.user
      },
      masterId () {
        return this.master.id
      },
      onlySeeMaster () {
        return !!parseInt(this.$route.query.only, 10)
      },
      isMaster () {
        if (!this.$store.state.login) {
          return false
        }
        const currentUserId = this.$store.state.user.id
        return currentUserId === this.masterId
      }
    },
    data () {
      return {
        loadingLoadMore: false,
        loadingToggleLike: false,
        loadingToggleMark: false
      }
    },
    methods: {
      scrollToReplyForm () {
        this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400)
      },
      switchOnlyMaster () {
        window.location = this.$alias.post(this.post.id, {
          only: this.onlySeeMaster ? 0 : 1
        })
      },
      deletePost (id) {
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$store.dispatch('post/deletePost', {
            ctx: this,
            id
          })
          if (id === this.post.id) {
            window.location = this.$alias.bangumi(this.bangumi.id)
          }
        }).catch(() => {})
      },
      async getPosts () {
        this.loadingLoadMore = true
        await this.$store.dispatch('post/getPost', {
          id: this.post.id,
          ctx: this,
          only: this.onlySeeMaster
        })
        this.loadingLoadMore = false
      },
      async toggleLike () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.isMaster) {
          this.$toast.info('不能给自己点赞')
          return
        }
        if (this.loadingToggleLike) {
          return
        }
        this.loadingToggleLike = true
        try {
          await this.$store.dispatch('post/toggleLike', {
            ctx: this,
            id: this.post.id
          })
        } catch (err) {
          this.$toast.error(err)
        }
        this.loadingToggleLike = false
      },
      async toggleMark () {
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
        }
        this.loadingToggleMark = false
      }
    },
    mounted () {
      this.$channel.$on('side-bar-click-post', this.scrollToReplyForm)
    }
  }
</script>
