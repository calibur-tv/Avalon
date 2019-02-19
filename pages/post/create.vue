<style lang="scss">
#post-create {
  .center-layout {
    width: 650px;
    margin: 0 auto;
  }

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

  .el-icon-question {
    margin-left: 10px;
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    color: $color-gray-deep;
  }
}
</style>

<template>
  <div id="post-create">
    <v-header type="pure"/>
    <div class="center-layout">
      <el-form
        ref="forms"
        :model="forms"
        :rules="rules"
        label-width="42px"
        class="create-post-form"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model.trim="forms.title"
            placeholder="请填写帖子标题"
          />
        </el-form-item>
        <el-form-item
          label="番剧"
          prop="bangumiId"
        >
          <bangumi-search
            v-model="forms.bangumiId"
            :followed="true"
            placeholder="请选择要投稿的番剧"
          />
        </el-form-item>
        <el-form-item
          label="标签"
          prop="tags"
        >
          <el-select
            v-model="forms.tags"
            multiple
            placeholder="添加标签"
            style="width: 100%"
          >
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="原创">
          <el-switch v-model="forms.is_creator"/>
          <el-tooltip
            class="item"
            effect="dark"
            content="如果帖子是转载的，请不要勾选"
            placement="top"
          >
            <i class="el-icon-question"/>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="uploader"
            :data="uploadHeaders"
            :action="imageUploadAction"
            :accept="imageUploadAccept"
            :on-error="handleError"
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
        <el-form-item
          label="正文"
          prop="content"
        >
          <el-input
            v-model="forms.content"
            :rows="7"
            type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            @click="submit"
          >发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import { createPost, getPostTags } from '~/api/postApi'

export default {
  name: 'PostCreate',
  mixins: [uploadMixin],
  head: {
    title: '发帖'
  },
  data() {
    const validateTags = (rule, value, callback) => {
      if (value.length > 3) {
        return callback(new Error('最多选择 3 个标签'))
      }
      callback()
    }
    return {
      showPostModal: false,
      tags: [],
      forms: {
        title: '',
        bangumiId: '',
        content: '',
        tags: [],
        is_creator: false
      },
      rules: {
        title: [
          {
            required: true,
            max: 40,
            message: '请输入帖子标题，最多40字',
            trigger: 'submit'
          }
        ],
        bangumiId: [
          {
            type: 'number',
            required: true,
            message: '请选择相应番剧',
            trigger: 'submit'
          }
        ],
        content: [
          {
            required: true,
            max: 8000,
            message: '内容不能为空',
            trigger: 'submit'
          }
        ],
        tags: [{ validator: validateTags, trigger: 'change' }]
      },
      images: [],
      exceed: 6,
      loadingFetchBangumi: false,
      submitting: false
    }
  },
  computed: {
    bangumiId() {
      return this.$route.name === 'bangumi-show'
        ? parseInt(this.$route.params.id, 10)
        : 0
    }
  },
  mounted() {
    this.getPostTags()
    this.abortCloseWindow()
  },
  methods: {
    abortCloseWindow() {
      window.onbeforeunload = function(e) {
        e = e || window.event

        // For IE and Firefox prior to version 4
        if (e) {
          e.returnValue = '确定要关闭该页面吗?'
        }

        // For Safari
        return '确定要关闭该页面吗?'
      }
    },
    submit() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$captcha({
            ctx: this,
            success: async ({ data }) => {
              try {
                const result = await createPost(this, {
                  title: this.forms.title,
                  bangumiId: this.forms.bangumiId,
                  tags: this.forms.tags,
                  desc: this.forms.content.trim().substring(0, 120),
                  content: this.forms.content.trim(),
                  images: this.images.map(item => item.img),
                  is_creator: this.forms.is_creator,
                  geetest: data
                })
                this.$toast.success(result.message).then(() => {
                  window.location = this.$alias.post(result.data)
                })
              } catch (err) {
                this.$toast.error(err)
                this.submitting = false
              }
            },
            close: () => {
              this.submitting = false
            }
          })
        } else {
          this.submitting = false
          return false
        }
      })
    },
    handleError(err, file) {
      console.log(err)
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1)
        }
      })
      this.$toast.error(`图片：${file.name} 上传失败`)
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
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }

      this.uploadConfig.max = 5
      this.uploadConfig.params = {
        userId: this.$store.state.user.id,
        id: 0,
        type: 'post'
      }

      return this.beforeImageUpload(file)
    },
    async getPostTags() {
      if (this.tags.length) {
        return
      }
      try {
        const list = JSON.parse(sessionStorage.getItem('cache-post-tags'))
        if (list) {
          this.tags = list
          return
        }
      } catch (e) {}
      try {
        const tags = await getPostTags(this)
        this.tags = tags
        sessionStorage.setItem('cache-post-tags', JSON.stringify(tags))
      } catch (e) {}
    }
  }
}
</script>
