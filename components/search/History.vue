<style lang="scss">
.search-history {
  ul {
    margin-left: 0 !important;
  }

  li {
    list-style-type: none !important;
  }
}
</style>

<template>
  <div
    v-if="list.length"
    class="search-history"
  >
    <v-hr text="历史搜索"/>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <a
          class="oneline"
          @click="query(item)"
          v-text="item"
        />
        <span
          class="del"
          @click.stop="del(item)"
        >&times;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VSearchHistory',
  data() {
    return {
      cacheKey: 'search-history',
      list: [],
      maxLen: 5
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.$channel.$on('search-action', ({ text, type }) => {
      this.set(text)
    })
    this.list = this.get()
  },
  methods: {
    query(q) {
      this.set(q)
      this.$router.push({
        name: 'search',
        query: { q, type: 'all' }
      })
    },
    set(q) {
      setTimeout(() => {
        const list = this.get()
        const index = list.indexOf(q)
        if (index !== -1) {
          list.splice(index, 1)
        }
        list.unshift(q)
        if (list.length > this.maxLen) {
          list.pop()
        }
        this.list = list
        try {
          localStorage.setItem(this.cacheKey, JSON.stringify(list))
        } catch (e) {}
      }, 0)
    },
    get() {
      try {
        return JSON.parse(localStorage.getItem(this.cacheKey)) || []
      } catch (e) {
        return []
      }
    },
    clear() {
      try {
        localStorage.removeItem(this.cacheKey)
      } catch (e) {}
      this.list = []
    },
    del(q) {
      const list = this.get()
      const index = list.indexOf(q)
      list.splice(index, 1)
      try {
        localStorage.setItem(this.cacheKey, JSON.stringify(list))
      } catch (e) {}
      this.list.splice(index, 1)
    }
  }
}
</script>
