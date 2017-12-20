<style lang="scss">
  .create-post-modal {
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
  <v-modal class="create-post-modal" v-model="showModal" :footer="false" header-text="新建帖子">
    <el-form :model="forms" :rules="rules" ref="forms" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请填写标题" v-model="forms.title"></el-input>
      </el-form-item>
      <el-form-item label="番剧" prop="bangumi_id">
        <el-select v-model="forms.bangumi_id" placeholder="请选择活动区域">
          <el-option v-for="item in $store.getters['users/bangumis']"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload action="http://up.qiniu.com"
                   multiple
                   list-type="picture-card"
                   ref="uploader"
                   :data="uploadHeaders"
                   :on-preview="handlePreview"
                   :on-error="handleError"
                   :on-remove="handleRemove"
                   :on-success="handleSuccess"
                   :on-exceed="handleExceed"
                   :limit="3"
                   :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" resize="none" :rows="10" v-model="forms.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </v-modal>
</template>

<script>
  import Api from '~/api/postApi'

  export default {
    name: 'create-post',
    data () {
      return {
        showModal: false,
        forms: {
          title: '',
          bangumi_id: this.$route.name === 'bangumi-show' && this.$store.state.bangumi.list[this.$route.params.id].followed ? parseInt(this.$route.params.id, 10) : undefined,
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入帖子标题', trigger: 'blur' },
            { max: 20, message: '请缩减至20字以内！', trigger: 'blur' }
          ],
          bangumi_id: [
            { type: 'number', required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          content: [
            { max: 1000, message: '内容不能超过1000字', trigger: 'blur' }
          ]
        },
        uploadHeaders: {
          token: ''
        },
        images: []
      }
    },
    watch: {
      showModal (val) {
        if (val) {
          this.getUserFollowedBangumis()
        }
      }
    },
    computed: {
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
        const images = this.images
        const res = []
        images.forEach(item => {
          res.push(item.url)
        })
        return res
      }
    },
    methods: {
      submit () {
        this.$refs.forms.validate((valid) => {
          if (valid) {
            this.$captcha(({ data }) => {
              const api = new Api(this)
              api.create({
                title: this.forms.title,
                bangumi_id: this.forms.bangumi_id,
                content: this.formatContent,
                images: this.formatImages,
                geetest: data
              }).then((id) => {

              }).catch((err) => {
                err.message.forEach(tip => {
                  this.$toast.error(tip)
                })
              })
            })
          } else {
            return false
          }
        })
      },
      getUserFollowedBangumis () {
        this.$store.dispatch('users/getFollowBangumis', {
          zone: this.$store.state.user.zone
        })
      },
      handlePreview (file) {
        window.open(`${this.$cdn.image}${file.response.key}`)
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
          url: res.key
        })
      },
      handleExceed () {
        this.$toast.error('最多可上传 3 张图片!')
      },
      beforeUpload (file) {
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

        this.uploadHeaders.key = `user/${this.$store.state.user.id}/post/${new Date().getTime()}-${file.name}`
        return true
      },
      async getUpToken () {
        await this.$store.dispatch('image/getUpToken', {
          setKey: false
        })
        this.uploadHeaders.token = this.$store.state.image.upToken.token
      }
    },
    mounted () {
      this.$channel.$on('show-create-post-modal', () => {
        if (this.$store.state.login) {
          this.showModal = true
          this.getUpToken()
        } else {
          this.$channel.$emit('sign-in')
        }
      })
    }
  }
</script>
