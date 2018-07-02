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
        type: [String, Number],
        default: ''
      },
      clear: {
        type: Boolean,
        default: true
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
      if (this.init) {
        this.getBangumis()
      }
    },
    mounted () {
      this.$watch('value', (val) => {
        this.searchId = val
      })
      this.$watch('searchId', (val) => {
        this.$emit('input', val)
        val && this.$emit('search', val)
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
        if (this.bangumis.length) {
          this.filteredOptions = this.bangumis
          this.loading = false
          return
        }
        try {
          await this.$store.dispatch('search/fetchBangumis')
          this.filteredOptions = this.bangumis
          this.loading = false
        } catch (e) {
          this.init = true
        }
      },
      handleSelectToggle (result) {
        if (!result) {
          setTimeout(() => {
            this.filteredOptions = this.bangumis
          }, 500)
        } else if (this.filteredOptions.length === 1) {
          this.filteredOptions = this.bangumis
        }
      }
    }
  }
</script>
