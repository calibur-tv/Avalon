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
    label-width="80px"
  >
    <template v-if="!postId || !isReply">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请填写标题" v-model.trim="forms.title"></el-input>
      </el-form-item>
      <el-form-item label="番剧" prop="bangumiId">
        <el-select v-model="forms.bangumiId" placeholder="请选择番剧">
          <el-option
            v-for="item in bangumis"
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
        placeholder="500字以内"
        resize="none"
        :rows="10"
        v-model.trim="forms.content"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'create-post-form',
    props: {
      isReply: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        forms: {
          title: '',
          bangumiId: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入帖子标题', trigger: 'blur' },
            { max: 40, message: '请缩减至40字以内！', trigger: 'blur' }
          ],
          bangumiId: [
            { type: 'number', required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          content: [
            { required: true, max: 500, message: '内容不能为空，且不超过500字', trigger: 'blur' }
          ]
        },
        uploadHeaders: {
          token: ''
        },
        images: [],
        exceed: 6
      }
    },
    computed: {
      postId () {
        return this.$route.name === 'post-show' ? parseInt(this.$route.params.id, 10) : 0
      },
      bangumiId () {
        return this.$route.name === 'bangumi-show' ? parseInt(this.$route.params.id, 10) : 0
      },
      formatContent () {
        let content = this.forms.content
        while (content.match('\n\n') !== null) {
          content = content.replace('\n\n', '\n')
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
      }
    },
    methods: {
      submit () {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.$refs.forms.validate((valid) => {
          if (valid) {
            this.$captcha(async ({ data }) => {
              if (this.postId && this.isReply) {
                try {
                  await this.$store.dispatch('post/reply', {
                    postId: this.postId - 0,
                    content: this.formatContent,
                    images: this.formatImages,
                    geetest: data,
                    ctx: this
                  })
                  this.images = []
                  this.$refs.forms.resetFields()
                  this.$refs.uploader.clearFiles()
                  this.$toast.success('回复成功！')
                } catch (err) {
                  this.$toast.error(err)
                }
              } else {
                try {
                  const id = await this.$store.dispatch('post/create', {
                    title: this.forms.title,
                    bangumiId: this.forms.bangumiId,
                    desc: this.forms.content.substring(0, 120),
                    content: this.formatContent,
                    images: this.formatImages,
                    geetest: data,
                    ctx: this
                  })
                  this.images = []
                  this.$refs.forms.resetFields()
                  this.$emit('submit')
                  this.$toast.success('发布成功！')
                  window.location = this.$alias.post(id)
                } catch (err) {
                  this.$toast.error(err)
                }
              }
            })
          } else {
            return false
          }
        })
      },
      async getUserFollowedBangumis () {
        const bangumis = await this.$store.dispatch('users/getFollowBangumis', {
          zone: this.$store.state.user.zone,
          self: true
        })
        bangumis.forEach(item => {
          if (item.id === this.bangumiId) {
            this.forms.bangumiId = this.bangumiId
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
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$toast.error('图片大小不能超过 2MB!')
          return false
        }

        this.uploadHeaders.key = this.postId
          ? `user/${this.$store.state.user.id}/post/${this.postId}/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
          : `user/${this.$store.state.user.id}/post/0/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
        return true
      },
      async getUpToken () {
        await this.$store.dispatch('getUpToken', this)
        this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
      }
    },
    mounted () {
      if (!this.postId || !this.isReply) {
        this.getUserFollowedBangumis()
      }
      if (this.$store.state.login) {
        this.getUpToken()
      }
    }
  }
</script>
