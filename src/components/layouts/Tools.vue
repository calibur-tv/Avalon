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

  .creator-btn.icon-tupian {
    background-color: #ec414d;
  }

  .question-btn {
    background-color: #0084ff !important;
  }

  .score-btn {
    background-color: #30a080 !important;

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
    v-show="show"
    id="side-tools"
  >
    <v-creator>
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
        <button
          v-if="userLevel > 2"
          class="creator-btn score-btn"
        >
          <a
            :href="$alias.createScore"
            target="_blank"
          >
            <i class="iconfont icon-fatie1"/>
          </a>
        </button>
        <button
          v-else
          class="creator-btn score-btn"
          @click="handleScoreClick"
        >
          <i class="iconfont icon-fatie1"/>
        </button>
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="提问"
      >
        <button
          class="creator-btn question-btn"
          @click="handleQuestionClick"
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
      <v-dialog
        v-model="showPostModal"
        :click-close="false"
        :footer="false"
        title="发帖"
      >
        <create-post-form @submit="showPostModal = false"/>
      </v-dialog>
      <v-dialog
        v-model="showQuestionModal"
        :footer="false"
        :click-close="false"
        title="写下你的问题"
      >
        <create-question-form @submit="showQuestionModal = false"/>
      </v-dialog>
      <create-image-panel/>
    </template>
    <v-feedback/>
  </div>
</template>

<script>
import vCreator from "./Creator.vue";
import vFeedback from "~/components/user/Feedback";
import CreatePostForm from "~/components/post/CreatePostForm";
import CreateImagePanel from "~/components/image/CreateImagePanel";
import CreateQuestionForm from "~/components/question/CreateQuestionForm";

export default {
  name: "SideTools",
  components: {
    vCreator,
    vFeedback,
    CreatePostForm,
    CreateImagePanel,
    CreateQuestionForm
  },
  data() {
    return {
      showToTop: false,
      showPostModal: false,
      showQuestionModal: false
    };
  },
  computed: {
    isGuest() {
      return !this.$store.state.login;
    },
    show() {
      return ["homepage", "invite-user"].indexOf(this.$route.name) === -1;
    },
    userLevel() {
      if (this.isGuest) {
        return 0;
      } else {
        return this.$store.state.user.exp.level;
      }
    }
  },
  mounted() {
    this.computeShow();
    document.addEventListener(
      "scroll",
      this.$utils.throttle(() => {
        this.computeShow();
      }, 500)
    );
    window.addEventListener(
      "resize",
      this.$utils.throttle(() => {
        this.computeShow();
      }, 500)
    );
    this.$channel.$on("show-create-post-modal", () => {
      this.$store.state.login
        ? (this.showPostModal = true)
        : this.$channel.$emit("sign-in");
    });
    this.$channel.$on("show-create-question-modal", () => {
      this.$store.state.login
        ? (this.showQuestionModal = true)
        : this.$channel.$emit("sign-in");
    });
  },
  methods: {
    handlePostClick() {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      this.showPostModal = true;
    },
    handleQuestionClick() {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      if (this.userLevel < 3) {
        this.$toast.info("3级以后才能提问");
        return;
      }
      this.showQuestionModal = true;
    },
    handleScoreClick() {
      if (this.userLevel < 3) {
        this.$toast.info("3级以后才能写漫评");
        return;
      }
      window.location = this.$alias.createScore;
    },
    handleImageClick() {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      this.$channel.$emit("show-upload-image-modal");
    },
    handleFeedbackClick() {
      this.$channel.$emit("open-feedback", {
        type: "",
        desc: "{?}",
        placeholder: "非常感谢您的反馈，请填写详细信息方便我们解决"
      });
    },
    computeShow() {
      this.showToTop = window.scrollY > window.innerHeight;
    }
  }
};
</script>
