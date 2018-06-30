<style lang="scss">
  #error-404 {

  }
</style>

<template>
  <div id="error-404">
    <p>您查找的页面不存在</p>
    <p>可能它从未出现过，也有可能是已经被删除</p>
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
    name: 'Error404'
  }
</script>
