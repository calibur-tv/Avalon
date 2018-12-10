<style lang="scss">
.tab-container {
  &.el-tabs--top {
    .el-tabs__header {
      margin-bottom: 17px;
    }

    .el-tabs__nav-wrap {
      &:after {
        background-color: transparent;
      }
    }

    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      font-size: 12px;

      &.is-disabled {
        font-size: 18px;
        font-weight: 400;
        height: auto;
        line-height: 18px;
        top: 3px;
        color: #303133;
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
      v-if="title"
      :label="title"
      :disabled="true"
      :name="title"
    />
    <el-tab-pane
      v-for="(i, index) in list" 
      :key="index"
      :label="i.label"
      :name="route ? i.name : `${index}`"
    >
      <slot
        v-if="!route"
        :name="`${index}`"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'TabContainer',
  props: {
    list: {
      type: Array,
      required: true
    },
    def: {
      type: String,
      default: '0'
    },
    pos: {
      type: String,
      default: 'top'
    },
    route: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      current: this.def
    }
  },
  mounted() {
    if (this.route) {
      this.current = this.$route.name
      this.$watch('$route', val => {
        this.current = val.name
      })
    }
  },
  methods: {
    tabClick(i) {
      if (!this.route) {
        this.$emit('change', this.title ? i.index - 1 : i.index - 0)
        return
      }
      this.go(i.name)
    },
    go(x) {
      const name = x ? x : 'homepage'
      this.$router.push({
        name,
        params: this.$route.params
      })
    }
  }
}
</script>
