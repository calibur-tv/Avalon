<style lang="scss">
  .v-selection {
    li {
      float: none;
    }
  }
</style>

<template>
  <multiselect
    class="v-selection"
    v-model="opt"
    :options="options"
    :placeholder="placeholder"
    :searchable="false"
    :show-labels="false"
    :loading="loading"
    :label="label"
  ></multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'

  export default {
    name: 'v-select',
    components: {
      Multiselect
    },
    props: {
      value: {
        required: true
      },
      options: {
        required: true,
        type: Array,
        default: []
      },
      placeholder: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      }
    },
    watch: {
      value (val) {
        this.opt = val
      },
      opt (val) {
        this.$emit('input', val)
      }
    },
    data () {
      return {
        opt: undefined
      }
    }
  }
</script>
