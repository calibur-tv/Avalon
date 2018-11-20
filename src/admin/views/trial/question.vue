<style lang="scss">
#trial-question {
  header {
    text-align: right;
    margin-right: 15px;
  }

  .trial-qaq-item {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid $color-gray-normal;

    .header {
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 4px;
        margin-right: 10px;
      }
    }

    .body {
      .content {
        font-size: 13px;
        color: $color-text-light;
        text-indent: 45px;
        margin-top: -15px;
      }

      .images {
        img {
          width: 100px;
          height: 100px;
          vertical-align: top;
          margin-right: 5px;
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
    }

    .item {
      margin-bottom: 10px;
    }

    .label {
      font-weight: bold;
      font-size: 14px;
      display: inline-block;
      width: 45px;
    }

    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="trial-question"
  >
    <header>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDelete"
      >一键删问题</el-button>
    </header>
    <div>
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="trial-qaq-item"
      >
        <div class="header">
          <p class="item">
            <span class="label">标题：</span>
            <a
              :href="$alias.question(item.id)"
              target="_blank"
              v-text="item.title"
            />
          </p>
        </div>
        <div class="body">
          <div class="item">
            <span class="label">内容：</span>
            <div
              class="content"
              v-html="item.content"
            />
          </div>
          <div
            v-if="item.images.length"
            class="images item"
          >
            <p class="label">图片：</p>
            <img
              v-for="(img, subIndex) in item.images"
              :key="subIndex"
              :src="$resize(img.url, { width: 200 })"
            >
          </div>
        </div>
        <div class="item">
          <span class="label">操作：</span>
          <template v-if="item.deleted_at">
            <el-button
              size="small"
              type="danger"
              @click="approve(item.id, index)"
            >确认删除</el-button>
            <el-button
              size="small"
              type="success"
              @click="reject(item.id, index)"
            >恢复提问</el-button>
          </template>
          <template v-else>
            <el-button
              size="small"
              type="success"
              @click="pass(item.id, index)"
            >通过</el-button>
            <el-button
              size="small"
              type="danger"
              @click="ban(item.id, index)"
            >删除</el-button>
          </template>
          <router-link
            :to="`/admin/user/show?id=${item.user_id}`"
            style="margin-left: 10px;margin-right: 10px"
          >
            <el-button
              size="small"
              type="warning"
            >查看用户</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api/questionApi'

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
        .questionTrials()
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
        .questionBan({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'question'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    pass(id, index) {
      const api = new Api(this)
      api
        .questionPass({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'question'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    approve(id, index) {
      const api = new Api(this)
      api
        .questionApprove({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'question'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    reject(id, index) {
      const api = new Api(this)
      api
        .questionReject({ id })
        .then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'question'
          })
        })
        .catch(err => {
          this.$toast.error(err)
        })
    },
    quickDelete() {
      this.$prompt('请输入问题id', '提示', {
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
            .questionBan({
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
