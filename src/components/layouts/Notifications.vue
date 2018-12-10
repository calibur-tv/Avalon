<style lang="scss">
#header-notification-box {
  width: 100%;
  height: 370px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;

  .header {
    height: 5px;
    background-color: transparent;
    flex-shrink: 0;
  }

  .main {
    overflow-y: auto;
    flex-grow: 1;
  }

  li {
    font-size: 13px;
    width: 100%;
    min-height: 50px;
    line-height: 20px;
    padding: 0 20px;
    background-color: $color-gray-light;

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

  .footer {
    height: 30px;
    background-color: #fff;
    flex-shrink: 0;
    border-top: 1px solid #ddd;
    text-align: right;
    padding-right: 20px;

    button {
      font-size: 12px;
      line-height: 30px;
      color: $color-text-normal;
    }
  }
}
</style>

<template>
  <div id="header-notification-box">
    <div class="header"/>
    <div class="main">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="notFetch"
        infinite-scroll-distance="10"
      >
        <li
          v-for="item in list"
          :key="item.id"
          :class="{ 'checked': item.checked }"
          @click="readMsg(item.id)"
        >
          <div
            @click.prevent="handleMessageClick($event, item)"
            v-html="item.message"
          />
        </li>
      </ul>
    </div>
    <div class="footer">
      <button @click="readAll">全部设为已读</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNotifications',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    list() {
      return this.$store.state.users.notifications.list
    },
    notFetch() {
      return this.loading || this.$store.state.users.notifications.noMore
    },
    notificationsCount() {
      const result =
        this.$store.state.user.notification -
        this.$store.state.users.notifications.checked
      return result < 0 ? 0 : result
    }
  },
  methods: {
    readMsg(id) {
      this.$store.dispatch('users/readMessage', {
        id,
        ctx: this
      })
    },
    async loadMore() {
      if (this.loading) {
        return
      }
      this.loading = true

      try {
        await this.$store.dispatch('users/getNotifications', {
          ctx: this,
          init: false
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    },
    readAll() {
      if (!this.notificationsCount) {
        return
      }
      this.$store.dispatch('users/readAllMessage', this)
    },
    handleMessageClick(evt, msg) {
      if (!msg.link) {
        return
      }
      if (/user/.test(evt.target.classList)) {
        window.open(this.$alias.user(msg.user.zone))
        return
      }
      window.open(msg.link)
    }
  }
}
</script>
