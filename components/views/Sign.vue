<style lang="scss">
  $time: .5s;
  $input-height: 40px;
  #space3D {
    perspective: 800px;
    perspective-origin: 50% 50%;
    background-color: transparent;
    z-index: 11;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    &.space-leave {
      visibility: hidden;
    }

    &.space-enter {
      visibility: visible;
    }

    .sign-modal-wrap {
      transform-style: preserve-3d;
      z-index: 12;

      .sign-modal {
        padding: 50px 60px;
        background-color: $color-white;
        border-radius: 4px;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 460px;
        margin-left: -250px;
        transition: $time;
        font-size: 14px;
        visibility: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;

        button {
          user-select: none;
        }

        input[type="text"], input[type="password"], input[type="email"] {
          width: 100%;
          height: $input-height;
          font-size: 12px;
          padding: 8px 12px;
          color: $color-text-deep;
        }

        .captcha {
          cursor: pointer;
          position: relative;
          height: 44px;
          width: 100%;
          border-radius: 3px;
          background-color: $color-blue-normal;
          font-weight: bold;
          margin-top: 15px;

          &:hover {
            background-color: $color-blue-light;
          }

          &:before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            line-height: 44px;
            color: $color-white;
          }
        }

        >span {
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
        }

        &.sign-up-show,
        &.sign-in-show {
          visibility: visible;
          opacity: 1;
          transform: rotateY(0deg) translateY(-200px);
        }

        &.sign-up-init,
        &.sign-in-init {
          visibility: hidden;
          opacity: 0;
          transform: rotateY(0deg) translateY(-300px);
        }

        &.sign-in-turn,
        &.sign-up-turn {
          visibility: hidden;
          opacity: 0;
        }

        &.sign-in-turn {
          transform: rotateY(-180deg) translateY(-200px);
        }

        &.sign-up-turn {
          transform: rotateY(180deg) translateY(-200px);
        }

        .watch {
          position: absolute;
          right: 0;
          top: 0;
          width: $input-height;
          height: $input-height;
          color: $color-gray-deep;
        }
      }

      .sign-in-modal {
        >div {
          margin-top: 15px;
          position: relative;
        }

        input[type="text"], input[type="password"], input[type="email"] {
          border-radius: 4px;
          border: 1px solid $color-gray-deep;
        }

        input[type=checkbox] {
          margin-left: 5px;
        }
      }

      .sign-up-modal {
        .slogan {
          height: 54px;
        }

        .form {
          border-radius: 4px;
          border: 1px solid $color-gray-deep;
          overflow: hidden;

          >div {
            position: relative;
          }
        }

        input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid $color-gray-normal;

          &.last-input {
            border-bottom: 0;
          }
        }

        .checkAndSend {
          position: absolute;
          right: 0;
          top: 0;
          height: $input-height;
          padding: 0 10px;
          font-size: 12px;
          color: $color-text-normal;
        }
      }
    }
  }
</style>

