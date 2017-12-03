<style lang="scss">
  #user-show {
    $banner-height: 400px;

    #banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 1;
      height: $banner-height;
      margin-bottom: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .img {
        width: 110%;
        height: $banner-height;
        margin: -$banner-height / 2 -55%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
        @include filter-blur();
      }
    }

    $user-panel-height: 140px;
    .container {
      .el-tabs__active-bar:after {
        display: none;
      }

      .el-tabs__header {
        margin-top: $user-panel-height;
        width: 100px;
        margin-right: 100px;
      }

      #user-panel {
        height: $user-panel-height;
        position: absolute;
        left: 60px;
        top: 0;

        .avatar {
          @include avatar(100px)
        }
      }
    }
  }
</style>

<template>
  <div id="user-show">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: `url(${$resize(user.banner, { width: 1920, mode: 0 })})`}"></div>
    </section>
    <div class="container">
      <div id="user-panel">
        <img class="avatar" :src="$resize(user.avatar, { width: 200, height: 200 })" alt="avatar">
      </div>
      <el-tabs tab-position="left" @tab-click="handleTabClick">
        <el-tab-pane label="番剧">番剧</el-tab-pane>
        <el-tab-pane label="帖子">帖子</el-tab-pane>
        <template v-if="isMe">
          <el-tab-pane label="设置">
            <el-form :model="settingForm" :rules="settingRule" ref="settingForm" label-width="50px">
              <el-form-item label="昵称" prop="nickname">
                <el-col :span="10">
                  <el-input v-model="settingForm.nickname"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker
                  v-model="settingForm.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-col>
                  <el-radio-group v-model="settingForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col v-if="settingForm.sex">
                  <el-switch v-model="settingForm.sexSecret"
                             active-text="公开"
                             inactive-text="私密"
                  ></el-switch>
                </el-col>
              </el-form-item>
              <el-form-item label="签名" prop="signature">
                <el-col :span="20">
                  <el-input type="textarea" v-model="settingForm.signature" placeholder="用简单的言语，表达深刻的心"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSetting">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import UserApi from 'api/userApi'

  export default {
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('users/getUser', {
        ctx,
        zone: route.params.slug
      })
    },
    head () {
      return {
        title: this.user.nickname,
        meta: [
          { hid: 'description', name: 'description', content: this.user.signature },
          { hid: 'keywords', name: 'keywords', content: `calibur,用户,天下漫友是一家,${this.user.zone},${this.user.nickname}` }
        ]
      }
    },
    computed: {
      slug () {
        return this.$route.params.slug
      },
      isMe () {
        return this.$store.state.login
          ? this.slug === this.self.zone
          : false
      },
      self () {
        return this.$store.state.user
      },
      user () {
        return this.isMe
          ? this.self
          : this.$store.state.users.list[this.slug]
      }
    },
    data () {
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
      return {
        settingForm: {
          nickname: '',
          signature: '',
          sex: 0,
          sexSecret: false,
          birthday: ''
        },
        settingRule: {
          nickname: [
            { validator: validateNickname, trigger: 'blur' }
          ],
          signature: [
            { max: 20, message: '请缩减至20字以内', trigger: 'blur' }
          ]
        }
      }
    },
    beforeMount () {
      this.$channel.$emit('change-page-background', {
        img: '',
        theme: 'mask'
      })
    },
    methods: {
      handleTabClick (tab) {
        if (tab.label === '设置') {
          this.settingForm = {
            nickname: this.self.nickname,
            signature: this.self.signature,
            sex: this.self.sex > 2 ? this.self.sex - 2 : this.self.sex,
            sexSecret: this.self.sex > 2,
            birthday: this.self.birthday ? this.self.birthday * 1000 : ''
          }
        }
      },
      saveSetting () {
        this.$refs.settingForm.validate((valid) => {
          if (valid) {
            const api = new UserApi(this)
            const data = {
              nickname: this.settingForm.nickname,
              signature: this.settingForm.signature,
              sex: parseInt(this.settingForm.sex, 10) + (this.settingForm.sexSecret ? 2 : 0),
              birthday: new Date(this.settingForm.birthday).getTime() / 1000
            }
            api.settingProfile(data).then(() => {
              this.$toast.success('设置成功')
              this.$store.commit('SET_USER', Object.assign(this.self, data))
              this.$store.commit('users/removeUser', this.slug)
            }).catch((err) => {
              err.message.forEach(tip => {
                this.$toast.error(tip)
              })
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
