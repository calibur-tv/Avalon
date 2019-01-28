<style lang="scss">
.no-more-box {
  text-align: center;
}
// .no-more-text {
//   display: inline-block;
//   width: 100%;
//   font-size: 13px;
//   color: $color-text-normal;
//   text-align: center;
//   margin-bottom: 15px;
//   margin-top: 30px;
// }
</style>

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
    <div 
      slot="no-more" 
      class="no-more-box">
      <!-- <span class="no-more-text">没有更多了</span> -->
      <br>
      <el-button
        :round="true"
        type="primary"
        @click="handleRoleClick"
      >求偶像</el-button>
    </div>
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
