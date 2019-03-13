<template>
  <div id="bangumi-image-flow">
    <flow-list :id="id" func="getBangumiImage" type="seenIds" sort="active">
      <image-waterfall-flow
        slot-scope="{ flow }"
        :bangumi-id="id"
        :list="flow"
      />
      <no-content slot="nothing">
        <el-button :round="true" type="primary"
                   @click="handleImageClick"
        >
          上传《{{ bangumi.name }}》的第一张美图
        </el-button>
      </no-content>
    </flow-list>
  </div>
</template>

<script>
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'BangumiImageFlow',
  components: {
    ImageWaterfallFlow
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    bangumi() {
      return this.$store.state.bangumi.show
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiImage',
      type: 'seenIds',
      sort: 'active'
    })
  },
  methods: {
    handleImageClick() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.$channel.$emit('show-upload-image-modal', {
        bangumiId: this.id
      })
    }
  }
}
</script>
