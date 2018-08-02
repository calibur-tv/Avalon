<template>
  <div id="bangumi-manager">
    <header>
      <el-row>
        <el-col :span="8">
          <bangumi-search
            placeholder="选择番剧查询"
            @search="searchBangumiManager"
          />
        </el-col>
        <el-col
          :offset="10"
          :span="6"
          style="text-align: right"
        >
          <el-button
            type="warning"
            icon="el-icon-plus"
            size="medium"
            @click="addManager"
          >
            添加吧主
          </el-button>
        </el-col>
      </el-row>
    </header>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="昵称">
        <a
          slot-scope="scope"
          :href="$alias.user(scope.row.user.zone)"
          target="_blank"
          v-text="scope.row.user.nickname"
        />
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          {{ scope.row.is_leader ? '大吧主' : '小吧主' }}
        </template>
      </el-table-column>
      <el-table-column
        label="上任时间"
        prop="created_at"
      />
      <el-table-column
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <router-link :to="`/admin/user/show?zone=${scope.row.user.zone}`">
            <el-button
              size="mini"
              type="primary"
              style="margin-right: 10px"
            >查看用户</el-button>
          </router-link>
          <template v-if="isKing">
            <el-button
              type="danger"
              size="mini"
              @click="removeManager(scope.row.user.id, scope.$index)"
            >移除权限</el-button>
            <el-button
              v-if="scope.row.is_leader"
              type="warning"
              size="mini"
              @click="downgradeManager(scope.row.user.id, scope.$index)"
            >降为小吧主</el-button>
            <el-button
              v-else
              type="success"
              size="mini"
              @click="upgradeManager(scope.row.user.id, scope.$index)"
            >升为大吧主</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import BangumiApi from "~/api/bangumiApi";

export default {
  data() {
    return {
      bangumiId: 0,
      list: [],
      loading: false
    };
  },
  computed: {
    isKing() {
      return this.$store.state.user.id === 1;
    }
  },
  methods: {
    searchBangumiManager(id) {
      if (id === this.bangumiId) {
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.bangumiId = id;
      this.searchManagers();
    },
    async searchManagers() {
      const api = new BangumiApi(this);
      try {
        this.list = await api.managers({
          bangumiId: this.bangumiId
        });
      } catch (err) {
        this.$toast.error(err);
      } finally {
        this.loading = false;
      }
    },
    addManager() {
      if (!this.bangumiId) {
        this.$toast.error("请先选择番剧");
        return;
      }
      this.$prompt("请输入用户id", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "非法的id"
      })
        .then(({ value }) => {
          if (value < 1) {
            this.$toast.error("非法的id");
            return;
          }
          const api = new Api(this);
          api
            .setBangumiManager({
              bangumi_id: this.bangumiId,
              user_id: value
            })
            .then(() => {
              this.$toast.success("操作成功");
              window.location.reload();
            })
            .catch(e => {
              this.$toast.error(e);
            });
        })
        .catch(() => {});
    },
    removeManager(userId, index) {
      const api = new Api(this);
      api
        .removeBangumiManager({
          bangumi_id: this.bangumiId,
          user_id: userId
        })
        .then(() => {
          this.$toast.success("操作成功");
          this.list.splice(index, 1);
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    upgradeManager(userId, index) {
      const api = new Api(this);
      api
        .upgradeBangumiManager({
          bangumi_id: this.bangumiId,
          user_id: userId
        })
        .then(() => {
          this.$toast.success("操作成功");
          this.list[index].is_leader = 1;
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    downgradeManager(userId, index) {
      const api = new Api(this);
      api
        .downgradeBangumiManager({
          bangumi_id: this.bangumiId,
          user_id: userId
        })
        .then(() => {
          this.$toast.success("操作成功");
          this.list[index].is_leader = 0;
        })
        .catch(err => {
          this.$toast.error(err);
        });
    }
  }
};
</script>
