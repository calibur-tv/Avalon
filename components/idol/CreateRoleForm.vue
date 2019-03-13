<style lang="scss"></style>

<template>
  <div class="create-role-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="40px">
      <el-form-item label="名称" prop="name">
        <el-col :span="16">
          <el-input v-model.trim="form.name" placeholder="中文名" />
        </el-col>
      </el-form-item>
      <el-form-item label="别名" prop="alias">
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
      <el-form-item label="番剧" prop="bangumi_id">
        <bangumi-search v-model="form.bangumi_id" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar" required>
        <el-col :span="16">
          <el-input v-model.trim="form.avatar" :disabled="true">
            <template slot="prepend">
              https://image.calibur.tv/
            </template>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-form-item>
            <el-upload
              :data="uploadHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleImageUploadError"
              :before-upload="beforeImageUpload"
              :action="imageUploadAction"
              :accept="imageUploadAccept"
            >
              <el-button type="text">
                <i class="el-icon-plus" />
                上传
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col v-if="form.avatar" :span="2">
          <el-popover
            ref="popoverAvatar"
            placement="left"
            width="100"
            trigger="hover"
          >
            <img :src="$resize(form.avatar, { width: 250 })">
          </el-popover>
          <a
            v-popover:popoverAvatar
            :href="imagePrefix + form.avatar"
            type="text"
            target="_blank"
          >
            <i class="el-icon-view" />&nbsp;预览
          </a>
        </el-col>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input
          v-model="form.intro"
          :rows="10"
          type="textarea"
          placeholder="请输入角色简介，最多400字"
        />
      </el-form-item>
      <el-form-item>
        <el-col :span="3" :offset="21">
          <el-button type="primary" @click="submitForm">
            立即创建
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import { createCartoonRole } from '~/api/cartoonRoleApi'

export default {
  name: 'CreateRoleForm',
  mixins: [uploadMixin],
  data() {
    const validateAlias = (rule, value, callback) => {
      if (!value || !value.length) {
        return callback(new Error('至少填写 1 个别名'))
      }
      if (value.length > 5) {
        return callback(new Error('最多填写 5 个别名'))
      }
      if (value.join('').length > 200) {
        return callback(new Error('最多 200 字'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        alias: '',
        bangumi_id: '',
        avatar: '',
        intro: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'submit' }
        ],
        avatar: [
          { required: true, message: '头像不能为空', trigger: 'change' }
        ],
        alias: [{ validator: validateAlias, trigger: 'submit' }],
        intro: [
          {
            required: true,
            min: 20,
            max: 400,
            message: '最少20字，最多400字',
            trigger: 'submit'
          }
        ],
        bangumi_id: [{ required: true, message: '番剧是必选', trigger: 'blur' }]
      },
      submitting: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    login() {
      return this.$store.state.login
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$toast.success('上传成功')
      this.form.avatar = res.data.url
    },
    submitForm() {
      if (!this.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      if (+this.user.pocket < 10) {
        this.$toast.info('你没有足够的虚拟币')
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.submitting = true
          const name = this.form.name
          try {
            const params = {
              bangumi_id: this.form.bangumi_id,
              name,
              intro: this.form.intro.trim(),
              avatar: this.form.avatar,
              alias: [name]
                .concat(this.form.alias.filter(_ => _ !== name))
                .toString()
            }
            if (typeof params.alias !== 'string') {
              params.alias = params.alias.join(',')
            }
            const id = await createCartoonRole(this, params)
            this.$toast.success('偶像创建成功')
            setTimeout(() => {
              window.location = this.$alias.cartoonRole(id)
            }, 1000)
          } catch (e) {
            // do nothing
          } finally {
            this.submitting = false
          }
        }
      })
    }
  }
}
</script>
