<style lang="scss">
#user-faq {
  .el-radio-group {
    margin-left: 0 !important;
    margin-top: 6px;
  }

  #no-content {
    margin-top: 25px;
  }
}
</style>

<template>
  <div id="user-faq">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="回答"/>
        <el-radio-button label="提问"/>
      </el-radio-group>
    </div>
    <flow-list
      v-if="active === '回答'"
      :id="user.zone"
      func="getUserAnswer"
      type="page"
      sort="news"
    >
      <ul slot-scope="{ flow }">
        <question-flow-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
        />
      </ul>
      <no-content slot="nothing"/>
    </flow-list>
    <flow-list
      v-else
      :id="user.zone"
      func="getUserQAQ"
      type="page"
      sort="news"
    >

      <ul slot-scope="{ flow }">
        <question-flow-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
        />
      </ul>
      <no-content slot="nothing"/>
    </flow-list>
  </div>
</template>

<script>
import QuestionFlowItem from '~/components/flow/item/QuestionFlowItem'

export default {
  name: 'UserFAQ',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserAnswer',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  },
  components: {
    QuestionFlowItem
  },
  data() {
    return {
      active: '回答'
    }
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === '回答') {
        this.getUserFAQ('getUserAnswer')
      } else {
        this.getUserFAQ('getUserQAQ')
      }
    },
    getUserFAQ(func) {
      this.$store.dispatch('flow/initData', {
        func,
        type: 'page',
        sort: 'news',
        id: this.user.zone
      })
    }
  }
}
</script>
