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
    <v-footer></v-footer>
    <v-side-bar></v-side-bar>
    <v-sign></v-sign>
    <image-reader></image-reader>
  </div>
</template>

<script>
  import vHeader from '~/components/layouts/Header'
  import vFooter from '~/components/layouts/Footer'
  import vSideBar from '~/components/layouts/SideBar'
  import vSign from '~/components/layouts/Sign'
  import ImageReader from '~/components/ImageReader'

  export default {
    components: {
      vHeader, vFooter, vSideBar, vSign, ImageReader
    }
  }
</script>
