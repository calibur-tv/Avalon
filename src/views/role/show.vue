<style lang="scss">
  #role-show {
    .subtitle {
      margin-top: 35px;
      margin-bottom: 20px;
    }

    .col-main {
      .intro {
        .avatar-wrap {
          float: left;
          margin-right: 20px;

          .avatar {
            width: 150px;
            height: 150px;
            display: block;
          }
        }

        .info {
          overflow: hidden;

          .name {
            font-size: 42px;
            margin-bottom: 10px;
          }

          .summary {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 10px;
          }

          .alias {
            line-height: 24px;
            font-size: 14px;

            li {
              float: left;
              margin-right: 10px;
              text-decoration: underline;
            }
          }
        }
      }

      .lover {
        .user {

          .avatar {
            display: inline-block;
            vertical-align: middle;
            border: 1px solid #F0F0F0;
            overflow: hidden;
            @include avatar(40px)
          }
        }
      }
    }

    .col-aside {
      .fans {
        li {
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

        .more-btn {
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
  }
</style>

<template>
  <div id="role-show">
    <v-banner></v-banner>
    <div class="container">
      <aside class="col-aside">
        <div class="bangumi">
          <p class="subtitle">所属番剧</p>
          <v-bangumi-panel
            class="bangumi-panel"
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
            :followed="bangumi.followed"
            @follow="handleFollowBangumiAction"
          ></v-bangumi-panel>
        </div>
        <div class="fans">
          <p class="subtitle">应援团{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <template v-if="fans.length">
            <ul>
              <li v-for="user in displayFans" :key="user.zone">
                <el-tooltip class="item" effect="dark" :content="user.nickname" placement="top">
                  <a :href="$alias.user(user.zone)" target="_blank">
                    <v-img
                      :src="$resize(user.avatar, { width: 64, height: 64 })"
                      :alt="user.zone"
                    ></v-img>
                  </a>
                </el-tooltip>
              </li>
              <button
                v-if="role.fans_count > 7"
                @click="openFansListModal = true"
                class="more-btn el-icon-more"
              ></button>
            </ul>
          </template>
          <template v-else>
            <span>TA 还没有真正的粉丝...</span>
          </template>
        </div>
      </aside>
      <div class="col-main">
        <div class="intro clearfix">
          <p class="subtitle">角色信息</p>
          <div class="avatar-wrap">
            <img class="avatar" :src="$resize(role.avatar, { width: 200 })">
          </div>
          <div class="info">
            <h1 class="name" v-text="role.name"></h1>
            <p class="summary" v-text="role.intro"></p>
            <ul class="alias">
              <li
                v-for="(name, index) in computeRoleAlias"
                v-text="name"
                :key="index"
              ></li>
            </ul>
          </div>
        </div>
        <div class="lover" v-if="role.lover">
          <p class="subtitle">守护者</p>
          <a class="user" target="_blank" :href="$alias.user(role.lover.zone)">
            <div class="avatar">
              <img :src="$resize(role.lover.avatar, { width: 80 })">
            </div>
            <span v-text="role.lover.nickname"></span>
          </a>
        </div>
        <div class="images">
          <p class="subtitle">相册</p>
          <image-waterfall
            :loading="loadingRoleImageFetch"
            @fetch="getRoleImages(false)"
          ></image-waterfall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageWaterfall from '~/components/lists/ImageWaterfall'

  export default {
    name: 'role-show',
    async asyncData ({ store, route, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('cartoonRole/getRoleInfo', { ctx, id }),
        store.dispatch('image/getRoleImages', { ctx, id })
      ])
    },
    components: {
      ImageWaterfall
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      info () {
        return this.$store.state.cartoonRole.info
      },
      role () {
        return this.info.data
      },
      bangumi () {
        return this.info.bangumi
      },
      images () {
        return this.info.images
      },
      fans () {
        return this.info.fans
      },
      computeRoleAlias () {
        return this.role.alias.split(',')
      },
      displayFans () {
        return this.fans.slice(0, 7)
      }
    },
    data () {
      return {
        openFansListModal: false,
        loadingRoleImageFetch: false
      }
    },
    methods: {
      handleFollowBangumiAction (result) {
        this.$store.commit('cartoonRole/FOLLOW_ROLE_BANGUMI', { result })
      },
      async getRoleImages (force) {
        if (this.loadingRoleImageFetch) {
          return
        }
        this.loadingRoleImageFetch = true
        try {
          await this.$store.dispatch('image/getRoleImages', {
            ctx: this,
            id: this.id,
            force
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleImageFetch = false
        }
      }
    }
  }
</script>
