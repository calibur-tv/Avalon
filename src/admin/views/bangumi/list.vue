<style lang="scss">

</style>

<template>
  <div
    v-loading="loading"
    id="bangumi-list"
  >
    bangumi list
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    computed: {
      bangumis () {
        return this.$store.state.search.bangumis
      }
    },
    watch: {

    },
    created () {

    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        await this.$store.dispatch('search/fetchBangumis')
        this.loading = false
      }
    }
  }
</script>
