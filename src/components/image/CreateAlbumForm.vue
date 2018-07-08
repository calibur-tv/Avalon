<style lang="scss" scoped>
  .preview-poster {
    height: 100px;
    width: 500px;
    position: absolute;
    right: 0;
    top: 0;
    background-position: center right;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .el-icon-question {
    margin-left: 10px;
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    color: $color-gray-deep;
  }
</style>

<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rule"
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
        :min="1"
      />
    </el-form-item>
    <el-form-item
      v-else
      label="番剧"
      prop="bangumi_id"
    >
      <bangumi-search
        v-model="form.bangumi_id"
        :disabled="submitting"
        placeholder="请选择要投稿的番剧"
      />
    </el-form-item>
    <el-form-item
      v-if="!isCartoon"
      label="原创"
    >
      <el-row>
        <el-switch v-model="form.is_creator"/>
        <el-tooltip
          class="item"
          effect="dark"
          content="只有相册内容全是原创时才应该勾选"
          placement="top"
        >
          <i class="el-icon-question"/>
        </el-tooltip>
        <div
          v-if="form.poster"
          :style="{ backgroundImage: `url(${$resize(form.poster.url, { width: 400, mode: 2 })})` }"
          class="preview-poster"
        />
      </el-row>
    </el-form-item>
    <el-form-item
      label="封面"
      prop="poster"
    >
      <el-upload
        ref="upload"
        :data="uploadHeaders"
        :on-error="handleImageUploadError"
        :on-success="handleAlbumUploadSuccess"
        :before-upload="beforePosterUpload"
        :on-remove="handlePosterRemove"
        :action="imageUploadAction"
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
  import ImageApi from '~/api/imageApi'

  export default {
    name: 'CreateAlbumForm',
    props: {
      bangumiId: {
        type: [Number, String],
        default: ''
      },
      isCartoon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请先填名字'));
        }
        if (value.length > 30) {
          return callback(new Error('名字最长 30 个字'));
        }
        callback();
      };
      const validateBangumi = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择一个相关的番剧'));
        }
        callback();
      };
      const validatePart = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('漫画的集数是必填的'));
        }
        callback();
      };
      const validatePoster = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请给相册选择一个封面'));
        }
        callback();
      };
      return {
        submitting: false,
        form: {
          name: '',
          bangumi_id: this.bangumiId,
          is_cartoon: this.isCartoon,
          is_creator: false,
          part: 0,
          poster: null
        },
        rule: {
          name: [
            { validator: validateName, trigger: 'submit' }
          ],
          bangumi_id: [
            { validator: validateBangumi, trigger: 'submit' }
          ],
          part: [
            { validator: validatePart, trigger: 'submit' }
          ],
          poster: [
            { validator: validatePoster, trigger: 'submit' }
          ]
        }
      };
    },
    mixin: [
      uploadMixin
    ],
    computed: {
      currentUserId () {
        return this.$store.state.user.id
      }
    },
    mounted() {
      this.getUpToken();
    },
    methods: {
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.submitting) {
              return
            }
            this.submitting = true;
            const api = new ImageApi(this);
            api.createAlbum({
              bangumi_id: this.form.bangumi_id,
              name: this.form.name,
              url: this.form.poster.url,
              width: this.form.poster.width,
              height: this.form.poster.height,
              size: this.form.poster.size,
              type: this.form.poster.type,
              part: this.form.part,
              is_cartoon: this.form.is_cartoon,
              is_creator: this.form.is_creator
            }).then((data) => {
              this.$refs.form.resetFields();
              this.$refs.upload.clearFiles();
              this.$toast.success('创建成功');
              this.submitting = false;
              this.$emit('success', data);
            }).catch((err) => {
              this.$toast.error(err);
              this.submitting = false;
            })
          } else {
            return false;
          }
        });
      },
      beforePosterUpload(file) {
        this.uploadConfig.max = 3;
        this.uploadConfig.pathPrefix = `user/${this.currentUserId}/album`
        return this.beforeImageUpload(file);
      },
      handleAlbumUploadSuccess (res) {
        this.form.poster = {
          url: res.data.key,
          width: res.data.width,
          height: res.data.height,
          size: res.data.size,
          type: res.data.type
        }
        this.$toast.success('封面上传成功');
      },
      handlePosterRemove () {
        this.form.poster = null
      }
    }
  }
</script>
