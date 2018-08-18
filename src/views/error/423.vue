<template>
  <div id="error-423">
    <p>你访问的资源正在审核中，请不要重复发表相同内容</p>
    <p>如果已经过了很久了它仍然在审核中，那么可以尝试加入我们的QQ群进行反馈</p>
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
  name: "Error423"
};
</script>
