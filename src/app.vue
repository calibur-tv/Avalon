<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { qiniu, script } from 'env'

  export default {
    name: 'Entry',
    head: {
      title: 'calibur',
      titleTemplate: '%s - 天下漫友是一家',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      bodyAttrs: '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'renderer', content: 'webkit' },
        { hid: 'description', name: 'description', content: 'calibur，兴趣使然的二次元综合网站' },
        { hid: 'keywords', name: 'keywords', content: 'calibur，动漫，ACG，二次元，视频，番剧，动画，新番，神作' },
        { name: 'banner', content: 'https://image.calibur.tv/banner/1.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${qiniu.host}/favicon.ico` }
      ],
      script: [
        { src: '//cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' },
        { innerHTML: script.baiduStat, type: 'text/javascript' },
        { innerHTML: script.baiduPush, type: 'text/javascript' },
        { innerHTML: script.google, type: 'text/javascript' }
      ],
      __dangerouslyDisableSanitizers: 'script'
    }
  }
</script>
