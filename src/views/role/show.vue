<style lang="scss">
  #role-show {
    .sub-title {
      margin-bottom: 20px;

      button {
        vertical-align: middle;
        padding: 5px 15px;
        margin-left: 10px;
      }
    }

    .col-main {
      .intro {
        .avatar-wrap {
          float: left;
          margin-right: 25px;
          text-align: center;

          .avatar {
            width: 150px;
            height: 150px;
            display: block;
          }

          button {
            margin-top: 15px;
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
            margin-bottom: 10px;

            strong {
              float: left;
            }

            li {
              float: left;
              margin-right: 10px;
              text-decoration: underline;
            }
          }

          .coin {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 10px;
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
            @include avatar(40px);
            margin-right: 10px;
          }
        }
      }
    }

    .col-aside {
      .fans {
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
    <v-header/>
    <div class="container">
      <aside class="col-aside">
        <div class="bangumi">
          <p class="sub-title">所属番剧</p>
          <v-bangumi-panel
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
            :followed="bangumi.followed"
            class="bangumi-panel"
            @follow="handleFollowBangumiAction"
          />
        </div>
        <div class="fans">
          <p class="sub-title">应援团{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <template v-if="fans.data.length">
            <ul>
              <li
                v-for="user in displayFans"
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
                v-if="role.fans_count > 6"
                class="more-btn el-icon-more"
                @click="openFansModal('new')"
              />
            </ul>
          </template>
          <template v-else>
            <span>TA 还没有真正的粉丝...</span>
          </template>
        </div>
      </aside>
      <div class="col-main">
        <div class="intro clearfix">
          <p class="sub-title">角色信息</p>
          <div class="avatar-wrap">
            <img
              :src="$resize(role.avatar, { width: 200 })"
              class="avatar"
            >
            <el-button
              type="warning"
              class="star"
              size="mini"
              round
              plain
              @click="handleStarRole"
            >为TA应援</el-button>
          </div>
          <div class="info">
            <h1
              class="name"
              v-text="role.name"
            />
            <p class="summary">
              <strong>简介：</strong>{{ role.intro }}
            </p>
            <ul class="alias">
              <strong>别名：</strong>
              <li
                v-for="(name, index) in computeRoleAlias"
                :key="index"
                v-text="name"
              />
            </ul>
            <p
              v-if="role.star_count"
              class="coin"
            >
              <strong>粉丝：</strong>共有 {{ role.fans_count }} 个粉丝，收获了 {{ role.star_count }} 个金币
            </p>
          </div>
        </div>
        <div
          v-if="role.lover"
          class="lover"
        >
          <p class="sub-title">
            守护者
            <el-button
              size="mini"
              round
              @click="openFansModal('hot')"
            >排行榜</el-button>
          </p>
          <a
            :href="$alias.user(role.lover.zone)"
            class="user"
            target="_blank"
          >
            <div class="avatar">
              <img :src="$resize(role.lover.avatar, { width: 80 })">
            </div>
            <span v-text="role.lover.nickname"/>
          </a>
        </div>
      </div>
      <v-dialog
        v-model="toggleFansListModal"
        :footer="false"
        :title="`${role.name} · 应援团`"
        :scroll="fetchRoleFans"
        :loading="loadingRoleFans"
        :no-more="noMoreFans"
        class="likes-modal"
      >
        <li
          v-for="item in fansModalData"
          :key="item.id"
        >
          <a
            :href="$alias.user(item.zone)"
            class="user"
            target="_blank"
          >
            <img
              :src="$resize(item.avatar, { width: 80 })"
              class="avatar"
            >
            <span
              class="nickname"
              v-text="item.nickname"
            />
            <v-time
              v-if="focusRoleSort === 'new'"
              v-model="item.score"
              class="score"
            />
            <span
              v-else
              class="score"
            >{{ item.score }}个金币</span>
          </a>
        </li>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RoleShow',
    async asyncData ({ store, route, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('cartoonRole/getRoleInfo', { ctx, id }),
        store.dispatch('cartoonRole/getFansList', {
          ctx,
          bangumiId: 0,
          roleId: id,
          sort: 'new',
          reset: false
        })
      ])
    },
    head () {
      return {
        title: `${this.role.name} - 角色`,
        meta: [
          { hid: 'description', name: 'description', content: this.role.intro },
          { hid: 'keywords', name: 'keywords', content: `calibur,角色,天下漫友是一家,${this.role.alias}` }
        ]
      }
    },
    data () {
      return {
        toggleFansListModal: false,
        loadingRoleImageFetch: false,
        loadingRoleFans: false,
        focusRoleSort: 'new'
      }
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
      fans () {
        return this.$store.state.cartoonRole.fans.new
      },
      computeRoleAlias () {
        return this.role.alias.split(',')
      },
      displayFans () {
        return this.fans.data.slice(0, 6)
      },
      fansModalData () {
        return this.focusRoleSort === 'new'
          ? this.fans.data
          : this.$store.state.cartoonRole.fans.hot.data
      },
      noMoreFans () {
        return this.$store.state.cartoonRole.fans[this.focusRoleSort].noMore
      }
    },
    methods: {
      handleFollowBangumiAction (result) {
        this.$store.commit('cartoonRole/FOLLOW_ROLE_BANGUMI', { result })
      },
      async handleStarRole () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.$store.state.user.coin) {
          this.$toast.error('金币不足')
          return
        }
        try {
          await this.$store.dispatch('cartoonRole/star', {
            bangumiId: this.bangumi.id,
            roleId: this.id,
            ctx: this,
            hasStar: this.role.hasStar
          })
          this.$store.commit('USE_COIN')
          this.$toast.success(`+${this.role.hasStar}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async fetchRoleFans (init = false) {
        if (init && this.fansModalData.length > 10) {
          return
        }
        if (this.loadingRoleFans) {
          return
        }
        this.loadingRoleFans = true
        try {
          await this.$store.dispatch('cartoonRole/getFansList', {
            ctx: this,
            bangumiId: this.bangumi.id,
            roleId: this.id,
            sort: this.focusRoleSort
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleFans = false
        }
      },
      openFansModal (sort) {
        this.focusRoleSort = sort
        this.toggleFansListModal = true
        this.fetchRoleFans(true)
      }
    }
  }
</script>
