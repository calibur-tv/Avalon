<template>
  <div id="error-401">
    <p>继续操作前请先登录</p>
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
  name: 'Error401',
  methods: {
    sign() {
      this.$channel.$emit('sign-in')
    }
  }
}
</script>
