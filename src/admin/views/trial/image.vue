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
    }
  }
</style>

<template>
  <div
    v-loading="loading"
    id="trial-image"
  >
    <header v-if="isKing">
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
        :span="5"
        :offset="1"
        class="image"
      >
        <el-card :body-style="{ padding: '0px' }">
          <a
            :href="$resize(image.url)"
            target="_blank"
          >
            <img :src="$resize(image.url, { width: 300, mode: 2 })">
          </a>
          <div style="padding: 14px;">
            <p
              v-if="image.name"
              class="name"
              v-text="image.name"
            />
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
        api.getTrialImages().then((data) => {
          this.list = data;
          this.loading = false;
        }).catch((e) => {
          this.$toast.error(e);
          this.loading = false;
        })
      },
      deleteImage (image, index) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = new Api(this);
          api.deleteImage({
            id: image.id,
            type: image.bangumi_id ? 'album' : 'image'
          }).then(() => {
            this.list.splice(index, 1);
            this.$channel.$emit('admin-trial-do', {
              type: 'images'
            })
          }).catch((e) => {
            console.log(e);
            this.$message.error(e);
          });
        }).catch(() => {});
      },
      passImage (image, index) {
        const api = new Api(this);
        api.passImage({
          id: image.id,
          type: image.bangumi_id ? 'album' : 'image'
        }).then(() => {
          this.list.splice(index, 1);
          this.$channel.$emit('admin-trial-do', {
            type: 'images'
          })
        }).catch((e) => {
          console.log(e);
          this.$message.error(e);
        });
      },
      quickDeleteAlbum () {
        this.$prompt('请输入相册id', '删除相册', {
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
          api.deleteImage({
            id: value,
            type: 'album'
          }).then(() => {
            this.$toast.success('操作成功');
          }).catch((e) => {
            this.$toast.error(e);
          })
        }).catch(() => {});
      },
      quickDeleteImage () {
        this.$prompt('请输入图片id', '删除图片', {
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
          api.deleteImage({
            id: value,
            type: 'image'
          }).then(() => {
            this.$toast.success('操作成功');
          }).catch((e) => {
            this.$toast.error(e);
          })
        }).catch(() => {});
      }
    }
  }
</script>
