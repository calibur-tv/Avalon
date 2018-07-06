<style lang="scss">
  #bangumi-aside {
    #tags {
      margin-bottom: 20px;

      li {
        margin-right: 10px;
        margin-bottom: 10px;
        float: left;
      }
    }

    #followers {
      .no-one {
        color: $color-text-normal;
      }
    }
  }
</style>

<template>
  <div id="bangumi-aside">
    <div
      v-if="tags.length"
      id="tags"
    >
      <h2 class="sub-title">标签</h2>
      <ul>
        <li
          v-for="tag in tags"
          :key="tag.id"
          class="tag"
        >
          <a
            :href="$alias.bangumiTag(tag.id)"
            class="tag-btn"
            target="_blank"
            v-text="tag.name"
          />
        </li>
      </ul>
    </div>
    <div id="followers">
      <h2 class="sub-title">关注的人{{ info.count_like ? `（${info.count_like}）` : '' }}</h2>
      <ava-dialog
        v-if="info.count_like"
        :users="followers"
        :fetch="fetchMoreFollowers"
        :title="`《${info.name}》的关注者们`"
        :loading="loadingFollowers"
        :no-more="noMoreFollowers"
      />
      <span
        v-else
        class="no-one"
      >还没有人关注</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BangumiAside',
    data () {
      return {
        openFollowersModal: false,
        loadingFollowers: false,
        fetchFollowersCount: 10
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      tags () {
        return this.info.tags
      },
      followers () {
        return this.info.followers
      },
      displayFollowers () {
        return this.followers.slice(0, 7)
      },
      noMoreFollowers () {
        return this.info.noMoreFollowers
      }
    },
    methods: {
      async fetchMoreFollowers () {
        if (this.loadingFollowers || this.noMoreFollowers) {
          return
        }
        this.loadingFollowers = true
        try {
          await this.$store.dispatch('bangumi/getFollowers', {
            ctx: this,
            bangumiId: this.info.id,
            take: this.fetchFollowersCount
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollowers = false
        }
      },
    }
  }
</script>
