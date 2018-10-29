<style lang="scss">
$textarea-padding-right: 15px;

.text-preview {
  position: relative;
  z-index: 1;

  .content-wrap {
    position: relative;
    margin-bottom: 46px;
    margin-left: 15px;
    padding-left: 1em;
    color: #646464;
    border-left: 3px solid #d3d3d3;
  }

  .shim,
  textarea {
    width: 100%;
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0;
    padding-left: 15px;
    padding-right: 15px;
    @extend %breakWord;
  }

  .shim {
    height: auto;
    position: relative;
    visibility: hidden;
    white-space: pre-wrap;
    min-height: 300px;
  }

  textarea {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    border: none;
    resize: none;
    color: #333;
  }

  .footer {
    position: absolute;
    width: 100%;
    height: $preview-footer-height;
    line-height: $preview-footer-height;
    padding-right: $textarea-padding-right;
    left: 0;
    bottom: 0;
    text-align: right;
  }
}
</style>

<template>
  <div class="text-preview">
    <div class="content-wrap">
      <pre
        class="shim"
        v-html="item.text"
      />
      <textarea
        v-model="text"
        class="focus-textarea"
        placeholder="添加引用的文本"
        @focus="textAreaFocus"
      />
    </div>
    <!--
    <div class="footer">
      <el-button
        :loading="saving"
        size="small"
        type="primary"
        round
        class="save-btn"
        @click="emitSave"
      >保存</el-button>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: "UsePreview",
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      saving: false
    };
  },
  computed: {
    text: {
      get() {
        return this.item.text.replace(/<br>/g, "\n");
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_TEXT", {
          value: value.replace(/\n/g, "<br>")
        });
      }
    },
    title: {
      get() {
        return this.item.title;
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_TITLE", {
          value
        });
      }
    }
  },
  mounted() {
    this.$channel.$on("write-save-done", () => {
      this.saving = false;
    });
  },
  methods: {
    textAreaFocus() {
      if (this.text.length < 100) {
        document.body.scrollTop = 0;
      }
    },
    emitSave() {
      if (!this.text.replace(/\n/g, "")) {
        return;
      }
      this.$channel.$emit("write-save");
      this.saving = true;
    }
  }
};
</script>
