<style lang="scss">
#trending-role {
  #main-content {
    main {
      padding-left: 0 !important;
    }
  }
}
</style>

<template>
  <div id="trending-role">
    <v-header type="pure"/>
    <div
      id="main-content"
      class="container"
    >
      <tab-container :list="pages"/>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
import TabContainer from '~/components/common/TabContainer'
import { getUserWorkSchedule } from '~/api/cartoonRoleApi'
import { Notification } from 'element-ui'

export default {
  name: 'TrendingRole',
  head: {
    title: '股市大厅'
  },
  components: {
    TabContainer
  },
  data() {
    return {
      todo: []
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.login
    },
    pages() {
      const result = [
        {
          label: '上市榜',
          name: 'role-trending-listed'
        },
        {
          label: '新创榜',
          name: 'role-trending-newbie'
        },
        {
          label: '交易所',
          name: 'role-trending-hall'
        },
        {
          label: '注册公司',
          name: 'role-trending-register'
        },
        {
          label: '股市简介',
          name: 'role-trending-intro'
        }
      ]
      if (this.isLogin) {
        result.push({
          label: '我的数据',
          name: 'role-trending-mine'
        })
      }
      return result
    }
  },
  mounted() {
    const canceler = this.$watch('isLogin', () => {
      canceler()
      this.getUserNeedTodo()
    })
  },
  methods: {
    async getUserNeedTodo() {
      const data = await getUserWorkSchedule(this)
      this.todo = data
      data.forEach(item => {
        setTimeout(() => {
          Notification({
            title: '会议提醒',
            type: 'warning',
            dangerouslyUseHTMLString: true,
            message: `<a target="_blank" href="${this.$alias.cartoonRole(
              item.id
            )}">正在召开「${item.name}」的股东大会</a>`,
            offset: 50,
            duration: 0
          })
        }, 100)
      })
    }
  }
}
</script>
