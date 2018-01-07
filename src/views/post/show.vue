<style lang="scss">
  #post-show {
    .title-wrap {
      height: 56px;
      border-bottom: 1px solid #BBBDBF;

      h1 {
        font-weight: 400;
        font-size: 16px;
        margin-left: 20px;
        line-height: 55px;
        float: left;
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
        .avatar {
          width: 80px;
          height: 80px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;

          img {
            width: 100%;
            height: auto;
          }
        }
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
            <h1 v-text="post.title"></h1>
            <button @click="switchOnlyMaster">{{ onlySeeMaster ? '取消只看楼主' : '只看楼主' }}</button>
            <button @click="scrollToReplyForm">回复</button>
            <button v-if="isMaster" @click="deletePost(post.id)">删除</button>
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
              <div v-for="(img, idx) in post.images" @click="handleImagePreview(post.images, idx)">
                <v-img class="image" :src="img" width="500" mode="2"></v-img>
              </div>
              <div v-html="post.content"></div>
              <div class="footer">
                <button v-if="isMaster" @click="deletePost(post.id)">删除</button>
                <span>1楼</span>
                <v-time v-model="post.created_at"></v-time>
              </div>
            </el-col>
          </el-row>
          <post-item v-for="(item, index) in list"
                     :key="item.id"
                     :index="index"
                     :post="item"
                     @delete="deletePost(item.id)"
          ></post-item>
        </main>
        <el-button :loading="loading"
                   v-if="!noMore"
                   class="load-post-btn"
                   @click="getPosts"
                   type="info"
                   plain
        >{{ loading ? '加载中' : '加载更多' }}</el-button>
        <footer>
          <div id="post-reply-form">
            <post-create-form :post-id="post.id"
                    :bangumi-id="bangumi.id"
                    :master-id="masterId"
                    id="test"
            ></post-create-form>
          </div>
        </footer>
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
        return this.resource.data.list
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
        loading: false
      }
    },
    methods: {
      scrollToReplyForm () {
        this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400)
      },
      switchOnlyMaster () {
        window.location = this.$alias.post(this.post.id, {
          page: 1,
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
        this.loading = true
        await this.$store.dispatch('post/getPost', {
          id: this.post.id,
          ctx: this,
          only: this.onlySeeMaster
        })
        this.loading = false
      }
    },
    mounted () {
      this.$channel.$on('side-bar-click-post', this.scrollToReplyForm)
    }
  }
</script>
