<style lang="scss">
  #index {
    width: 100%;
    height: 100%;
    z-index: 0;

    .banner {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: $color-black;
      z-index: -1;
      opacity: 0;
      transition: opacity 1s ease-in-out;

      &.show {
        opacity: 1;
      }
    }

    .another {
      display: none;
    }

    .index-panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .slogan {
        background-image: url(data:image/png;base64,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);
        width: 435px;
        height: 65px;
        margin: 0 auto 25px;

        &.invert {
          filter: invert(1);
        }
      }

      $search-size: 40px;
      .search-box {
        height: $search-size;
        margin-bottom: 100px;

        &:hover {
          .search-ctx {
            border: 1px solid $color-white;
            background: rgba(0, 0, 0, 0.3);
          }

          .search-btn {
            color: $color-white;
          }
        }

        .search-ctx {
          width: 550px;
          height: 100%;
          padding: 0 50px 0 10px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(0, 0, 0, 0.15);
          color: #fff;
          line-height: $search-size;
          font-size: 14px;
          @include input-placeholder();
        }

        .search-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: $search-size;
          height: $search-size;
          color: rgba(255, 255, 255, 0.8);
          font-size: 26px;
          font-family: 'iconfont' !important;

          &:before {
            content: '\e761';
          }
        }
      }
    }
  }
</style>

<template>
  <div id="index">
    <div class="banner bg" :class="{'show' : toggle}" :style="{ backgroundImage: banner1 ? `url(${$resize(banner1.url, { width: 1920, mode: 0 })})` : '' }"></div>
    <div class="banner bg" :class="{'show' : !toggle}" :style="{ backgroundImage: banner2 ? `url(${$resize(banner2.url, { width: 1920, mode: 0 })})` : '' }"></div>
    <img class="another"
         crossOrigin="anonymous"
         :src="`${another}?imageMogr2/auto-orient/strip/gravity/Center/crop/435x300`"
         :flag="imageGrayLevel"
         ref="another"
         @load="computedGray"
         alt="another">
    <div class="index-panel">
      <div class="slogan bg" :class="{ 'invert' : imageGrayLevel > 165 }"></div>
      <v-search :placeholder="'搜索二次元的一切'" :auto="true" :suggess="true"></v-search>
    </div>
  </div>
</template>

<script>
  import vSearch from '~/components/views/Search.vue'

  export default {
    name: 'index',
    head: {
      title: '首页'
    },
    components: {
      vSearch
    },
    async asyncData ({ app }) {
      const shuffle = (array) => {
        for (let i = array.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [array[i - 1], array[j]] = [array[j], array[i - 1]]
        }
        return array
      }
      let data = await app.$axios.$get('cartoon/banner')
      data = shuffle(data)
      return {
        banners: data,
        banner1: data[0],
        another: data[0].url
      }
    },
    data () {
      return {
        banners: [],
        banner1: null,
        banner2: null,
        timer: null,
        toggle: true,
        another: '',
        imageGrayLevel: 0,
        index: 0
      }
    },
    beforeMount () {
      this.$channel.$emit('change-page-background', {
        img: '',
        theme: 'mask'
      })
    },
    mounted () {
      this.loopBanner()
    },
    methods: {
      loopBanner () {
        this.timer = setInterval(() => {
          this.index = 1 + this.index === this.banners.length ? 0 : this.index + 1
          const data = this.banners[this.index]
          this.another = data.url
          this.toggle ? this.banner2 = data : this.banner1 = data
          setTimeout(() => {
            this.toggle = !this.toggle
          }, 7500)
        }, 15000)
      },
      computedGray () {
        setTimeout(() => {
          this.imageGrayLevel = this.$imageGrayLevel(this.$refs.another, 100)
        }, 7500)
      }
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
</script>
