<style lang="scss">
  #header-notification-box {
    width: 100%;
    height: 370px;
    overflow-y: auto;

    .header, .footer {
      height: 20px;
      background-color: transparent;
    }

    li {
      font-size: 13px;
      width: 100%;
      max-height: 50px;
      line-height: 20px;
      padding: 15px 20px;
      background-color: $color-gray-light;
      border-top: 1px solid #eee;

      &.checked {
        background-color: transparent;
      }
    }

    a {
      color: $color-blue-normal;
      font-size: 13px;
    }
  }
</style>

<template>
  <div id="header-notification-box">
    <div class="header"></div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="notFetch"
      infinite-scroll-distance="10"
    >
      <li v-for="item in list" :key="item.id" :class="{ 'checked': item.checked }" @click="readMsg(item.id)">
        <!-- 我的主题帖被回复了 -->
        <template v-if="item.type === 1">
          <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
          回复了你的帖子
          <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
        </template>
        <!-- 我的楼层贴被评论 / 回复了 -->
        <template v-else-if="item.type === 2">
          <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
          评论了你在帖子
          <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
          下的内容
        </template>
        <template v-else-if="item.type === 3">
          <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
          喜欢了你的帖子
          <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
        </template>
        <template v-else-if="item.type === 4">
          <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
          赞了你在帖子
          <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
          下的回复
        </template>
      </li>
    </ul>
    <div class="footer"></div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNotifications',
    computed: {
      list () {
        return this.$store.state.users.notifications.data
      },
      notFetch () {
        return this.loading || this.$store.state.users.notifications.noMore
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      readMsg (id) {
        this.$store.dispatch('users/readMessage', {
          id,
          ctx: this
        })
      },
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true

        await this.$store.dispatch('users/getNotifications', {
          ctx: this,
          init: false
        })
        this.loading = false
      }
    }
  }
</script>
