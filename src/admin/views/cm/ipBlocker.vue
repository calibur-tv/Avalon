<template>
  <div id="ip-blocker">
    <header>
      <el-button
        type="primary"
        @click="blockUser"
      >
        <i class="el-icon-plus"/>
        封禁IP
      </el-button>
    </header>
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ip地址">
        <template slot-scope="scope">
          {{ scope.row }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="recoverUser(scope.$index, scope.row)"
          >解禁</el-button>
          <router-link
            :to="`/admin/user/show?ip=${scope.row}`"
            style="margin-left: 10px"
          >
            <el-button
              type="primary"
              size="small"
            >查看用户</el-button>
          </router-link>
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
  name: 'IpBlocker',
  mixins: [pageMixin],
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.pageLoading = true
      const api = new Api(this)
      const data = await api.blockedIpList()
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
            .recoverIpAddress({
              ip_address: row
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
    },
    blockUser() {
      this.$prompt('请输入要封禁的ip地址', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          const api = new Api(this)
          api
            .blockIpAddress({
              ip_address: value
            })
            .then(() => {
              this.pageList.unshift(value)
              this.$toast.success('操作成功')
            })
            .catch(err => {
              this.$toast.error(err)
            })
        })
        .catch(() => {})
    }
  }
}
</script>
