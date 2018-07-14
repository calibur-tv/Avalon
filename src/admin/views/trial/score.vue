<style lang="scss">
  #trial-score {
    .el-card {
      margin-bottom: 30px;

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
    <el-col
      v-for="(item, index) in list"
      :key="item.id"
      :span="11"
      :offset="1"
    >
      <el-card :body-style="{ padding: '0px' }">
        <json-content :content="item.content"/>
        <div class="control">
          <div class="bottom clearfix">
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
    data () {
      return {
        list: [],
        loading: true
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
        const api = new Api(this);
        api.trials().then((data) => {
          this.list = data
          this.loading = false
        }).catch((err) => {
          this.$toast.error(err);
          this.loading = false;
        })
      },
      ban (id, index) {
        const api = new Api(this)
        api.ban({ id }).then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        }).catch((err) => {
          this.$toast.error(err)
        })
      },
      pass (id, index) {
        const api = new Api(this)
        api.pass({ id }).then(() => {
          this.list.splice(index, 1)
          this.$toast.success('操作成功')
          this.$channel.$emit('admin-trial-do', {
            type: 'score'
          })
        }).catch((err) => {
          this.$toast.error(err)
        })
      }
    }
  }
</script>
