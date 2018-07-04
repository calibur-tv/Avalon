<style lang="scss">
  #trial-post {
    .trial-post-item {
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

      .footer {
        a {
          margin-left: 10px;
          margin-right: 10px;
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
  <div id="trial-post">
    <div>
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="trial-post-item"
      >
        <div class="header">
          <p class="item">
            <span class="label">用户：</span>
            <a
              :href="$alias.user(item.user.zone)"
              class="user"
              target="_blank"
            >
              <img :src="$resize(item.user.avatar, { width: 60 })">
              <span
                class="nickname"
                v-text="item.user.nickname"
              />
            </a>
          </p>
          <p class="item">
            <span class="label">标题：</span>
            <a
              :href="$alias.post(item.id)"
              target="_blank"
              v-html="item.f_title.text || item.title"
            />
          </p>
        </div>
        <div class="body">
          <div class="item">
            <span class="label">内容：</span>
            <div
              class="content"
              v-html="item.f_content.text || item.content"
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
              :src="$resize(img.src, { width: 200 })"
              @click="deleteImage(img.id, img.src, index, subIndex)"
            >
          </div>
          <div
            v-if="item.words.filters.length"
            class="tags item"
          >
            <span class="label">词汇：</span>
            <el-tag
              v-for="tag in item.words.filters"
              :key="tag"
              type="info"
              size="mini"
              v-text="tag"
            />
          </div>
        </div>
        <div class="footer item">
          <span class="label">操作：</span>
          <el-button
            size="small"
            type="success"
            @click="passPost(index, item.id)"
          >通过</el-button>
          <el-button
            size="small"
            type="danger"
            @click="delPost(index, item.id)"
          >删帖</el-button>
          <router-link :to="`/admin/user/show?zone=${item.user.zone}`">
            <el-button
              size="small"
              type="warning"
            >查看用户</el-button>
          </router-link>
          <el-button
            v-if="item.images.length"
            size="small"
            type="primary"
            @click="openImages(item.images)"
          >查看所有图片</el-button>
        </div>
      </div>
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
    created () {
      this.getData()
    },
    methods: {
      getData () {
        const api = new Api(this)
        api.getTrialPosts().then((data) => {
          this.list = data;
          this.loading = false;
        }).catch((err) => {
          this.$toast.error(err);
          this.loading = false;
        })
      },
      openImages (images) {
        images.forEach(item => {
          window.open(item.src)
        })
      },
      delPost (index, id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = new Api(this)
          api.deletePost({ id }).then(() => {
            this.list.splice(index, 1);
            this.$toast.success('操作成功')
          }).catch((e) => {
            console.log(e);
            this.$message.error(e);
          });
        }).catch(() => {});
      },
      passPost (index, id) {
        const api = new Api(this);
        api.passPost({ id }).then(() => {
          this.list.splice(index, 1);
          this.$toast.success('操作成功')
        }).catch((e) => {
          this.$message.error(e);
        });
      },
      deleteImage (id, src, index, subIndex) {
        if (!src) {
          return;
        }
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = new Api(this);
          api.deletePostImage({ id, src }).then(() => {
          }).then(() => {
            this.list[index].images.splice(subIndex, 1);
            this.$toast.success('操作成功');
          }).catch((e) => {
            console.log(e);
            this.$message.error(e);
          });
        }).catch(() => {});
      },
    }
  }
</script>
