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

    .post-item {
      .wrap {
        background-color: RGB(251, 251, 253);
        border-left: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        border-bottom: 1px solid #E1E4E6;
      }

      .user {
        .avatar {
          display: block;
          margin: 20px auto;
          @include avatar(80px)
        }

        .nickname {
          display: block;
          background: #fff;
          border: solid 1px #e6e6e6;
          width: 98px;
          height: 28px;
          line-height: 24px;
          margin: 0 auto;
          text-align: center;
        }
      }

      .content {
        background: #fff;
        min-height: 170px;
        padding: 20px 20px 8px 20px;

        img {
          width: 100%;
          height: auto;
          margin-bottom: 12px;
          cursor: zoom-in;
        }

        p {
          line-height: 24px;
          font-size: 14px;
          word-wrap: break-word;
          overflow: hidden;
        }
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
          <div class="post-item" v-for="item in list">
            <el-row class="wrap">
              <el-col class="user" :span="5">
                <a :href="$alias.user(item.user.zone)" target="_blank">
                  <v-img class="avatar" :src="item.user.avatar" :width="80" :height="80"></v-img>
                </a>
                <a class="nickname oneline" :href="$alias.user(item.user.zone)" target="_blank" v-text="item.user.nickname"></a>
              </el-col>
              <el-col class="content" :span="19">
                <div v-for="img in item.images" @click="handlePreviewImage(img)">
                  <v-img :src="img" :width="500"></v-img>
                </div>
                <div v-html="item.content"></div>
                <div class="footer">
                  <span>{{ item.floor_count }}楼</span>
                  <v-time v-model="item.created_at"></v-time>
                </div>
              </el-col>
            </el-row>
          </div>
          <v-modal class="image-preview-modal" v-model="showPreviewImage" :footer="false" :header="false">
            <img width="100%" :src="previewImage" alt="">
          </v-modal>
        </main>
        <footer>
          <v-post :post-id="id"></v-post>
        </footer>
      </section>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  import vPost from '~/components/creates/Post'

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
      vPost
    },
    head () {
      return {
        title: `${this.post.title} - 帖子`
      }
    },
    watch: {

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
      }
    },
    data () {
      return {
        showPreviewImage: false,
        previewImage: ''
      }
    },
    created () {

    },
    methods: {
      handlePreviewImage (img) {
        this.previewImage = img
        this.showPreviewImage = true
      }
    },
    mounted () {

    }
  }
</script>
