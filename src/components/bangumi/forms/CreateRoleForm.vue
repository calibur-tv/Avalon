<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :disabled="submitting"
    label-width="40px"
  >
    <el-form-item
      v-if="isCreate || isAdmin"
      label="名称"
      prop="name"
    >
      <el-input
        v-model.trim="form.name"
        placeholder="角色的中文名"
      />
    </el-form-item>
    <el-form-item
      label="别名"
      prop="alias"
    >
      <el-select
        v-model="form.alias"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="角色的其它名字，如：英文名、日文名"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item
      label="头像"
      prop="avatar"
    >
      <img
        v-if="form.avatar"
        :src="$resize(form.avatar, { width: 200 })"
        class="avatar"
        style="width: 100px;height: 100px;"
      >
      <el-upload
        ref="upload"
        :data="uploadHeaders"
        :action="imageUploadAction"
        :on-error="handleImageUploadError"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
      >
        <el-button size="mini">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="简介"
      prop="intro"
    >
      <el-input
        v-model.trim="form.intro"
        :rows="5"
        type="textarea"
        placeholder="请输入角色简介"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        @click="submit"
      >确认提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import CartoonRoleApi from "~/api/cartoonRoleApi";
import uploadMixin from "~/mixins/upload";

export default {
  name: "CreateRoleForm",
  mixins: [uploadMixin],
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    bangumiId: {
      type: Number,
      default: 0
    },
    role: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateAlias = (rule, value, callback) => {
      if (!value || !value.length) {
        return callback(new Error("至少选择 1 个标签"));
      }
      if (value.length > 5) {
        return callback(new Error("最多选择 5 个标签"));
      }
      callback();
    };
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请先填写番剧名称"));
      }
      if (value.length > 35) {
        return callback(new Error("名称最长 35 个字"));
      }
      callback();
    };
    const validateDesc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请先填写番剧简介"));
      }
      if (value.length > 200) {
        return callback(new Error("简介最多 200 个字"));
      }
      callback();
    };
    const validateAvatar = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请先上传头像"));
      }
      callback();
    };
    return {
      form: {
        bangumi_id: this.bangumiId,
        name: this.role ? this.role.name : "",
        alias: this.role ? this.role.alias.split(",") : [],
        avatar: this.role ? this.role.avatar : "",
        intro: this.role ? this.role.intro : ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "submit" }],
        intro: [{ validator: validateDesc, trigger: "submit" }],
        avatar: [{ validator: validateAvatar, trigger: "submit" }],
        alias: [{ validator: validateAlias, trigger: "submit" }]
      },
      submitting: false
    };
  },
  mounted() {
    this.getUpToken();
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.submitting) {
            return;
          }
          this.submitting = true;
          const api = new CartoonRoleApi(this);
          const name = this.form.name;
          try {
            const params = {
              bangumi_id: this.form.bangumi_id,
              name: name,
              intro: this.form.intro,
              avatar: this.form.avatar.split(".calibur.tv/").pop(),
              alias: [name]
                .concat(this.form.alias.filter(_ => _ !== name))
                .toString()
            };
            if (this.isCreate) {
              await api.create(params);
              this.$refs.form.resetFields();
              this.$refs.upload.clearFiles();
              this.$toast.success("添加成功");
            } else {
              await api.edit(
                Object.assign(params, {
                  id: this.role.id
                })
              );
              this.$emit("success");
            }
          } catch (err) {
            this.$toast.error(err);
          } finally {
            this.submitting = false;
          }
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      this.uploadConfig.max = 1;
      this.uploadConfig.pathPrefix = `bangumi/${this.bangumiId}/role`;
      return this.beforeImageUpload(file);
    },
    handleAvatarSuccess(res) {
      this.$toast.success("上传成功");
      this.form.avatar = res.data.key;
    }
  }
};
</script>
