import { cdn } from 'env'

export default {
  data() {
    return {
      uploadHeaders: {
        token: ''
      },
      uploadConfig: {
        max: 5,
        pathPrefix: '',
        params: null
      },
      imageUploadAccept: [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif'
      ].toString(),
      imageUploadAction: 'https://upload.qiniup.com',
      imagePrefix: cdn.image
    }
  },
  methods: {
    async getUpToken() {
      if (!this.$store.state.login) {
        return
      }
      try {
        await this.$store.dispatch('getUpToken', this)
        this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
      } catch (e) {
        this.$toast.error(e)
      }
    },
    handleImageUploadError(err, file) {
      this.$toast.error(`图片：${file.name} 上传失败`)
    },
    beforeImageUpload(file) {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return false
      }

      const isFormat =
        this.imageUploadAccept.split(',').indexOf(file.type) !== -1
      const isLt5M = file.size / 1024 / 1024 < this.uploadConfig.max

      if (!isFormat) {
        this.$toast.error('仅支持jpg, jpeg, png, gif格式的图片')
        return false
      }
      if (!isLt5M) {
        this.$toast.error(`图片大小不能超过 ${this.uploadConfig.max}MB!`)
        return false
      }

      this.uploadHeaders.key = this.$utils.createFileName({
        userId: this.$store.state.user.id,
        type: this.$route.path,
        file
      })

      return true
    }
  }
}
