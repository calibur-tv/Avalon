<style lang="scss">
  #bangumi-image {
  }
</style>

<template>
  <div id="bangumi-image">
    <image-waterfall-flow
      v-if="images"
      :list="images.list"
      :no-more="images.noMore"
      :loading="images.loading"
      @load="loadMore"
    />
  </div>
</template>

<script>
  import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

  export default {
    name: 'BangumiImage',
    components: {
      ImageWaterfallFlow
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      images () {
        return this.$store.state.trending.type === 'image'
          ? this.$store.state.trending.active
          : null
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-image', () => {
        this.getData()
      })
    },
    methods: {
      async getData () {
        try {
          await this.$store.dispatch('trending/getTrending', {
            type: 'image',
            sort: 'active',
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async loadMore () {
        try {
          await this.$store.dispatch('trending/loadMore', {
            type: 'image',
            sort: 'active',
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
    }
  }
</script>
