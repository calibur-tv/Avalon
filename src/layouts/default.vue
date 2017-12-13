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
  import vHeader from '~/components/layouts/Header'
  import vMusic from '~/components/layouts/Music'
  import vFooter from '~/components/layouts/Footer'
  import vSideBar from '~/components/layouts/SideBar'
  import vSign from '~/components/layouts/Sign'

  export default {
    components: {
      vHeader, vMusic, vFooter, vSideBar, vSign
    }
  }
</script>
