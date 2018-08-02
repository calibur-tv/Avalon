<style lang="scss">
#invite-user {
  background-image: url("https://image.calibur.tv/banner/1532339810574-zl3.jpeg?imageMogr2/auto-orient/strip|imageView2/0/w/2048");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .signed {
    text-align: center;
    font-size: 14px;
    color: $color-text-normal;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 20px 40px;
    width: 580px;
    margin: 200px auto 0 auto;
    border-radius: 10px;
    font-weight: bold;

    button {
      margin-top: 10px;
    }
  }

  .sign-wrap {
    width: 580px;
    margin: 150px auto 0 auto;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 20px 40px;
    border-radius: 10px;

    h3 {
      text-align: center;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    input {
      padding-left: 15px !important;
    }
  }

  .el-alert {
    margin-bottom: 25px;

    p {
      margin-bottom: 5px;
      font-size: 13px;
      line-height: 18px;
      color: $color-text-normal;
    }
  }
}
</style>

<template>
  <div id="invite-user">
    <v-header type="mask"/>
    <div class="container">
      <template v-if="user">
        <p class="signed">
          你已经是注册用户了 (￣3￣)
          <br>
          快来邀请小伙伴一起注册 calibur 吧
          <br>
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom"
          >
            <div slot="content">点击复制我的邀请地址<br>邀请小伙伴们注册赚金币</div>
            <el-button
              ref="inviteBtn"
              :data-clipboard-text="`http://calibur.tv/about/invite/${user.id}`"
              type="warning"
              size="large"
            >
              邀请码：{{ user.id }}
            </el-button>
          </el-tooltip>
        </p>
      </template>
      <div
        v-else
        class="sign-wrap"
      >
        <h3>欢迎注册 calibur.tv</h3>
        <el-alert
          type="info"
          title=""
        >
          <p>注册之后，邀请者会收到短信提示，并且获得 1 枚金币；</p>
          <p>由于站内视频流量过大，为了降低宽带费用，先需要注册后才能看番，影响到了大家的体验，非常抱歉；</p>
          <p>另外
            <a
              href="/bangumi/34"
              target="_blank"
              class="href-fade-blue"
            >《进击的巨人》</a>
            资源每周同步更新，大家不要错过。
          </p>
        </el-alert>
        <sign-up-form :invite-code="inviteUserId"/>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpForm from "~/components/user/forms/SignUpForm";

export default {
  name: "InviteUser",
  components: {
    SignUpForm
  },
  computed: {
    inviteUserId() {
      return this.$route.params.id;
    },
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.watchCopyInviteLink();
  },
  methods: {
    watchCopyInviteLink() {
      if (!this.user) {
        return;
      }
      this.$nextTick(() => {
        const clipboard = new this.$copy(this.$refs.inviteBtn.$el);

        clipboard.on("success", () => {
          this.$toast.success("复制成功");
        });
      });
    }
  }
};
</script>
