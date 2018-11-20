<style lang="scss">
#cartoon-role-flow-list {
  .load-more-btn {
    width: 100%;
  }

  .load-more-roles {
    margin-top: 30px;
    text-align: center;
  }
}
</style>

<template>
  <div
    v-if="source"
    id="cartoon-role-flow-list"
  >
    <no-content v-if="source.nothing">
      <a
        v-if="isMe"
        :href="$alias.roleTrending"
        target="_blank"
      >查看角色列表</a>
      <el-button
        v-if="bangumiId"
        type="primary"
        round
        @click="openFeedback"
      >没有你喜欢的角色？</el-button>
    </no-content>
    <template v-else>
      <ul>
        <cartoon-role-flow-item
          v-for="(item, index) in roles"
          :index="index"
          :key="item.id"
          :item="item"
          :bangumi-id="bangumiId"
          :user-zone="userZone"
        />
      </ul>
      <load-more-btn
        v-if="!(source.noMore && bangumiId)"
        :no-more="source.noMore"
        :loading="source.loading"
        :auto="true"
        @fetch="loadMore"
      />
    </template>
    <div
      v-if="bangumiId && source.noMore && !source.nothing"
      class="load-more-roles"
    >
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >没有你喜欢的角色？</el-button>
    </div>
  </div>
</template>

<script>
import flowMixin from './_flowListMixin'
import CartoonRoleFlowItem from '../item/CartoonRoleFlowItem'

export default {
  name: 'CartoonRoleFlowList',
  components: {
    CartoonRoleFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: 'role'
    }
  },
  computed: {
    roles() {
      return this.source.list
    }
  },
  methods: {
    openFeedback() {
      this.$channel.$emit('open-feedback', {
        type: 6,
        desc: `我想要为《${this.bangumiName}》的 {?} 应援`,
        placeholder: '请填写要应援的偶像'
      })
    }
  }
}
</script>
