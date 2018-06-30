<style lang="scss">
  #error-401 {

  }
</style>

<template>
  <div id="error-401">
    <p>继续操作前请先登录</p>
    <el-button type="primary" size="mini" @click="sign" round>登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'error-401',
    methods: {
      sign () {
        this.$channel.$emit('sign-in')
      }
    }
  }
</script>
