<style lang="scss">
#trial-comment {
  header {
    text-align: right;
    margin-right: 15px;
  }

  .comment-item-img {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;

    img {
      height: 150px;
      width: auto;
    }
  }

  .content {
    margin-left: 5px;
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="trial-comment"
  >
    <header v-if="isKing">
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDelete"
      >一键删评论</el-button>
    </header>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="内容">
        <template slot-scope="scope">
          <template v-if="checkIsHTML(scope.row.content)">
            <div
              v-for="(item, index) in transformerContent(scope.row.content)"
              :key="index"
              :class="`comment-item-${item.type}`"
            >
              <a
                v-if="item.type === 'txt'"
                :href="computeCommentLink(scope.row)"
                target="_blank"
              >
                <el-tag v-if="computeCommentLink(scope.row) !== 'javascript:;'">可以查看</el-tag>
                <el-tag
                  v-else
                  type="danger"
                >不可查看</el-tag>
                <span
                  class="content"
                  v-html="item.data"
                />
              </a>
              <a
                v-else-if="item.type === 'img'"
                :href="$resize(item.data.key)"
                target="_blank"
              >
                <img
                  :src="$resize(item.data.key, { width: 300, mode: 2 })"
                  @click="openImage(item.data.key)"
                >
              </a>
            </div>
          </template>
          <a
            v-else
            :href="computeCommentLink(scope.row)"
            target="_blank"
          >
            <el-tag v-if="computeCommentLink(scope.row) !== 'javascript:;'">可以查看</el-tag>
            <el-tag
              v-else
              type="danger"
            >不可查看</el-tag>
            <span
              class="content"
              v-text="scope.row.content"
            />
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="240px"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="passComment(scope.row, scope.$index)"
          >通过</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteComment(scope.row, scope.$index)"
          >删除</el-button>
          <router-link
            :to="`/admin/user/show?id=${scope.row.user_id}`"
            style="margin-left: 10px"
          >
            <el-button
              type="primary"
              size="mini"
            >查看用户</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "~/api/adminApi";

export default {
  data() {
    return {
      list: [],
      types: [],
      loading: true
    };
  },
  computed: {
    isKing() {
      return this.$store.state.user.id === 1;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const api = new Api(this);
      api
        .getTrialComments()
        .then(data => {
          this.list = data.comments;
          this.types = data.types;
          this.loading = false;
        })
        .catch(e => {
          this.$toast.error(e);
          this.loading = false;
        });
    },
    computeCommentLink(comment) {
      if (+comment.modal_id === 0) {
        return "javascript:;";
      }
      try {
        return `${this.$alias[comment.type](comment.modal_id)}?comment-id=${
          comment.id
        }`;
      } catch (e) {
        return "javascript:;";
      }
    },
    checkIsHTML(content) {
      return content.startsWith("[{");
    },
    transformerContent(content) {
      try {
        return JSON.parse(content);
      } catch (e) {
        return [];
      }
    },
    passComment(item, index) {
      const api = new Api(this);
      api
        .passComment({
          id: item.id,
          type: item.type
        })
        .then(() => {
          this.$message.success("操作成功");
          this.list.splice(index, 1);
          this.$channel.$emit("admin-trial-do", {
            type: "comments"
          });
        })
        .catch(err => {
          console.log(err);
          this.$Message.error(err);
        });
    },
    deleteComment(item, index) {
      const api = new Api(this);
      api
        .deleteComment({
          id: item.id,
          type: item.type
        })
        .then(() => {
          this.$message.success("操作成功");
          this.list.splice(index, 1);
          this.$channel.$emit("admin-trial-do", {
            type: "comments"
          });
        })
        .catch(err => {
          console.log(err);
          this.$Message.error(err);
        });
    },
    quickDelete() {
      this.$prompt("输入 type 和 id，用 - 分割", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          const data = value.split("-");
          if (data.length !== 2) {
            this.$toast.error("错误的格式");
            return;
          }
          if (this.types.indexOf(data[0]) === -1) {
            this.$toast.error("错误的类型");
            return;
          }
          if (!/^\d+$/.test(data[1])) {
            this.$toast.error("非法的id");
            return;
          }
          const api = new Api(this);
          api
            .deleteComment({
              id: data[1],
              type: data[0]
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
