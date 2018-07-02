import Vue from 'vue';

Vue.mixin({
  data () {
    return {
      page: {
        size: 10,
        cur: 1,
        total: 0,
        maxPage: 1
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
  }
});
