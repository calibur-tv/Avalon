<template>
  <div id="bangumi-image-flow">
    <flow-list
      :id="id"
      func="getBangumiImage"
      type="seenIds"
      sort="active"
    >
      <image-waterfall-flow
        slot-scope="{ flow }"
        :bangumi-id="id"
        :list="flow"
      />
    </flow-list>
  </div>
</template>

<script>
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'BangumiImageFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiImage',
      type: 'seenIds',
      sort: 'active'
    })
  },
  components: {
    ImageWaterfallFlow
  },
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>
