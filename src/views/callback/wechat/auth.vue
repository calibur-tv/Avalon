<style lang="scss">
</style>

<template>
  <div id="wechat-auth-callback">
    wechat-auth-callback
    <a :href="authUrl">
      微信登录
    </a>
    <div id="login-container"/>
  </div>
</template>

<script>
export default {
  name: "WechatAuth",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    authUrl() {
      return this.$utils.createWechatUrl(this);
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.createWechatLogin();
    });
  },
  methods: {
    createWechatLogin() {
      new WxLogin({
        self_redirect: true,
        appid: this.$store.state.pageData.wechat_app_id,
        redirect_uri: encodeURIComponent(window.location.href.split("?")[0]),
        id: "login-container",
        scope: "snsapi_login",
        state: "wechat_sign_in_callback"
      });
    }
  }
};
</script>
