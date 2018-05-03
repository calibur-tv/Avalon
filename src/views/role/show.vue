<style lang="scss">
  #role-show {

  }
</style>

<template>
  <div id="role-show">

  </div>
</template>

<script>
  export default {
    name: 'role-show',
    async asyncData ({ store, route, ctx }) {
      await store.dispatch('cartoonRole/getRoleInfo', {
        id: route.params.id,
        ctx
      })
    },
    computed: {
      id () {
        return this.$route.params.id
      }
    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    },
    mounted () {

    }
  }
</script>
