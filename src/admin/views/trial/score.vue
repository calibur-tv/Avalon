<style lang="scss">
#trial-score {
  header {
    text-align: right;
    margin-right: 15px;
  }

  .el-card {
    margin-bottom: 30px;

    .title {
      padding: 15px;
      display: block;
      font-weight: bold;
      font-size: 15px;
      border-bottom: 1px solid $color-gray-normal;
    }

    img {
      max-width: 100%;
    }

    .control {
      padding: 15px;
      background-color: $color-gray-light;
    }

    .json-content-txt-parser {
      margin-left: 15px;
      margin-right: 15px;
      margin-top: 15px;
    }
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="trial-score"
  >
    <header>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDelete"
      >一键删漫评</el-button>
    </header>
    <el-col
      v-for="(item, index) in list"
      :key="item.id"
      :span="11"
      :offset="1"
    >
      <el-card :body-style="{ padding: '0px' }">
        <a
          :href="$alias.score(item.id)"
          class="title"
          target="_blank"
          v-text="item.title"
        />
        <json-content :content="item.content"/>
        <div class="control">
          <div class="bottom clearfix">
            <template v-if="item.deleted_at">
              <el-button
                type="success"
                size="mini"
                @click="approve(item.id, index)"
              >确认删除</el-button>
              <el-button
                type="success"
                size="mini"
                @click="reject(item.id, index)"
              >恢复漫评</el-button>
            </template>
            <template v-else>
              <el-button
                type="success"
                size="mini"
                @click="pass(item.id, index)"
              >通过</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="ban(item.id, index)"
              >删除</el-button>
            </template>
            <router-link
              :to="`/admin/user/show?id=${item.user_id}`"
              style="margin-left: 10px"
            >
              <el-button
                type="primary"
                size="mini"
              >查看用户</el-button>
            </router-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Api from '~/api/scoreApi'
import JsonContent from '~/components/jsonEditor/JsonContent'

export default {
  components: {
    JsonContent
  },
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
        .trials()
        .then(data => {
          this.list = data
          this.loading = false
        })
        .catch(err => {
          this.$toast.error(err)
          this.loading = false
        })
    },
    ban(id, index) {
      const api = new Api(this)
      api
        .ban({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    pass(id, index) {
      const api = new Api(this)
      api
        .pass({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    approve(id, index) {
      const api = new Api(this)
      api
        .approve({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    reject(id, index) {
      const api = new Api(this)
      api
        .reject({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    quickDelete() {
      this.$prompt('请输入漫评id', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '非法的id'
      })
        .then(({ value }) => {
          if (value < 1) {
            this.$toast.error('非法的id')
            return
          }
          const api = new Api(this)
          api
            .ban({
              id: value
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
