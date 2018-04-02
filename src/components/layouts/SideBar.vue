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
      <el-tooltip placement="left" effect="dark" content="发帖">
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
    <v-modal
      v-model="showPostModal"
      class="create-post-modal"
      header-text="发帖"
      :footer="false"
    >
      <v-post @submit="showPostModal = false"></v-post>
    </v-modal>
    <v-feedback v-model="showFeedModal"></v-feedback>
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
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.showPostModal = true
      }
    },
    mounted () {
      this.computeShow()
      document.addEventListener('scroll', this.$utils.throttle(() => {
        this.computeShow()
      }, 500))
      window.addEventListener('resize', this.$utils.throttle(() => {
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
