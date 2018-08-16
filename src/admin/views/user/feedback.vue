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
          {{ computeType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="desc"
      />
      <el-table-column label="浏览器">
        <template slot-scope="scope">
          <div v-html="computeUA(scope.row.ua)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="remove(scope.$index, scope.row.id)"
          >确认</el-button>
          <router-link
            v-if="scope.row.user_id != 0"
            :to="`/admin/user/show?id=${scope.row.user_id}`"
          >
            <el-button
              size="small"
              type="primary"
              style="margin-left: 10px"
            >查看用户</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
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
      options: [
        {
          label: "功能建议",
          value: 1
        },
        {
          label: "遇到错误",
          value: 2
        },
        {
          label: "资源报错",
          value: 4
        },
        {
          label: "求资源",
          value: 5
        },
        {
          label: "求偶像",
          value: 6
        },
        {
          label: "其它问题",
          value: 3
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
      const data = await api.getUserFeedback();
      this.pageState.cur = 1;
      this.pageState.size = 15;
      this.pageState.total = data.length;
      this.pageList = data;
      this.pageLoading = false;
    },
    computeType(type) {
      let result = "";
      this.options.forEach(item => {
        if (item.value === parseInt(type, 10)) {
          result = item.label;
        }
      });
      return result;
    },
    computeUA(ua) {
      const parser = new UaDetector(ua).parse;
      return `系统：${parser.os.name} - ${parser.os.fullVersion}<br>浏览器：${
        parser.browser.name
      } - ${parser.browser.fullVersion}`;
    },
    async remove(index, id) {
      const api = new Api(this);
      try {
        await api.readFeedback({ id });
        this.pageList.splice(index, 1);
        this.$channel.$emit("admin-trial-do", {
          type: "feedback"
        });
        this.$toast.success("操作成功");
      } catch (e) {
        this.$toast.error(e);
      }
    }
  }
};
</script>
