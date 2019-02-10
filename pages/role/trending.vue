<style lang="scss">
#trending-role {
  .create-role-tips {
    margin-bottom: 20px;

    ul {
      margin-left: 5px;
      li {
        line-height: 22px;
        font-weight: 500;
        list-style-type: disc;
      }
    }
  }
}
</style>

<template>
  <div id="trending-role">
    <v-header type="pure"/>
    <v-layout>
      <tab-container
        :list="pages"
        :route="false"
        def="4"
      >
        <template slot="0">
          已上市
        </template>
        <template slot="1">
          融资中
        </template>
        <template slot="2">
          公司法
        </template>
        <template slot="3">
          个人法
        </template>
        <template slot="4">
          <div class="create-role-tips">
            <el-alert
              type="info"
            >
              <ul>
                <li>创办公司，需要交纳10个虚拟币（团子或光玉）作为注册资本</li>
                <li>请勿创建与番剧无关的角色，违者删除角色并禁言一周</li>
                <li>请勿发布错误的资料。头像、别名、简介等，要保持一致</li>
                <li>请勿创建重复的偶像，创建前善用搜索，重复的偶像将被删除</li>
                <li>偶像创建成功后，只要有20个人参股，就可以自动上市</li>
              </ul>
            </el-alert>
          </div>
          <create-role-form/>
        </template>
      </tab-container>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import TabContainer from '~/components/common/TabContainer'
import CreateRoleForm from '~/components/role/CreateRoleForm'

export default {
  name: 'TrendingRole',
  head: {
    title: '股市大厅'
  },
  components: {
    TabContainer,
    CreateRoleForm
  },
  data() {
    return {
      pages: [
        {
          label: '已上市'
        },
        {
          label: '融资中'
        },
        {
          label: '公司法'
        },
        {
          label: '个人法'
        },
        {
          label: '创办公司'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    changeTab(index) {
      if (index === 0) {
        this.getTodayActivityTrending()
      } else if (index === 1) {
        this.getTrending()
      }
      this.index = index
    },
    getTrending() {
      this.$store.dispatch('flow/initData', {
        func: 'getRoleTrending',
        type: 'seenIds',
        sort: 'hot'
      })
    }
  }
}
</script>
