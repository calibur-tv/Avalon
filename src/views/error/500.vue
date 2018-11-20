<template>
  <div id="error-500">
    <p>您访问的页面出现了错误</p>
    <p>可以尝试加入我们的QQ群，将这个错误反馈给无能的站长，说不定他能修复呢</p>
    <router-link to="/">
      <el-button
        type="primary"
        size="mini"
        round
      >回首页</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Error500'
}
</script>
