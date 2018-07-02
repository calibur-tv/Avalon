import Vue from 'vue';
import { cdn } from 'env';

Vue.mixin({
  data () {
    return {
      uploadHeaders: {
        token: '',
        key: ''
      },
      uploadConfig: {
        max: 5,
        pathPrefix: '',
        params: null
      },
      imageUploadAction: 'https://upload.qiniup.com',
      imagePrefix: cdn.image
    }
  },
  methods: {
    async getUpToken () {
      try {
        await this.$store.dispatch('getUpToken', this)
        this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
      } catch (e) {
        this.$toast.error(e)
      }
    },
    handleImageUploadError (err, file) {
      console.log(err)
      this.$toast.error(`图片：${file.name} 上传失败`)
    },
    beforeImageUpload (file) {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      const isFormat = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(file.type) !== -1
      const isLt5M = file.size / 1024 / 1024 < this.uploadConfig.max

      if (!isFormat) {
        this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
        return false
      }
      if (!isLt5M) {
        this.$toast.error('图片大小不能超过 5MB!')
        return false
      }

      if (!this.uploadConfig.params && !this.uploadConfig.pathPrefix) {
        this.$toast.error('缺少上传参数!')
        return false
      }

      if (this.uploadConfig.params) {
        this.uploadHeaders.key = this.$utils.createFileName(Object.assign({ file }, this.uploadConfig.params))
        this.uploadConfig.params = null
        return true
      }

      this.uploadHeaders.key = `${this.uploadConfig.pathPrefix}/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
      this.uploadConfig.pathPrefix = ''
      return true
    }
  }
});
