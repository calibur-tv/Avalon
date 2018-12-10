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
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 50%;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    color: $color-white;
    transition: opacity 0.5s;
    pointer-events: auto;
    position: absolute;
    right: 60px;
    background-color: RGB(229, 229, 229);

    &:hover {
      background-color: #b5b5b5;
    }
  }

  .top-btn {
    bottom: 60px;
  }

  .feedback-btn {
    bottom: 135px;
  }

  .creator-btn.el-icon-picture-outline {
    background-color: #ec414d;
  }

  .creator-btn.el-icon-printer {
    background-color: #0084ff;
  }

  .score-btn {
    background-color: #30a080 !important;

    a {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .creator-btn.el-icon-edit {
    background-color: RGB(60, 134, 247);
  }
}
</style>

<template>
  <div
    v-show="show"
    id="side-tools"
  >
    <v-creator>
      <el-tooltip
        placement="left"
        effect="dark"
        content="传图片"
      >
        <button
          class="creator-btn el-icon-picture-outline"
          @click="handleImageClick"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="发帖"
      >
        <button
          class="creator-btn el-icon-edit"
          @click="handlePostClick"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="写漫评"
      >
        <button
          v-if="userLevel > 2"
          class="creator-btn score-btn"
        >
          <a
            :href="$alias.createScore"
            target="_blank"
          >
            <i class="iconfont el-icon-edit-outline"/>
          </a>
        </button>
        <button
          v-else
          class="creator-btn el-icon-edit-outline"
          @click="handleScoreClick"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="提问"
      >
        <button
          class="creator-btn el-icon-printer"
          @click="handleQuestionClick"
        />
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
          @click="handleFeedbackClick"
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
    <template v-if="!isGuest">
      <create-post-dialog/>
      <create-question-dialog/>
      <create-image-dialog/>
    </template>
    <v-feedback/>
  </div>
</template>

<script>
import vCreator from './Creator.vue'
import vFeedback from '~/components/user/Feedback'
import CreatePostDialog from '~/components/post/CreatePostDialog'
import CreateImageDialog from '~/components/image/CreateImageDialog'
import CreateQuestionDialog from '~/components/question/CreateQuestionDialog'

export default {
  name: 'SideTools',
  components: {
    vCreator,
    vFeedback,
    CreatePostDialog,
    CreateImageDialog,
    CreateQuestionDialog
  },
  data() {
    return {
      showToTop: false
    }
  },
  computed: {
    isGuest() {
      return !this.$store.state.login
    },
    show() {
      return ['homepage', 'invite-user'].indexOf(this.$route.name) === -1
    },
    userLevel() {
      if (this.isGuest) {
        return 0
      }
      return this.$store.state.user.exp.level
    }
  },
  mounted() {
    this.computeShow()
    document.addEventListener(
      'scroll',
      this.$utils.throttle(() => {
        this.computeShow()
      }, 500)
    )
    window.addEventListener(
      'resize',
      this.$utils.throttle(() => {
        this.computeShow()
      }, 500)
    )
  },
  methods: {
    handlePostClick() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.$channel.$emit('show-create-post-modal')
    },
    handleQuestionClick() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      if (this.userLevel < 3) {
        this.$toast.info('3级以后才能提问')
        return
      }
      this.$channel.$emit('show-create-question-modal')
    },
    handleScoreClick() {
      window.location = this.$alias.createScore
    },
    handleImageClick() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.$channel.$emit('show-upload-image-modal')
    },
    handleFeedbackClick() {
      this.$channel.$emit('open-feedback', {
        type: '',
        desc: '{?}',
        placeholder: '非常感谢您的反馈，请填写详细信息方便我们解决'
      })
    },
    computeShow() {
      this.showToTop = window.scrollY > window.innerHeight
    }
  }
}
</script>
