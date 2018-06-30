<style lang="scss" scoped>
  #banner {
    width: 100%;
    height: $banner-hgt;
    margin-bottom: 35px;
    background-size: 100%;
  }
</style>

<template>
  <div
    id="banner"
    :style="{ 'backgroundImage': `url(${bg})` }"
    class="bg"
  />
</template>

<script>
  export default {
    name: 'VBanner',
    computed: {
      bg () {
        return this.$resize(this.$store.state.banner, { width: 1920, mode: 0 })
      }
    }
  }
</script>
