<template>
  <el-select
    v-model="searchId"
    :filter-method="handleEnter"
    :filterable="true"
    :clearable="clear"
    :loading="loading"
    style="width: 100%"
    placeholder="输入番剧名称，搜索番剧"
    @visible-change="handleSelectToggle"
  >
    <el-option
      v-for="item in filteredOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
  export default {
    name: 'BangumiSearch',
    props: {
      value: {
        required: true,
        type: [String, Number],
        default: ''
      },
      clear: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        init: true,
        loading: true,
        searchId: this.value,
        filteredOptions: []
      }
    },
    computed: {
      bangumis () {
        return [{
          id: 0,
          name: '无',
          alias: '无，不，未选择'
        }].concat(this.$store.state.search.bangumis)
      }
    },
    created () {
      if (this.bangumis.length <= 1 && this.init) {
        this.getBangumis()
      }
    },
    mounted () {
      this.$watch('value', (val) => {
        this.searchId = val
      })
      this.$watch('searchId', (val) => {
        this.$emit('input', val)
      })
    },
    methods: {
      handleEnter (query) {
        if (!query) {
          this.filteredOptions =  this.bangumis
          return
        }
        this.filteredOptions = this.bangumis.filter(option => {
          return option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1;
        })
      },
      async getBangumis () {
        this.init = false
        try {
          await this.$store.dispatch('search/fetchBangumis')
          this.filteredOptions = this.bangumis
          this.loading = false
        } catch (e) {
          this.init = true
        }
      },
      handleSelectToggle (result) {
        if (!result && !this.filteredOptions.length) {
          this.filteredOptions = this.bangumis
        }
      }
    }
  }
</script>
