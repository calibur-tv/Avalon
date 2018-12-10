<template>
  <section class="bangumi-layout">
    <bangumi-banner/>
    <v-layout>
      <tab-container :list="cards"/>
      <nuxt-child/>
      <bangumi-aside slot="aside"/>
    </v-layout>
  </section>
</template>

<script>
import BangumiBanner from '~/components/bangumi/BangumiBanner'
import BangumiAside from '~/components/bangumi/BangumiAside'
import TabContainer from '~/components/common/TabContainer'
import { getBangumiInfo } from '~/api/bangumiApi'

export default {
  name: 'BangumiShowLayout',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ app, store, params, error }) {
    const { id } = params
    return getBangumiInfo(app, { id })
      .then(data => {
        store.commit('social/SET_STATE', {
          type: 'bangumi',
          id,
          data: {
            follow: data.followed,
            follow_users: data.follow_users
          }
        })
        store.commit('bangumi/SET_BANGUMI_DATA', data)
      })
      .catch(error)
  },
  components: {
    BangumiBanner,
    BangumiAside,
    TabContainer
  },
  head() {
    const { info } = this
    return {
      title: `${info.name} - 番剧`,
      meta: [{ hid: 'description', name: 'description', content: info.summary }]
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    },
    cards() {
      const { info } = this
      if (!info) {
        return []
      }
      return [
        {
          label: '帖子',
          name: 'bangumi-id-post',
          show: true
        },
        {
          label: '视频',
          name: 'bangumi-id-video',
          show: info.has_video
        },
        {
          label: '漫画',
          name: 'bangumi-id-cartoon',
          show: info.has_cartoon
        },
        {
          label: '偶像',
          name: 'bangumi-id-role',
          show: true
        },
        {
          label: '相册',
          name: 'bangumi-id-pins',
          show: true
        },
        {
          label: '漫评',
          name: 'bangumi-id-review',
          show: true
        },
        {
          label: '问答',
          name: 'bangumi-id-qaq',
          show: true
        },
        {
          label: '设置',
          name: 'bangumi-id-setting',
          show: info.is_master
        }
      ].filter(_ => _.show)
    }
  }
}
</script>
