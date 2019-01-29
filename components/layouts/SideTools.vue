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
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    border-radius: 50%;
    text-align: center;
    transition: opacity 0.5s;
    pointer-events: auto;
    position: absolute;
    right: 60px;
    background-color: RGB(225, 226, 229);
    color: RGB(152, 155, 162);
    font-size: 20px;

    &:hover {
      background-color: RGB(205, 206, 207);
      color: RGB(255, 255, 255);
    }
  }

  .top-btn,
  .coin-intro-btn {
    bottom: 110px;
  }

  .feedback-btn {
    bottom: 175px;
  }

  .mint-main-button {
    background-color: #f56c6c;
    color: #fff;

    &:hover {
      background-color: #f56c6c;
    }
  }

  .feedback-btn {
    background-color: #9266f9;
    color: #fff;

    &:hover {
      background-color: #9266f9;
    }
  }

  .top-btn,
  .coin-intro-btn {
    background-color: #16c2c2;
    color: #fff;

    &:hover {
      background-color: #16c2c2;
    }
  }

  .creator-btn.el-icon-picture-outline {
    background-color: #ec414d;
  }

  .creator-btn.el-icon-printer {
    background-color: #0084ff;
  }

  .creator-btn.el-icon-edit-outline {
    background-color: #30a080;
  }

  .creator-btn.el-icon-edit {
    background-color: RGB(60, 134, 247);
  }
}

.intro-coin-dialog {
  .intro-slide {
    width: 100%;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    float: left;

    .bg {
      background-color: #f7f9fa;
      width: 110%;
      height: 110%;
      position: absolute;
      left: -5%;
      top: -5%;
      transition: background-image 0.2s ease;
      background: linear-gradient(223deg, #9ce8dd, #a993da, #f0cb54, #6d93a3);
      background-size: 600% 600%;
      animation: bg-generator 50s ease infinite;
    }

    @include keyframes(bg-generator) {
      0% {
        background-position: 0 84%;
      }
      50% {
        background-position: 100% 17%;
      }
      100% {
        background-position: 0 84%;
      }
    }
  }

  .intro-content {
    margin-top: 40px;

    p {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 15px;
      margin-top: 15px;
    }

    ul {
      margin-bottom: 15px;
    }

    li {
      list-style-type: circle;
      margin-left: 1.4em;
      line-height: 22px;
    }
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
      <transition name="el-fade-in">
        <el-tooltip
          v-if="showToTop"
          placement="right"
          effect="dark"
          content="返回"
        >
          <button
            class="tool-btn top-btn"
            @click="$scrollToY(0)"
          >
            <i class="el-icon-arrow-up"/>
          </button>
        </el-tooltip>
        <el-tooltip
          v-else
          placement="right"
          effect="dark"
          content="团子"
        >
          <button
            class="tool-btn coin-intro-btn"
            @click="showCoinDialog = true"
          >
            <i class="iconfont icon-fantuan"/>
          </button>
        </el-tooltip>
      </transition>
    </div>
    <template v-if="!isGuest">
      <create-question-dialog/>
      <create-image-dialog/>
    </template>
    <v-feedback/>
    <v-dialog
      v-model="showCoinDialog"
      :header="false"
      :footer="false"
      :close="false"
      width="450px"
      title="什么是团子和光玉？"
      class="intro-coin-dialog"
    >
      <div class="intro-slide">
        <div class="bg"/>
      </div>
      <div class="intro-content">
        <p>什么是团子？</p>
        <ul>
          <li>团子是 calibur 站内的一种虚拟币</li>
          <li>1团子 = 1人民币</li>
          <li>大家可通过每日签到、邀请注册、站内活跃来获得团子</li>
          <li>团子是无法提现的，现阶段团子可以用来：</li>
          <li>—— 观看最新一集的新番</li>
          <li>—— 为自己喜欢的偶像应援</li>
          <li>—— 给其他人发表的原创内容投食</li>
          <li>未来会开发出电商系统，到时候团子可以用来购买商品</li>
        </ul>
        <p>什么是光玉？</p>
        <ul>
          <li>光玉就是可提现的团子</li>
          <li>1光玉 = 1人民币</li>
          <li>目前获得光玉的途径只能是获得其他人的投食</li>
          <li>只有原创内容才能给开启投食功能</li>
          <li>如果你集齐了100个光玉，就来召唤站长提现吧！</li>
        </ul>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import vCreator from './Creator.vue'
import vFeedback from '~/components/user/Feedback'
import CreateImageDialog from '~/components/image/CreateImageDialog'
import CreateQuestionDialog from '~/components/question/CreateQuestionDialog'

export default {
  name: 'SideTools',
  components: {
    vCreator,
    vFeedback,
    CreateImageDialog,
    CreateQuestionDialog
  },
  data() {
    return {
      showToTop: false,
      showCoinDialog: false
    }
  },
  computed: {
    isGuest() {
      return !this.$store.state.login
    },
    show() {
      return (
        ['index', 'about-invite-id', 'app-download'].indexOf(
          this.$route.name
        ) === -1
      )
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
      window.location = '/post/create'
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
      if (this.userLevel < 3) {
        this.$toast.info('3级以后才能写漫评')
        return
      }
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
