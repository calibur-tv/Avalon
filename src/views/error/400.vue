<template>
  <div id="error-400">
    <p>您发送的请求参数校验不通过</p>
    <p>这代表着您访问的链接是错误的，您可以尝试修改参数</p>
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
  name: "Error400"
};
</script>
