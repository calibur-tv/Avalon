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
    <el-button
      v-if="!source.noMore"
      :loading="source.loading"
      class="load-more-btn"
      type="info"
      plain
      @click="loadMore"
    >{{ source.loading ? '加载中' : '加载更多' }}</el-button>
    <no-content v-if="userZone && !source.list.length && !source.loading && source.noMore">
      <a
        v-if="isMe"
        :href="$alias.roleTrending"
        target="_blank"
      >查看角色列表</a>
    </no-content>
    <div
      v-if="bangumiId && source.noMore"
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
import flowMixin from "~/mixins/flow";
import CartoonRoleFlowItem from "../item/CartoonRoleFlowItem";

export default {
  name: "ScoreFlowList",
  components: {
    CartoonRoleFlowItem
  },
  mixins: [flowMixin],
  props: {
    bangumiName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      flowType: "role"
    };
  },
  computed: {
    roles() {
      if (this.userZone) {
        return this.source.list;
      }
      return this.$utils.orderBy(this.source.list, "star_count", "desc");
    },
    isMe() {
      return this.$store.state.login
        ? this.userZone === this.$store.state.user.zone
        : false;
    }
  },
  methods: {
    openFeedback() {
      this.$channel.$emit("open-feedback", {
        type: 6,
        desc: `我想要为《${this.bangumiName}》的 ? 应援`
      });
    }
  }
};
</script>
