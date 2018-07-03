<template>
  <div
    v-loading="pageLoading"
    id="tag-list"
  >
    <header>
      <el-button
        type="primary"
        @click="showCreateModal = true"
      >
        <i class="el-icon-plus"/>
        添加标签
      </el-button>
    </header>
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
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
            @click="editTagName(scope.row)"
          >修改名称</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :change="handlePageChange"
      :state="pageState"
    />
    <v-dialog
      v-model="showCreateModal"
      title="创建标签"
      @submit="handleCreateDone"
    >
      <el-form
        :model="createForm"
        :loading="createLoading"
        label-width="60px"
      >
        <el-form-item label="类型">
          <el-select
            v-model="createForm.model"
            placeholder="请选择"
          >
            <el-option
              v-for="type in types"
              :key="type.value"
              :value="type.value"
              :label="type.text"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model.trim="createForm.name"/>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import pageMixin from '@/mixins/page'

  export default {
    data () {
      return {
        showCreateModal: false,
        createLoading: false,
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
        createForm: {
          model: 0,
          name: ''
        }
      }
    },
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
          const data = await api.allTag();
          this.pageState.total = data.length
          this.pageState.cur = 1;
          this.pageState.size = 20;
          this.pageList = data
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.pageLoading = false;
        }
      },
      editTagName (tag) {
        this.$prompt('请输入新名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const api = new Api(this)
          api.editTag({
            id: tag.id,
            name: value
          }).then(() => {
            this.$message.success('更新成功');
            tag.name = value
          }).catch(() => {
            this.$message.error('更新失败');
          })
        }).catch(() => {});
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
      handleCreateDone () {
        const name = this.createForm.name;
        const model = this.createForm.model;
        if (!this.createForm.name) {
          this.$toast.error('名字不能为空');
          return;
        }
        for (const tag of this.list) {
          if (tag.name === name && tag.model === model) {
            this.$toast.error('标签已存在');
            return;
          }
        }
        if (this.createLoading) {
          return;
        }
        this.createLoading = true;
        const api = new Api(this);
        api.editCreate({ name, model }).then((id) => {
          this.list.unshift({
            name,
            model,
            id
          });
          this.$toast.success('操作成功');
          this.createLoading = false;
          this.showCreateModal = false;
        }).catch((e) => {
          this.$toast.error(e);
          this.createLoading = false;
        })
      }
    }
  }
</script>
