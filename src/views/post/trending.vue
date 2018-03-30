<style lang="scss">
  #post-trending {

    #load-post-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>

<template>
  <div id="post-trending">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.postTrending('new')">最新</router-link>
          <router-link :to="$alias.postTrending('hot')">最热</router-link>
        </div>
        <ul id="posts">
          <post-show-item
            v-for="item in post.data"
            :key="item.id"
            :item="item"
          ></post-show-item>
        </ul>
        <el-button
          :loading="loading"
          v-if="!post.noMore"
          id="load-post-btn"
          @click="loadMore"
          type="info"
          plain
        >{{ loading ? '加载中' : '加载更多' }}</el-button>
        <no-content v-if="post.noMore && !post.data.length"></no-content>
      </div>
    </div>
  </div>
</template>

<script>
  import PostShowItem from '~/components/items/PostShow'

  export default {
    name: 'PostNews',
    async asyncData ({ store, route, ctx }) {
      await store.dispatch('post/getTrending', {
        sort: route.params.sort,
        ctx
      })
    },
    components: {
      PostShowItem
    },
    computed: {
      sort () {
        return this.$route.params.sort
      },
      post () {
        return this.$store.state.post.trending[this.sort]
      }
    },
    data () {
      return {
        loading: false
      }
    },
    watch: {
      '$route' () {
        this.loadMore()
      }
    },
    methods: {
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true

        try {
          await this.$store.dispatch('post/getTrending', {
            ctx: this,
            sort: this.sort
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
