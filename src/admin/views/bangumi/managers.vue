<template>
  <div
    v-loading="pageLoading"
    id="bangumi-list"
  >
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="番剧">
        <template slot-scope="scope">
          <a
            :href="$alias.bangumi(scope.row.bangumi.id)"
            target="_blank"
          >{{ scope.row.bangumi.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="版主">
        <template slot-scope="scope">
          <span>{{ scope.row.is_leader !== '0' ? '【大】' : '【小】' }}</span>
          <a
            :href="$alias.user(scope.row.user.zone)"
            target="_blank"
          >{{ scope.row.user.nickname }}</a>
        </template>
      </el-table-column>
      <el-table-column label="番剧活跃度">
        <template slot-scope="scope">
          <span>{{ scope.row.bangumi.power }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户战斗力">
        <template slot-scope="scope">
          <span>{{ scope.row.user.power }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授权时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a
            :href="`/admin/user/show?zone=${scope.row.user.zone}`"
            target="_blank"
          >
            <el-button
              size="small"
              type="primary"
              icon="edit"
            >查看用户</el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :change="getData"
      :state="pageState"
    />
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import pageMixin from "~/mixins/page";

export default {
  mixins: [pageMixin],
  mounted() {
    this.getData(1);
  },
  methods: {
    async getData(page) {
      if (page <= this.pageState.max) {
        this.pageState.cur = page;
        return;
      }
      if (this.pageLoading) {
        return;
      }
      this.pageLoading = true;
      this.pageState.size = 15;
      const api = new Api(this);
      try {
        const data = await api.getBangumiManagers({
          to_page: page,
          cur_page: this.pageState.cur,
          take: this.pageState.size
        });
        this.pageState.total = data.total;
        this.pageState.cur = page;
        this.pageState.max = page;
        this.pageList = this.pageList.concat(data.list);
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.pageLoading = false;
      }
    }
  }
};
</script>
