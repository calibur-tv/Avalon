<style lang="scss">
  #bangumi-setting {
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>

<template>
  <div id="bangumi-setting">
    <el-form
      ref="ruleForm"
      :model="info"
      :rules="rules"
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model="name"/>
      </el-form-item>
      <el-form-item label="头像">
        <img
          :src="$resize(avatar, { width: 200 })"
          class="avatar"
        >
        <el-upload
          :data="uploadHeaders"
          :action="imageUploadAction"
          :on-error="handleImageUploadError"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :on-remove="handleAvatarRemove"
        >
          <el-button size="mini">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="背景">
        <el-upload
          :data="uploadHeaders"
          :action="imageUploadAction"
          :on-error="handleImageUploadError"
          :before-upload="beforeBannerUpload"
          :on-success="handleBannerSuccess"
          :on-remove="handleBannerRemove"
        >
          <el-button size="mini">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="标签"
        prop="tags"
      >
        <el-select
          v-if="bangumiTags.length"
          v-model="tags"
          multiple
          placeholder="可多选，至少选择一个"
          style="width: 100%"
        >
          <el-option
            v-for="item in bangumiTags"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="简介"
        prop="summary"
      >
        <el-input
          v-model="summary"
          :rows="5"
          type="textarea"
          placeholder="请输入番剧简介"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import uploadMixin from '~/mixins/upload'

  export default {
    name: 'BangumiSetting',
    data () {
      const validateTags = (rule, value, callback) => {
        if (!value || !value.length) {
          return callback(new Error('至少选择 1 个标签'));
        }
        if (value.length > 5) {
          return callback(new Error('最多选择 5 个标签'));
        }
        callback();
      };
      return {
        state: {
          loading: false,
          fetched: false
        },
        rules: {
          name: [
            { message: '请输入番剧名称', trigger: 'blur'},
            { min: 1, max: 35, message: '长度在 1 到 35 个字符', trigger: 'change'}
          ],
          summary: [
            { message: '请输入番剧名称', trigger: 'blur'},
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'change'}
          ],
          tags: [
            { validator: validateTags, trigger: 'change' }
          ],
        },
        cache: {
          avatar: '',
          banner: ''
        }
      }
    },
    mixin: [
      uploadMixin
    ],
    computed: {
      bangumiTags () {
        return this.$store.state.bangumi.tags
      },
      info () {
        return this.$store.state.bangumi.info
      },
      name: {
        get () {
          return this.info.name
        },
        set (value) {
          this.$store.commit('bangumi/SET_BANGUMI_INFO', {
            key: 'name',
            value
          })
        }
      },
      summary: {
        get () {
          return this.info.summary
        },
        set (value) {
          this.$store.commit('bangumi/SET_BANGUMI_INFO', {
            key: 'summary',
            value
          })
        }
      },
      tags: {
        get () {
          return this.info.tags.map(_ => _.id)
        },
        set (value) {
          const result = value.map(_ => {
            if (typeof _ === 'number') {
              return this.bangumiTags.filter(tag => tag.id === _).map(selected => {
                return {
                  id: selected.id,
                  name: selected.name
                }
              })[0]
            }
            return _
          })
          this.$store.commit('bangumi/SET_BANGUMI_INFO', {
            key: 'tags',
            value: result
          })
        }
      },
      avatar () {
        return this.info.avatar
      },
      banner () {
        return this.info.banner
      }
    },
    watch: {

    },
    created () {

    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-setting', () => {
        if (!this.state.fetched) {
          this.$store.dispatch('bangumi/getTags', {
            ctx: this
          })
        }
        this.cache.avatar = this.avatar
        this.cache.banner = this.banner
        this.getUpToken();
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      beforeAvatarUpload(file) {
        this.uploadConfig.max = 1;
        this.uploadConfig.pathPrefix = `bangumi/avatar/${this.info.id}`
        return this.beforeImageUpload(file);
      },
      beforeBannerUpload(file) {
        this.uploadConfig.max = 3;
        this.uploadConfig.pathPrefix = `bangumi/banner/${this.info.id}`
        return this.beforeImageUpload(file)
      },
      handleAvatarSuccess(res) {
        this.$toast.success('上传成功');
        this.$store.commit('bangumi/SET_BANGUMI_INFO', {
          key: 'avatar',
          value: res.data.key
        })
      },
      handleBannerSuccess(res) {
        this.$toast.success('上传成功');
        this.$store.commit('bangumi/SET_BANGUMI_INFO', {
          key: 'banner',
          value: res.data.key
        })
      },
      handleAvatarRemove() {
        this.$store.commit('bangumi/SET_BANGUMI_INFO', {
          key: 'avatar',
          value: this.cache.avatar
        })
      },
      handleBannerRemove() {
        this.$store.commit('bangumi/SET_BANGUMI_INFO', {
          key: 'banner',
          value: this.cache.banner
        })
      }
    }
  }
</script>
