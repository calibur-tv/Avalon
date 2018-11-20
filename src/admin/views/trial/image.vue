<style lang="scss">
#trial-image {
  header {
    text-align: right;
    margin-right: 30px;
  }

  .image {
    margin-bottom: 20px;
  }

  .name {
    margin-bottom: 10px;

    .tag-container {
      .el-tag {
        margin-right: 5px;
      }
    }

    a {
      margin-right: 8px;
    }
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="trial-image"
  >
    <header>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDeleteAlbumPoster"
      >删除相册封面</el-button>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDeleteImage"
      >一键删图片</el-button>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDeleteAlbum"
      >一键删相册</el-button>
    </header>
    <div>
      <el-col
        v-for="(image, index) in list"
        :key="image.id"
        :span="7"
        :offset="1"
        class="image"
      >
        <el-card :body-style="{ padding: '0px' }">
          <a
            :href="$resize(image.url)"
            target="_blank"
          >
            <img :src="$resize(image.url, { width: 500, mode: 2 })">
          </a>
          <div style="padding: 14px;">
            <div class="name">
              <a
                :href="computeAlbumHref(image)"
                target="_blank"
              >
                <div class="tag-container">
                  <el-tag>查看相册</el-tag>
                  <a
                    v-if="image.bangumi_id"
                    :href="$alias.bangumi(image.bangumi_id, 'pins')"
                    target="_blank"
                  >
                    <el-tag>查看番剧</el-tag>
                  </a>
                  <a
                    v-else
                    :href="$alias.image(image.album_id)"
                    target="_blank"
                  >
                    <el-tag>查看相册</el-tag>
                  </a>
                  <el-tag
                    v-if="image.deleted_at"
                  >{{ image.user_id == image.state ? '系统删除' : '举报删除' }}</el-tag>
                </div>
              </a>
              <span
                v-if="image.name"
                v-text="image.name"
              />
            </div>
            <template v-if="image.deleted_at">
              <el-button
                type="danger"
                size="mini"
                @click="approveImage(image, index)"
              >确认删除</el-button>
              <el-button
                type="success"
                size="mini"
                @click="rejectImage(image, index)"
              >恢复图片</el-button>
            </template>
            <template v-else>
              <el-button
                type="success"
                size="mini"
                @click="passImage(image, index)"
              >通过</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteImage(image, index)"
              >删除</el-button>
            </template>
            <router-link
              :to="`/admin/user/show?id=${image.user_id}`"
              style="margin-left: 10px"
            >
              <el-button
                type="primary"
                size="mini"
              >查看用户</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import Api from '~/api/adminApi'

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
    computeAlbumHref(image) {
      if (image.bangumi_id) {
        return this.$alias.image(image.id)
      }
      return this.$alias.image(image.album_id)
    },
    getData() {
      const api = new Api(this)
      api
        .getTrialImages()
        .then(data => {
          this.list = data
          this.loading = false
        })
        .catch(e => {
          this.$toast.error(e)
          this.loading = false
        })
    },
    deleteImage(image, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const api = new Api(this)
          api
            .deleteImage({
              id: image.id,
              type: image.bangumi_id ? 'album' : 'image'
            })
            .then(() => {
              this.list.splice(index, 1)
              this.$channel.$emit('admin-trial-do', {
                type: 'images'
              })
            })
            .catch(e => {
              this.$message.error(e)
            })
        })
        .catch(() => {})
    },
    passImage(image, index) {
      const api = new Api(this)
      api
        .passImage({
          id: image.id,
          type: image.bangumi_id ? 'album' : 'image'
        })
        .then(() => {
          this.list.splice(index, 1)
          this.$channel.$emit('admin-trial-do', {
            type: 'images'
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    approveImage(image, index) {
      const api = new Api(this)
      api
        .approveImage({
          id: image.id,
          type: image.bangumi_id ? 'album' : 'image'
        })
        .then(() => {
          this.list.splice(index, 1)
          this.$channel.$emit('admin-trial-do', {
            type: 'images'
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    rejectImage(image, index) {
      const api = new Api(this)
      api
        .rejectImage({
          id: image.id,
          type: image.bangumi_id ? 'album' : 'image'
        })
        .then(() => {
          this.list.splice(index, 1)
          this.$channel.$emit('admin-trial-do', {
            type: 'images'
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    quickDeleteAlbum() {
      this.$prompt('请输入相册id', '删除相册', {
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
            .deleteImage({
              id: value,
              type: 'album'
            })
            .then(() => {
              this.$toast.success('操作成功')
            })
            .catch(e => {
              this.$toast.error(e)
            })
        })
        .catch(() => {})
    },
    quickDeleteAlbumPoster() {
      this.$prompt('请输入图片id', '删除图片', {
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
            .deleteImagePoster({
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
    },
    quickDeleteImage() {
      this.$prompt('请输入图片id', '删除图片', {
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
            .deleteImage({
              id: value,
              type: 'image'
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
