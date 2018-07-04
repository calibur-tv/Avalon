<template>
  <div class="clearfix">
    <el-row>
      <el-col :span="20">
        <el-input
          v-model.trim="input"
          placeholder="请输入内容用户网址"
        />
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
  import Api from '~/api/adminApi'

  export default {
    name: 'UserSearch',
    props: {
      value: {
        type: [Number, String],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        input: '',
        lastQ: '',
        loading: false,
        user: null
      }
    },
    methods: {
      async search () {
        let q = this.input
        if (!q) {
          return
        }
        if (!/(.calibur.tv\/user\/|localhost:)/.test(q)) {
          this.$toast.error('请输入正确的查询条件');
          return
        }

        q = q.split('/').pop()
        if (q && q === this.lastQ) {
          return
        }
        this.lastQ = q;

        if (this.disabled) {
          this.$emit('submit', q);
          return
        }

        const api = new Api(this);
        try {
          const user = await api.searchUser({ zone: q });
          this.user = user;
          this.$emit('input', parseInt(user.id, 10))
        } catch (e) {
          this.$toast.error('服务暂不可用');
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
