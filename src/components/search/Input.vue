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
  }
</style>

<template>
  <form
    action="#"
    method="get"
    class="search-input-wrap"
    :class="`search-${state}`"
    @submit.prevent="submit"
  >
    <button type="submit" class="search-input-btn">
      <slot name="submit-btn">搜索</slot>
    </button>
    <div class="search-input-text">
      <input
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
        :placeholder="placeholder"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        :autofocus="autofocus"
        maxlength="50"
        v-model="word">
    </div>
  </form>
</template>

<script>
  export default {
    name: 'v-search-input',
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
        type: [String, Number],
        default: 0
      }
    },
    data () {
      return {
        word: this.value,
        selectedType: this.type,
        state: this.autofocus ? 'focus' : 'blur'
      }
    },
    methods: {
      submit () {
        const q = this.word
        if (!q) {
          return
        }
        this.$router.push({
          name: 'search-index',
          query: { q, type: this.selectedType }
        })
      },
      handleInputFocus () {
        this.state = 'focus'
        this.$emit('focus')
      },
      handleInputBlur () {
        this.state = 'blur'
        this.$emit('blur')
      }
    },
    mounted () {
      this.$watch('value', (val) => {
        this.word = val
      })
      this.$watch('word', (val) => {
        this.$emit('input', val)
      })
      this.$watch('$route', (val) => {
        if (val.name === 'search-index') {
          this.word = val.query.q
          this.selectedType = val.query.type
        }
      })
    }
  }
</script>
