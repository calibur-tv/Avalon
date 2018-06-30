<style lang="scss">
  .post-comment-form {
    margin-top: 40px;

    .el-upload--picture-card, .el-upload-list__item {
      width: 72px !important;
      height: 72px !important;
      line-height: 80px !important;
    }

    .el-upload-list,
    .el-upload--picture-card {
      float: left;
    }

    .submit-btn {
      width: 100%;
    }
  }
</style>

<template>
  <el-form
    ref="forms"
    :model="forms"
    :rules="rules"
    class="post-comment-form"
  >
    <el-form-item prop="content">
      <el-input
        v-model.trim="forms.content"
        :rows="3"
        type="textarea"
        placeholder="1000字以内"
        resize="vertical"
      />
    </el-form-item>
    <el-form-item>
      <el-upload
        ref="uploader"
        :data="uploadHeaders"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :limit="exceed"
        :before-upload="beforeUpload"
        action="https://upload.qiniup.com"
        multiple
        list-type="picture-card"
      >
        <i class="el-icon-plus"/>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        class="submit-btn"
        @click="submit"
      >发表评论</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'PostCommentForm',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        forms: {
          content: ''
        },
        rules: {
          content: [
            { required: true, min: 1, max: 1000, message: '内容不能为空，1000字以内', trigger: 'submit' }
          ]
        },
        uploadHeaders: {
          token: ''
        },
        images: [],
        exceed: 5
      }
    },
    computed: {
      isGuest () {
        return !this.$store.state.login
      },
      formatContent () {
        let content = this.forms.content
        while (content.match('\n\n\n') !== null) {
          content = content.replace(/\n\n\n/g, '\n\n')
        }
        content = content.split('\n')

        const res = []
        content.forEach(item => {
          res.push(item ? `<p>${item}</p>` : '<p><br/></p>')
        })

        return res.join('')
      },
      formatImages () {
        return this.images.map(item => item.img)
      },
      submitting () {
        return this.$store.state.comment.submitting
      }
    },
    mounted () {
      if (!this.isGuest) {
        this.getUpToken()
      }
    },
    methods: {
      submit () {
        if (this.isGuest) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.$refs.forms.validate(async (valid) => {
          if (valid) {
            if (this.submitting) {
              return
            }
            this.$store.commit('comment/SET_SUBMITTING', { result: true })
            try {
              const newComment = await this.$store.dispatch('comment/createMainComment', {
                content: this.formatContent,
                images: this.formatImages,
                type: 'post',
                id: this.id,
                ctx: this
              })
              this.forms = {
                content: ''
              }
              this.images = []
              this.$refs.uploader.clearFiles()
              this.$toast.success('评论成功')
              setTimeout(() => {
                const dom = document.getElementById(`comment-${newComment.id}`)
                dom && this.$scrollToY(this.$utils.getOffsetTop(dom) - 200, 600)
              }, 400)
            } catch (e) {
              this.$toast.error(e)
            } finally {
              this.$store.commit('comment/SET_SUBMITTING', { result: false })
            }
          } else {
            return false
          }
        })
      },
      handleError (err, file) {
        console.log(err)
        this.$toast.error(`图片：${file.name} 上传失败`)
      },
      handleRemove (file) {
        this.images.forEach((item, index) => {
          if (item.id === file.uid) {
            this.images.splice(index, 1)
          }
        })
      },
      handleSuccess (res, file) {
        this.images.push({
          id: file.uid,
          img: res.data
        })
      },
      handleExceed () {
        this.$toast.error(`最多可上传 ${this.exceed} 张图片!`)
      },
      beforeUpload (file) {
        if (this.isGuest) {
          this.$channel.$emit('sign-in')
          return
        }

        const isFormat = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(file.type) !== -1
        const isLt2M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
          return false
        }
        if (!isLt2M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }

        this.uploadHeaders.key = this.$utils.createFileName({
          userId: this.$store.state.user.id,
          id: this.postId,
          type: 'post',
          file
        })

        return true
      },
      async getUpToken () {
        try {
          await this.$store.dispatch('getUpToken', this)
          this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>
