<template>
  <v-modal
    v-model="show"
    header-text="上传图片"
    @submit="handleFormSubmit"
  >
    <el-form
      ref="form"
      label-width="60px"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="类型">
            <el-select
              v-model="form.tags"
              placeholder="请选择类型"
            >
              <el-option
                v-for="item in options.tag"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="尺寸">
            <el-select
              v-model="form.size"
              placeholder="请选择尺寸"
            >
              <el-option
                v-for="item in options.size"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="番剧">
            <el-select v-model="form.bangumiId" filterable placeholder="请选择番剧" @change="getBangumiRoles">
              <el-option
                v-for="item in bangumis"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="角色">
            <el-select
              v-model="form.roleId"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="原创">
        <el-switch v-model="form.creator"></el-switch>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="https://upload.qiniup.com"
          ref="uploader"
          :data="uploadHeaders"
          :on-error="handleError"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </v-modal>
</template>

<script>
  import ImageApi from '~/api/imageApi'

  export default {
    name: 'UploadImageModal',
    computed: {
      slug () {
        return this.$store.state.user.zone
      }
    },
    data () {
      return {
        uploadHeaders: {
          token: ''
        },
        bangumiRoles: {},
        bangumis: [],
        options: [],
        roles: [],
        loadingUserBangumiFetch: false,
        loadingUploadTypeFetch: false,
        show: false,
        submitting: false,
        form: {
          bangumiId: '',
          size: '',
          tags: '',
          roleId: '',
          creator: false,
          images: []
        }
      }
    },
    methods: {
      async getUserBangumis () {
        if (this.bangumis.length) {
          return
        }
        if (this.loadingUserBangumiFetch) {
          return
        }
        this.loadingUserBangumiFetch = true
        try {
          this.bangumis = await this.$store.dispatch('users/getFollowBangumis', {
            ctx: this,
            zone: this.slug
          })
        } finally {
          this.loadingUserBangumiFetch = false
        }
      },
      async getUploadType () {
        if (this.loadingUploadTypeFetch || this.options.length) {
          return
        }
        this.loadingUploadTypeFetch = true
        const api = new ImageApi(this)
        try {
          this.options = await api.getUploadType()
        } finally {
          this.loadingUploadTypeFetch = false
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
        this.form.images.push({
          id: file.uid,
          img: res.data
        })
      },
      beforeUpload (file) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt5M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }

        this.uploadHeaders.key = `user/${this.$store.state.user.id}/image/${this.bangumiId}/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
      },
      async getUpToken () {
        try {
          await this.$store.dispatch('getUpToken', this)
          this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async getBangumiRoles (bangumiId) {
        if (this.bangumiRoles[bangumiId]) {
          this.roles = this.bangumiRoles[bangumiId]
          return
        }
        const data = await this.$store.dispatch('bangumi/getRoles', {
          ctx: this,
          bangumiId: bangumiId,
          all: true
        })
        this.bangumiRoles[bangumiId] = data
        this.roles = data
      },
      async handleFormSubmit () {
        if (!this.form.size) {
          this.$toast.error('请先选择尺寸')
          return
        }
        if (!this.form.tags) {
          this.$toast.error('请先选择类型')
          return
        }
        if (!this.form.images.length) {
          this.$toast.error('请先上传图片')
          return
        }
        if (this.submitting) {
          return
        }
        this.submitting = true
        try {
          const api = new ImageApi(this)
          const image = this.form.images[0]['img']
          await api.uploadImage({
            bangumiId: this.form.bangumiId || 0,
            roleId: this.form.roleId || 0,
            tags: this.form.tags,
            size: this.form.size,
            url: image.key,
            width: image.width,
            height: image.height,
            creator: this.form.creator
          })
          this.$toast.success('图片上传成功！')
          this.form = {
            bangumiId: '',
            size: '',
            tags: '',
            roleId: '',
            creator: false,
            images: []
          }
          this.$refs.uploader.clearFiles()
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.submitting = false
        }
      }
    },
    mounted () {
      this.$channel.$on('open-upload-image-modal', () => {
        this.getUploadType()
        this.getUserBangumis()
        this.getUpToken()
        this.show = true
      })
    }
  }
</script>
