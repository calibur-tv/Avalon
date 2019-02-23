<template>
  <div>
    <flow-list :id="user.zone" func="getUserImage" type="page" sort="news">
      <image-waterfall-flow
        slot-scope="{ flow }"
        :list="flow"
        :width="168"
        :user-zone="user.zone"
      />
      <no-content slot="nothing" />
    </flow-list>
  </div>
</template>

<script>
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'UserImage',
  components: {
    ImageWaterfallFlow
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserImage',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  }
}
</script>
