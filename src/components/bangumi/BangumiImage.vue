<style lang="scss">
  #bangumi-image {

  }
</style>

<template>
  <div id="bangumi-image">
    <image-waterfall
      :loading="state.loading"
      @fetch="getData(false)"
    />
  </div>
</template>

<script>
  import ImageApi from '~/api/imageApi'
  import ImageWaterfall from '~/components/lists/ImageWaterfall'

  export default {
    name: 'BangumiImage',
    components: {
      ImageWaterfall
    },
    data () {
      return {
        state: {
          loading: false,
          fetched: false
        },
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      images () {
        return this.$store.state.image.waterfall
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-image', () => {
        if (!this.state.fetched) {
          this.getData(true)
        }
      })
    },
    methods: {
      async getData (force) {
        if (this.state.loading) {
          return
        }
        this.state.loading = true

        try {
          await this.$store.dispatch('image/getBangumiImages', {
            ctx: this,
            id: this.info.id,
            force
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.state.loading = false
          this.state.fetched = true
        }
      },
    }
  }
</script>
