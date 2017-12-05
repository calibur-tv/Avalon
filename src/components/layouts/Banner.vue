<style lang="scss" scoped="">
  #banner {
    width: 100%;
    height: $banner-hgt;
    margin-bottom: 40px;
  }
</style>

<template>
  <div id="banner" class="bg" :style="{ 'backgroundImage': `url(${bg})` }"></div>
</template>

<script>
  export default {
    name: 'v-banner',
    props: {
      image: {
        type: String,
        default: 'https://cdn.calibur.tv/banner/1.jpg'
      }
    },
    data () {
      return {
        bg: this.$resize(this.image, { width: 1920, mode: 0 })
      }
    },
    beforeMount () {
      this.$channel.$emit('change-page-background', {
        theme: 'blur',
        img: this.bg
      })
    }
  }
</script>
