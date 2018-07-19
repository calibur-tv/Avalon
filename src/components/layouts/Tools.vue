<style lang="scss">
  #side-tools {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 12;

    .creator-button-box {
      height: 100%;
      max-width: 1400px;
      position: relative;
      margin: 0 auto;
      pointer-events: none;
    }

    .tool-btn {
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
      right: 60px;

      &:hover {
        background-color: $color-dark-light;
      }
    }

    .top-btn {
      bottom: 70px;
    }

    .feedback-btn {
      bottom: 135px;
    }

    .creator-btn.icon-tupian {
      background-color: #ec414d;
    }

    .question-btn {
      background-color: #0084ff !important;
    }

    .score-btn {
      background-color: #30A080 !important;

      a {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .creator-btn.icon-fankui {
      background-color: RGB(60, 134, 247);
    }
  }
</style>

<template>
  <div
    v-show="$route.name !== 'homepage'"
    id="side-tools"
  >
    <v-creator
      :offset="2.6"
    >
      <el-tooltip
        placement="top"
        effect="dark"
        content="传图片"
      >
        <button
          class="creator-btn iconfont icon-tupian"
          @click="handleImageClick"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="发帖"
      >
        <button
          class="creator-btn iconfont icon-fankui"
          @click="handlePostClick"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="写漫评"
      >
        <button class="creator-btn score-btn">
          <a
            :href="$alias.createScore"
            target="_blank"
          >
            <i class="iconfont icon-fatie1"/>
          </a>
        </button>
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="提问"
      >
        <button
          class="creator-btn question-btn"
          @click="handlePostClick"
        >
          <i class="el-icon-question"/>
        </button>
      </el-tooltip>
    </v-creator>
    <div class="creator-button-box">
      <el-tooltip
        placement="right"
        effect="dark"
        content="反馈"
      >
        <button
          class="tool-btn feedback-btn"
          @click="showFeedModal = true"
        >
          <i class="el-icon-service"/>
        </button>
      </el-tooltip>
      <el-tooltip
        placement="right"
        effect="dark"
        content="返回"
      >
        <transition name="el-fade-in">
          <button
            v-show="showToTop"
            class="tool-btn top-btn"
            @click="$scrollToY(0)"
          >
            <i class="el-icon-arrow-up"/>
          </button>
        </transition>
      </el-tooltip>
    </div>
    <v-dialog
      v-model="showPostModal"
      :footer="false"
      title="发帖"
    >
      <create-post-form @submit="showPostModal = false"/>
    </v-dialog>
    <v-feedback v-model="showFeedModal"/>
    <v-image/>
  </div>
</template>

<script>
  import vCreator from './Creator.vue'
  import vFeedback from '~/components/creates/Feedback'
  import CreatePostForm from '~/components/post/CreatePostForm'
  import vImage from '~/components/creates/Image'

  export default {
    name: 'SideTools',
    components: {
      vCreator, CreatePostForm, vFeedback, vImage
    },
    data () {
      return {
        showToTop: false,
        showPostModal: false,
        showFeedModal: false
      }
    },
    computed: {
      isGuest () {
        return !this.$store.state.login
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
      handleImageClick () {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.$channel.$emit('open-upload-image-modal')
      },
      computeShow () {
        this.showToTop = window.scrollY > window.innerHeight
      }
    }
  }
</script>
