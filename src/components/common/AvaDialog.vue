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
    margin-left: -5px;

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
      :loading="loading"
      :no-more="noMore"
      :scroll="fetch"
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
    users: {
      required: true,
      type: Array
    },
    fetch: {
      required: true,
      type: Function
    },
    displayCount: {
      type: Number,
      default: 7
    },
    loading: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
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
    displayUsers() {
      return this.users.slice(0, this.displayCount)
    }
  }
}
</script>
