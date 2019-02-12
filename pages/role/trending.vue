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

export default {
  name: 'TrendingRole',
  head: {
    title: '股市大厅'
  },
  components: {
    TabContainer
  },
  computed: {
    pages() {
      const result = [
        {
          label: '已上市',
          name: 'role-trending-listed'
        },
        {
          label: '融资中',
          name: 'role-trending-newbie'
        },
        {
          label: '交易大厅',
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
      if (this.$store.state.login) {
        result.push({
          label: '我的数据',
          name: 'role-trending-mine'
        })
      }
      return result
    }
  }
}
</script>
