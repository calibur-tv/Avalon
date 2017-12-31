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
  }
</style>

<template>
  <div id="post-show">
    <v-banner></v-banner>
    <div class="container">
      <section class="col-main">
        <header>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank">
            <v-img :src="bangumi.avatar" :width="48" :height="48"></v-img>
          </a>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank">《{{ bangumi.name }}》</a>
          <div class="title-wrap">
            <h1 v-text="post.title"></h1>
            <button @click="switchOnlyMaster">{{ onlyMaster ? '取消只看楼主' : '只看楼主' }}</button>
            <button @click="scrollToReplyForm">回复</button>
            <button v-if="isMaster" @click="deletePost(post.id)">删除</button>
          </div>
        </header>
        <main>
          <v-item v-for="(item, index) in list"
                  :item="item"
                  :index="index"
                  :key="item.id"
                  :master-id="masterId"
          ></v-item>
        </main>
        <el-pagination background
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       :current-page="page"
                       v-if="total > take"
                       @current-change="getData"
        ></el-pagination>
        <footer>
          <div id="post-reply-form">
            <v-post :post-id="id"
                    :bangumi-id="post.bangumi_id"
                    :master-id="masterId"
                    id="test"
            ></v-post>
          </div>
        </footer>
      </section>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  import vPost from '~/components/creates/Post'
  import vItem from '~/components/items/Post'

  const defaultParams = {
    take: 10,
    page: 1
  }

  export default {
    name: 'post-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('post/getPost', {
        id: route.params.id,
        ctx,
        take: defaultParams.take,
        page: route.query.page || defaultParams.page,
        only: route.query.only
          ? parseInt(route.query.only, 10) ? 1 : 0
          : 0
      })
    },
    components: {
      vPost, vItem
    },
    head () {
      return {
        title: `${this.post.title} - 帖子`
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      list () {
        return this.$store.state.post.list
      },
      bangumi () {
        return this.$store.state.post.bangumi
      },
      noMore () {
        return this.$store.state.post.noMore
      },
      post () {
        return this.$store.state.post.post
      },
      total () {
        return this.$store.state.post.total
      },
      masterId () {
        return this.post.user_id
      },
      onlyMaster () {
        return !!parseInt(this.$route.query.only, 10)
      },
      isMaster () {
        return this.masterId - this.$store.state.user.id === 0
      }
    },
    data () {
      return {
        take: defaultParams.take,
        page: parseInt(this.$route.query.page, 10) || defaultParams.page
      }
    },
    methods: {
      scrollToReplyForm () {
        this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400)
      },
      getData (page) {
        const only = this.$route.query.only || 0
        window.location = this.$alias.post(this.post.id, { page, only })
      },
      switchOnlyMaster () {
        window.location = this.$alias.post(this.post.id, {
          page: 1,
          only: this.onlyMaster ? 0 : 1
        })
      },
      deletePost (id) {
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('post/deletePost', {
            ctx: this,
            id
          })
        }).catch(() => {})
      }
    },
    mounted () {
      this.$channel.$on('side-bar-click-post', this.scrollToReplyForm)
    }
  }
</script>
