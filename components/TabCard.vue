<style lang="scss">
  .tab-card {
    overflow: hidden;

    .tabs {
      margin-bottom: 26px;

      .tabs-selection {
        flex: auto;

        li {
          flex: auto;
          text-align: center;
          border-bottom-width: 1px;
          border-bottom-style: solid;
          padding: 2px 4px 7px 4px;
          position: relative;
          transition-duration: $fade-time;
          cursor: pointer;

          &:hover {
            color: $color-blue-normal;
          }
        }

        .tabs-on {
          color: $color-blue-normal;
          border-bottom-color: $color-blue-normal;

          &:after {
            content: '';
            position: absolute;
            margin-left: -3px;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 0;
            border: 3px solid $color-blue-normal;
            border-top-width: 0;
            border-left-color: transparent;
            border-right-color: transparent;
          }
        }

        .tabs-off {
          border-bottom-color: $color-gray-normal;
        }
      }
    }

    .nothing {
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
</style>

<template>
  <div class="tab-card">
    <div class="tabs flexbox flex-row">
      <slot name="tabs-left"></slot>
      <ul class="tabs-selection flexbox flex-row">
        <li v-for="(item, index) in tabs"
            v-text="item"
            :class="[ index === idx ? 'tabs-on' : 'tabs-off' ]"
            @click="switchCard(index)"
        ></li>
      </ul>
      <slot name="tabs-right"></slot>
    </div>
    <div class="card-wrap">
      <slot name="card-item" :data="computedCardData()"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab-card',
    props: {
      tabs: {
        required: true,
        default: [],
        type: Array
      },
      card: {
        default: () => [],
        type: [Array, Object]
      },
      showIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        len: this.tabs.length,
        idx: this.showIndex
      }
    },
    methods: {
      switchCard (index) {
        this.idx = index
        this.$emit('switcher', index)
      },
      computedCardData () {
        return this.card[this.idx] || []
      }
    }
  }
</script>
