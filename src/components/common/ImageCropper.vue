<style lang="scss">
.image-cropper-wrap {
  width: 100%;
  height: 100%;

  .croppa-container {
    background-color: transparent;
    width: 100%;
    height: 100%;

    canvas {
      transition: none;
    }
  }
}
</style>

<template>
  <div class="image-cropper-wrap">
    <croppa
      v-model="croppa"
      :width="width"
      :height="height"
      :auto-sizing="autoSize"
      :show-remove-button="false"
      :prevent-white-space="true"
      :disabled="disabled || uploading"
      :file-size-limit="sizeLimit"
      :zoom-speed="type === 'avatar' ? 6 : 2"
      :initial-image="initImage"
      accept="image/png, image/jpeg, image/jpg, image/x-png, image/gif"
      canvas-color="rgba(0, 0, 0, .05)"
      @init="onInit"
    />
    <div class="tools"/>
    <el-button
      :loading="uploading"
      class="submit-btn"
      type="primary"
      size="small"
      round
      @click="generateImage"
    >确认</el-button>
  </div>
</template>

<script>
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

export default {
  name: 'ImageCropper',
  components: {
    croppa: Croppa.component
  },
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    autoSize: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sizeLimit: {
      type: Number,
      default: 0
    },
    initImage: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'normal',
      validator: val => ~['avatar', 'normal'].indexOf(val)
    },
    uploading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      croppa: {}
    }
  },
  methods: {
    onInit() {
      if (this.type === 'avatar') {
        this.croppa.addClipPlugin(function(ctx, x, y, w, h) {
          ctx.beginPath()
          ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
          ctx.closePath()
        })
      }
    },
    async generateImage() {
      const blob = await this.croppa.promisedBlob()
      const formData = new FormData()
      formData.append('file', blob)
      this.$emit('submit', formData)
    }
  }
}
</script>
