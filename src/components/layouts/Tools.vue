<style lang="scss">
  #side-tools {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 12;

    .to-top-container {
      height: 100%;
      pointer-events: none;
    }

    #to-top-btn {
      background-color: $color-gray-deep;
      width: 60px;
      height: 60px;
      margin-bottom: 5px;
      border-radius: 4px;
      font-size: 30px;
      text-align: center;
      line-height: 60px;
      color: $color-white;
      transition: opacity .5s;
      pointer-events: auto;
      position: absolute;
      left: 100%;
      bottom: 70px;

      &:hover {
        background-color: $color-dark-light;
      }
    }
  }
</style>

<template>
  <div id="side-tools">
    <v-creator>
      <el-tooltip placement="top" effect="dark" content="反馈">
        <button class="creator-btn iconfont icon-fankui" @click="showFeedModal = true"></button>
      </el-tooltip>
      <el-tooltip placement="top" effect="dark" content="发帖">
        <button class="creator-btn iconfont icon-fatie1" @click="handlePostClick"></button>
      </el-tooltip>
    </v-creator>
    <div class="container to-top-container">
      <el-tooltip placement="right" effect="dark" content="返回顶部">
        <transition name="el-fade-in">
          <button v-show="showToTop" id="to-top-btn" class="iconfont icon-fanhuidingbu" @click="$scrollToY(0)"></button>
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
  import vCreator from './Creator.vue'
  import vFeedback from '~/components/creates/Feedback'
  import vPost from '~/components/creates/Post'

  export default {
    name: 'SideTools',
    components: {
      vCreator, vPost, vFeedback
    },
    data () {
      return {
        showToTop: false,
        showPostModal: false,
        showFeedModal: false
      }
    },
    methods: {
      handlePostClick () {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.showPostModal = true
      },
      computeShow () {
        this.showToTop = window.scrollY > window.innerHeight
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
