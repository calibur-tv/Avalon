<style lang="scss">
.edit-video-form {
  .dialog-header {
    margin-bottom: 20px;
  }

  .preview-poster {
    height: 100px;
    width: 300px;
    position: absolute;
    right: 0;
    top: -65px;
    background-position: center right;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>

<template>
  <div class="edit-video-form">
    <div class="dialog-header">
      <el-radio-group
        v-model="selected"
        size="mini"
      >
        <el-radio-button label="百度云" />
        <el-radio-button label="视频源" />
      </el-radio-group>
    </div>
    <template v-if="selected === '百度云'">
      <el-form
        ref="form"
        :model="form"
        :rules="rule"
        :disabled="submitting"
        label-width="45px"
      >
        <el-form-item label="名字" prop="name">
          <el-input
            v-model="form.name"
            placeholder="填写这一话的名字"
            style="width:450px"
          />
        </el-form-item>
        <el-form-item label="集数" prop="episode">
          <el-input-number v-model="form.episode" :min="minPart" :step="0.5" />
        </el-form-item>
        <el-form-item
          v-if="!videoId && season.length > 1"
          label="季度"
          prop="season_id"
        >
          <el-select v-model="form.season_id" placeholder="请选择季度">
            <el-option
              v-for="item in season"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="poster">
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
            <el-button :loading="submitting" size="small" round>
              上传封面图
            </el-button>
          </el-upload>
          <div
            v-if="form.poster"
            :style="{
              backgroundImage: `url(${$resize(form.poster, {
                width: 400,
                mode: 2
              })})`
            }"
            class="preview-poster"
          />
        </el-form-item>
        <el-form-item label="链接" prop="baidu_cloud_src">
          <el-input
            v-model="form.baidu_cloud_src"
            placeholder="填写百度云视频链接"
          />
        </el-form-item>
        <el-form-item label="密码" prop="baidu_cloud_pwd">
          <el-input
            v-model="form.baidu_cloud_pwd"
            placeholder="填写百度云视频密码，最长6位，可空"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            size="small"
            @click="submit"
          >
            确认提交
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="selected === '视频源'">
      <el-form label-width="45px">
        <el-form-item label="链接">
          <el-input
            v-model.trim="remote_src"
            placeholder="请填写视频链接（不是页面链接）"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            size="small"
            @click="fetchVideo"
          >
            确认提交
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import { createVideo, updateVideo, fetchRemoteVideo } from '~/api/videoApi'

export default {
  name: 'EditVideoForm',
  mixins: [uploadMixin],
  props: {
    season: {
      type: Array,
      default: () => []
    },
    videoId: {
      type: [Number, String],
      default: 0
    },
    seasonId: {
      type: [Number, String],
      default: ''
    },
    bangumiId: {
      required: true,
      type: [Number, String]
    },
    video: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请先填名字'))
      }
      if (value.length > 30) {
        return callback(new Error('名字最长 30 个字'))
      }
      callback()
    }
    const validatePart = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('集数是必填的'))
      }
      callback()
    }
    const validatePoster = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择一个封面'))
      }
      callback()
    }
    const validateSrc = (rule, value, callback) => {
      if (value === '') {
        return callback()
      }
      if (
        !/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
          value
        )
      ) {
        return callback(new Error('请输入合法链接'))
      }
      if (!/pan.baidu.com/.test(value)) {
        return callback(new Error('只支持百度云资源'))
      }
      callback()
    }
    const validatePwd = (rule, value, callback) => {
      if (value.length > 6) {
        return callback(new Error('密码长度在6位以内'))
      }
      callback()
    }
    return {
      selected: '百度云',
      remote_src: '',
      submitting: false,
      form: {
        season_id: this.seasonId
          ? this.seasonId
          : this.season[this.season.length - 1].id,
        bangumi_id: this.bangumiId,
        name: this.video ? this.video.name : '',
        episode: this.video ? this.video.episode : 0,
        poster: this.video ? this.video.poster.split('calibur.tv/')[1] : '',
        baidu_cloud_src:
          this.video && this.video.is_baidu_cloud ? this.video.src : '',
        baidu_cloud_pwd: this.video ? this.video.baidu_cloud_pwd : ''
      },
      rule: {
        name: [{ validator: validateName, trigger: 'submit' }],
        episode: [{ validator: validatePart, trigger: 'submit' }],
        poster: [{ validator: validatePoster, trigger: 'submit' }],
        baidu_cloud_src: [{ validator: validateSrc, trigger: 'submit' }],
        baidu_cloud_pwd: [{ validator: validatePwd, trigger: 'submit' }]
      }
    }
  },
  computed: {
    minPart() {
      let result = 1
      this.season.forEach(item => {
        if (item.id === this.form.season_id) {
          result = item.last_part
        }
      })
      return result
    },
    currentUserId() {
      return this.$store.state.user.id
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.submitting = true
          if (this.videoId) {
            updateVideo(
              this,
              this.videoId,
              Object.assign({}, this.form, {
                baidu_cloud_src: this.form.baidu_cloud_src.split('?')[0]
              })
            )
              .then(() => {
                window.location.reload()
              })
              .catch(() => {
                this.submitting = false
              })
          } else {
            createVideo(
              this,
              Object.assign({}, this.form, {
                baidu_cloud_src: this.form.baidu_cloud_src.split('?')[0]
              })
            )
              .then(videoId => {
                this.$refs.form.resetFields()
                this.$refs.upload.clearFiles()
                this.submitting = false
                this.$confirm('是否前往视频页面?', '提示', {
                  confirmButtonText: '前往查看',
                  cancelButtonText: '留在这里',
                  type: 'warning'
                })
                  .then(() => {
                    window.location = this.$alias.video(videoId)
                  })
                  .catch(() => {})
              })
              .catch(err => {
                this.$toast.error(err)
                this.submitting = false
              })
          }
        } else {
          return false
        }
      })
    },
    beforePosterUpload(file) {
      this.uploadConfig.max = 1
      this.uploadConfig.pathPrefix = `user/${this.currentUserId}/album`
      return this.beforeImageUpload(file)
    },
    handleAlbumUploadSuccess(res) {
      this.form.poster = res.data.url
      this.$toast.success('封面上传成功')
    },
    handlePosterRemove() {
      this.form.poster = null
    },
    async fetchVideo() {
      if (!/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(this.remote_src)) {
        return this.$toast.error('请输入合法链接')
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await fetchRemoteVideo(this, {
          id: this.videoId,
          src: this.remote_src
        })
        this.$toast.success('视频正在抓取中，请勿重复操作')
          .then(() => {
            window.location.reload()
          })
      } catch (e) {} finally {
        this.submitting = false
      }
    }
  }
}
</script>
