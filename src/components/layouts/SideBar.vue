<style lang="scss">
  #side-bar-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    pointer-events: none;
    background-color: transparent;

    $item-size: 50px;
    #side-bar {
      position: absolute;
      bottom: 80px;
      right: -$item-size;
      background-color: transparent;
      width: $item-size;
      pointer-events: all;

      .item {
        background-color: $color-gray-deep;
        width: $item-size;
        height: $item-size;
        margin-bottom: 5px;
        border-radius: 4px;
        font-size: 30px;
        text-align: center;
        line-height: 50px;
        color: $color-white;
        cursor: pointer;
        font-family: 'iconfont' !important;
        transition: opacity .5s;

        &:hover {
          background-color: $color-dark-light;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    @media (max-width: 1150px) {
      #side-bar {
        right: $item-size;
      }
    }

    .v-modal {
      min-width: 720px;
    }
  }
</style>

<template>
  <div id="side-bar-container" class="container">
    <div id="side-bar" v-show="$route.name !== 'homepage'">
      <el-tooltip placement="left" effect="dark" :content="inPostShow ? '回复' : '发帖'">
        <div class="item icon-fatie1" @click="handlePostClick"></div>
      </el-tooltip>
      <el-tooltip placement="left" effect="dark" content="反馈">
        <div class="item icon-fankui" @click="showFeedModal = true"></div>
      </el-tooltip>
      <el-tooltip placement="left" effect="dark" content="返回顶部">
        <transition name="el-fade-in">
          <div v-show="showToTop" class="item icon-fanhuidingbu" @click="$scrollToY(0)"></div>
        </transition>
      </el-tooltip>
    </div>
    <v-modal class="create-post-modal"
             v-model="showPostModal"
             :footer="false"
             :header-text="inPostShow ? '回复' : '发帖'">
      <v-post :post-id="postId" :bangumi-id="bangumiId" @submit="showPostModal = false"></v-post>
    </v-modal>
    <v-modal v-model="showFeedModal" :footer="false" header-text="用户反馈">
      <v-feedback @submit="showFeedModal = false"></v-feedback>
    </v-modal>
  </div>
</template>

<script>
  import vFeedback from '~/components/creates/Feedback'
  import vPost from '~/components/creates/Post'

  export default {
    name: 'v-side-bar',
    components: {
      vPost, vFeedback
    },
    data () {
      return {
        showToTop: false,
        showPostModal: false,
        showFeedModal: false
      }
    },
    methods: {
      computeShow () {
        this.showToTop = window.scrollY > window.innerHeight
      },
      handlePostClick () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        this.inPostShow
          ? this.$channel.$emit('side-bar-click-post')
          : this.showPostModal = true
      }
    },
    computed: {
      inPostShow () {
        return this.$route.name === 'post-show'
      },
      inBangumiShow () {
        return this.$route.name === 'bangumi-show'
      },
      postId () {
        return this.inPostShow ? parseInt(this.$route.params.id, 10) : 0
      },
      bangumiId () {
        return this.inBangumiShow ? parseInt(this.$route.params.id, 10) : 0
      }
    },
    mounted () {
      this.computeShow()
      document.addEventListener('scroll', this.$throttle(() => {
        this.computeShow()
      }, 500))
      window.addEventListener('resize', this.$throttle(() => {
        this.computeShow()
      }, 500))
      this.$channel.$on('show-create-post-modal', () => {
        this.$store.state.login
          ? this.showPostModal = true
          : this.$channel.$emit('sign-in')
      })
    }
  }
</script>
