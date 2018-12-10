<template>
  <div>
    <flow-list
      :id="user.zone"
      func="getUserImage"
      type="page"
      sort="news"
    >
      <image-waterfall-flow
        slot-scope="{ flow }"
        :list="flow"
        :user-zone="user.zone"
      />

    </flow-list>
  </div>
</template>

<script>
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'UserImage',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserImage',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  },
  components: {
    ImageWaterfallFlow
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  }
}
</script>
