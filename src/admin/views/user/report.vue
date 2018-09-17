<template>
  <div
    v-loading="pageLoading"
    id="user-feedback"
  >
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ computeModel(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="索引">
        <template slot-scope="scope">
          {{ computeModelId(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="detail(scope.row)"
          >详情</el-button>
          <el-button
            size="small"
            type="primary"
            @click="remove(scope.$index, scope.row)"
          >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-dialog
      v-model="showDetailDialog"
      :footer="false"
      title="举报详情"
    >
      <el-table
        :data="details"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="举报者id">
          <template slot-scope="scope">
            {{ computeUserId(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="举报类型">
          <template slot-scope="scope">
            {{ computeType(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="举报留言">
          <template slot-scope="scope">
            {{ computeMessage(scope.row) }}
          </template>
        </el-table-column>
      </el-table>
    </v-dialog>
    <v-page
      :state="pageState"
      :change="handlePageChange"
    />
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import pageMixin from "~/mixins/page";
import UaDetector from "@/utils/ua";

export default {
  mixins: [pageMixin],
  data() {
    return {
      details: [],
      showDetailDialog: false,
      typeMenus: [
        {
          key: "post",
          val: "帖子"
        },
        {
          key: "user",
          val: "用户"
        },
        {
          key: "bangumi",
          val: "番剧"
        },
        {
          key: "video",
          val: "视频"
        },
        {
          key: "role",
          val: "偶像"
        },
        {
          key: "image",
          val: "图片"
        },
        {
          key: "score",
          val: "漫评"
        },
        {
          key: "question",
          val: "提问"
        },
        {
          key: "answer",
          val: "回答"
        },
        {
          key: "post-comment",
          val: "回帖"
        },
        {
          key: "image-comment",
          val: "图片评论"
        },
        {
          key: "score_comment",
          val: "漫评评论"
        },
        {
          key: "video_comment",
          val: "视频评论"
        },
        {
          key: "question_comment",
          val: "提问评论"
        },
        {
          key: "answer_comment",
          val: "回答评论"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pageLoading = true;
      const api = new Api(this);
      const data = await api.getReportList();
      this.pageState.cur = 1;
      this.pageState.size = 15;
      this.pageState.total = data.length;
      this.pageList = data;
      this.pageLoading = false;
    },
    computeModel(type) {
      let result = "";
      this.typeMenus.forEach(item => {
        if (item.key === type.split("-")[0]) {
          result = item.val;
        }
      });
      return result;
    },
    computeModelId(type) {
      return type.split("-")[1];
    },
    computeUserId(item) {
      return item.split("|")[0];
    },
    computeType(item) {
      return item.split("|")[1];
    },
    computeMessage(item) {
      const arr = item.split("|");
      arr.shift();
      arr.shift();
      return arr.join("");
    },
    async remove(index, tail) {
      const api = new Api(this);
      try {
        await api.removeReport({ tail });
        this.pageList.splice(index, 1);
        this.$channel.$emit("admin-trial-do", {
          type: "report"
        });
        this.$toast.success("操作成功");
      } catch (e) {
        this.$toast.error(e);
      }
    },
    async detail(tail) {
      const api = new Api(this);
      try {
        this.details = await api.getReportItem({ tail });
        this.showDetailDialog = true;
      } catch (e) {
        this.$toast.error(e);
      }
    }
  }
};
</script>
