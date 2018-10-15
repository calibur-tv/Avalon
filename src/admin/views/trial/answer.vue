<style lang="scss">
#trial-answer {
  header {
    text-align: right;
    margin-right: 15px;
  }

  .el-card {
    margin-bottom: 30px;

    img {
      max-width: 100%;
    }

    .title {
      padding: 15px;
      display: block;
      font-weight: bold;
      font-size: 15px;
      border-bottom: 1px solid $color-gray-normal;
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
    id="trial-answer"
  >
    <header>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDelete"
      >一键删回答</el-button>
    </header>
    <el-col
      v-for="(item, index) in list"
      :key="item.id"
      :span="11"
      :offset="1"
    >
      <el-card :body-style="{ padding: '0px' }">
        <a
          :href="$alias.answer(item.id)"
          class="title"
          target="_blank"
        >点击查看内容</a>
        <json-content :content="item.content"/>
        <div class="control">
          <div class="bottom clearfix">
            <template v-if="item.deleted_at">
              <el-button
                type="success"
                size="mini"
                @click="pass(item.id, index)"
              >确认删除</el-button>
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
import Api from "~/api/questionApi";
import JsonContent from "~/components/jsonEditor/JsonContent";

export default {
  components: {
    JsonContent
  },
  data() {
    return {
      list: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const api = new Api(this);
      api
        .answerTrials()
        .then(data => {
          this.list = data;
          this.loading = false;
        })
        .catch(err => {
          this.$toast.error(err);
          this.loading = false;
        });
    },
    ban(id, index) {
      const api = new Api(this);
      api
        .answerBan({ id })
        .then(() => {
          this.list.splice(index, 1);
          this.$toast.success("操作成功");
          this.$channel.$emit("admin-trial-do", {
            type: "answer"
          });
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    pass(id, index) {
      const api = new Api(this);
      api
        .answerPass({ id })
        .then(() => {
          this.list.splice(index, 1);
          this.$toast.success("操作成功");
          this.$channel.$emit("admin-trial-do", {
            type: "answer"
          });
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    quickDelete() {
      this.$prompt("请输入回答id", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "非法的id"
      })
        .then(({ value }) => {
          if (value < 1) {
            this.$toast.error("非法的id");
            return;
          }
          const api = new Api(this);
          api
            .answerBan({
              id: value
            })
            .then(() => {
              this.$toast.success("操作成功");
            })
            .catch(e => {
              this.$toast.error(e);
            });
        })
        .catch(() => {});
    }
  }
};
</script>
