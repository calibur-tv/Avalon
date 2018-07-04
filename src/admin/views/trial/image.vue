<style lang="scss">
  #trial-image {
    header {
      text-align: right;
      margin-right: 30px;
    }

    .image {
      margin-bottom: 20px;
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
        @click="quickDelete"
      >一键删帖</el-button>
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
            <el-button
              type="success"
              size="mini"
              @click="passImage(image.id, index)"
            >通过</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteImage(image.id, index)"
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
      deleteImage (id, index) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = new Api(this);
          api.deleteImage({ id }).then(() => {
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
      passImage (id, index) {
        const api = new Api(this);
        api.passImage({ id }).then(() => {
          this.list.splice(index, 1);
          this.$channel.$emit('admin-trial-do', {
            type: 'images'
          })
        }).catch((e) => {
          console.log(e);
          this.$message.error(e);
        });
      },
      quickDelete () {
        this.$prompt('请输入帖子id', '提示', {
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
            id: value
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
