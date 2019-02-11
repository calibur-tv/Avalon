<template>
  <div id="trending-role">
    <v-header type="pure"/>
    <v-layout>
      <tab-container :list="pages"/>
      <nuxt-child/>
    </v-layout>
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
  data() {
    return {
      pages: [
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
        }
      ]
    }
  }
}
</script>
