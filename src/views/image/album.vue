<style lang="scss">
  #image-album {

  }
</style>

<template>
  <div id="image-album">
    <v-banner></v-banner>
  </div>
</template>

<script>
  export default {
    name: 'image-album',
    async asyncData ({ store, route, ctx }) {
      await store.dispatch('image/getAlbumData', {
        ctx,
        id: route.params.id
      })
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
