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
      .follower {
        margin-right: -10px;
        float: left;

        a {
          overflow: hidden;
          border-radius: 50%;
          display: inline-block;
          width: 40px;
          height: 40px;
        }

        img {
          width: 100%;
          height: 100%;
          display: block;
          border: 3px solid #fff;
          border-radius: 50%;
        }
      }

      .no-one {
        color: $color-text-normal;
      }

      .followers-more-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: $color-gray-normal;
        color: #fff;
        border: 3px solid #fff;

        &:hover {
          background-color: $color-gray-deep;
        }
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
      <template v-if="info.count_like">
        <ul>
          <li
            v-for="user in displayFollowers"
            :key="user.zone"
            class="follower"
          >
            <el-tooltip
              :content="user.nickname"
              class="item"
              effect="dark"
              placement="top"
            >
              <a
                :href="$alias.user(user.zone)"
                target="_blank"
              >
                <v-img
                  :src="$resize(user.avatar, { width: 64, height: 64 })"
                  :alt="user.zone"
                />
              </a>
            </el-tooltip>
          </li>
          <button
            v-if="info.count_like > 7"
            class="followers-more-btn el-icon-more"
            @click="openFollowersModal = true"
          />
        </ul>
        <v-dialog
          v-model="openFollowersModal"
          :title="`《${info.name}》的关注者们`"
          :footer="false"
          :loading="loadingFollowers"
          :no-more="noMoreFollowers"
          :scroll="fetchMoreFollowers"
          class="likes-modal"
        >
          <li
            v-for="user in followers"
            :key="user.id"
          >
            <a
              :href="$alias.user(user.zone)"
              class="user"
              target="_blank"
            >
              <img
                :src="$resize(user.avatar, { width: 120 })"
                class="avatar"
              >
              <span
                class="nickname"
                v-text="user.nickname"
              />
              <v-time
                v-model="user.created_at"
                class="score"
              />
            </a>
          </li>
        </v-dialog>
      </template>
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
