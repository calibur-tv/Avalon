<style lang="scss">
.post-comment-form {
  margin-top: 40px;

  .el-upload--picture-card,
  .el-upload-list__item {
    width: 72px !important;
    height: 72px !important;
    line-height: 80px !important;
  }

  .el-upload-list,
  .el-upload--picture-card {
    float: left;
  }

  .el-icon-upload-success {
    position: absolute;
    top: 0;
    left: 15px;
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
        :action="imageUploadAction"
        :accept="imageUploadAccept"
        :on-error="handleImageUploadError"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :limit="exceed"
        :before-upload="beforeUpload"
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
import uploadMixin from '~/mixins/upload'

export default {
  name: 'PostCommentForm',
  mixins: [uploadMixin],
  props: {
    id: {
      type: Number,
      required: true
    },
    masterId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      forms: {
        content: ''
      },
      rules: {
        content: [
          {
            required: true,
            min: 1,
            max: 1000,
            message: '内容不能为空，1000字以内',
            trigger: 'submit'
          }
        ]
      },
      images: [],
      exceed: 5
    }
  },
  computed: {
    isGuest() {
      return !this.$store.state.login
    },
    formatImages() {
      return this.images.map(item => item.img)
    },
    submitting() {
      return this.$store.state.comment.submitting
    }
  },
  methods: {
    submit() {
      if (this.isGuest) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.$refs.forms.validate(async valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.$store.commit('comment/SET_SUBMITTING', { result: true })
          try {
            const result = await this.$store.dispatch(
              'comment/createMainComment',
              {
                content: this.forms.content,
                images: this.formatImages,
                type: 'post',
                id: this.id,
                ctx: this
              }
            )
            this.forms = {
              content: ''
            }
            this.images = []
            this.$refs.uploader.clearFiles()
            this.$toast.success(result.message)
            this.$store.commit('UPDATE_USER_EXP', result.exp)
            setTimeout(() => {
              const dom = document.getElementById(`comment-${result.data.id}`)
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
    handleRemove(file) {
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1)
        }
      })
    },
    handleSuccess(res, file) {
      this.images.push({
        id: file.uid,
        img: res.data
      })
    },
    handleExceed() {
      this.$toast.error(`最多可上传 ${this.exceed} 张图片!`)
    },
    beforeUpload(file) {
      if (this.isGuest) {
        this.$channel.$emit('sign-in')
        return
      }

      this.uploadConfig.max = 5
      this.uploadConfig.params = {
        userId: this.$store.state.user.id,
        id: this.id,
        type: 'post'
      }

      return this.beforeImageUpload(file)
    }
  }
}
</script>
