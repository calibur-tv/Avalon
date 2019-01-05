<style lang="scss">
.roll-list {
  .rolling-btn {
    color: $color-text-light;
    font-size: 13px;
    font-weight: normal;

    i {
      display: inline-block;
      transition: 0.5s ease;
      font-size: 15px;
      line-height: 15px;
    }
  }
}
</style>

<template>
  <div class="roll-list">
    <button
      class="rolling-btn"
      @click="fetchData"
    >
      <i
        :style="{ transform: `rotate(${counter * 360}deg)` }"
        class="iconfont ic-search-change"
      />
      <span v-text="$t('common.roll')"/>
    </button>
    <slot
      v-if="setLoading && loading"
      name="loading"
    />
    <slot
      v-else
      :list="displayList"
    />
  </div>
</template>

<script>
export default {
  name: 'RollList',
  props: {
    list: {
      required: true,
      type: Array
    },
    display: {
      required: true,
      type: Number
    },
    setLoading: {
      type: Boolean,
      default: false
    },
    fetch: {
      type: Function,
      default: null
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      counter: 0,
      maxPage: this.total ? Math.ceil(this.total / this.display) : 0,
      curPage: 1,
      loading: false
    }
  },
  computed: {
    displayList() {
      const { list, curPage, display } = this
      const begin = (curPage - 1) * display
      return list.slice(begin, begin + display)
    }
  },
  methods: {
    async fetchData() {
      if (this.loading) {
        return
      }
      if (this.maxPage) {
        this.counter++
        if (this.curPage === this.maxPage) {
          this.curPage = 1
        } else {
          this.curPage++
        }
        return
      }
      if (!this.fetch) {
        return
      }
      const oldLength = this.list.length
      this.loading = true
      this.counter++
      try {
        await this.fetch()
        const newLength = this.list.length - oldLength
        if (newLength) {
          this.curPage++
        }
        if (newLength < this.display) {
          this.maxPage = this.curPage
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
