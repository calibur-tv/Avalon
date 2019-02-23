<style lang="scss">
.calibur-btn {
  border: 1px solid;
  text-align: center;
  border-radius: 4px;
  user-select: none;

  i {
    margin-right: 2px;
  }

  .loading-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    border: 2px solid #fff;
    border-bottom-color: transparent;
    animation: rolling 0.8s infinite linear;
    margin-right: 4px;
  }

  &.custom-width.custom-width {
    padding-left: 0;
    padding-right: 0;
  }

  &.is-full {
    width: 100%;
    display: block;
  }

  &.pure-text {
    height: auto !important;
    padding: 0 !important;
    line-height: inherit !important;
    border-width: 0 !important;
    background-color: transparent !important;
  }

  &.is-plain.is-plain {
    background-color: transparent;
    transition: 0.1s ease-in;
  }

  &.with-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.icon-right i {
    margin-left: 2px;
    margin-right: 0;
  }

  &.size {
    &-large {
      height: 50px;
      padding: 0 18px;

      span {
        font-size: 14px;
      }

      &.is-round {
        border-radius: 25px;
      }
    }

    &-normal {
      height: 40px;
      padding: 0 20px;

      span {
        font-size: 15px;
      }

      i {
        font-size: 15px;
      }

      &.is-round {
        border-radius: 20px;
      }
    }

    &-medium {
      padding: 0 18px;
      height: 34px;

      span,
      i {
        font-size: 16px;
      }

      &.is-round {
        border-radius: 17px;
      }
    }

    &-small {
      padding: 0 8px;
      height: 24px;

      span,
      i {
        font-size: 12px;
      }

      i {
        margin-right: 0;
        margin-left: 0;
      }

      &.is-round {
        border-radius: 12px;
      }
    }

    &-mini {
      padding: 0 6px;
      height: 20px;

      span,
      i {
        font-size: 12px;
      }

      i {
        margin-right: 0;
        margin-left: 0;
      }

      &.is-round {
        border-radius: 10px;
      }
    }
  }

  &.color {
    &-blue {
      background-color: $color-blue;
      border-color: $color-blue;
      color: #fff;

      &:hover {
        background-color: #187cb7;
        border-color: #187cb7;
      }

      &.is-plain {
        color: $color-blue;

        &:hover {
          background-color: rgba($color-blue, 0.05);
          border-color: $color-blue;
        }
      }
    }

    &-red {
      background-color: $color-pink-normal;
      border-color: $color-pink-normal;
      color: #fff;

      &:hover {
        background-color: $color-pink-deep;
        border-color: $color-pink-deep;
      }

      &.is-plain {
        color: $color-pink-normal;

        &:hover {
          background-color: rgba($color-pink-normal, 0.05);
          border-color: $color-pink-normal;
        }
      }
    }

    &-gray {
      background-color: $color-gray;
      border-color: $color-gray;
      color: #fff;

      &:hover {
        background-color: #9b9b9b;
        border-color: #9b9b9b;
      }

      &.is-plain {
        color: $color-gray;

        &:hover {
          background-color: rgba($color-gray, 0.05);
          border-color: $color-gray;
        }
      }
    }
  }
}
</style>

<template>
  <button
    :class="[
      'calibur-btn',
      `size-${size}`,
      `color-${color}`,
      {
        'is-round': round,
        'is-plain': plain,
        'is-full': full,
        'custom-width': width,
        'with-icon': icon,
        'icon-right': iconRight,
        'pure-text': pureText
      }
    ]"
    :style="width ? { width: `${width}px` } : {}"
    @click="handleClick"
  >
    <i
      v-if="loading"
      :style="iconSize ? { fontSize: `${iconSize}px` } : {}"
      class="loading-icon"
    />
    <i
      v-if="icon && !loading && !iconRight"
      :class="`ic-${icon}`"
      :style="iconSize ? { fontSize: `${iconSize}px` } : {}"
      class="iconfont"
    />
    <span v-if="text" v-text="text" />
    <i
      v-if="icon && !loading && iconRight"
      :class="`ic-${icon}`"
      :style="iconSize ? { fontSize: `${iconSize}px` } : {}"
      class="iconfont"
    />
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    size: {
      type: String,
      default: 'normal',
      validator: val =>
        ~['large', 'normal', 'medium', 'small', 'mini'].indexOf(val)
    },
    color: {
      type: String,
      default: 'blue',
      validator: val => ~['gray', 'red', 'blue'].indexOf(val)
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: true
    },
    pureText: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    full: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: ''
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(e) {
      if (this.loading) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>
