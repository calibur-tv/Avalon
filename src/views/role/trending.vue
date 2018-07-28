<style lang="scss">
  #trending-role {
    .layout-main {
      margin-left: 15px;

      .item {
        position: relative;
        margin-top: 15px;
        float: none;

        &:not(:last-child) {
          border-bottom: 1px solid #F0F0F0;
        }

        .top {
          position: relative;
          display: block;
          float: right;

          &:before {
            content: attr(data-index);
            line-height: 48px;
          }
        }

        &:first-of-type {
          .top:before {
            color: goldenrod;
            font-size: 28px;
            line-height: 44px;
          }
        }

        &:nth-of-type(2) {
          .top:before {
            color: indianred;
            font-size: 22px;
            line-height: 44px;
          }
        }

        &:nth-of-type(3) {
          .top:before {
            color: silver;
            font-size: 16px;
            line-height: 44px;
          }
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
          float: left;
          overflow: hidden;
          border-radius: 5px;
          margin-right: 10px;
          border: 1px solid $color-gray-normal;

          img {
            width: 100%;
            height: auto;
          }
        }

        .summary {
          overflow: hidden;
          height: 100px;

          .role {
            display: block;
            font-size: 14px;
            line-height: 20px;
            height: 60px;
            overflow: hidden;

            .name {
              font-weight: bold;
            }

            .intro {
              color: #000;
            }
          }

          .lover {
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            font-size: 13px;
            color: $color-text-normal;
            margin-top: 20px;

            img {
              width: 20px;
              height: 20px;
              border-radius: 15px;
              vertical-align: middle;
              border: 1px solid $color-gray-normal;
              margin-left: 10px;
            }
          }
        }

        .footer {
          height: 44px;
          line-height: 44px;

          .bangumi {
            color: #999;
            font-size: 12px;
            overflow: hidden;
            margin-right: 8px;
          }

          .stats {
            text-align: right;
            color: #666;
            float: right;

            span {
              margin-left: 10px;
              font-size: 12px;
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="trending-role">
    <v-header/>
    <v-layout>
      <template slot="main">
        <h2 class="sub-title">偶像排行榜</h2>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="notFetch"
          infinite-scroll-distance="50"
        >
          <li
            v-for="(item, index) in list"
            :key="item.id"
            class="item"
          >
            <div class="clearfix">
              <a
                :href="$alias.cartoonRole(item.id)"
                target="_blank"
                class="avatar"
              >
                <v-img
                  :src="item.avatar"
                  width="90"
                  height="90"
                />
              </a>
              <div class="summary">
                <a
                  :href="$alias.cartoonRole(item.id)"
                  target="_blank"
                  class="role"
                >
                  <span
                    class="name"
                    v-text="item.name"
                  />
                  <span class="intro">：{{ item.intro }}</span>
                </a>
                <div
                  v-if="item.lover_id"
                  class="lover"
                >
                  <span>守护者：</span>
                  <a
                    :href="$alias.user(item.lover_zone)"
                    class="fr"
                    target="_blank"
                  >
                    <span v-text="item.lover_nickname"/>
                    <v-img
                      :src="item.lover_avatar"
                      width="20"
                      height="20"
                    />
                  </a>
                </div>
                <div
                  v-else
                  class="lover"
                />
              </div>
              <div class="footer">
                <div class="stats">
                  <span>
                    粉丝:
                    {{ $utils.shortenNumber(item.fans_count) }}
                  </span>
                  <span>
                    金币:
                    {{ $utils.shortenNumber(item.star_count) }}
                  </span>
                  <span>排名:</span>
                  <span
                    :data-index="item.fans_count ? index + 1 : '无'"
                    class="top"
                  />
                </div>
                <a
                  :href="$alias.bangumi(item.bangumi_id)"
                  class="bangumi"
                  target="_blank"
                  v-text="item.bangumi_name"
                />
              </div>
            </div>
          </li>
        </ul>
      </template>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'TrendingRole',
    async asyncData ({ store }) {
      await store.dispatch('cartoonRole/getTrending')
    },
    head: {
      title: '角色排行榜'
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      list () {
        return this.$utils.orderBy(this.$store.state.cartoonRole.trending.data, 'star_count', 'desc')
      },
      notFetch () {
        return this.loading || this.$store.state.cartoonRole.trending.noMore
      }
    },
    methods: {
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('cartoonRole/getTrending')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
