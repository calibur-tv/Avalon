<style lang="scss">
  .default-layout {
    margin-left: auto;
    margin-right: auto;
    @extend %clearfix;

    .layout-main, .layout-aside {
      padding-left: 15px;
      padding-right: 15px;
    }

    .layout-main {
      margin-bottom: 30px;
    }

    @media (min-width: 1120px) {
      width: 1160px;

      .layout-main {
        width: 75%;
        margin-bottom: 0;
        float: left;
      }

      .layout-aside {
        width: 25%;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="default-layout">
    <div class="layout-main">
      <slot name="main"/>
    </div>
    <div class="layout-aside">
      <slot name="aside"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VLayout'
  }
</script>
