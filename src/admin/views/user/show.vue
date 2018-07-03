<style lang="scss">
  #user-show {
    .user {
      >div {
        margin-bottom: 20px;
        font-size: 16px;
      }

      .label {
        font-weight: bold;
        display: inline-block;
        text-align: right;
        width: 80px;
      }

      img {
        vertical-align: top;
      }

      .avatar {
        width: 150px;
        height: 150px;
      }

      .banner {
        height: 200px;
        width: auto;
      }
    }
  }
</style>

<template>
  <div
    v-loading="searching"
    id="user-show"
  >
    <header>
      <user-search
        :disabled="true"
        @submit="searchUserByZone"
      />
    </header>
    <div
      v-if="user"
      class="user"
    >
      <div>
        <span class="label">id：</span>
        {{ user.id }}
      </div>
      <div>
        <span class="label">昵称：</span>
        {{ user.nickname }}
      </div>
      <div>
        <span class="label">空间：</span>
        <a
          :href="$alias.user(user.zone)"
          target="_blank"
          v-text="user.zone"
        />
      </div>
      <div>
        <span class="label">头像：</span>
        <img
          :src="$resize(user.avatar, { width: 300 })"
          class="avatar"
        >
      </div>
      <div>
        <span class="label">背景：</span>
        <a
          :href="user.banner"
          target="_blank"
        >
          <img
            :src="$resize(user.banner, { height: 200, mode: 2 })"
            class="banner"
          >
        </a>
      </div>
      <div>
        <span class="label">签名：</span>
        {{ user.signature || '无' }}
      </div>
      <div>
        <span class="label">手机号：</span>
        {{ user.phone }}
      </div>
      <div>
        <span class="label">运营号：</span>
        {{ user.faker == 1 ? '是' : '否' }}
      </div>
      <div>
        <span class="label">金币数：</span>
        {{ user.coin_count }}
      </div>
      <div>
        <span class="label">性别：</span>
        {{ user.sex }}
      </div>
      <div>
        <span class="label">生日：</span>
        {{ user.birthday }}
      </div>
      <div>
        <span class="label">状态：</span>
        {{ user.deleted_at ? '已封禁' : user.state == 1 ? '审核中' : '正常' }}
      </div>
      <div>
        <span class="label">权限：</span>
        {{ user.is_admin ? '管理员' : '普通用户' }}
      </div>
      <div>
        <span class="label">操作：</span>
        <el-button
          v-if="user.state == 0"
          :loading="loading"
          type="warning"
          size="mini"
          @click="addUserToTrial"
        >加入审核列表</el-button>
        <el-button
          v-if="user.deleted_at"
          :loading="loading"
          type="success"
          size="mini"
          @click="recover"
        >
          解禁
        </el-button>
        <el-button
          v-else
          :loading="loading"
          type="danger"
          size="mini"
          @click="block"
        >
          封禁
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'

  export default {
    data () {
      return {
        searching: false,
        user: null,
        loading: false
      }
    },
    computed: {
      queryZone () {
        return this.$route.query.zone || ''
      }
    },
    watch: {
      $route () {
        this.user = null
        if (this.queryZone) {
          this.searchUserByZone(this.queryZone)
        }
      }
    },
    created () {
      if (this.queryZone) {
        this.searchUserByZone(this.queryZone)
      }
    },
    methods: {
      async searchUserByZone (zone) {
        if (this.searching) {
          return
        }
        this.searching = true;
        const api = new Api(this);
        try {
          this.user = await api.searchUser({ zone })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.searching = false;
        }
      },
      async addUserToTrial () {
        if (this.loading) {
          return
        }
        this.loading = true;
        const api = new Api(this);
        try {
          await api.addUserToTrial({
            id: this.user.id
          });
          this.$toast.success('操作成功');
          this.user.state = 1
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      async recover () {
        if (this.loading) {
          return
        }
        this.loading = true;
        const api = new Api(this);
        try {
          await api.recoverUser({
            id: this.user.id
          })
          this.$toast.success('操作成功');
          this.user.deleted_at = null
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      async block () {
        if (this.loading) {
          return
        }
        this.loading = true;
        const api = new Api(this);
        try {
          await api.blockUser({
            id: this.user.id
          })
          this.$toast.success('操作成功');
          this.user.deleted_at = Date.now()
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
