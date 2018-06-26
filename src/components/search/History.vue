<style lang="scss">
  .search-history {
  }
</style>

<template>
  <transition name="el-fade-in">
    <div class="search-history" v-if="show && list.length">
      <v-hr text="历史搜索"></v-hr>
      <ul>
        <li v-for="item in list">
          <a class="oneline" v-text="item" @click="query(item)"></a>
          <span class="del" @click.stop="del(item)">&times;</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'v-search-history',
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        show: this.value,
        cacheKey: 'search-history',
        list: [],
        maxLen: 5
      }
    },
    methods: {
      query (q) {
        this.$router.push({
          name: 'search-index',
          query: { q, type: 0 }
        })
      },
      set (q) {
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
      get () {
        try {
          return JSON.parse(localStorage.getItem(this.cacheKey)) || []
        } catch (e) {
          return []
        }
      },
      clear () {
        try {
          localStorage.removeItem(this.cacheKey)
        } catch (e) {}
      },
      del (q) {
        const list = this.get()
        const index = list.indexOf(q)
        list.splice(index, 1)
        try {
          localStorage.setItem(this.cacheKey, JSON.stringify(list))
        } catch (e) {}
        this.list.splice(index, 1)
      }
    },
    mounted () {
      this.$watch('value', (val) => {
        this.show = val
      })
      this.$watch('show', (val) => {
        this.$emit('input', val)
      })
      this.list = this.get()
    }
  }
</script>
