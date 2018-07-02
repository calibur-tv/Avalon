<template>
  <div
    v-loading="loading"
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
            size="small"
            icon="upload2"
            type="warning"
            @click="handleUpdate(scope.row.id)"
          >更新</el-button>
          <!--
          v-if="currentUserId === 1"
          -->
          <el-button
            type="danger"
            size="small"
            icon="delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :change="handlePageChange"
      :state="page"
    />
  </div>
</template>

<script>
  import pageMixin from '@/mixins/page'
  import Api from '~/api/adminApi'

  export default {
    data () {
      return {
        loading: true,
        list: []
      }
    },
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
      this.getData()
    },
    methods: {
      async getData () {
        await this.$store.dispatch('search/fetchBangumis')
        this.list = this.bangumis
        this.page.size = 20
        this.page.total = this.bangumis.length
        this.loading = false
      },
      handleUpdate (id) {
        this.$prompt('请输入视频id', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^([1-9][0-9]*)$/,
          inputErrorMessage: 'id 格式不正确'
        }).then(({ value }) => {
          const api = new Api(this)
          api.bangumiRelease({
            bangumi_id: id,
            video_id: value
          }).then(() => {
            this.$message.success('更新成功');
          }).catch(() => {
            this.$message.error('更新失败');
          })
        }).catch(() => {});
      },
      handleDelete (bangumi) {
        this.$confirm('确认要执行该操作吗?', '提示').then(() => {
          const api = new Api(this)
          api.bangumiDelete({
            id: bangumi.id
          }).then(() => {
            this.$message.success('操作成功');
            window.location.reload();
          }).catch(() => {
            this.$message.error('操作失败');
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
