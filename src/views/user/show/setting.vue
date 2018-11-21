<style lang="scss">
.user-setting {
  .el-radio-group {
    margin-top: 0 !important;
  }

  .el-icon-question {
    color: $color-gray-deep;
    margin-left: 10px;
    margin-top: 13px;
    float: right;
  }

  .el-switch {
    float: right;
    margin-top: 10px;
  }

  .el-alert {
    margin-bottom: 20px;

    p {
      font-size: 13px;
      line-height: 20px;
      margin-left: 3px;
      margin-top: 3px;
    }
  }

  .providers {
    i {
      font-size: 24px;
      margin-right: 12px;
      color: $color-gray-deep;
    }

    .icon-qq.is-bind,
    .icon-qq:hover {
      color: #3194d0;
    }

    .icon-wechat-copy.is-bind,
    .icon-wechat-copy:hover {
      color: #42c02e;
    }
  }
}
</style>

<template>
  <el-form
    ref="form"
    :disabled="submitting"
    :model="user"
    :rules="rule"
    label-width="50px"
    class="user-setting"
  >
    <el-alert
      type="info"
      title=""
      show-icon
    >
      <p>填写正确的性别和生日有助于网站对你番剧喜好的分析，在未来我们有可能根据你的喜好来推荐合适的番剧</p>
      <p>如果你担心自己的性别和生日被其他用户知道，可以勾选<strong>私密</strong>，这样我们只会在推荐系统中用到你的数据</p>
    </el-alert>
    <el-form-item
      label="昵称"
      prop="nickname"
    >
      <el-input v-model="nickname"/>
    </el-form-item>
    <el-form-item
      label="生日"
      prop="birthday"
    >
      <el-date-picker
        v-model="birthday"
        :editable="false"
        :clearable="false"
        type="date"
        format="yyyy 年 M 月 d 日"
        value-format="yyyy-MM-dd"
        placeholder="选择生日"
      />
      <el-tooltip
        class="item"
        effect="dark"
        content="设置为私密后将不对外公开"
        placement="top"
      >
        <i class="el-icon-question"/>
      </el-tooltip>
      <el-switch
        v-model="birthSecret"
        active-text="私密"
        inactive-text="公开"
      />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
        <el-radio :label="3">伪娘</el-radio>
        <el-radio :label="4">药娘</el-radio>
        <el-radio :label="5">扶她</el-radio>
      </el-radio-group>
      <el-tooltip
        class="item"
        effect="dark"
        content="设置为私密后将不对外公开"
        placement="top"
      >
        <i class="el-icon-question"/>
      </el-tooltip>
      <el-switch
        v-model="sexSecret"
        active-text="私密"
        inactive-text="公开"
      />
    </el-form-item>
    <el-form-item
      label="签名"
      prop="signature"
    >
      <el-input
        v-model="signature"
        :rows="5"
        type="textarea"
        placeholder="用简单的言语，表达深刻的心"
      />
    </el-form-item>
    <el-form-item label="绑定">
      <div class="providers">
        <a href="https://api.calibur.tv/callback/oauth2/qq?from=bind">
          <i
            :class="{ 'is-bind': user.providers.bind_qq }"
            class="iconfont icon-qq"
          />
        </a>
        <a href="https://api.calibur.tv/callback/oauth2/wechat?from=bind">
          <i
            :class="{ 'is-bind': user.providers.bind_wechat }"
            class="iconfont icon-wechat-copy"
          />
        </a>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        @click="submit"
      >提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Api from '~/api/userApi'

export default {
  name: 'UserSetting',
  data() {
    const validateNickname = (rule, value, callback) => {
      const length = value.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
      if (!length) {
        callback(new Error('昵称不能为空'))
      } else if (length < 2) {
        callback(new Error('昵称至少为2个字符'))
      } else if (length > 14) {
        callback(new Error('昵称不能超过14个字符'))
      }
      callback()
    }
    const validateSignature = (rule, value, callback) => {
      if (value.length > 150) {
        callback(new Error('签名最多 150 个字'))
      }
      callback()
    }
    const validateBirthday = (rule, value, callback) => {
      const setTs = new Date(value).getTime()
      const curTs = Date.now()
      if (setTs >= curTs) {
        callback(new Error('。。。'))
      } else if (curTs - setTs < 315360000000) {
        callback(new Error('你应该大于10岁了吧...?'))
      } else if (curTs - setTs > 1261440000000) {
        callback(new Error('你应该小于40岁的吧...?'))
      }
      callback()
    }
    return {
      submitting: false,
      rule: {
        nickname: [{ validator: validateNickname, trigger: 'submit' }],
        signature: [{ validator: validateSignature, trigger: 'submit' }],
        birthday: [{ validator: validateBirthday, trigger: 'submit' }]
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    nickname: {
      get() {
        return this.user.nickname
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'nickname',
          value
        })
      }
    },
    birthday: {
      get() {
        return this.user.birthday
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'birthday',
          value
        })
      }
    },
    birthSecret: {
      get() {
        return this.user.birthSecret
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'birthSecret',
          value
        })
      }
    },
    sex: {
      get() {
        return this.user.sex
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'sex',
          value
        })
      }
    },
    sexSecret: {
      get() {
        return this.user.sexSecret
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'sexSecret',
          value
        })
      }
    },
    signature: {
      get() {
        return this.user.signature
      },
      set(value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'signature',
          value
        })
      }
    },
    isMe() {
      return this.$store.state.login
        ? this.user.zone === this.$route.params.zone
        : false
    }
  },
  mounted() {
    if (!this.isMe) {
      this.$router.replace({
        name: 'user-bangumi'
      })
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.submitting = true
          const api = new Api(this)
          try {
            await api.settingProfile({
              nickname: this.nickname,
              signature: this.signature,
              birthday: new Date(this.birthday).getTime() / 1000,
              birth_secret: this.birthSecret,
              sex_secret: this.sexSecret,
              sex: this.sex
            })
            this.$toast.success('设置成功')
          } catch (err) {
            this.$toast.error(err)
          } finally {
            this.submitting = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
