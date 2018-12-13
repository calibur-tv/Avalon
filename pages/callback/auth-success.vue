<style lang="scss">
#auth-success {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: $color-blue-normal;
    margin-bottom: 10px;
    font-size: 20px;
  }
}
</style>

<template>
  <div id="auth-success">
    <p>
      {{ message }},（{{ timer }}s后自动跳转）
    </p>
    <a href="/">点击返回首页</a>
  </div>
</template>

<script>
export default {
  name: 'AuthSuccess',
  data() {
    return {
      timer: 5
    }
  },
  computed: {
    message() {
      return this.$route.query.message
    }
  },
  mounted() {
    setInterval(() => {
      if (this.timer === 1) {
        window.location = 'https://www.calibur.tv'
      } else {
        this.timer--
      }
    }, 1000)
  }
}
</script>
