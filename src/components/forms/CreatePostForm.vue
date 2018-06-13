<style lang="scss">
  .create-post-form {
    .el-upload--picture-card, .el-upload-list__item {
      width: 72px !important;
      height: 72px !important;
      line-height: 80px !important;
    }

    .el-upload-list,
    .el-upload--picture-card {
      float: left;
    }
  }
</style>

<template>
  <el-form
    class="create-post-form"
    :model="forms"
    :rules="rules"
    ref="forms"
    label-width="50px"
  >
    <template v-if="!isReply">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请填写标题" v-model.trim="forms.title"></el-input>
      </el-form-item>
      <el-form-item label="番剧" prop="bangumiId">
        <el-select v-model="forms.bangumiId" filterable placeholder="请选择番剧">
          <el-option
            v-for="item in optionBangumis"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="图片">
      <el-upload
        action="https://upload.qiniup.com"
        multiple
        list-type="picture-card"
        ref="uploader"
        :data="uploadHeaders"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :limit="exceed"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        type="textarea"
        placeholder="1000字以内"
        resize="none"
        :rows="10"
        v-model.trim="forms.content"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" :loading="submitting">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'create-post-form',
    props: {
      isReply: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      isGuest () {
        return !this.$store.state.login
      },
      postId () {
        return this.$route.name === 'post-show' ? parseInt(this.$route.params.id, 10) : 0
      },
      bangumiId () {
        return this.$route.name === 'bangumi-show' ? parseInt(this.$route.params.id, 10) : 0
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
      bangumis () {
        return this.$store.state.users.self.followBangumi
      },
      optionBangumis () {
        return this.appendBangumi.concat(this.bangumis)
      },
      submitting () {
        return this.$store.state.comment.submitting
      }
    },
    data () {
      return {
        forms: {
          title: '',
          bangumiId: this.bangumiId || '',
          content: ''
        },
        rules: {
          title: [
            { required: true, min: 1, max: 40, message: '标题不能为空，40字以内', trigger: 'blur' }
          ],
          bangumiId: [
            { required: true, type: 'number', message: '请选择相应番剧', trigger: 'change' }
          ],
          content: [
            { required: true, min: 1, max: 1000, message: '内容不能为空，1000字以内', trigger: 'blur' }
          ]
        },
        uploadHeaders: {
          token: ''
        },
        images: [],
        exceed: 5,
        appendBangumi: [],
        loadingFetchBangumi: false
      }
    },
    methods: {
      submit () {
        if (this.isGuest) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.$refs.forms.validate((valid) => {
          if (valid) {
            this.$emit('submit', {
              title: this.forms.title,
              bangumiId: this.forms.bangumiId,
              desc: this.forms.content.substring(0, 120),
              content: this.formatContent,
              images: this.formatImages
            })
            this.$channel.$on('main-comment-create-success', () => {
              this.$channel.$off('main-comment-create-success')
              this.forms = {
                title: '',
                bangumiId: this.bangumiId || '',
                content: ''
              }
              this.$refs.uploader.clearFiles()
            })
          } else {
            return false
          }
        })
      },
      async getUserFollowedBangumis () {
        if (this.isReply) {
          return
        }
        if (this.bangumis.length) {
          return
        }
        if (this.loadingFetchBangumi) {
          return
        }
        this.loadingFetchBangumi = true
        try {
          await this.$store.dispatch('users/getFollowBangumis', {
            zone: this.$store.state.user.zone,
            self: true
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFetchBangumi = false
        }
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

        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt2M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }

        this.uploadHeaders.key = this.$utils.createFileName({
          userId: this.$store.state.user.id,
          type: 'post',
          id: this.postId,
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
    },
    mounted () {
      if (!this.isGuest) {
        this.getUpToken()
        this.getUserFollowedBangumis()
      }
    }
  }
</script>
