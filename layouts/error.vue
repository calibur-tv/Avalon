<style lang="scss">
#error-page {
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
  <div id="error-page">
    <v-header />
    <div class="error-message">
      <img
        class="error-img"
        src="https://image.calibur.tv/owner/error/404.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/500"
      />
      <div class="error-show">
        <div class="error-config">
          <template v-if="statusCode === 401">
            <p>继续操作前请先登录</p>
            <el-button
              type="primary"
              size="mini"
              round
              @click="$channel.$emit('sign-in')"
              >登录</el-button
            >
          </template>
          <template v-else-if="statusCode === 403">
            <p>您没有足够的操作权限</p>
            <p>可能您已经登录了，但没有权限；或者需要登录后再尝试</p>
            <router-link to="/">
              <el-button type="primary" size="mini" round>回首页</el-button>
            </router-link>
          </template>
          <template v-else-if="statusCode === 404">
            <p>您查找的页面不存在</p>
            <p>可能它从未出现过，也有可能是已经被删除</p>
            <router-link to="/">
              <el-button type="primary" size="mini" round>回首页</el-button>
            </router-link>
          </template>
          <template v-else-if="statusCode === 423">
            <p>你访问的资源正在审核中，请不要重复发表相同内容</p>
            <p>
              如果已经过了很久了它仍然在审核中，那么可以尝试加入我们的QQ群进行反馈
            </p>
            <router-link to="/">
              <el-button type="primary" size="mini" round>回首页</el-button>
            </router-link>
          </template>
          <template v-else-if="statusCode === 429">
            <p>您的访问频率太高了</p>
            <p>请不要以超越凡人的速度来访问该网站，休息一下再来吧</p>
            <router-link to="/">
              <el-button type="primary" size="mini" round>回首页</el-button>
            </router-link>
          </template>
          <template v-else>
            <p>您访问的页面出现了错误</p>
            <p>
              可以尝试加入我们的QQ群，将这个错误反馈给无能的站长，说不定他能修复呢
            </p>
            <router-link to="/">
              <el-button type="primary" size="mini" round>回首页</el-button>
            </router-link>
          </template>
        </div>
        <div class="error-log">
          <p>错误信息：{{ message }}</p>
        </div>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'

export default {
  name: 'nuxt-error', // eslint-disable-line
  components: {
    vFooter
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || `Error`
    }
  },
  mounted() {
    this.$store.dispatch('initAuth')
  }
}
</script>
