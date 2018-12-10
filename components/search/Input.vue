<style lang="scss">
.search-input-wrap {
  position: relative;

  .search-input-btn {
    float: right;
    height: 100%;
  }

  .search-input-text {
    overflow: hidden;
    height: 100%;

    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }

  .search-suggestions {
    position: absolute;
    z-index: 999;
    max-height: 200px;
    overflow-y: scroll;

    &:hover {
      display: block !important;
    }

    li {
      cursor: pointer;
      height: 40px;
      padding: 5px 0;

      img {
        height: 30px;
        width: 30px;
        border-radius: 3px;
        vertical-align: middle;
        margin-left: 10px;
        margin-right: 8px;
      }
    }
  }
}
</style>

<template>
  <form
    :class="`search-${state}`"
    action="#"
    method="get"
    class="search-input-wrap"
    @submit.prevent="submit"
  >
    <button
      type="submit"
      class="search-input-btn"
    >
      <slot name="submit-btn">搜索</slot>
    </button>
    <div class="search-input-text">
      <input
        :placeholder="placeholder"
        :autofocus="autofocus"
        v-model.trim="word"
        class="search-input"
        type="text"
        name="q"
        aria-autocomplete="both"
        aria-haspopup="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        role="combobox"
        spellcheck="false"
        maxlength="50"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @keyup.up="handleKeyUp"
        @keyup.down="handleKeyDown"
      >
    </div>
    <ul
      v-show="displaySuggestion"
      class="search-suggestions"
    >
      <li
        v-for="(item, index) in filteredSelect"
        :key="item.id"
        :class="{ active: index === selectedIndex }"
        @click="clickToSearch(index)"
      >
        <img :src="$resize(item.avatar, { width: 60 })">
        <span v-text="item.name"/>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: 'VSearchInput',
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'all'
    },
    showSuggestion: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      word: this.value,
      selectedType: this.type,
      state: this.autofocus ? 'focus' : 'blur',
      typing: false,
      filteredSelect: [],
      selectedIndex: -1
    }
  },
  computed: {
    bangumis() {
      return this.$store.state.bangumi.all
    },
    displaySuggestion() {
      return (
        this.state === 'focus' &&
        this.showSuggestion &&
        this.word.length &&
        this.typing &&
        this.filteredSelect.length
      )
    }
  },
  mounted() {
    this.$watch('value', val => {
      this.word = val
      this.typing = true
      this.selectedIndex = -1
      this.handleEnter(val)
    })
    this.$watch('word', val => {
      this.$emit('input', val)
    })
    this.$watch('$route', val => {
      if (val.name === 'search') {
        this.word = val.query.q
        this.selectedType = val.query.type
        setTimeout(() => {
          this.typing = false
        }, 0)
      }
    })
  },
  methods: {
    submit() {
      const q =
        this.selectedIndex !== -1
          ? this.filteredSelect[this.selectedIndex].name
          : this.word
      if (!q) {
        return
      }
      this.$channel.$emit('search-action', {
        text: q,
        type: this.selectedType
      })
      this.$router.push({
        name: 'search',
        query: { q, type: this.selectedType }
      })
    },
    clickToSearch(index) {
      this.selectedIndex = index
      this.submit()
    },
    handleEnter(query) {
      if (!query) {
        this.filteredSelect = []
        return
      }
      this.filteredSelect = this.bangumis.filter(option => {
        return (
          option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1
        )
      })
    },
    handleInputFocus() {
      this.state = 'focus'
      this.$emit('focus')
    },
    handleInputBlur() {
      this.state = 'blur'
      this.$emit('blur')
    },
    handleKeyUp() {
      if (!this.displaySuggestion) {
        return
      }
      if (this.selectedIndex < 1) {
        return
      }
      this.selectedIndex--
    },
    handleKeyDown() {
      if (!this.displaySuggestion) {
        return
      }
      if (this.selectedIndex === this.filteredSelect - 1) {
        return
      }
      this.selectedIndex++
    }
  }
}
</script>
