<style lang="scss" scoped="">

</style>

<template>

</template>

<script>
  const defaultParams = {
    take: 15,
    page: 1
  }

  export default {
    name: 'post-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('post/getPost', {
        id: route.params.id,
        ctx,
        take: defaultParams.take,
        page: defaultParams.page
      })
    },
    components: {

    },
    props: {

    },
    watch: {

    },
    computed: {

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
