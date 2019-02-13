<template>
  <div v-if="source">
    <slot
      :source="source"
      name="header"
    />
    <slot :flow="source.list"/>
    <flow-state
      :auto="auto"
      :loading="source.loading"
      :no-more="source.noMore"
      :nothing="source.nothing"
      :error="source.error"
      :load-more="loadMore"
      :fetch="loadMore"
    >
      <slot
        slot="error"
        name="error"
      />
      <slot
        slot="nothing"
        name="nothing"
      />
      <slot
        slot="no-more"
        name="no-more"
      />
      <slot
        slot="loading"
        name="loading"
      />
    </flow-state>
  </div>
</template>

<script>
import FlowState from './FlowState'
import flowMixin from './flowMixin'

export default {
  name: 'FlowList',
  components: {
    FlowState
  },
  mixins: [flowMixin],
  computed: {
    source() {
      return this.$store.getters['flow/getFlow'](this.func, this.sort, this.id)
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('flow/loadMore', {
        type: this.type,
        sort: this.sort,
        func: this.func,
        id: this.id,
        changing: this.changing
      })
    }
  }
}
</script>
