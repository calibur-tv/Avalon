<style lang="scss">
  #invite-user {
    .signed {
      text-align: center;
      font-size: 14px;
      color: $color-text-normal;
      padding-top: 100px;
      line-height: 30px;

      button {
        margin-top: 10px;
      }
    }

    .sign-wrap {
      width: 500px;
      margin: 0 auto;

      h3 {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
      }

      input {
        padding-left: 15px !important;
      }
    }
  }
</style>

<template>
  <div id="invite-user">
    <v-banner></v-banner>
    <div class="container">
      <template v-if="user">
        <h3 class="sub-title">欢迎注册 calibur.tv</h3>
        <p class="signed">
          你已经是注册用户了 (￣3￣)
          <br>
          快来邀请小伙伴一起注册 calibur 吧
          <br>
          <el-tooltip class="item" effect="dark" placement="bottom">
            <div slot="content">点击复制我的邀请地址<br/>邀请小伙伴们注册赚金币</div>
            <el-button
              type="warning"
              size="large"
              :data-clipboard-text="`http://calibur.tv/about/invite/${user.id}`"
              ref="inviteBtn"
            >
              邀请码：{{ user.id }}
            </el-button>
          </el-tooltip>
        </p>
      </template>
      <div class="sign-wrap" v-else>
        <h3>欢迎注册 calibur.tv</h3>
        <sign-up-form
          :invite-code="inviteUserId"
        ></sign-up-form>
      </div>
    </div>
  </div>
</template>

<script>
  import SignUpForm from '~/components/forms/SignUpForm'

  export default {
    name: 'invite-user',
    components: {
      SignUpForm
    },
    computed: {
      inviteUserId () {
        return this.$route.params.id
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      watchCopyInviteLink () {
        if (!this.user) {
          return
        }
        this.$nextTick(() => {
          const clipboard = new this.$copy(this.$refs.inviteBtn.$el)

          clipboard.on('success', () => {
            this.$toast.success('复制成功')
          })
        })
      }
    },
    mounted () {
      this.watchCopyInviteLink()
    }
  }
</script>
