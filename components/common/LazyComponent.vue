<template>
  <not-ssr>
    <slot v-if="init"/>
    <div
      v-else
      class="v-lazy-shim"
    />
  </not-ssr>
</template>

<script>
import utils from './ImageLazyLoad/utils'

export default {
  name: 'VLazy',
  data() {
    return {
      init: false
    }
  },
  mounted() {
    this.renderComp()
  },
  methods: {
    renderComp() {
      if (utils.checkInView(this.$el, 1.5)) {
        this.init = true
      } else {
        const id = utils.on(
          document,
          ['scroll', 'resize'],
          this.$utils.throttle(() => {
            if (utils.checkInView(this.$el, 1.5) || this.init) {
              this.init = true
              utils.off(id)
            }
          }, 200)
        )
      }
    }
  }
}
</script>
