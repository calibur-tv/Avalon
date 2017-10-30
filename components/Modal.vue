<style lang="scss">
  $time: .3s;

  .v-modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: transparent;

    &.modal-leave-active {
      transition: opacity $time;
    }

    &.modal-enter-active,
    &.modal-leave-active {
      .v-modal-mask {
        opacity: 0;
      }

      .v-modal {
        transform: translate(-50%, -70%);
        opacity: 0;
      }
    }

    .v-modal-mask {
      background-color: rgba(0, 0, 0, .3);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: opacity $time;
      opacity: 1;
    }

    .v-modal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 5px 25px rgba(0,0,0,.1);
      transition: opacity $time, transform $time;
      opacity: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: auto;
      max-height: 80%;
      max-width: 50%;
      min-width: 500px;
      cursor: default;

      >header, >main, >footer {
        &:before, &:after {
          content: '';
          clear: both;
          display: table;
        }
      }

      >header {
        background-color: $color-blue-light;

        h4 {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          margin: 0;
          padding-left: 20px;
          color: $color-white;
          text-align: left;
          font-weight: 700;
        }

        .close {
          position: absolute;
          right: 10px;
          top: 10px;
          display: block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          background-color: $color-white;
          color: $color-blue-light;
          font-size: 18px;
          font-family: 'Hiragino Sans GB',Helvetica,Arial,sans-serif;
          text-align: center;

          &:hover {
            color: $color-blue-normal;
          }
        }
      }

      >main {
        padding: 20px;
        font-size: 15px;
        color: #333;
        flex-grow: 1;
        overflow-x: hidden;
        overflow-y: auto;
      }

      >footer {
        padding: 20px;
        background-color: #fff;

        button {
          float: right;
          font-size: 14px;
          height: 30px;
          padding: 0 15px;
          margin-left: 10px;
          border-radius: 4px;
          font-weight: 600;
        }

        .cancel {
          background-color: $color-white;
          color: $color-text-light;

          &:hover {
            background-color: $color-gray-normal;
            color: $color-text-normal;
          }
        }

        .submit {
          background-color: $color-blue-light;
          color: $color-white;

          &:hover {
            background-color: $color-blue-normal;
          }
        }
      }
    }
  }
</style>

<template>
  <transition name="modal">
    <section class="v-modal-wrap" v-if="toggle">
      <div class="v-modal-mask" @click.stop.prevent="handleClose"></div>
      <div class="v-modal" @click.stop.prevent>
        <header v-if="header">
          <slot name="header">
            <h4 v-text="headerText"></h4>
            <a v-if="close" class="close" @click="handleClose">&times;</a>
          </slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer v-if="footer">
          <slot name="footer">
            <button class="submit" @click="handleSubmit" v-text="submitText"></button>
            <button class="cancel" @click="handleCancel" v-text="cancelText"></button>
          </slot>
        </footer>
      </div>
    </section>
  </transition>
</template>

<script>
  export default {
    name: 'v-modal',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      close: {
        type: Boolean,
        default: true
      },
      header: {
        type: Boolean,
        default: true
      },
      footer: {
        type: Boolean,
        default: true
      },
      submitText: {
        type: String,
        default: '确认'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      headerText: {
        type: String,
        default: '标题'
      }
    },
    watch: {
      toggle (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.toggle = val
      }
    },
    data () {
      return {
        toggle: this.value
      }
    },
    methods: {
      handleClose () {
        this.toggle = false
      },
      handleSubmit () {
        this.$emit('submit')
      },
      handleCancel () {
        this.$emit('cancel')
        this.handleClose()
      }
    }
  }
</script>
