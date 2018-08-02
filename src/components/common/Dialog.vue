<style lang="scss">
.v-modal {
  background-color: hsla(0, 0%, 100%, 0.7) !important;
}

.v-dialog-mask {
  -webkit-filter: blur(3px) grayscale(25%);
}

.el-dialog {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1) !important;
  border-radius: 6px !important;
  background-color: #fff;
  overflow: hidden;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    position: relative;
    padding: 0;
    color: #333;

    .v-dialog-container {
      overflow: hidden;
    }
  }

  .v-dialog-header {
    position: relative;
    background-color: #f4f4f4;

    .v-dialog-title {
      font-size: 16px;
      height: 45px;
      line-height: 45px;
      margin: 0;
      padding-left: 20px;
      color: #333;
      text-align: left;
      font-weight: 400;
    }
  }

  .v-dialog-close-btn {
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 9px;
    opacity: 0.2;
    height: 24px;
    line-height: 24px;
    color: #000;

    &:hover {
      opacity: 0.5;
    }
  }

  .v-dialog-content {
    padding: 0 20px;
    margin: 20px 0;
    overflow-y: auto;

    .list-loading,
    .list-no-more {
      text-align: center;
      font-size: 13px;
      margin-top: 20px;
      cursor: default;
    }

    img {
      max-width: 100%;
    }
  }

  .v-dialog-footer {
    margin: 20px 0;
    padding: 0 20px;
    text-align: right;

    .v-dialog-cancel-btn {
      background-color: #fff;
      color: $color-text-light;
      height: 32px;
      font-size: 12px;
      border-radius: 3px;
      padding: 0 15px;
      margin-right: 15px;

      &:hover {
        background-color: $color-gray-normal;
        color: $color-text-normal;
      }
    }
  }
}
</style>

<template>
  <no-ssr>
    <el-dialog
      :width="width"
      :custom-class="customClass"
      :append-to-body="true"
      :show-close="false"
      :visible.sync="dialogVisible"
      :before-close="beforeClose"
      :fullscreen="fullscreen"
    >
      <div class="v-dialog-container">
        <div
          v-if="header"
          slot="header"
          class="v-dialog-header"
        >
          <h4
            class="v-dialog-title"
            v-text="title"
          />
        </div>
        <button
          v-if="close"
          class="v-dialog-close-btn"
          @click="cancel"
        >&times;</button>
        <main
          :style="computeDialogHeight"
          class="v-dialog-content"
          @scroll="handleScroll"
        >
          <template v-if="scroll">
            <ul ref="ul">
              <slot/>
            </ul>
            <p
              v-if="loading"
              class="list-loading"
            >加载中...</p>
            <p
              v-else-if="noMore"
              class="list-no-more"
            >没有更多了</p>
          </template>
          <slot v-else/>
        </main>
        <div
          v-if="footer"
          class="v-dialog-footer"
        >
          <slot name="footer">
            <button
              v-if="cancelText"
              class="v-dialog-cancel-btn"
              @click="cancel"
              v-text="cancelText"
            />
            <el-button
              :loading="loading"
              type="primary"
              size="small"
              class="v-dialog-submit-btn"
              @click="submit"
              v-text="submitText"
            />
          </slot>
        </div>
      </div>
    </el-dialog>
  </no-ssr>
</template>

<script>
export default {
  name: "VDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    customClass: {
      type: String,
      default: ""
    },
    close: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "720px"
    },
    height: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    header: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    scroll: {
      type: Function,
      default: null
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.value
    };
  },
  computed: {
    computeDialogHeight() {
      if (this.height) {
        return {
          height: this.height
        };
      }
      if (this.scroll) {
        return {
          height: "600px"
        };
      }
      return {
        height: "auto"
      };
    }
  },
  mounted() {
    this.$watch("value", val => {
      this.dialogVisible = val;
    });
    this.$watch("dialogVisible", val => {
      this.$emit("input", val);
      if (val) {
        document.getElementById("app").classList.add("v-dialog-mask");
      } else {
        document.getElementById("app").classList.remove("v-dialog-mask");
      }
    });
  },
  methods: {
    beforeClose(done) {
      done();
      this.$emit("cancel");
      this.dialogVisible = false;
    },
    cancel() {
      this.$emit("cancel");
      this.dialogVisible = false;
    },
    submit() {
      this.$emit("submit");
    },
    handleScroll(evt) {
      if (!this.scroll || this.loading || this.noMore) {
        return;
      }
      const ul = this.$refs.ul;
      if (!ul) {
        return;
      }
      const main = evt.currentTarget || evt.target;
      if (
        this.$refs.ul.clientHeight - main.clientHeight - main.scrollTop <
        30
      ) {
        this.scroll();
      }
    }
  }
};
</script>
