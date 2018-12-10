<style lang="scss">
#post-flow {
  .img {
    background-color: RGB(60, 134, 247);
  }
}
</style>

<template>
  <div id="post-flow">
    <!--
    <div class="flow-intro">
      <div class="img">帖</div>
      <div class="intro">
        <div>
          <div class="control">
            <el-button
              round
              plain
              @click="openCreatePost"
            >
              发帖
            </el-button>
          </div>
          <div class="summary">
            <h2 class="title">帖吧</h2>
            <div
              v-if="meta"
              class="extra"
            >共 <strong v-text="meta.collection"/> 个吧&nbsp;·&nbsp;发表了 <strong v-text="meta.total"/> 条帖子</div>
            <el-button
              type="text"
              size="mini"
              @click="showTips = !showTips"
            >
              {{ showTips ? '收起' : '查看' }}板块介绍
              <i :class="showTips ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"/>
            </el-button>
          </div>
        </div>
        <el-alert
          v-if="showTips"
          type="info"
          title=""
          class="detail"
        >
          <p>
            「calibur.tv」的贴吧功能与
            <a
              href="https://tieba.baidu.com/f?kw=calibur"
              target="_blank"
            >「百度贴吧」</a>
            基本相同，不过本站目前只允许开设「二次元」领域的贴吧，非二次元相关话题是不允许的；
          </p>
          <p>
            「贴吧」板块讨论的话题应该更加的轻松一些，大家天马星空的想法都可以在此发表，
            如果你想写一篇专业的漫评，可以到
            <nuxt-link :to="$alias.world('review')">「漫评」</nuxt-link>
            板块发文；
          </p>
          <p>
            如果你想为你喜欢的动漫角色盖楼，那么非常荣幸的告诉你，我们为 “盖楼” 专门开发了一个
            <nuxt-link :to="$alias.roleTrending">「应援」</nuxt-link>
            系统，每次应援都需要消耗
            <nuxt-link to="/about/hello">「团子」</nuxt-link>
            ，而不是谁的 “水军” 多谁就可以排名靠前；
          </p>
          <p>
            最后，如果有人喜欢了你的帖子，那么每个喜欢就可以让你收获一个团子。
            当然了，如果你想要喜欢别人的帖子，那么你需要消耗一个团子。
          </p>
        </el-alert>
      </div>
    </div>
    -->
    <flow-list
      func="getWorldPost"
      type="seenIds"
      sort="active"
    >
      <ul slot-scope="{ flow }">
        <post-flow-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import PostFlowItem from '~/components/flow/item/PostFlowItem'

export default {
  name: 'PostWorld',
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('flow/initData', {
        func: 'getWorldPost',
        type: 'seenIds',
        sort: 'active'
      })
      // store.dispatch('flow/getMeta', { type: 'post' })
    ])
  },
  components: {
    PostFlowItem
  },
  data() {
    return {
      showTips: false
    }
  },
  methods: {
    openCreatePost() {
      this.$channel.$emit('show-create-post-modal')
    }
  }
}
</script>
