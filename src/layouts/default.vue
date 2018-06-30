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
    <v-header/>
    <router-view class="main-view"/>
    <v-footer/>
    <v-music/>
    <image-reader/>
    <no-ssr>
      <side-tools/>
    </no-ssr>
  </div>
</template>

<script>
  import vHeader from '~/components/layouts/Header'
  import vFooter from '~/components/layouts/Footer'
  import vMusic from '~/components/layouts/Music'
  import ImageReader from '~/components/ImageReader'
  import vCreator from '~/components/layouts/Creator'
  import SideTools from '~/components/layouts/Tools'

  export default {
    name: 'DefaultLayout',
    components: {
      vHeader,
      vFooter,
      ImageReader,
      vCreator,
      SideTools,
      vMusic
    }
  }
</script>
