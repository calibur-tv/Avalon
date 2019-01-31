<style lang="scss">
.default-layout {
  height: 100vh;

  .main-view {
    min-height: 100%;
  }
}
</style>

<template>
  <div class="default-layout">
    <nuxt class="main-view"/>
    <v-footer/>
    <v-music/>
    <not-ssr>
      <side-tools/>
    </not-ssr>
    <not-ssr>
      <v-sign/>
    </not-ssr>
    <not-ssr>
      <gift-modal/>
    </not-ssr>
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'
import vMusic from '~/components/layouts/Music'
import SideTools from '~/components/layouts/SideTools'
import vSign from '~/components/layouts/Sign'
import GiftModal from '~/components/common/GiftModal'

export default {
  name: 'DefaultLayout',
  components: {
    vFooter,
    SideTools,
    vMusic,
    GiftModal,
    vSign
  },
  mounted() {
    this.$store.dispatch('initAuth')
    this.$store.dispatch('bangumi/getAllBangumi')
  }
}
</script>
