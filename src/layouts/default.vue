<style lang="scss">
  #layout-default {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    >.main-view {
      flex-grow: 1;
    }
  }
</style>

<template>
  <div id="layout-default">
    <v-header></v-header>
    <router-view class="main-view"></router-view>
    <v-music></v-music>
    <v-footer></v-footer>
    <v-side-bar></v-side-bar>
    <v-sign></v-sign>
  </div>
</template>

<script>
  import vHeader from 'component/layouts/Header.vue'
  import vMusic from 'component/layouts/Music.vue'
  import vFooter from 'component/layouts/Footer.vue'
  import vSideBar from 'component/layouts/SideBar.vue'
  import vSign from 'component/layouts/Sign.vue'

  export default {
    components: {
      vHeader, vMusic, vFooter, vSideBar, vSign
    }
  }
</script>
