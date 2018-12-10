<style lang="scss">
#layout-default {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  > .main-view {
    flex-grow: 1;
  }
}
</style>

<template>
  <div id="layout-default">
    <router-view class="main-view"/>
    <v-footer/>
    <v-music/>
    <no-ssr>
      <side-tools/>
    </no-ssr>
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'
import vMusic from '~/components/layouts/Music'
import vCreator from '~/components/layouts/Creator'
import SideTools from '~/components/layouts/Tools'

export default {
  name: 'DefaultLayout',
  components: {
    vFooter,
    vCreator,
    SideTools,
    vMusic
  }
}
</script>
