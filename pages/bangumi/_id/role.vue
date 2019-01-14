<template>
  <flow-list
    :id="id"
    func="getBangumiRole"
    type="seenIds"
    sort="hot"
  >
    <ul slot-scope="{ flow }">
      <cartoon-role-flow-item
        v-for="item in flow"
        :key="item.id"
        :item="item"
        :bangumi-id="id"
      />
    </ul>
    <no-content
      slot="nothing"
    >
      <el-button
        :round="true"
        type="primary"
        @click="handleRoleClick"
      >求偶像</el-button>
    </no-content>
    <no-content
      slot="no-more"
    >
      <el-button
        :round="true"
        type="primary"
        @click="handleRoleClick"
      >求偶像</el-button>
    </no-content>
  </flow-list>
</template>

<script>
import CartoonRoleFlowItem from '~/components/flow/item/CartoonRoleFlowItem'

export default {
  name: 'BangumiCartoonRole',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getBangumiRole',
      type: 'seenIds',
      sort: 'hot',
      id: params.id
    })
  },
  components: {
    CartoonRoleFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    bangumi() {
      return this.$store.state.bangumi.show
    }
  },
  methods: {
    handleRoleClick() {
      this.$channel.$emit('open-feedback', {
        type: 6,
        desc: `我想为《${this.bangumi.name}》的{?}应援`,
        placeholder: '请填写你想要应援的偶像'
      })
    }
  }
}
</script>
