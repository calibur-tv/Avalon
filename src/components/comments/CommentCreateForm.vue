<style lang="scss">
.create-comment-form {
  margin-top: 10px;
  margin-bottom: 10px;

  .avatar {
    float: left;
    margin: 7px 32px 0 5px;
  }

  .main-area {
    overflow: hidden;

    .text-wrap {
      overflow: hidden;

      textarea {
        font-size: 12px;
        background-color: #f4f5f7;
        border: 1px solid $color-gray-normal;
        border-radius: 4px;
        color: #555;
        width: 100%;
        min-height: 65px;
        padding: 5px 10px;
        resize: vertical;

        &:hover {
          background-color: #fff;
          border-color: $color-blue-normal;
        }
      }
    }

    .submit-btn {
      float: right;
      width: 70px;
      height: 64px;
      background-color: $color-blue-normal;
      transition: 0.1s;
      text-align: center;
      font-size: 14px;
      border-radius: 4px;
      margin-left: 10px;
      color: #fff;
      font-weight: bold;

      &:hover {
        background-color: $color-blue-light;
      }
    }
  }
}
</style>

<template>
  <div class="create-comment-form">
    <v-img
      :src="userAvatar"
      :avatar="true"
      size="48"
      class="avatar"
    />
    <div class="main-area">
      <button
        class="submit-btn"
        @click="submit"
      >发表<br>评论</button>
      <div class="text-wrap">
        <textarea
          v-model.trim="content"
          placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
          maxlength="1000"
          @focus="handleTextAreaFocus"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateCommentForm",
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    },
    masterId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    isGuest() {
      return !this.$store.state.login;
    },
    submitting() {
      return this.$store.state.comment.submitting;
    },
    userAvatar() {
      return this.isGuest
        ? `${this.$cdn.image}default/user-avatar`
        : this.$store.state.user.avatar;
    }
  },
  methods: {
    async submit() {
      if (this.isGuest) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      if (!this.content) {
        return;
      }
      if (this.submitting) {
        return;
      }
      this.$store.commit("comment/SET_SUBMITTING", { result: true });
      try {
        const result = await this.$store.dispatch("comment/createMainComment", {
          content: this.content,
          images: [],
          type: this.type,
          id: this.id,
          ctx: this
        });
        this.content = "";
        if (this.withImage) {
          this.$refs.uploader.clearFiles();
        }
        this.$toast.success(result.message);
        this.$store.commit("UPDATE_USER_EXP", result.exp);
        if (!window.__closeImageLazy__) {
          setTimeout(() => {
            const dom = document.getElementById(`comment-${result.data.id}`);
            dom && this.$scrollToY(this.$utils.getOffsetTop(dom) - 200, 600);
          }, 400);
        }
        this.$emit("submit");
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.$store.commit("comment/SET_SUBMITTING", { result: false });
      }
    },
    handleTextAreaFocus() {
      if (this.isGuest) {
        this.$channel.$emit("sign-in");
      }
    }
  }
};
</script>
