<template>
  <div id="ip-blocker">
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="id">
        <template slot-scope="scope">
          <router-link :to="`/admin/user/show?id=${scope.row.id}`">
            {{ scope.row.id }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <a
            :href="$alias.user(scope.row.zone)"
            target="_blank"
          >
            {{ scope.row.nickname }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="禁言到">
        <template slot-scope="scope">
          {{ scope.row.banned_to }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="recoverUser(scope.$index, scope.row)"
          >解禁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :state="pageState"
      :change="handlePageChange"
    />
  </div>
</template>

<script>
import Api from '~/api/adminApi'
import pageMixin from '~/mixins/page'

export default {
  name: 'CronFreeze',
  mixins: [pageMixin],
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.pageLoading = true
      const api = new Api(this)
      const data = await api.freezeUserList()
      this.pageState.cur = 1
      this.pageState.size = 15
      this.pageState.total = data.length
      this.pageList = data
      this.pageLoading = false
    },
    async recoverUser(index, row) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const api = new Api(this)
          api
            .freeUser({
              id: row.id
            })
            .then(() => {
              this.pageList.splice(
                (this.pageState.cur - 1) * this.pageState.size + index,
                1
              )
              this.$toast.success('操作成功')
            })
            .catch(e => {
              this.$message.error(e)
            })
        })
        .catch(() => {})
    }
  }
}
</script>
