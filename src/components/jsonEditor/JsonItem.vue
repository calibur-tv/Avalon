<style lang="scss">
.json-item {
  margin-bottom: 30px;
  height: 102px;
  width: 100%;
  position: relative;

  &.selected {
    .show-area {
      border-color: $color-blue-normal;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .delete-btn {
    position: absolute;
    left: 62px;
    top: 23px;
  }

  .up-btn {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .show-area {
    background-color: $color-gray-normal;
    border: 1px solid transparent;
    transition-duration: 0.3s;
    margin-bottom: 10px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    .capture {
      float: left;
      width: 76px;
      height: 76px;
      margin-right: 10px;

      .poster {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }

      .default {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 76px;
        font-size: 30px;
        color: #fff;

        &.yellow {
          background-color: gold;
        }

        &.green {
          background-color: #67c23a;
        }
      }
    }

    .content {
      overflow: hidden;
      height: 76px;
      padding-top: 6px;
      padding-bottom: 6px;
      padding-right: 6px;

      .text {
        font-size: 13px;
        line-height: 16px;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        color: $color-text-normal;
        @extend %breakWord;
      }
    }
  }

  .append-area {
    text-align: center;

    button {
      margin: 0 8px;
    }
  }
}
</style>

<template>
  <div
    :class="{ selected }"
    class="json-item"
  >
    <el-button
      v-if="selected && sectionCount > 1"
      type="danger"
      icon="el-icon-delete"
      class="delete-btn"
      size="mini"
      circle
      @click="emitDelete"
    />
    <el-button
      v-if="selected && index"
      class="up-btn"
      icon="el-icon-arrow-up"
      size="mini"
      circle
      @click="emitSort"
    />
    <div
      class="show-area"
      @click="emitPreview"
    >
      <div class="capture">
        <template v-if="item.type === 'img'">
          <div
            v-if="item.url"
            :style="{ backgroundImage: `url(${$resize(item.url, { width: 150 })})` }"
            class="poster"
          />
          <div
            v-if="!item.url"
            class="default green"
          >
            <i class="el-icon-picture-outline"/>
          </div>
        </template>
        <div
          v-else-if="item.type === 'txt'"
          class="default yellow"
        >
          <i class="el-icon-document"/>
        </div>
      </div>
      <div class="content">
        <div
          class="text"
          v-html="item.text"
        />
      </div>
    </div>
    <div class="append-area">
      <el-tooltip
        content="添加文本段落"
        placement="top"
        effect="dark"
      >
        <el-button
          type="warning"
          icon="el-icon-edit"
          circle
          plain
          size="mini"
          @click="emitCreate('txt')"
        />
      </el-tooltip>
      <el-tooltip
        content="添加图片段落"
        placement="top"
        effect="dark"
      >
        <el-button
          type="success"
          icon="el-icon-picture"
          circle
          plain
          size="mini"
          @click="emitCreate('img')"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    sectionCount() {
      return this.$store.state.editor.sections.length;
    }
  },
  methods: {
    emitPreview() {
      this.$emit("preview", { index: this.index });
    },
    emitCreate(type) {
      this.$emit("create", { index: this.index, type });
    },
    emitDelete() {
      this.$emit("delete", { index: this.index });
    },
    emitSort() {
      this.$emit("sort", { index: this.index });
    }
  }
};
</script>
