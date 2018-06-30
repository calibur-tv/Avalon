<style lang="scss">
  #error-403 {

  }
</style>

<template>
  <div id="error-403">
    <p>您没有足够的操作权限</p>
    <p>可能您已经登录了，但没有权限；或者需要登录后再尝试</p>
    <router-link to="/">
      <el-button
        type="primary"
        size="mini"
        round
      >回首页</el-button>
    </router-link>
    <el-button
      type="primary"
      size="mini"
      round
      @click="sign"
    >登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Error403',
    methods: {
      sign () {
        this.$channel.$emit('sign-in')
      }
    }
  }
</script>
