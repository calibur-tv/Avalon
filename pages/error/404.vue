<style lang="scss">
#error-404 {
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
  <div id="error-404">
    <v-header />
    <div class="error-message">
      <img
        class="error-img"
        src="https://image.calibur.tv/owner/error/404.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/500"
      />
      <div class="error-show">
        <div class="error-config">
          <p>您查找的页面不存在</p>
          <p>可能它从未出现过，也有可能是已经被删除</p>
          <router-link to="/">
            <el-button type="primary" size="mini" round>回首页</el-button>
          </router-link>
        </div>
        <div class="error-log">
          <p>错误信息：您查找的页面不存在</p>
        </div>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'

export default {
  name: 'Error404',
  layout: 'empty',
  components: {
    vFooter
  },
  mounted() {
    this.$store.dispatch('initAuth')
  }
}
</script>
