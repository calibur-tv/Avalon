<style lang="scss" scoped="">

</style>

<template>
    <div class="editor-container">
      <div class="editor-menu-bar">
        <button v-if="menu.title" @click="setTitle">标题一</button>
        <button v-if="menu.bold" @click="setBold">粗体</button>
        <button v-if="menu.italic" @click="setItalic">斜体</button>
        <button v-if="menu.strike" @click="setStrike">中划线</button>
        <button v-if="menu.underline" @click="setUnderline">下划线</button>
        <button v-if="menu.blockquote" @click="addBlockquote">引用</button>
        <button v-if="menu.hr" @click="addHr">分割线</button>
        <button v-if="menu.link" @click="addLink">链接</button>
        <input v-if="menu.image" @change="pickImg" type="file" name="file">
        <button v-if="menu.video" @click="setVideo">视频</button>
        <button v-if="menu.undo" @click="undo">撤销</button>
        <button v-if="menu.redo" @click="redo">重做</button>
      </div>
      <div class="editor-content" ref="editor"></div>
    </div>
</template>

<script>
  const menu = {
    post: {
      title: false,
      bold: false,
      italic: false,
      strike: false,
      underline: false,
      blockquote: true,
      hr: true,
      link: false,
      image: true,
      video: false,
      undo: true,
      redo: true
    }
  }

  export default {
    name: 'editor',
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        required: true,
        type: String
      }
    },
    watch: {
      value (val) {
        this.content = val
      },
      content (val) {
        this.$emit('input', val)
      }
    },
    data () {
      return {
        editor: null,
        initVal: this.value,
        content: this.value,
        menu: Object.assign({}, menu[this.type])
      }
    },
    methods: {
      setTitle () {
        this.editor.exec('insertTitle', 1)
      },
      setBold () {
        this.editor.exec('bold')
      },
      setItalic () {
        this.editor.exec('italic')
      },
      setStrike () {
        this.editor.exec('strikethrough')
      },
      setUnderline () {
        this.editor.exec('underline')
      },
      addBlockquote () {
        this.editor.exec('insertBlockquote')
      },
      addHr () {
        this.editor.exec('insertHRule')
      },
      addLink () {
        this.editor.getCurrentLinkInfo()
        this.editor.exec('insertLink', { url: 'jianshu.com', text: '简书' })
      },
      pickImg (e) {
        const arr = []
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
          arr.push({ file: files[i] })
        }
        this.editor.exec('insertImgs', {
          images: arr
        })
        e.target.value = ''
      },
      setVideo () {
        this.editor.exec('insertVideo', {
          id: '33789',
          url: 'http://player.youku.com/embed/XMjkzNTc1NDE0MA==',
          provider: 'youku',
          flash: 'http://player.youku.com/player.php/sid/XMjkzNTc1NDE0MA==/v.swf',
          width: 400,
          height: 400,
          cover_id: '46c40cb6-aebb-4e6e-a35f-d448cc8ad225',
          description: '你麻痹的 房东偷拍成瘾 50'
        })
      },
      undo () {
        this.editor.exec('undo')
      },
      redo () {
        this.editor.exec('redo')
      },
      getContent (oldVal, newVal) {
        this.content = newVal
      },
      handleImageUpload (opts) {
        const id = opts.id

        setTimeout(() => {
          if (Math.random() > -1) {
            this.editor.imageUploadSuccess({
              id: id,
              data: {
                url: '//upload-images.jianshu.io/upload_images/2607557-21dfac0eb28d185d.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/720/h/720/q/100'
              }
            })
          } else {
            this.editor.imageUploadFail({
              id: id,
              data: {
                msg: '上传失败,请点击确认重试',
                code: 500
              }
            })
          }
        }, 4000)
      },
      handleError (e) {
        console.log(e)
      },
      async uploadInit () {
        await this.$store.dispatch('image/getUpToken', {
          setKey: false
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.editor = new M.Editor(this.$refs.editor, {
          defaultTheme: false,
          content: this.initVal,
          contentChangeDelay: 400
        })

        this.editor.on('imageUpload', this.handleImageUpload)
        this.editor.on('ERROR', this.handleError)
        this.editor.on(M.Editor.Events.HTML_CONTENT_CHANGE, this.getContent)
      })
    }
  }
</script>
