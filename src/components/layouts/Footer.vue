<style lang="scss">
  #footer {
    width: 100%;
    z-index: 0;
    margin: 30px 0;
    text-align: center;

    .hr {
      margin: 0 50px;
      font-size: 14px;
    }

    .links {
      margin-top: 10px;
      color: #7f9eb2;
      font-size: 13px;
    }
  }
</style>

<template>
  <footer id="footer" v-if="show">
    <v-hr text="calibur - 天下漫友是一家"></v-hr>
    <div class="links">
      <a href="/about/hello" target="_blank">欢迎</a>
    </div>
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
