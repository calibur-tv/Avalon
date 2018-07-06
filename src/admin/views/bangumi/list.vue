<template>
  <div
    v-loading="pageLoading"
    id="bangumi-list"
  >
    <header>
      <el-row>
        <el-col :span="4">
          <router-link to="/admin/bangumi/create">
            <el-button type="primary">
              <i class="el-icon-plus"/>
              创建番剧
            </el-button>
          </router-link>
        </el-col>
        <el-col
          :span="10"
          :offset="10"
        >
          <bangumi-search @search="handleBangumiSearch"/>
        </el-col>
      </el-row>
    </header>
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="番剧名称">
        <template slot-scope="scope">
          <a
            :href="$alias.bangumi(scope.row.id)"
            target="_blank"
          >{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        label="操作"
      >
        <template slot-scope="scope">
          <router-link :to="`/admin/bangumi/edit/${scope.row.id}`">
            <el-button
              size="small"
              type="primary"
              icon="edit"
            >编辑</el-button>
          </router-link>
          &nbsp;
          <el-button
            v-if="currentUserId === 1"
            :type="scope.row.deleted_at ? 'success' : 'danger'"
            size="small"
            icon="delete"
            @click="handleDelete(scope.row)"
          >{{ scope.row.deleted_at ? '恢复' : '删除' }}</el-button>
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
  import Api from '~/api/adminApi'
  import pageMixin from '~/mixins/page'

  export default {
    mixin: [
      pageMixin
    ],
    computed: {
      bangumis () {
        return this.$store.state.search.bangumis
      },
      currentUserId () {
        return this.$store.state.user.id
      }
    },
    mounted () {
      this.getData(1)
    },
    methods: {
      async getData (page) {
        if (page <= this.pageState.max) {
          this.pageState.cur = page
          return
        }
        if (this.pageLoading) {
          return
        }
        this.pageLoading = true;
        this.pageState.size = 15;
        const api = new Api(this);
        try {
          const data = await api.getBangumiList({
            to_page: page,
            cur_page: this.pageState.cur,
            take: this.pageState.size
          });
          this.pageState.total = data.total
          this.pageState.cur = page;
          this.pageState.max = page;
          this.pageList = this.pageList.concat(data.list)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.pageLoading = false
        }
      },
      handleDelete (bangumi) {
        this.$confirm('确认要执行该操作吗?', '提示').then(() => {
          const api = new Api(this);
          api.bangumiDelete({
            id: bangumi.id
          }).then(() => {
            this.$toast.success('操作成功');
            bangumi.deleted_at = !bangumi.deleted_at;
          }).catch(() => {
            this.$toast.error('操作失败');
          })
        }).catch(() => {});
      },
      handleBangumiSearch (id) {
        this.$router.push({
          path: `/admin/bangumi/edit/${id}`
        })
      }
    }
  }
</script>
