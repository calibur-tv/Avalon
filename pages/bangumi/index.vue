<template>
  <div id="bangumi-index-layout">
    <v-header />
    <v-layout>
      <div class="breadcrumb-links">
        <router-link :to="$alias.bangumiNews">新番放送</router-link>
        <router-link :to="$alias.bangumiTag()">分类索引</router-link>
      </div>
      <nuxt />
      <template slot="aside">
        <bangumi-recommended :bangumis="recommended" />
        <bangumi-hots :bangumis="hots" />
      </template>
    </v-layout>
  </div>
</template>

<script>
import { getRecommendedBangumis, getHotBangumis } from '~/api/bangumiApi'
import BangumiRecommended from '~/components/bangumi/BangumiRecommended'
import BangumiHots from '~/components/bangumi/BangumiHots'

export default {
  name: 'BangumiList',
  components: {
    BangumiRecommended,
    BangumiHots
  },
  data() {
    return {
      recommended: [],
      hot: []
    }
  },
  async asyncData({ app }) {
    const data = await Promise.all([
      getRecommendedBangumis(app),
      getHotBangumis(app)
    ])
    return {
      recommended: data[0],
      hots: data[1]
    }
  }
}
</script>
