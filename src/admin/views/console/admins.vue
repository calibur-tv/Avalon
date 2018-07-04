<template>
  <div
    v-loading="loading"
    id="admin-list"
  >
    <header v-if="isKing">
      <el-button
        type="primary"
        @click="addAdmin"
      >
        <i class="el-icon-plus"/>
        添加管理员
      </el-button>
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
          :href="$alias.user(scope.row.zone)"
          target="_blank"
          v-text="scope.row.nickname"
        />
      </el-table-column>
      <el-table-column
        v-if="isKing"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="removeFromAdmin(scope.$index, scope.row.id)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'

  export default {
    data () {
      return {
        list: [],
        loading: true
      }
    },
    computed: {
      isKing () {
        return this.$store.state.user.id === 1
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
        const api = new Api(this);
        api.getAdminList().then((data) => {
          this.list = data;
          this.loading = false;
        }).catch((e) => {
          this.$toast.error(e);
          this.loading = false;
        })
      },
      removeFromAdmin (index, id) {
        if (this.id === 1) {
          return;
        }
        const api = new Api(this);
        api.removeAdmin({ id }).then(() => {
          this.$toast.success('操作成功');
          this.list.splice(index, 1);
        }).catch((e) => {
          this.$toast.error(e);
        })
      },
      addAdmin () {
        this.$prompt('请输入用户id', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+$/,
          inputErrorMessage: '非法的id'
        }).then(({ value }) => {
          if (value < 1) {
            this.$toast.error('非法的id');
            return;
          }
          const api = new Api(this);
          api.addAdmin({
            id: value
          }).then(() => {
            this.$toast.success('操作成功');
            window.location.reload()
          }).catch((e) => {
            this.$toast.error(e);
          })
        }).catch(() => {});
      }
    }
  }
</script>
