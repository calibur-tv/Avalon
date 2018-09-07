<style lang="scss">
.tab-container {
  &.el-tabs--top {
    margin-top: -10px;

    .el-tabs__nav-wrap {
      &:after {
        background-color: transparent;
      }
    }
  }
}
</style>

<template>
  <el-tabs
    v-model="current"
    :tab-position="pos"
    class="tab-container"
    @tab-click="tabClick"
  >
    <el-tab-pane
      v-for="(i, index) in list" 
      :key="index"
      :name="i.name"
      :lazy="i.lazy"
      :disabled="i.disabled" 
      :closable="i.closable"
    >
      <div 
        slot="label" 
        v-html="i.label"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "TabContainer",
  props: {
    list: {
      type: Array,
      required: true
    },
    def: {
      type: String,
      default: ""
    },
    pos: {
      type: String,
      default: "top"
    }
  },
  data() {
    return {
      current: this.def
    };
  },
  watch: {
    $route(to) {
      this.current = to.name;
    }
  },
  mounted() {
    this.current = this.$route.name;
  },
  methods: {
    tabClick(i) {
      this.go(i.name);
    },
    go(x) {
      const name = x ? x : "homepage";
      this.$router.push({
        name
      });
    }
  }
};
</script>
