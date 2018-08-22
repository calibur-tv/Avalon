<template>
  <transition name="el-fade-in">
    <div
      v-if="show && list.length"
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
  </transition>
</template>

<script>
export default {
  name: "VSearchHistory",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: this.value,
      cacheKey: "search-history",
      list: [],
      maxLen: 5
    };
  },
  mounted() {
    this.$watch("value", val => {
      this.show = val;
    });
    this.$watch("show", val => {
      this.$emit("input", val);
    });
    this.$channel.$on("search-action", ({ text, type }) => {
      this.set(text);
    });
    this.list = this.get();
  },
  methods: {
    query(q) {
      this.set(q);
      this.$router.push({
        name: "search-index",
        query: { q, type: "all" }
      });
    },
    set(q) {
      setTimeout(() => {
        const list = this.get();
        const index = list.indexOf(q);
        if (index !== -1) {
          list.splice(index, 1);
        }
        list.unshift(q);
        if (list.length > this.maxLen) {
          list.pop();
        }
        this.list = list;
        try {
          localStorage.setItem(this.cacheKey, JSON.stringify(list));
        } catch (e) {}
      }, 0);
    },
    get() {
      try {
        return JSON.parse(localStorage.getItem(this.cacheKey)) || [];
      } catch (e) {
        return [];
      }
    },
    clear() {
      try {
        localStorage.removeItem(this.cacheKey);
      } catch (e) {}
      this.list = [];
    },
    del(q) {
      const list = this.get();
      const index = list.indexOf(q);
      list.splice(index, 1);
      try {
        localStorage.setItem(this.cacheKey, JSON.stringify(list));
      } catch (e) {}
      this.list.splice(index, 1);
    }
  }
};
</script>
