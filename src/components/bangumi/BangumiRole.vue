<style lang="scss">
  #bangumi-role {
    .role {
      float: none;
      display: block;
      position: relative;
      padding-bottom: 15px;
      margin-top: 15px;
      margin-right: 30px;

      &:not(:last-child) {
        border-bottom: 1px solid #F0F0F0;
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

        .info {
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

        .star {
          float: right;
          margin-top: 14px;
          border-radius: 14px;
        }
      }

      .footer {
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        color: $color-text-normal;
        text-align: right;

        img {
          width: 20px;
          height: 20px;
          border-radius: 15px;
          vertical-align: middle;
          border: 1px solid $color-gray-normal;
          margin-left: 2px;
          margin-top: -3px;
        }

        a {
          font-size: 12px;
          color: $color-text-normal;
        }

        span {
          font-size: 12px;
        }

        .load-list {
          cursor: pointer;
        }
      }
    }

    .load-more-roles {
      margin-top: 30px;
      text-align: center;
    }
  }
</style>

<template>
  <div id="bangumi-role">
    <ul>
      <li
        v-for="item in roles.data"
        :key="item.id"
        class="role"
      >
        <div class="clearfix">
          <a
            :href="$alias.cartoonRole(item.id)"
            class="avatar"
            target="_blank"
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
              class="info"
            >
              <span
                class="name"
                v-text="item.name"
              />
              <span class="intro">：{{ item.intro }}</span>
            </a>
            <el-button
              type="warning"
              class="star"
              size="mini"
              plain
              @click="handleStarRole(item)"
            >为TA应援</el-button>
          </div>
        </div>
        <div
          v-if="item.fans_count"
          class="footer"
        >
          <span>
            粉丝:
            {{ $utils.shortenNumber(item.fans_count) }}
          </span>
          ·
          <span>
            金币:
            {{ $utils.shortenNumber(item.star_count) }}
          </span>
          ·
          <span v-if="item.lover">
            守护者:
            <a
              :href="$alias.user(item.lover.zone)"
              target="_blank"
            >
              {{ item.lover.nickname }}
              <v-img
                :src="item.lover.avatar"
                width="20"
                height="20"
              />
            </a>
          </span>
          ·
          <span
            class="load-list"
            @click="showRoleDetail(item, 'new')"
          >最新应援</span>
          ·
          <span
            class="load-list"
            @click="showRoleDetail(item, 'hot')"
          >最多应援</span>
        </div>
      </li>
    </ul>
    <el-button
      v-if="!roles.noMore"
      :loading="state.loading"
      class="load-more-btn"
      type="info"
      plain
      @click="getRoles"
    >{{ state.loading ? '加载中' : '加载更多' }}</el-button>
    <template v-if="roles.noMore">
      <div
        v-if="roles.data.length"
        class="load-more-roles"
      >
        <el-button
          type="primary"
          round
          @click="openFeedback"
        >没有你喜欢的角色？</el-button>
      </div>
      <no-content v-else>
        <el-button
          type="primary"
          round
          @click="openFeedback"
        >求偶像</el-button>
      </no-content>
    </template>
    <v-dialog
      v-model="openRolesModal"
      :title="`${currentRole.name} · 应援团`"
      :footer="false"
      :loading="loadingRoleFans"
      :no-more="currentRoleFans.noMore"
      :scroll="fetchCurrentRoleFans"
      class="likes-modal"
    >
      <li
        v-for="item in currentRoleFans.data"
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
</template>

<script>
  export default {
    name: 'BangumiRole',
    data () {
      return {
        state: {
          loading: false,
          fetched: false
        },
        openRolesModal: false,
        loadingRoleFans: false,
        focusRoleSort: 'new',
        currentRole: {},
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      roles () {
        return this.$store.state.bangumi.roles
      },
      currentRoleFans () {
        return this.$store.state.cartoonRole.fans[this.focusRoleSort]
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-role', () => {
        if (!this.state.fetched) {
          this.getData()
        }
      })
    },
    methods: {
      async getData () {
        if (this.state.loading) {
          return
        }
        this.state.loading = true

        try {
          await this.$store.dispatch('bangumi/getRoles', {
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.state.loading = false
          this.state.fetched = true
        }
      },
      async fetchCurrentRoleFans (reset = false) {
        if (this.loadingRoleFans) {
          return
        }
        this.loadingRoleFans = true
        try {
          await this.$store.dispatch('cartoonRole/getFansList', {
            ctx: this,
            bangumiId: this.info.id,
            roleId: this.currentRole.id,
            sort: this.focusRoleSort,
            reset
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleFans = false
        }
      },
      showRoleDetail (role, sort) {
        this.currentRole = role
        this.openRolesModal = true
        this.focusRoleSort = sort
        this.fetchCurrentRoleFans(true)
      },
      async handleStarRole (role) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.$store.state.user.coin) {
          this.$toast.error('金币不足')
          return
        }
        try {
          await this.$store.dispatch('bangumi/starRole', {
            bangumiId: this.info.id,
            roleId: role.id,
            ctx: this,
            hasStar: role.has_star
          })
          this.$store.commit('USE_COIN')
          this.$toast.success(`+${role.has_star}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      },
      openFeedback () {
        this.$channel.$emit('open-feedback', {
          type: 6,
          desc: `我想要为《${this.info.name}》的 ? 应援`
        })
      },
    }
  }
</script>
