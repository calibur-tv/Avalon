<template>
  <div>
    <nuxt/>
    <v-footer/>
    <v-music/>
    <not-ssr>
      <side-tools/>
    </not-ssr>
    <not-ssr>
      <v-sign/>
    </not-ssr>
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'
import vMusic from '~/components/layouts/Music'
import SideTools from '~/components/layouts/SideTools'
import vSign from '~/components/layouts/Sign'

export default {
  name: 'DefaultLayout',
  components: {
    vFooter,
    SideTools,
    vMusic,
    vSign
  },
  mounted() {
    this.$store.dispatch('initAuth')
    this.$store.dispatch('bangumi/getAllBangumi')
  }
}
</script>
