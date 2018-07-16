<template>
  <div id="image-trending">
    <v-header/>
    <div class="container">
      <div class="col-aside"/>
      <div class="col-main">
        <div class="breadcrumb-links">
          <a
            :class="{ 'router-link-active': $route.params.sort === 'news' }"
            :href="$alias.imageTrending('news')"
          >最新上传</a>
          <a
            :class="{ 'router-link-active': $route.params.sort === 'active' }"
            :href="$alias.imageTrending('active')"
          >最近活跃</a>
          <a
            :class="{ 'router-link-active': $route.params.sort === 'hot' }"
            :href="$alias.imageTrending('hot')"
          >最多喜欢</a>
        </div>
        <image-waterfall-flow
          :list="images.list"
          :no-more="images.noMore"
          :loading="images.loading"
          @load="loadMore"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

  export default {
    name: 'ImageTrending',
    async asyncData ({ store, route, ctx }) {
      const sort = route.params.sort
      if (['news', 'active', 'hot'].indexOf(sort) === -1) {
        const error = new Error()
        error.code = 404
        throw error
      }
      await store.dispatch('trending/getTrending', {
        type: 'image',
        sort,
        ctx,
        take: 12
      })
    },
    components: {
      ImageWaterfallFlow
    },
    head: {
      title: '相册'
    },
    computed: {
      sort () {
        return this.$route.params.sort
      },
      images () {
        return this.$store.state.trending.type === 'image'
          ? this.$store.state.trending[this.sort]
          : []
      }
    },
    methods: {
      async loadMore () {
        try {
          await this.$store.dispatch('trending/loadMore', {
            type: 'image',
            sort: this.sort,
            take: 12,
            ctx: this
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>
