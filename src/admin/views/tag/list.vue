<template>
  <div
    v-loading="loading"
    id="tag-list"
  >
    <header>
      <el-row>
        ss
      </el-row>
    </header>
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        sortable
        label="索引"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        :filters="types"
        :filter-method="filterTag"
        prop="model"
        label="类型"
        filter-placement="bottom-start"
      >
        <template slot-scope="scope">
          {{ modelFormat(scope.row.model) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="handleEditOpen(scope.row)"
          >修改名称</el-button>
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
  import Api from '~/api/adminApi'
  import pageMixin from '@/mixins/page'

  export default {
    components: {

    },
    data () {
      return {
        loading: true,
        types: [
          {
            value: 0,
            text: '番剧'
          },
          {
            value: 1,
            text: '图片类型'
          },
          {
            value: 2,
            text: '图片尺寸'
          }
        ],
        list: [],
      }
    },
    mixin: [
      pageMixin
    ],
    computed: {

    },
    watch: {

    },
    created () {
      this.getData();
    },
    mounted () {

    },
    methods: {
      async getData () {
        const api = new Api(this);
        try {
          const data = await api.allTag()
          this.page.total = data.length
          this.page.size = 20
          this.list = data
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      handleEditOpen () {
      },
      modelFormat(key) {
        for (const type of this.types) {
          if (type.text === key) {
            return type.value
          }
          if (type.value === key) {
            return type.text
          }
        }
      },
      filterTag(value, row) {
        return row.model === value;
      },
    }
  }
</script>
