<style lang="scss">
#bangumi-post-setting {
  padding-left: 20px;
  border-left: 5px solid $color-gray-deep;

  .item {
    margin-bottom: 20px;

    p {
      margin-bottom: 5px;
      font-weight: bold;
    }
  }
}
</style>

<template>
  <div id="bangumi-post-setting">
    <div class="item">
      <p>加精：</p>
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="set_nice_url" placeholder="输入帖子链接">
            <template slot="prepend">
              要加精的帖子链接
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button :loading="loading" type="primary"
                     @click="setNice"
          >
            确认
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <p>取消精：</p>
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="del_nice_url" placeholder="输入帖子链接">
            <template slot="prepend">
              要取消精的帖子链接
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button :loading="loading" type="danger"
                     @click="removeNice"
          >
            确认
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <p>置顶（最多同时有 3 个置顶帖）：</p>
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="set_top_url" placeholder="输入帖子链接">
            <template slot="prepend">
              要置顶的帖子链接
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button :loading="loading" type="primary"
                     @click="setTop"
          >
            确认
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <p>取消置顶：</p>
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="del_top_url" placeholder="输入帖子链接">
            <template slot="prepend">
              要取消置顶的帖子链接
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button :loading="loading" type="danger"
                     @click="removeTop"
          >
            确认
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { setTop, removeTop, setNice, removeNice } from '~/api/postApi'

export default {
  name: 'BangumiPostSetting',
  data() {
    return {
      set_nice_url: '',
      del_nice_url: '',
      set_top_url: '',
      del_top_url: '',
      loading: false
    }
  },
  methods: {
    setNice() {
      if (!this.set_nice_url) {
        return
      }
      const id = this.getPostIdFromUrl(this.set_nice_url)
      if (!id) {
        this.$toast.error('请输入合法链接')
        return
      }
      this.$confirm('确定要加精吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          try {
            await setNice(this, { id })
            this.$toast.success('设置成功')
          } catch (e) {
            // do nothing
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    },
    setTop() {
      if (!this.set_top_url) {
        return
      }
      const id = this.getPostIdFromUrl(this.set_top_url)
      if (!id) {
        this.$toast.error('请输入合法链接')
        return
      }
      this.$confirm('确定要置顶吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          try {
            await setTop(this, { id })
            this.$toast.success('设置成功')
          } catch (e) {
            // do nothing
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    },
    removeNice() {
      if (!this.del_nice_url) {
        return
      }
      const id = this.getPostIdFromUrl(this.del_nice_url)
      if (!id) {
        this.$toast.error('请输入合法链接')
        return
      }
      this.$confirm('确定要取消精吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          try {
            await removeNice(this, { id })
            this.$toast.success('设置成功')
          } catch (e) {
            // do nothing
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    },
    removeTop() {
      if (!this.del_top_url) {
        return
      }
      const id = this.getPostIdFromUrl(this.del_top_url)
      if (!id) {
        this.$toast.error('请输入合法链接')
        return
      }
      this.$confirm('确定要取消置顶吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          try {
            await removeTop(this, { id })
            this.$toast.success('设置成功')
          } catch (e) {
            // do nothing
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    },
    getPostIdFromUrl(url) {
      const matched = url
        .split('?')[0]
        .match(/^http(|s):\/\/(m|www).calibur.tv\/post\/(\d+)$/)
      return matched ? +matched[3] : 0
    }
  }
}
</script>
