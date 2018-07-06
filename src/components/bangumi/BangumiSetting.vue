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
      ref="form"
      :model="info"
      :rules="rules"
      label-width="40px"
    >
      <!--
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model.trim="name"/>
      </el-form-item>
      -->
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
          v-model.trim="summary"
          :rows="5"
          type="textarea"
          placeholder="请输入番剧简介"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="submitting"
          type="primary"
          @click="submit"
        >确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import BangumiApi from '~/api/bangumiApi'
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
      const validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请先填写番剧名称'));
        }
        if (value.length > 35) {
          return callback(new Error('名称最长 35 个字'));
        }
        callback();
      };
      const validateDesc = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请先填写番剧简介'));
        }
        if (value.length > 200) {
          return callback(new Error('简介最多 200 个字'));
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
            { validator: validateName, trigger: 'submit' }
          ],
          summary: [
            { validator: validateDesc, trigger: 'submit' }
          ],
          tags: [
            { validator: validateTags, trigger: 'submit' }
          ],
        },
        cache: {
          avatar: '',
          banner: ''
        },
        submitting: false
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
      submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if (this.submitting) {
              return
            }
            this.submitting = true;
            const api = new BangumiApi(this);
            try {
              await api.edit({
                id: this.info.id,
                name: this.name,
                summary: this.summary,
                avatar: this.avatar.split('.calibur.tv/').pop(),
                banner: this.banner.split('.calibur.tv/').pop(),
                tags: this.tags
              });
              this.$toast.success('修改成功');
              setTimeout(() => {
                window.location.reload();
              }, 1000)
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
