<style lang="scss">
#trial-comment {
  header {
    text-align: right;
    margin-right: 15px;
  }

  .sub-tag {
    margin-top: 5px;
  }

  .content-wrap {
    a {
      display: inline-block;
      vertical-align: middle;
    }

    .tag-wrap {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
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

  .control {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="trial-comment"
  >
    <header>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="quickDelete"
      >一键删评论</el-button>
      <el-button
        type="danger"
        icon="delete"
        size="small"
        @click="batchDelete"
      >批量删评论</el-button>
    </header>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="分区"
        width="80px"
      >
        <template slot-scope="scope">
          <div>
            <el-tag>
              {{ computeArea(scope.row.type) }}
            </el-tag>
          </div>
          <div class="sub-tag">
            <el-tag>
              {{ scope.row.modal_id }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <template v-if="checkIsHTML(scope.row.content)">
            <div
              v-for="(item, index) in transformerContent(scope.row.content)"
              :key="index"
              :class="`content-wrap comment-item-${item.type}`"
            >
              <div
                v-if="!index"
                class="tag-wrap"
              >
                <div>
                  <el-tag
                    type="info"
                  >主评论</el-tag>
                </div>
                <el-tag
                  type="info"
                  class="sub-tag"
                  v-text="scope.row.user_id"
                />
              </div>
              <a
                v-if="item.type === 'txt'"
                :href="computeCommentLink(scope.row)"
                target="_blank"
              >
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
          <div
            v-else
            class="content-wrap comment-item-txt"
          >
            <div class="tag-wrap">
              <div>
                <el-tag type="info">子评论</el-tag>
              </div>
              <el-tag
                type="info"
                class="sub-tag"
                v-text="scope.row.user_id"
              />
            </div>
            <a
              :href="computeCommentLink(scope.row)"
              target="_blank"
            >
              <span
                class="content"
                v-text="scope.row.content"
              />
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="240px"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.deleted_at">
            <el-button
              type="warning"
              size="mini"
              @click="approveComment(scope.row, scope.$index)"
            >确认</el-button>
            <el-button
              type="success"
              size="mini"
              @click="rejectComment(scope.row, scope.$index)"
            >恢复</el-button>
          </template>
          <template v-else>
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
          </template>
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
    <div
      v-if="list.length"
      class="control"
    >
      <el-button
        :loading="batching"
        type="primary"
        round
        @click="batchPass"
      >全部通过</el-button>
    </div>
  </div>
</template>

<script>
import Api from "~/api/adminApi";

export default {
  data() {
    return {
      list: [],
      types: [],
      loading: true,
      batching: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.list = [];
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
      let aliasName = comment.type;
      if (aliasName === "cartoon_role") {
        aliasName = "cartoonRole";
      }
      if (comment.parent_id !== "0") {
        return `${this.$alias[aliasName](comment.modal_id)}?comment-id=${
          comment.parent_id
        }&reply-id=${comment.id}`;
      }
      return `${this.$alias[aliasName](comment.modal_id)}?comment-id=${
        comment.id
      }`;
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
    approveComment(item, index) {
      const api = new Api(this);
      api
        .approveComment({
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
    rejectComment(item, index) {
      const api = new Api(this);
      api
        .rejectComment({
          id: item.id,
          type: item.type,
          parent_id: item.parent_id
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
    },
    batchDelete() {
      this.$prompt("输入 type 和 user_id，用 - 分割", "提示", {
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
            .batchDeleteComment({
              user_id: data[1],
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
    },
    computeArea(type) {
      switch (type) {
        case "post":
          return "帖子";
          break;
        case "image":
          return "图片";
          break;
        case "video":
          return "视频";
          break;
        case "question":
          return "提问";
          break;
        case "answer":
          return "回答";
          break;
        case "role":
          return "偶像";
          break;
      }
      return type;
    },
    batchPass() {
      if (this.batching || !this.list.length) {
        return;
      }
      this.batching = true;
      const api = new Api(this);
      api
        .batchPassComment({
          pass_arr: this.list.filter(_ => !_.deleted_at).map(_ => {
            return {
              id: _.id,
              type: _.type
            };
          }),
          approve_arr: this.list.filter(_ => !!_.deleted_at).map(_ => {
            return {
              id: _.id,
              type: _.type
            };
          })
        })
        .then(() => {
          this.batching = false;
          this.$message.success("操作成功");
          this.$channel.$emit("admin-trial-do", {
            type: "comments",
            count: this.list.length
          });
          this.getData();
          this.$channel.$emit("admin-get-to-do");
        })
        .catch(err => {
          console.log(err);
          this.batching = false;
          this.$Message.error(err);
        });
    }
  }
};
</script>
