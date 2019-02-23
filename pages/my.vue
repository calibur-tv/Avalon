<style lang="scss">
#my-space {
  min-height: 100vh;

  .side-bar {
    margin-bottom: 15px;

    .nuxt-link-active {
      background-color: $color-gray-normal;
    }

    a {
      display: block;
      padding: 15px;
      transition: 0.5s;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: $color-gray-normal;
      }
    }
  }

  .page-header {
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    text-align: right;
    padding-right: 20px;

    button {
      font-size: 13px;
      line-height: 40px;
      color: $color-text-normal;
    }
  }
}
</style>

<template>
  <div id="my-space">
    <v-header type="pure" />
    <v-layout :left="false">
      <template slot="aside">
        <ul class="side-bar">
          <li>
            <nuxt-link to="/my/notification">
              <el-badge :value="userCount" :hidden="!userCount" :max="99">
                我的消息
              </el-badge>
            </nuxt-link>
            <nuxt-link to="/my/notice">
              <el-badge :value="systemCount" :hidden="!systemCount" :max="99">
                系统通知
              </el-badge>
            </nuxt-link>
          </li>
        </ul>
      </template>
      <div class="page-header">
        <button @click="readAll">
          <i class="el-icon-check" />
          <span>全部设为已读</span>
        </button>
      </div>
      <nuxt-child />
    </v-layout>
  </div>
</template>

<script>
import { Badge } from 'element-ui'
import { readAllMessage } from '~/api/userApi'

export default {
  name: 'MySpace',
  components: {
    'el-badge': Badge
  },
  computed: {
    userCount() {
      const result = this.notificationsCount - this.systemCount
      return result < 0 ? 0 : result
    },
    systemCount() {
      return this.$store.state.users.notifications.system_count
    },
    notificationsCount() {
      if (!this.$store.state.isAuth) {
        return 0
      }
      const result =
        this.$store.state.user.notification -
        this.$store.state.users.notifications.checked
      return result < 0 ? 0 : result
    }
  },
  async asyncData({ store }) {
    await store.dispatch('users/getNotifications', { init: true })
  },
  methods: {
    async readAll() {
      if (!this.notificationsCount) {
        return
      }
      await readAllMessage(this)
      this.$store.commit('users/READ_ALL_NOTIFICATION')
    }
  }
}
</script>
