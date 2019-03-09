<style lang="scss">
#header-notification-box {
  width: 100%;
  position: relative;

  .main {
    li {
      font-size: 14px;
      width: 100%;
      line-height: 22px;
      padding: 0 20px;
      background-color: rgba($color-blue-light, 0.1);
      cursor: pointer;

      div {
        padding: 15px 0;
        word-break: break-all;
      }

      &:not(:first-child) {
        div {
          border-top: 1px solid #eee;
        }
      }

      &.checked {
        background-color: transparent;
      }
    }

    a {
      color: $color-blue-normal;
      font-size: 13px;
      margin: 0 3px;
    }
  }

  #no-content {
    margin-top: 30px;
  }
}
</style>

<template>
  <div id="header-notification-box">
    <div class="main">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          :class="{ checked: item.checked }"
          @click="readMsg(item.id)"
        >
          <div
            @click.prevent="handleMessageClick($event, item)"
            v-html="item.message"
          />
        </li>
      </ul>
      <flow-state
        :display-no-more="false"
        :fetch="loadMore"
        :no-more="noMore"
        :nothing="noMore && !list.length"
        :loading="loading"
      >
        <no-content slot="nothing" />
      </flow-state>
    </div>
  </div>
</template>

<script>
import FlowState from '~/components/flow/FlowState'

export default {
  name: 'HeaderNotifications',
  components: {
    FlowState
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    list() {
      return this.$store.state.users.notifications.list
    },
    noMore() {
      return this.$store.state.users.notifications.noMore
    }
  },
  methods: {
    readMsg(id) {
      this.$store.dispatch('users/readMessage', { id })
    },
    async loadMore() {
      if (this.loading) {
        return
      }
      this.loading = true

      try {
        await this.$store.dispatch('users/getNotifications', { init: false })
      } catch (e) {
        // do nothing
      } finally {
        this.loading = false
      }
    },
    handleMessageClick(evt, msg) {
      if (/user/.test(evt.target.classList)) {
        window.open(this.$alias.user(msg.user.zone))
        return
      }
      window.open(msg.link)
    }
  }
}
</script>
