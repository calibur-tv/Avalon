<style lang="scss">
  #error-default {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .error-message {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      .error-img {
        width: 260px;
        height: 260px;
        margin-right: 50px;
        border-radius: 50%;
      }

      .error-show {
        border-left: 1px #ccd0d7 dashed;
        margin-bottom: 50px;
        padding-left: 26px;
      }
    }

    .error-config {
      p {
        line-height: 1.8;
      }

      button {
        margin-top: 10px;
        margin-bottom: 5px;
        margin-right: 10px;
      }
    }

    .error-log {
      width: 500px;
      margin: 0 auto;
      color: #99a2aa;
      font-size: 12px;

      p {
        word-break: break-all;
        max-height: 195px;
        margin-top: 10px;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div id="error-default">
    <v-header/>
    <div class="error-message">
      <img
        class="error-img"
        src="https://image.calibur.tv/owner/error/404.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/500"
      >
      <div class="error-show">
        <router-view class="error-config"/>
        <div class="error-log">
          <p>错误来源：{{ from }}</p>
          <p>错误信息：{{ message }}</p>
        </div>
      </div>
    </div>
    <v-footer/>
  </div>
</template>

<script>
  import vHeader from '~/components/layouts/Header'
  import vFooter from '~/components/layouts/Footer'

  export default {
    name: 'ErrorLayout',
    components: {
      vHeader,
      vFooter
    },
    computed: {
      params () {
        return this.$route.query
      },
      message () {
        return this.params.message
      },
      from () {
        return decodeURIComponent(this.params.redirect)
      }
    }
  }
</script>
