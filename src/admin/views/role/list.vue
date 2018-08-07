<style lang="scss">
#role-list {
  .avatar {
    img {
      width: 60px;
      height: 60px;
      vertical-align: middle;
      margin-left: 2px;
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="role-list"
  >
    <header>
      <el-row>
        <el-col :span="10">
          <bangumi-search
            placeholder="请先选择番剧"
            @search="handleBangumiSearch"
          />
        </el-col>
      </el-row>
    </header>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="名称"
      >
        <a
          slot-scope="scope"
          :href="$alias.cartoonRole(scope.row.id)"
          target="_blank"
          class="avatar"
        >
          <img :src="$resize(scope.row.avatar, { width: 120 })">
          <span v-text="scope.row.name"/>
        </a>
      </el-table-column>
      <el-table-column
        label="粉丝数"
        prop="fans_count"
      />
      <el-table-column
        label="金币数"
        prop="star_count"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/admin/role/edit/${scope.row.id}`">
            <el-button
              size="small"
              type="primary"
            >编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "~/api/bangumiApi";

export default {
  data() {
    return {
      bangumiId: 0,
      list: [],
      loading: false
    };
  },
  methods: {
    async getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api();
      try {
        this.list = await api.roles({
          bangumiId: this.bangumiId
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    },
    handleBangumiSearch(id) {
      if (this.bangumiId !== id) {
        this.bangumiId = id;
        this.getData();
      }
    }
  }
};
</script>
