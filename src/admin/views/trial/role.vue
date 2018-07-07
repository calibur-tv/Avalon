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
            :href="$alias.cartoonRole(scope.row.id)"
            target="_blank"
          >{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="passRole(scope.row.id, scope.$index)"
          >通过</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="banRole(scope.row.id, scope.row.bangumi_id, scope.$index)"
          >删除</el-button>
          <router-link
            :to="`/admin/role/edit/${scope.row.id}`"
            style="margin-left: 10px"
          >
            <el-button
              size="mini"
              type="primary"
            >编辑</el-button>
          </router-link>
          <router-link
            :to="`/admin/user/show?id=${scope.row.state}`"
            style="margin-left: 10px"
          >
            <el-button
              size="mini"
              type="primary"
            >查看变更人</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '~/api/cartoonRoleApi'

  export default {
    data () {
      return {
        list: [],
        loading: true
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
        const api = new Api(this);
        api.trialList().then((data) => {
          this.list = data
          this.loading = false
        }).catch((err) => {
          this.$toast.error(err);
          this.loading = false;
        })
      },
      banRole (id, bangumi_id, index) {
        const api = new Api(this)
        api.trialBan({ id, bangumi_id }).then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'role'
          })
        }).catch((err) => {
          this.$toast.error(err)
        })
      },
      passRole (id, index) {
        const api = new Api(this)
        api.trialPass({ id }).then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'role'
          })
        }).catch((err) => {
          this.$toast.error(err)
        })
      }
    }
  }
</script>
