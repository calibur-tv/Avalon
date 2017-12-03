<style lang="scss" scoped>
  $item-width: 300px;
  $pos-top-down: 12px;
  $pos-rig-left: 12px;
  $icon-size: 14px;

  @mixin transition ($opacity, $visibility, $left) {
    opacity: $opacity;
    visibility: $visibility;
    left: $left;
  }

  @mixin theme ($bg, $color, $border) {
    background-color: $bg;
    color: $color;
    border: 1px solid $border;

    &:hover {
      opacity: 1;
    }
  }

  #toast-container {
    position: fixed;
    pointer-events: none;
    // if you want to change position, rewrite here
    right: $pos-rig-left;
    top: $pos-top-down;

    .toast {
      padding: 15px 10px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      border-radius: 4px;
      position: relative;
      margin-bottom: 10px;
      pointer-events: auto;
      width: $item-width;
      opacity: .8;
      transition: .25s ease-in-out, opacity 0s;
      left: 0;
      cursor: pointer;
      word-wrap: break-word;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .theme-info {
      @include theme(#d9edf7, #31708f, #bce8f1)
    }

    .theme-error {
      @include theme(#f2dede, #a94442, #ebccd1)
    }

    .theme-success {
      @include theme(#dff0d8, #3c763d, #d6e9c6)
    }

    .theme-warning {
      @include theme(#fcf8e3, #8a6d3b, #faebcc)
    }

    .toast-enter {
      opacity: 0;
      transform: translateY(30px);
      // if you want to change position, rewrite here
      left: $item-width;
    }

    .toast-leave-active {
      opacity: 0;
      position: absolute;
      transition-duration: .2s;
      // if you want to change position, rewrite here
      left: $item-width;
    }
  }
</style>

<template>
  <div id="toast-container"
       :style="{ zIndex : index }">
    <transition-group name="toast" tag="div">
      <div class="toast"
           :class="['theme-' + item.theme]"
           :key="item.id"
           v-text="item.text"
           v-for="item in list"
           @click="close(item.id)">
      </div>
    </transition-group>
  </div>
</template>

<script>
  const fadeOutTime = 200

  export default {
    data () {
      return {
        theme: ['success', 'warning', 'error', 'info'],
        maxLen: 8,
        index: 999999,
        time: 5000,
        list: []
      }
    },
    methods: {
      show (opts) {
        let id = new Date().getTime() + Math.random().toString(36).substring(3, 6)
        let auto = opts.auto ? opts.auto : true
        if (this.maxLen && this.list.length > this.maxLen) {
          this.list.shift()
        }
        this.list.push({
          id: id,
          auto: auto,
          text: opts.text,
          theme: opts.type || 'info'
        })
        if (auto) {
          setTimeout(() => {
            this.close(id)
          }, this.time)
        } else {
          return new Promise((resolve) => {
            this.$on(`toastSubmitEvent-${id}`, () => {
              resolve()
            })
          })
        }
      },
      close (id) {
        for (let i = 0; i < this.list.length; ++i) {
          if (this.list[i].id === id) {
            this.list.splice(i, 1)
            this.$emit(`toastSubmitEvent-${id}`)
            if (!this.list.length) {
              setTimeout(() => {
                this.$destroy()
              }, fadeOutTime)
            }
            return
          }
        }
      },
      clear () {
        this.list = []
        setTimeout(() => {
          this.$destroy()
        }, this.time + fadeOutTime)
      }
    },
    destroyed () {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
</script>
