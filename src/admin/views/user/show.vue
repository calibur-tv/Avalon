<style lang="scss">
#user-show {
  margin-bottom: 150px;

  .user {
    margin-bottom: 50px;

    > div {
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
        <span class="label">创建时间：</span>
        {{ user.created_at }}
      </div>
      <div>
        <span class="label">状态：</span>
        {{ user.deleted_at ? '已封禁' : user.state == 1 ? '审核中' : '正常' }}
      </div>
      <div>
        <span class="label">权限：</span>
        {{ user.is_admin == 1 ? '管理员' : '普通用户' }}
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
          v-if="!showTransactions"
          type="primary"
          size="mini"
          @click="getTransactions(1)"
        >
          查看交易记录
        </el-button>
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
        <el-button
          v-if="isKing"
          type="success"
          size="mini"
          @click="getMoney"
        >
          提现
        </el-button>
      </div>
    </div>
    <template v-if="showTransactions">
      <el-table
        :data="pageData"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          label="id"
          prop="id"
        />
        <el-table-column
          label="类型"
          prop="type"
        />
        <el-table-column label="金额">
          <span slot-scope="scope">
            {{ scope.row.type === '支出' ? '-' : '+' }}{{ scope.row.count }}
          </span>
        </el-table-column>
        <el-table-column
          label="来源"
          prop="action"
        />
        <el-table-column
          label="来源id"
          prop="action_id"
        />
        <el-table-column label="相关用户 id">
          <a
            slot-scope="scope"
            :href="`/admin/user/show?id=${scope.row.about_user_id}`"
            target="_blank"
            v-text="scope.row.about_user_id"
          />
        </el-table-column>
        <el-table-column
          label="相关用户手机号"
          prop="about_user_phone"
        />
        <el-table-column
          label="相关用户注册时间"
          prop="about_user_sign_at"
        />
        <el-table-column
          label="交易时间"
          prop="created_at"
        />
      </el-table>
      <v-page
        :change="getTransactions"
        :state="pageState"
      />
    </template>
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import pageMixin from "~/mixins/page";

export default {
  mixins: [pageMixin],
  data() {
    return {
      searching: false,
      user: null,
      loading: false,
      showTransactions: false
    };
  },
  computed: {
    queryZone() {
      return this.$route.query.zone || "";
    },
    queryId() {
      return +(this.$route.query.id || 0);
    },
    isKing() {
      return this.$store.state.user.id === 1;
    }
  },
  watch: {
    $route() {
      this.user = null;
      if (this.queryZone) {
        this.searchUserByZone(this.queryZone);
      }
    }
  },
  created() {
    if (this.queryZone) {
      this.searchUserByZone(this.queryZone);
    }
    if (this.queryId) {
      this.searchUserById(this.queryId);
    }
  },
  methods: {
    async getTransactions(page) {
      this.showTransactions = true;
      if (page <= this.pageState.max) {
        this.pageState.cur = page;
        return;
      }
      if (this.pageLoading) {
        return;
      }
      this.pageLoading = true;
      this.pageState.size = 20;
      const api = new Api(this);
      try {
        const data = await api.getUserCoinTransactions({
          id: this.user.id,
          to_page: page,
          cur_page: this.pageState.cur,
          take: this.pageState.size
        });
        this.pageState.total = data.total;
        this.pageState.cur = page;
        this.pageState.max = page;
        if (page === 1) {
          this.pageList = data.list;
        } else {
          this.pageList = this.pageList.concat(data.list);
        }
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.pageLoading = false;
      }
    },
    async searchUserByZone(zone) {
      if (this.searching) {
        return;
      }
      this.searching = true;
      const api = new Api(this);
      try {
        this.user = await api.searchUser({ zone });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.searching = false;
      }
    },
    async searchUserById(id) {
      if (this.searching) {
        return;
      }
      this.searching = true;
      const api = new Api(this);
      try {
        this.user = await api.searchUser({ id });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.searching = false;
      }
    },
    async addUserToTrial() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        await api.addUserToTrial({
          id: this.user.id
        });
        this.$toast.success("操作成功");
        this.user.state = 1;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    },
    async recover() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        await api.recoverUser({
          id: this.user.id
        });
        this.$toast.success("操作成功");
        this.user.deleted_at = null;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    },
    async block() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        await api.blockUser({
          id: this.user.id
        });
        this.$toast.success("操作成功");
        this.user.deleted_at = Date.now();
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    },
    getMoney() {
      this.$prompt("输入要提现的金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          const data = +value;
          if (data !== data) {
            this.$toast.error("错误的格式");
            return;
          }
          if (!/^\d+$/.test(data)) {
            this.$toast.error("必须是整数");
            return;
          }
          if (data <= 0) {
            this.$toast.error("必须大于0");
            return;
          }
          const api = new Api(this);
          api
            .withdrawal({
              id: this.user.id,
              money: data
            })
            .then(() => {
              this.$toast.success("操作成功");
            })
            .catch(e => {
              this.$toast.error(e);
            });
        })
        .catch(() => {});
    }
  }
};
</script>
