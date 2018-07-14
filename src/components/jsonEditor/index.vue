<style lang="scss">
  .json-editor-main {
    height: 100%;

    .editor-tabs {
      width: 315px;
      height: 100%;
      overflow-y: auto;
      float: left;
      margin-right: 10px;
      padding-right: 15px;
    }

    .editor-preview {
      overflow: hidden;
      min-height: 100%;
    }
  }
</style>

<template>
  <div class="json-editor-main">
    <div class="editor-tabs">
      <json-item
        v-for="(item, index) in sections"
        :key="index"
        :item="item"
        :index="index"
        :selected="index === selectedIndex"
        @preview="handleItemPreview"
        @create="handleItemAppend"
        @delete="handleItemDelete"
        @sort="handleItemSort"
      />
    </div>
    <component
      :is="`${curPreview.type}-preview`"
      :item="curPreview"
      class="editor-preview"
    />
  </div>
</template>

<script>
  import JsonItem from './JsonItem'
  import ImgPreview from './preview/ImgPreview'
  import TxtPreview from './preview/TxtPreview'

  export default {
    name: 'JsonEditorMain',
    components: {
      JsonItem,
      ImgPreview,
      TxtPreview
    },
    props: {

    },
    computed: {
      id () {
        return +(this.$route.params.id || 0)
      },
      sections () {
        return this.$store.state.editor.sections
      },
      selectedIndex () {
        return this.$store.state.editor.selectedIndex
      },
      curPreview () {
        return this.sections[this.selectedIndex]
      },
    },
    mounted () {
      this.$channel.$on('write-save', () => {
        const richContent = this.getRichContent();
        if (!richContent.length) {
          this.$toast.info('内容不能为空！');
          return
        }
        this.$emit('submit', {
          content: richContent,
          desc: this.getPureContent(),
          publish: false,
          id: this.id
        })
      });
      this.$channel.$on('write-publish', () => {
        const richContent = this.getRichContent();
        if (!richContent.length) {
          this.$toast.info('内容不能为空！');
          return
        }
        this.$emit('submit', {
          content: richContent,
          desc: this.getPureContent(),
          publish: true,
          id: this.id
        })
      })
    },
    methods: {
      getRichContent () {
        const result = [];
        this.sections.forEach(item => {
          if (item.type === 'img') {
            if (item.url) {
              result.push(item)
            }
          } else if (item.type === 'txt') {
            if (item.text) {
              result.push(item)
            }
          }
        });
        return result;
      },
      getPureContent () {
        let result = '';
        this.sections.forEach(item => {
          if (item.type === 'txt' && item.text) {
            result += item.text.replace(/<br>/g, '\n')
          }
        });
        return result;
      },
      handleItemPreview ({ index }) {
        this.$store.commit('editor/SWITCH_SECTION', { index })
        this.focusTextarea()
      },
      handleItemAppend ({ index, type }) {
        this.$store.commit('editor/APPEND_SECTION', { index, type })
        this.focusTextarea()
      },
      handleItemDelete ({ index }) {
        this.$store.commit('editor/DELETE_SECTION', { index })
      },
      handleItemSort ({ index }) {
        this.$store.commit('editor/SORT_SECTION', { index })
      },
      focusTextarea () {
        this.$nextTick(() => {
          const textarea = this.$el.querySelector('.focus-textarea');
          textarea && textarea.focus()
        })
      }
    }
  }
</script>