<template>
  <div id="space3D"
       :class="[ showModal ? 'space-enter' : 'space-leave' ]"
       @click="hiddenSign">
    <div class="sign-modal-wrap abs" ref="wrap">
      <div class="sign-modal sign-in-modal"
           :class="{
            'sign-in-init' : !showSignIn && !showSignUp,
            'sign-in-show' : showSignIn && !showSignUp,
            'sign-in-turn' : !showSignIn && showSignUp
           }" @click.stop>
        <img src="data:image/jpeg;base64,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">
        <div>
          <input name="access"
                 type="text"
                 v-validate="{
                    rules: 'required|email',
                    scope: 'sign-in'
                 }"
                 v-model="signIn.access"
                 @input="showSignInCaptcha"
                 placeholder="邮箱">
        </div>
        <div>
          <input name="secret"
                 type="password"
                 v-validate="{
                   rules: 'required|min:6|max:16',
                   scope: 'sign-in'
                 }"
                 v-model="signIn.secret"
                 @input="showSignInCaptcha"
                 placeholder="密码">
        </div>
        <span>
          <label>记住我<input type="checkbox" :checked="signIn.remember" v-model="signIn.remember"></label>
        </span>
        <div class="captcha" data-text="登录" ref="signInCaptcha"></div>
        <span>
          <a @click="forgotPassword">忘记密码?></a>
          <a @click="showRegister">点击注册»</a>
        </span>
      </div>
      <div class="sign-modal sign-up-modal"
           :class="{
            'sign-up-init' : !showSignUp && !showSignIn,
            'sign-up-show' : showSignUp && !showSignIn,
            'sign-up-turn' : !showSignUp && showSignIn
           }" @click.stop>
        <div class="slogan"></div>
        <div class="form">
          <div>
            <input type="text"
                   name="nickname"
                   v-validate="{
                     rules: 'required|nickname:1-7',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.nickname"
                   @input="showSignUpCaptcha"
                   placeholder="昵称（2-14个字符组成，1个汉字占2个字符）">
          </div>
          <div>
            <input type="email"
                   name="access"
                   v-validate="{
                     rules: 'required|email',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.access"
                   @input="showSignUpCaptcha"
                   placeholder="邮箱（填写常用邮箱，用于登录）">
          </div>
          <div>
            <input type="text"
                   name="auth-code"
                   v-validate="{
                     rules: 'required|len:6',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.authCode"
                   placeholder="验证码">
            <button class="checkAndSend"
                    @click="checkAndSend"
                    ref="checkAndSend"
            >{{ getAuthCodeBtnText }}</button>
          </div>
          <div>
            <input v-if="signUp.watch"
                   type="text"
                   name="secret"
                   v-validate="{
                     rules: 'required|min:6|max:16',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.secret"
                   @input="showSignUpCaptcha"
                   placeholder="密码（6-16个字符组成，区分大小写）">
            <input type="password"
                   name="secret"
                   v-validate="{
                     rules: 'required|min:6|max:16',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.secret"
                   @input="showSignUpCaptcha"
                   placeholder="密码（6-16个字符组成，区分大小写）"
                   v-else>
            <button class="watch iconfont icon-eye"
                    :class="[ signUp.watch ? 'watch-on' : 'watch-off' ]"
                    @click="signUp.watch = !signUp.watch"
            ></button>
          </div>
          <div>
            <input class="last-input"
                   type="text"
                   v-validate="{
                     rules: 'len:6',
                     scope: 'sign-up'
                   }"
                   v-model="signUp.inviteCode"
                   name="invite-code"
                   placeholder="邀请码（可为空）">
          </div>
        </div>
        <div class="captcha" data-text="注册" ref="signUpCaptcha"></div>
        <span>
          <a @click="showOAuth">社交账号登录</a>
          <a @click="showLogin">已有账号»</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-sign',
    data () {
      return {
        showModal: false,
        showSignIn: false,
        showSignUp: false,
        signIn: {
          watch: false,
          captcha: false,
          remember: true,
          access: '',
          secret: '',
          method: 'email'
        },
        signUp: {
          watch: false,
          captcha: false,
          method: 'email',
          access: '',
          secret: '',
          nickname: '',
          authCode: '',
          inviteCode: '',
          tempAccess: '',
          timeout: 0
        },
        /**
         * signUpStep
         * 0：未获取 captcha
         * 1：已获取 captcha
         * 2：captcha 已认证通过
         * 3：access 是未被注册的
         * 4：邮件或短信已发送，倒数中，不可重复发
         * 5：可再次发送邮件或短信
         */
        signUpStep: 0
      }
    },
    watch: {
      showModal (val) {
        val ? this.$backdrop.show({
          ele: this.$refs.wrap
        }) : this.$backdrop.hide()
      },
      signUpStep (val) {
        if (val === 4) {
          this.signUp.timeout = 60
          const timer = setInterval(() => {
            if (!--this.signUp.timeout) {
              this.signUpStep = 5
              clearInterval(timer)
            }
          }, 1000)
        }
      }
    },
    computed: {
      getAuthCodeBtnText () {
        if (this.signUpStep === 4) {
          return `${this.signUp.timeout}秒后可重新获取`
        } else if (this.signUpStep === 5) {
          return '点击重新获取'
        }
        return '点击获取验证码'
      }
    },
    beforeMount () {
      this.$channel.$on('sign-in', () => {
        this.showLogin()
      })
      this.$channel.$on('sign-up', () => {
        this.showRegister()
      })
    },
    methods: {
      showLogin () {
        this.showModal = true
        this.showSignIn = true
        this.showSignUp = false
      },
      showRegister () {
        this.showModal = true
        this.showSignUp = true
        this.showSignIn = false
        if (this.signUpStep === 0) {
          this.signUpStep = 1
          this.getCaptcha('bind').then((captcha) => {
            const eventId = this.$eventManager.add(this.$refs.checkAndSend, 'click', () => {
              this.$validator.validate('sign-up.nickname').then((result) => {
                if (result) {
                  this.$validator.validate('sign-up.access').then((result) => {
                    if (result) {
                      if (this.signUp.access !== this.signUp.tempAccess) {
                        captcha.verify()
                      } else {
                        this.$toast.show(`请更换${this.signUp.method === 'email' ? '邮箱' : '手机'}`)
                      }
                    } else {
                      this.$toast.show(`请填写正确的${this.signUp.method === 'email' ? '邮箱' : '手机'}`)
                    }
                  })
                } else {
                  this.$toast.show('请先选择一个昵称')
                }
              })
            })
            captcha.onSuccess(() => {
              this.signUpStep = 2
              this.checkAccessCanUse().then((canUse) => {
                if (canUse) {
                  this.signUpStep = 3
                  this.getAuthCode()
                  this.$eventManager.del(eventId)
                } else {
                  this.signUp.tempAccess = this.signUp.access
                  this.$toast.show(`该${this.signUp.method === 'email' ? '邮箱' : '手机'}已绑定另外一个账号`)
                }
              })
            })
          })
        }
      },
      hiddenSign () {
        this.showModal = false
        this.showSignIn = false
        this.showSignUp = false
      },
      getCaptcha (product = 'float') {
        return new Promise((resolve, reject) => {
          this.$axios.$get('door/captcha').then((data) => {
            window.initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              product: product,
              width: '100%',
              offline: !data.success,
              new_captcha: data.new_captcha
            }, (captchaObj) => {
              resolve(captchaObj)
            })
          }).catch(reject)
        })
      },
      showSignInCaptcha () {
        if (!this.signIn.captcha) {
          this.$validator.validateAll('sign-in').then((result) => {
            if (result) {
              this.signIn.captcha = true
              this.getCaptcha().then((captcha) => {
                captcha.appendTo(this.$refs.signInCaptcha)
                captcha.onSuccess(() => {
                  this.login().then((res) => {
                    this.$cookie.set('JWT-TOKEN', res, { expires: this.signIn.remember ? 365 : null })
                    window.location.reload()
                  }).catch((err) => {
                    this.$toast.show(err)
                    setTimeout(() => {
                      captcha.reset()
                    }, 500)
                  })
                })
              }).catch(() => {
                this.signIn.captcha = false
              })
            }
          })
        }
      },
      showSignUpCaptcha () {
        if (!this.signUp.captcha) {
          this.$validator.validateAll('sign-up').then((result) => {
            if (result) {
              this.signUp.captcha = true
              this.getCaptcha().then((captcha) => {
                captcha.appendTo(this.$refs.signUpCaptcha)
                captcha.onSuccess(() => {
                  this.register().then((res) => {
                    this.$cookie.set('JWT-TOKEN', res)
                    window.location.reload()
                  }).catch((err) => {
                    this.$toast.show(err)
                    setTimeout(() => {
                      captcha.reset()
                    }, 500)
                  })
                })
              }).catch(() => {
                this.signUp.captcha = false
              })
            }
          })
        }
      },
      login () {
        return this.$axios.$post('door/login', {
          access: this.signIn.access,
          secret: this.signIn.secret,
          remember: this.signIn.remember,
          method: this.signIn.method
        })
      },
      register () {
        return this.$axios.$post('door/register', {
          method: this.signUp.method,
          access: this.signUp.access,
          secret: this.signUp.secret,
          nickname: this.signUp.nickname,
          authCode: this.signUp.authCode,
          inviteCode: this.signUp.inviteCode
        })
      },
      showOAuth () {
        this.$toast.show('暂未开放第三方登录')
      },
      forgotPassword () {
        this.$toast.show('暂未开放')
      },
      checkAndSend () {
        if (this.signUpStep === 5) {
          this.getAuthCode()
        }
      },
      checkAccessCanUse () {
        return new Promise((resolve, reject) => {
          this.$axios.post(`door/check/${this.signUp.method}/${this.signUp.access}`).then((res) => {
            resolve(!res.data)
          }).catch(reject)
        })
      },
      getAuthCode () {
        this.$axios.post('door/send', {
          method: this.signUp.method,
          access: this.signUp.access,
          nickname: this.signUp.nickname
        }).then(() => {
          this.signUpStep = 4
          this.$toast.show(`${this.signUp.method === 'email' ? '邮件' : '短信'}已发送，请查收`)
        })
      }
    }
  }
</script>
