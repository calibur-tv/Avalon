<style lang="scss">
#system-notice {
  li {
    list-style-type: none;
    display: block;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    padding: 12px;

    header {
      margin-bottom: 15px;
      font-size: 14px;
      color: $color-text-normal;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .avatar {
        margin-right: 6px;
      }
    }

    main {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;

      &:hover {
        background-color: $color-gray-normal;
      }

      .banner {
        width: 100px;
        height: 100px;
        margin-right: 15px;
        border-radius: 4px;
      }

      .title {
        overflow: hidden;
        font-size: 15px;
        color: $color-text-normal;
        font-weight: 500;
      }
    }
  }
}
</style>

<template>
  <div id="system-notice">
    <li
      v-for="(item, index) in list"
      :key="index"
    >
      <header>
        <v-img
          :src="item.user.avatar"
          :width="40"
          :height="40"
          :avatar="true"
          class="avatar"
        />
        <span
          class="nickname"
          v-text="item.user.nickname" />
        <span>发了通知</span>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <v-time v-model="item.created_at" />
      </header>
      <main @click="openNotice(item)">
        <img 
          :src="$resize(item.banner, { width: 200 })"
          class="banner" >
        <div 
          class="title" 
          v-text="item.title" />
      </main>
    </li>
  </div>
</template>

<script>
import { getSystemNotice } from '~/api/userApi'

export default {
  name: 'Notice',
  asyncData({ app }) {
    return getSystemNotice(app).then(list => {
      return { list }
    })
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.$store.dispatch('users/readNotice', {
      id: this.list[0].id
    })
  },
  methods: {
    openNotice(item) {
      window.open(`/app/notice/${item.id}`)
    }
  }
}
</script>
