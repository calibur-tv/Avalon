<style lang="scss">
  #image-album {
    background-color: #f5f5f5;
    $banner-height: 350px;

    #banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      z-index: 1;
      height: $banner-height;
      box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.5);

      .img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
      }

      .container {
        background-color: transparent;
        margin-bottom: 0;
        height: 100%;
      }

      .panel {
        position: absolute;
        top: 100px;
        left: 0;
        color: #fff;
        min-width: 260px;
        max-width: 500px;
        background-color: rgba(30,30,34,.8);
        padding: 20px;

        h1 {
          font-size: 32px;
          font-weight: 300;
          line-height: 48px;
        }

        p {
          margin-top: 5px;
          line-height: 20px;
        }
      }

      .follow {
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
      }

      .v-share {
        position: absolute;
        right: 40px;
        bottom: 10px;
      }
    }

    .container {
      background-color: #fff;
      padding: 30px 27px;
    }

    @media (min-width: 1050px) {
      .container {
        width: 1080px;
        margin-bottom: 100px;
      }
    }

    nav {
      border: 1px solid #d8d8d8;
      padding: 30px 20px 0;
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div id="image-album">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: `url(${$resize(album.poster, { width: 1920, mode: 0 })})` }"></div>
      <div class="container">
        <div class="panel">
          <h1 class="title">《{{ album.name }}》</h1>
          <p class="author">
            作者：<a :href="$alias.user(user.zone)" target="_blank" v-text="user.nickname"></a>
          </p>
        </div>
        <!--
        <el-button
          type="danger"
          round
          plain
          class="follow"
          @click="toggleFollowBangumi"
        >
          <i class="iconfont icon-guanzhu"></i>
          {{ bangumi.followed ? '已关注' : '关注' }}
        </el-button>
        -->
      </div>
      <v-share type="panel"></v-share>
    </section>
    <div class="container">
      <nav>
        <h1 class="breadcrumb">
          <a :href="$alias.index" target="_blank">主站</a>
          <a v-if="bangumi" :href="$alias.bangumi(bangumi.id)" target="_blank" v-text="bangumi.name"></a>
          <a href="javascript:;">相簿</a>
          {{ album.name }}
        </h1>
      </nav>
      <div class="images-wrap">
        <div
          class="image-package"
          v-for="(img, idx) in images"
          :key="img.id"
          @click="$previewImages(previewImages, idx)"
        >
          <v-img
            class="image"
            :src="img.url"
            width="500"
            mode="2"
            :aspect="$computeImageAspect(img.url)"
          ></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'image-album',
    async asyncData ({ store, route, ctx }) {
      await store.dispatch('image/getAlbumData', {
        ctx,
        id: route.params.id
      })
    },
    computed: {
      album () {
        return this.$store.state.image.albumShow
      },
      images () {
        return this.album.images
      },
      previewImages () {
        return this.images.map(_ => _.url)
      },
      user () {
        return this.album.user
      },
      bangumi () {
        return this.album.bangumi
      }
    },
    head () {
      return {
        title: `${this.bangumi.name} - 相簿 - ${this.album.name}`,
        meta: [
          { hid: 'description', name: 'description', content: this.bangumi.summary },
          { hid: 'keywords', name: 'keywords', content: `${this.bangumi.name}，相簿，${this.album.name}，${this.user.nickname}` }
        ]
      }
    },
    data () {
      return {
        loadingFollowBangumi: false
      }
    },
    methods: {
      async toggleFollowBangumi () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.loadingFollowBangumi) {
          return
        }
        this.loadingFollowBangumi = true
        try {
          const result = await this.$store.dispatch('bangumi/follow', {
            ctx: this,
            id: this.bangumi.id
          })
          this.$store.commit('image/FOLLOW_ALBUM_BANGUMI', { result })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollowBangumi = false
        }
      }
    }
  }
</script>
