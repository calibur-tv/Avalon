<template>
  <div class="capture-button">
    <el-button type="test" size="small"
               :icon="icon"
               @click="shoot"
               :loading="loading"
               v-text="label || '截图来一帖'"></el-button>
    <v-modal
      v-model="visible"
      class="create-post-modal"
      header-text="发帖"
      :footer="false"
      :loading="loading"
    >
      <v-post @submit="visible = false" :file-list.sync="fileList"></v-post>
    </v-modal>
  </div>
</template>

<script>
import vPost from '~/components/creates/Post'
import ImageApi from '~/api/imageApi'

export default {
  name: 'captureButton',
  props: ['label', 'icon', 'target'],
  components: {
    vPost
  },
  data() {
    return {
      loading: false,
      fileList: [],
      visible: false
    }
  },
  methods: {
    async shoot() {
      try {
        this.loading = true
        var video = this.target
        this.$emit('pause')
        let snapshot = this.capture(video)
        snapshot.toBlob(async blob => {
          let formData = new FormData()
          let key = `user/${this.$store.state.user.id}/post/0/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.jpg`
          formData.append('key', key)
          formData.append('token', this.$store.state.user.uptoken.upToken)
          formData.append('file', blob, key)
          var api = new ImageApi()
          let data = await api.uploadToQiniu2(formData)
          this.fileList.push({
            ...data,
            name: data.key,
            url: `https://image.calibur.tv/${data.key}`
          })
          this.visible = true
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },
    capture(video, scaleFactor) {
      if (scaleFactor == null) {
        scaleFactor = 1
      }
      var w = video.videoWidth * scaleFactor
      var h = video.videoHeight * scaleFactor
      var canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      var ctx = canvas.getContext('2d')
      video.crossOrigin = 'Anonymous'
      ctx.drawImage(video, 0, 0, w, h)
      return canvas
    }
  }
}
</script>

<style lang="scss">
.capture-button {
  position: absolute;
  display: inline-block;
}
</style>
