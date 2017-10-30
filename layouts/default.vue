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
    <nuxt/>
    <v-music></v-music>
    <v-footer></v-footer>
    <v-side-bar></v-side-bar>
  </div>
</template>

<script>
  import vHeader from '~/components/views/Header.vue'
  import vMusic from '~/components/views/Music.vue'
  import vFooter from '~/components/views/Footer.vue'
  import vSideBar from '~/components/views/SideBar.vue'

  export default {
    components: {
      vHeader, vMusic, vFooter, vSideBar
    },
    beforeMount () {
      this.$axios.setToken(this.$store.state.token, 'Bearer')
      this.$axios.$get('door/user').then(user => {
        if (user) {
          this.$store.commit('SET_USER', user)
        }
      })
    }
  }
</script>
