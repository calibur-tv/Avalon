<template>
  <div id="bangumi-trial">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <a
            :href="$alias.bangumi(scope.row.id)"
            target="_blank"
          >{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="原名"
        prop="alias"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="passBangumi(scope.row.id, scope.$index)"
          >通过</el-button>
          <router-link
            :to="`/admin/user/show?id=${scope.row.state}`"
            style="margin-left: 10px"
          >
            <el-button
              size="mini"
              type="warning"
            >查看变更人</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from '~/api/adminApi'

export default {
  data() {
    return {
      list: [],
      loading: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const api = new Api(this)
      api
        .getTrialBangumis()
        .then(data => {
          this.list = data
          this.loading = false
        })
        .catch(err => {
          this.$toast.error(err)
          this.loading = false
        })
    },
    passBangumi(id, index) {
      const api = new Api(this)
      api
        .passBangumi({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'bangumi'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    }
  }
}
</script>
