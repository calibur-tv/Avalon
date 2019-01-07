<style lang="scss">
#user-post {
  #no-content {
    margin-top: 22px;
    padding-top: 0;
  }

  .posts-of-reply {
    margin-left: -10px;

    #no-content {
      margin-left: 10px;
    }
  }
}
</style>

<template>
  <div id="user-post">
    <el-radio-group
      v-model="tab"
      size="mini"
      @change="handleTabSwitch"
    >
      <el-radio-button label="回帖"/>
      <el-radio-button label="主题帖"/>
    </el-radio-group>
    <div
      v-show="tab === '回帖'"
      class="posts-of-reply"
    >
      <flow-list
        :id="user.zone"
        func="getUserPostReply"
        type="page"
        sort="news"
      >
        <ul slot-scope="{ flow }">
          <post-reply-item
            v-for="item in flow"
            :key="item.id"
            :item="item"
          />
        </ul>
        <no-content slot="nothing"/>
      </flow-list>
    </div>
    <div
      v-show="tab === '主题帖'"
      class="posts-of-mine"
    >
      <flow-list
        :id="user.zone"
        func="getUserPost"
        type="page"
        sort="news"
      >
        <ul slot-scope="{ flow }">
          <post-flow-item
            v-for="item in flow"
            :key="item.id"
            :user-zone="user.zone"
            :item="item"
          />
        </ul>
        <no-content slot="nothing"/>
      </flow-list>
    </div>
  </div>
</template>

<script>
import PostFlowItem from '~/components/flow/item/PostFlowItem'
import PostReplyItem from '~/components/flow/item/PostReplyItem'

export default {
  name: 'UserPost',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserPostReply',
      sort: 'news',
      type: 'page',
      id: params.zone
    })
  },
  components: {
    PostFlowItem,
    PostReplyItem
  },
  data() {
    return {
      tab: '回帖'
    }
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === '回帖') {
        this.$store.dispatch('flow/initData', {
          func: 'getUserPostReply',
          sort: 'news',
          type: 'page',
          id: this.user.zone
        })
      } else {
        this.$store.dispatch('flow/initData', {
          func: 'getUserPost',
          sort: 'news',
          type: 'page',
          id: this.user.zone
        })
      }
    }
  }
}
</script>
