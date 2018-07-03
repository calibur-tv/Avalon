import Vue from 'vue';

Vue.mixin({
  data () {
    return {
      page: {
        max: 0,
        cur: 0,
        size: 10,
        total: 0,
      },
    }
  },
  computed: {
    pageData () {
      if (!this.list) {
        return []
      }
      const begin = (this.page.cur - 1) * this.page.size;
      return this.list.slice(begin, begin + this.page.size)
    }
  },
  methods: {
    handlePageChange (val) {
      this.page.cur = val
    },
    resetPageState () {
      this.page = {
        max: 0,
        cur: 0,
        size: 10,
        total: 0,
      }
    }
  }
});
