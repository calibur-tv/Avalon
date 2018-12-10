<template>
  <el-form
    :disabled="submitting"
    label-width="45px"
  >
    <el-form-item
      label="名字"
      prop="name"
    >
      <el-input
        v-model="form.name"
        :placeholder="isCartoon ? '填写这一话的名字' : '给相册起一个名字'"
      />
    </el-form-item>
    <el-form-item
      v-if="isCartoon"
      label="集数"
      prop="part"
    >
      <el-input-number
        v-model="form.part"
        :precision="1"
        :min="1"
      />
    </el-form-item>
    <el-form-item
      label="封面"
      prop="poster"
    >
      <img
        v-if="form.poster"
        :src="$resize(form.poster.url)"
        height="200"
        style="width: auto;"
      >
      <el-upload
        ref="upload"
        :data="uploadHeaders"
        :on-error="handleImageUploadError"
        :on-success="handleAlbumUploadSuccess"
        :before-upload="beforePosterUpload"
        :on-remove="handlePosterRemove"
        :action="imageUploadAction"
        :accept="imageUploadAccept"
      >
        <el-button
          :loading="submitting"
          size="small"
          round
        >选择封面</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        size="small"
        @click="submit"
      >确认提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import Api from '~/api/imageApi'

export default {
  name: 'EditAlbumForm',
  mixins: [uploadMixin],
  props: {
    bangumiId: {
      required: true,
      type: Number
    },
    albumId: {
      required: true,
      type: Number
    },
    album: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      submitting: false,
      form: {
        id: this.albumId,
        bangumi_id: this.bangumiId,
        name: this.album.name,
        is_cartoon: this.album.is_cartoon,
        is_creator: this.album.is_creator,
        part: this.album.part,
        poster: this.album.source
      }
    }
  },
  computed: {
    isCartoon() {
      return this.form.is_cartoon
    },
    currentUserId() {
      return this.$store.state.user.id
    }
  },
  mounted() {
    this.getUpToken()
  },
  methods: {
    async submit() {
      if (!this.form.poster) {
        this.$toast.error('必须选择一个封面')
        return
      }
      const name = this.form.name
      if (!name) {
        this.$toast.error('名字不能为空')
        return
      }
      if (name.length > 30) {
        this.$toast.error('名字不能超过 30 个字')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      const api = new Api(this)
      try {
        await api.editAlbum(
          Object.assign({}, this.form, this.form.poster, {
            url: this.form.poster.url.split('calibur.tv/').pop()
          })
        )
        this.$toast.success('操作成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.submitting = false
      }
    },
    beforePosterUpload(file) {
      this.uploadConfig.max = 3
      this.uploadConfig.pathPrefix = `user/${this.currentUserId}/album`
      return this.beforeImageUpload(file)
    },
    handleAlbumUploadSuccess(res) {
      this.form.poster = res.data
      this.$toast.success('封面上传成功')
    },
    handlePosterRemove() {
      this.form.poster = null
    }
  }
}
</script>
