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
    :filter-method="handleEnter"
    :filterable="true"
    :clearable="clear"
    :disabled="disabled"
    :placeholder="showPlaceholder"
    :multiple="multiple"
    :multiple-limit="limit"
    style="width: 100%"
    @visible-change="handleSelectToggle"
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
      default: '未选择'
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
      filteredOptions: [],
      loading: false,
      fetched: false,
      fetchedBangumi: []
    }
  },
  computed: {
    bangumis() {
      return this.followed ? this.fetchedBangumi : this.$store.state.bangumi.all
    },
    user() {
      return this.$store.state.user
    },
    showPlaceholder() {
      if (!this.followed) {
        return this.placeholder
      }
      if (this.loading) {
        return '加载中...'
      }
      if (this.fetched && !this.bangumis.length) {
        return '还没有关注任何番剧'
      }
      return this.placeholder
    }
  },
  mounted() {
    if (this.followed) {
      this.getData()
    } else {
      this.filteredOptions = this.bangumis
    }
    this.$watch('value', val => {
      this.searchId = val
    })
    this.$watch('searchId', val => {
      this.$emit('input', val)
      val && this.$emit('search', val)
    })
  },
  methods: {
    handleEnter(query) {
      if (!query) {
        this.filteredOptions = this.bangumis
        return
      }
      this.filteredOptions = this.bangumis.filter(option => {
        return option.alias
          ? option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1
          : option.name.indexOf(query) > -1
      })
    },
    handleSelectToggle(result) {
      if (!result) {
        setTimeout(() => {
          this.filteredOptions = this.bangumis
        }, 500)
      } else if (this.filteredOptions.length === 1) {
        this.filteredOptions = this.bangumis
      }
    },
    async getData() {
      if (this.loading || this.fetched || !this.user) {
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('users/getFollowBangumis', {
          zone: this.user.zone
        })
        this.fetchedBangumi = this.$store.state.users.bangumis
        this.filteredOptions = this.bangumis
        this.fetched = true
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
