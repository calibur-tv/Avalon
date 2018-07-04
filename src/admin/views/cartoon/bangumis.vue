<template>
  <div
    v-loading="pageLoading"
    id="cartoon-bangumis"
  >
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="番名">
        <template slot-scope="scope">
          <a
            :href="$alias.bangumi(scope.row.id)"
            target="_blank"
          >{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/admin/cartoon/edit/${scope.row.id}`">
            <el-button
              size="small"
              type="primary"
              icon="edit"
            >编辑漫画</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :change="handlePageChange"
      :state="pageState"
    />
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import pageMixin from '@/mixins/page'

  export default {
    mixin: [
      pageMixin
    ],
    created () {
      this.getData();
    },
    methods: {
      async getData () {
        this.pageLoading = true;
        const api = new Api(this);
        try {
          const data = await api.cartoonBangumis();
          this.pageState.cur = 1;
          this.pageState.total = data.length;
          this.pageList = data
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.pageLoading = false
        }
      }
    }
  }
</script>
