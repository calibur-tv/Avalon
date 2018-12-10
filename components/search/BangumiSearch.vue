<style lang="scss" scoped>
.bangumi-search-item {
  img {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    margin-right: 5px;
    margin-top: -2px;
    vertical-align: middle;
  }

  span {
    font-size: 14px;
  }
}
</style>

<template>
  <el-select
    v-model="searchId"
    :remote-method="handleEnter"
    :filterable="true"
    :clearable="clear"
    :disabled="disabled"
    :multiple="multiple"
    :multiple-limit="limit"
    :remote="true"
    placeholder="输入番剧名称搜索"
    style="width: 100%"
  >
    <el-option
      v-for="item in filteredOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      class="bangumi-search-item"
    >
      <img :src="$resize(item.avatar, { width: 48 })">
      <span v-text="item.name"/>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'BangumiSearch',
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    clear: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '搜索番剧'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    followed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchId: this.value,
      filteredOptions: []
    }
  },
  computed: {
    bangumis() {
      return this.$store.state.bangumi.all
    }
  },
  mounted() {
    this.$watch('value', val => {
      this.searchId = val
      if (this.disabled) {
        this.filteredOptions = this.bangumis.filter(option => {
          return !(option.id - this.value)
        })
      }
    })
    this.$watch('searchId', val => {
      this.$emit('input', val)
      val && this.$emit('search', val)
    })
  },
  methods: {
    handleEnter(query) {
      if (!query) {
        this.filteredOptions = []
        return
      }
      this.filteredOptions = this.bangumis.filter(option => {
        return option.alias
          ? option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1
          : option.name.indexOf(query) > -1
      })
    }
  }
}
</script>
