<style lang="scss">
.avatar-dialog-wrap {
  .user-face {
    margin: 0 -5px;
    display: inline-block;
    vertical-align: middle;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid #fff;
    }

    a {
      display: block;
    }
  }

  .el-icon-more {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    border: 3px solid #fff;
    background-color: $color-gray-normal;
    margin-left: -10px;

    &:hover {
      background-color: $color-gray-deep;
    }
  }
}
</style>

<template>
  <div class="avatar-dialog-wrap">
    <ul>
      <li
        v-for="user in displayUsers"
        :key="user.id"
        class="user-face"
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
            <img :src="$resize(user.avatar, { width: 80 })">
          </a>
        </el-tooltip>
      </li>
      <button
        v-if="users.length > displayCount"
        class="el-icon-more"
        @click="showDialog = true"
      />
    </ul>
    <v-dialog
      v-if="users.length > displayCount"
      v-model="showDialog"
      :title="title"
      :footer="false"
      :loading="source.loading"
      :no-more="source.noMore"
      :scroll="getMoreUser"
      class="likes-modal"
    >
      <li
        v-for="user in users"
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
            v-if="user.created_at"
            v-model="user.created_at"
            class="score"
          />
          <v-time
            v-else-if="user.score"
            v-model="user.score"
            class="score"
          />
        </a>
      </li>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AvaDialog',
  props: {
    type: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: [Number, String]
    },
    action: {
      required: true,
      type: String
    },
    displayCount: {
      type: Number,
      default: 7
    },
    title: {
      type: String,
      default: '用户列表'
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    source() {
      return this.$store.getters['social/getState'](this.type, this.id)[
        `${this.action}_users`
      ]
    },
    users() {
      return this.source.list
    },
    displayUsers() {
      return this.users.slice(0, this.displayCount)
    }
  },
  methods: {
    getMoreUser() {
      this.$store.dispatch('social/getUsers', {
        type: this.type,
        id: this.id,
        key: this.action
      })
    }
  }
}
</script>
