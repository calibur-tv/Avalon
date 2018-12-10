<template>
  <div id="bangumi-pub-layout">
    <v-header/>
    <v-layout>
      <div class="breadcrumb-links">
        <router-link :to="$alias.bangumiNews">新番放送</router-link>
        <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
        <router-link :to="$alias.bangumiTag()">分类索引</router-link>
      </div>
      <router-view/>
      <template slot="aside">
        <bangumi-recommended/>
        <bangumi-hots/>
      </template>
    </v-layout>
  </div>
</template>

<script>
import BangumiRecommended from '~/components/bangumi/BangumiRecommended'
import BangumiHots from '~/components/bangumi/BangumiHots'

export default {
  name: 'BangumiPubLayout',
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('bangumi/getRecommended'),
      store.dispatch('bangumi/getHots')
    ])
  },
  components: {
    BangumiHots,
    BangumiRecommended
  }
}
</script>
