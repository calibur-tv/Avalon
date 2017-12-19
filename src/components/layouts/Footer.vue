<style lang="scss">
  #footer {
    width: 100%;
    z-index: -1;

    .slogan {
      @include hr(14px, 30px, 50px, 30px);
    }
  }
</style>

<template>
  <footer id="footer" v-if="show">
    <p class="slogan" data-text="calibur - 天下漫友是一家"></p>
  </footer>
</template>

<script>
  export default {
    name: 'v-footer',
    computed: {
      show () {
        return this.$route.name !== 'homepage'
      }
    }
  }
</script>
