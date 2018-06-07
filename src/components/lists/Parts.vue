<style>
  .v-parts li {
    float: left;
  }
</style>

<template>
  <ul class="v-parts" v-if="maxWidth">
    <li
      v-for="item in list"
      :key="item.id"
    >
      <a
        :class="{ 'active' : id == item.id }"
        :style="{ width: `${maxWidth}px` }"
        :href="alias(item.id)"
      >
        <slot :item="item"></slot>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'v-parts',
    props: {
      list: {
        type: Array,
        required: true
      },
      alias: {
        type: Function,
        required: true
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      }
    },
    data () {
      return {
        maxWidth: 0
      }
    },
    methods: {
      computeMaxWidth () {
        let maxlength = 0
        this.list.forEach(video => {
          const templength = video.name.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
          if (maxlength < templength) {
            maxlength = templength
          }
        })
        this.maxWidth = 46 + maxlength * 8
      }
    },
    mounted () {
      this.computeMaxWidth()
      this.$watch('list', () => {
        this.computeMaxWidth()
      })
    }
  }
</script>
