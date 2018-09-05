<template>
  <el-tabs v-bind="$attrs" :value="here" @tab-click="tabClick">
    <el-tab-pane v-for="(i, index) in list" :key="index"
      :name="i.path" :lazy="i.lazy"
      :disabled="i.disabled" :closable="i.closable"
    >
      <div slot="label" v-html="i.label"></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'cTabs',
  data () {
    return {
      path: this.$router.history.current.path,
    }
  },
  props: ['list', 'value'],
  computed: {
    here () {
      return this.value || this.path
    }
  },
  watch: {
    '$route' (to) {
      this.path = to.path
    }
  },
  methods: {
    tabClick (i) {
      this.go(i.name)
    },
    go (x) {
      const path = x ? x : '/'
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
</style>
