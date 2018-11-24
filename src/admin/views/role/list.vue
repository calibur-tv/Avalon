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
        <el-col
          :offset="1"
          :span="10"
        >
          <el-button
            type="danger"
            icon="delete"
            size="medium"
            @click="removeStar"
          >撤销应援</el-button>
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
        label="粉丝"
        prop="fans_count"
      />
      <el-table-column
        label="团子"
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
import Api from '~/api/flowApi'
import AdminApi from '~/api/adminApi'

export default {
  data() {
    return {
      bangumiId: 0,
      list: [],
      loading: false
    }
  },
  methods: {
    async getData() {
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.fetch({
          type: 'role',
          sort: 'hot',
          take: 1000,
          seenIds: '',
          page: 0,
          userZone: '',
          bangumiId: this.bangumiId
        })
        this.list = data.list
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    },
    handleBangumiSearch(id) {
      if (this.bangumiId !== id) {
        this.bangumiId = id
        this.getData()
      }
    },
    removeStar() {
      this.$prompt('请输入违规用户的 ip 地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          const api = new AdminApi(this)
          api
            .removeCartoonRoleStar({
              ip: value
            })
            .then(() => {
              this.$toast.success('操作成功')
            })
            .catch(e => {
              this.$toast.error(e)
            })
        })
        .catch(() => {})
    }
  }
}
</script>
