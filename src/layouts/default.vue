<style lang="scss">
  #layout-default {
    height: 100%;
    display: flex;
    flex-direction: column;

    >.main {
      flex-grow: 1;
    }
  }
</style>

<template>
  <div id="layout-default">
    <v-header></v-header>
    <router-view class="main"></router-view>
    <v-music></v-music>
    <v-footer></v-footer>
    <v-side-bar></v-side-bar>
  </div>
</template>

<script>
  import vHeader from 'component/layouts/Header.vue'
  import vMusic from 'component/layouts/Music.vue'
  import vFooter from 'component/layouts/Footer.vue'
  import vSideBar from 'component/layouts/SideBar.vue'

  export default {
    components: {
      vHeader, vMusic, vFooter, vSideBar
    },
    beforeMount () {
      // this.$axios.setToken(this.$store.state.token, 'Bearer')
    }
  }
</script>
