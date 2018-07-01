<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:</div>
    <div class="dashboard-text">roles:</div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard'
  }
</script>
