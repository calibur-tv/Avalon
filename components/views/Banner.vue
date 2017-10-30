<style lang="scss" scoped="">
  #banner {
    width: 100%;
    height: $banner-hgt;
    margin-bottom: 40px;

    .another {
      display: none;
    }
  }
</style>

<template>
  <div id="banner" class="bg" :style="{ 'backgroundImage': `url(${bg})` }">
    <img class="another"
         v-if="bg"
         :src="bg"
         :flag="imageGrayLevel"
         crossOrigin="anonymous"
         @load="computedGray"
         ref="another"
         alt="another">
  </div>
</template>

<script>
  export default {
    name: 'v-banner',
    props: {
      image: {
        type: String,
        default: 'https://cdn.riuir.com/banner/1.jpg'
      }
    },
    data () {
      return {
        bg: this.$resize(this.image, { width: 1920, mode: 0 }),
        another: '',
        imageGrayLevel: 0
      }
    },
    methods: {
      computedGray () {
        this.$channel.$emit('change-page-background', {
          theme: 'blur',
          img: this.bg,
          gray: this.$imageGrayLevel(this.$refs.another)
        })
      }
    }
  }
</script>
