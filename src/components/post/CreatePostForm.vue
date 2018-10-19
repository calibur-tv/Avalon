<style lang="scss">
.create-post-form {
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
  <el-form
    ref="forms"
    :model="forms"
    :rules="rules"
    label-width="70px"
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
      label="内容"
      prop="content"
    >
      <el-input
        v-model.trim="forms.content"
        :rows="10"
        type="textarea"
        placeholder="1000字以内"
        resize="none"
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
</template>

<script>
import uploadMixin from "~/mixins/upload";

export default {
  name: "CreatePostForm",
  mixins: [uploadMixin],
  data() {
    return {
      forms: {
        title: "",
        bangumiId: "",
        content: "",
        is_creator: false
      },
      rules: {
        title: [
          {
            required: true,
            max: 40,
            message: "请输入帖子标题，最多40字",
            trigger: "submit"
          }
        ],
        bangumiId: [
          {
            type: "number",
            required: true,
            message: "请选择相应番剧",
            trigger: "submit"
          }
        ],
        content: [
          {
            required: true,
            max: 1000,
            message: "内容不能为空，且不超过1000字",
            trigger: "submit"
          }
        ]
      },
      images: [],
      exceed: 6,
      loadingFetchBangumi: false,
      submitting: false
    };
  },
  computed: {
    bangumiId() {
      return this.$route.name === "bangumi-show"
        ? parseInt(this.$route.params.id, 10)
        : 0;
    }
  },
  methods: {
    submit() {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      if (this.submitting) {
        return;
      }
      this.submitting = true;
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$captcha({
            success: async ({ data }) => {
              try {
                const result = await this.$store.dispatch("post/create", {
                  title: this.forms.title,
                  bangumiId: this.forms.bangumiId,
                  desc: this.forms.content.substring(0, 120),
                  content: this.forms.content,
                  images: this.images.map(item => item.img),
                  geetest: data,
                  ctx: this,
                  is_creator: this.forms.is_creator
                });
                this.images = [];
                this.$refs.forms.resetFields();
                this.$emit("submit");
                this.submitting = false;
                this.$toast.success(result.message).then(() => {
                  window.location = this.$alias.post(result.data);
                });
              } catch (err) {
                this.$toast.error(err);
                this.submitting = false;
              }
            },
            error: e => {
              this.submitting = false;
              this.$toast.error(e);
            },
            close: () => {
              this.submitting = false;
            }
          });
        } else {
          this.submitting = false;
          return false;
        }
      });
    },
    handleError(err, file) {
      console.log(err);
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1);
        }
      });
      this.$toast.error(`图片：${file.name} 上传失败`);
    },
    handleRemove(file) {
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1);
        }
      });
    },
    handleSuccess(res, file) {
      this.images.push({
        id: file.uid,
        img: res.data
      });
    },
    handleExceed() {
      this.$toast.error(`最多可上传 ${this.exceed} 张图片!`);
    },
    beforeUpload(file) {
      if (!this.$store.state.login) {
        this.$channel.$emit("sign-in");
        return;
      }

      this.uploadConfig.max = 5;
      this.uploadConfig.params = {
        userId: this.$store.state.user.id,
        id: 0,
        type: "post"
      };

      return this.beforeImageUpload(file);
    }
  }
};
</script>
