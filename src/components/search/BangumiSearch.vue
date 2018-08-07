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
    :loading="loading"
    :placeholder="placeholder"
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
  name: "BangumiSearch",
  props: {
    value: {
      type: [String, Number, Array],
      default: ""
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
      default: "未选择"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      init: true,
      loading: true,
      searchId: this.value,
      filteredOptions: []
    };
  },
  computed: {
    bangumis() {
      return this.$store.state.search.bangumis;
    }
  },
  created() {
    if (this.init) {
      this.getBangumis();
    }
  },
  mounted() {
    this.$watch("value", val => {
      this.searchId = val;
    });
    this.$watch("searchId", val => {
      this.$emit("input", val);
      val && this.$emit("search", val);
    });
  },
  methods: {
    handleEnter(query) {
      if (!query) {
        this.filteredOptions = this.bangumis;
        return;
      }
      this.filteredOptions = this.bangumis.filter(option => {
        return (
          option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1
        );
      });
    },
    async getBangumis() {
      this.init = false;
      if (this.bangumis.length) {
        this.filteredOptions = this.bangumis;
        this.loading = false;
        return;
      }
      try {
        await this.$store.dispatch("search/fetchBangumis");
        this.filteredOptions = this.bangumis;
        this.loading = false;
      } catch (e) {
        this.init = true;
      }
    },
    handleSelectToggle(result) {
      if (!result) {
        setTimeout(() => {
          this.filteredOptions = this.bangumis;
        }, 500);
      } else if (this.filteredOptions.length === 1) {
        this.filteredOptions = this.bangumis;
      }
    }
  }
};
</script>
