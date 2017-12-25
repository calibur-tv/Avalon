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
      }
    }

    .image-preview-modal .v-modal {
      max-height: 80%;
      max-width: 90%;
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
          </div>
        </header>
        <main>
          <v-item v-for="(item, index) in list"
                  :item="item"
                  :index="index"
                  :key="item.id"
                  :master-id="masterId"
                  :post-id="id"
          ></v-item>
          <v-modal class="image-preview-modal" v-model="showPreviewImage" :footer="false" :header="false">
            <img width="100%" :src="previewImage" alt="">
          </v-modal>
        </main>
        <footer>
          <div id="post-reply-form">
            <v-post :post-id="id"
                    :last-id="lastId"
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
    take: 15,
    page: 1
  }

  export default {
    name: 'post-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('post/getPost', {
        id: route.params.id,
        ctx,
        take: defaultParams.take,
        page: defaultParams.page
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
        return this.$store.state.post.list[this.id].data
      },
      bangumi () {
        return this.$store.state.post.list[this.id].bangumi
      },
      noMore () {
        return this.$store.state.post.list[this.id].noMore
      },
      post () {
        return this.list[0]
      },
      masterId () {
        return this.post.user_id
      },
      lastId () {
        return this.list[this.list.length - 1].id
      }
    },
    data () {
      return {
        showPreviewImage: false,
        previewImage: ''
      }
    },
    methods: {
      handlePreviewImage (img) {
        this.previewImage = img
        this.showPreviewImage = true
      },
      scrollToReplyForm () {
        this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400)
      }
    },
    mounted () {
      this.$channel.$on('side-bar-click-post', this.scrollToReplyForm)
    }
  }
</script>
