<style lang="scss">
  #error-429 {

  }
</style>

<template>
  <div id="error-429">
    <p>您的访问频率太高了</p>
    <p>请不要以超越凡人的速度来访问该网站，休息一下再来吧</p>
    <router-link to="/">
      <el-button type="primary" size="mini" round>回首页</el-button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'error-429'
  }
</script>
