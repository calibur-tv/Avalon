<style lang="scss">
#app-download {
  overflow: hidden;
  position: relative;
  height: 100vh;

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .qr-code {
      width: 180px;
      height: 180px;
    }

    .info {
      img {
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;
      }

      .text {
        height: 50px;
        overflow: hidden;
        font-size: 30px;
        line-height: 30px;

        p {
          margin-top: 4px;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }

    button {
      width: 175px;
      border-radius: 20px;
      background-color: $color-pink-deep;
      color: #fff;
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 25vh;
    }

    .not-work {
      background-color: $color-text-light;
    }
  }
}
</style>

<template>
  <div id="app-download">
    <v-header type="pure"/>
    <div class="content">
      <img
        class="qr-code"
        src="https://image.calibur.tv/owner/download-qr.png?imageMogr2/auto-orient/strip"
      >
      <div class="info">
        <img
          src="https://image.calibur.tv/owner/logo-new/logo.png?imageMogr2/auto-orient/strip|imageView2/1/w/200/h/200/format/jpg"
        >
        <div class="text">
          calibur.tv
          <p>天下漫友是一家</p>
        </div>
      </div>
    </div>
    <vue-particles/>
  </div>
</template>

<script>
import VueParticles from '~/components/particles.vue'

export default {
  name: 'AppDownload',
  components: {
    VueParticles
  }
}
</script>
