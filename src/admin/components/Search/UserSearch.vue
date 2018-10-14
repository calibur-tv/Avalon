<template>
  <div class="clearfix">
    <el-row>
      <el-col :span="20">
        <el-row>
          <el-col :span="4">
            <el-select
              v-model="type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="20">
            <el-input
              v-model.trim="input"
              placeholder="请输入搜索信息"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col
        :span="2"
        :offset="1"
      >
        <el-button
          :loading="loading"
          style="margin-left: -10px"
          type="primary"
          icon="el-icon-search"
          @click="search"
        >搜索</el-button>
      </el-col>
    </el-row>
    <p
      v-if="!disabled"
      style="font-size: 12px;color: #8590a6;margin-left: 2px;line-height: 40px;"
    >
      搜索结果：
      <span
        v-if="!user && !loading"
        style="color: red"
      >未搜索</span>
      <template v-else>
        {{ loading ? '搜索中...' : user.nickname }}
      </template>
    </p>
  </div>
</template>

<script>
import Api from "~/api/adminApi";

export default {
  name: "UserSearch",
  props: {
    value: {
      type: [Number, String],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input: "",
      loading: false,
      user: null,
      type: "id",
      options: [
        {
          label: "手机号",
          value: "phone"
        },
        {
          label: "邀请码",
          value: "id"
        },
        {
          label: "ip地址",
          value: "ip_address"
        },
        {
          label: "个性域名",
          value: "zone"
        }
      ]
    };
  },
  methods: {
    async search() {
      console.log("click");
      let q = this.input;
      if (!q) {
        return;
      }

      if (this.disabled) {
        this.$emit("submit", {
          type: this.type,
          value: q
        });
        return;
      }

      const api = new Api(this);
      try {
        const user = await api.searchUser({
          type: this.type,
          value: q
        });
        this.user = user;
        this.$emit("input", parseInt(user.id, 10));
      } catch (e) {
        this.$toast.error("服务暂不可用");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
