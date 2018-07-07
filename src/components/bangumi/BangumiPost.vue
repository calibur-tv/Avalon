<template>
  <div id="bangumi-post">
    <ul>
      <post-show-item
        v-for="item in postList"
        :key="item.id"
        :item="item"
      />
    </ul>
    <el-button
      v-if="!posts.noMore"
      :loading="state.loading"
      class="load-more-btn"
      type="info"
      plain
      @click="getData"
    >{{ state.loading ? '加载中' : '加载更多' }}</el-button>
    <no-content v-if="posts.noMore && !posts.total && !topPosts.length">
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >发表《{{ info.name }}》的第一个帖子</el-button>
    </no-content>
  </div>
</template>

<script>
  import PostShowItem from '~/components/items/PostShow'

  export default {
    name: 'BangumiPost',
    components: {
      PostShowItem
    },
    data () {
      return {
        state: {
          loading: false,
          fetched: true
        },
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      posts () {
        return this.$store.state.bangumi.posts
      },
      topPosts () {
        return this.$store.state.bangumi.topPosts
      },
      postList () {
        return this.topPosts.concat(this.posts.data)
      }
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-post', () => {
        if (!this.state.fetched) {
          this.getData()
        }
      })
    },
    methods: {
      async getData () {
        if (this.state.loading || this.posts.noMore) {
          return
        }
        this.state.loading = true

        try {
          await this.$store.dispatch('bangumi/getPosts', {
            ctx: this,
            id: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.state.loading = false
        }
      },
      openFeedback () {
        this.$channel.$emit('show-create-post-modal')
      },
    }
  }
</script>
