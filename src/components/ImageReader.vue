<style lang="scss">
  .image-reader-modal {
    .v-modal {
      max-width: 90%;
      max-height: 90%;
      min-width: 80%;
      height: 700px;
      background-color: transparent;
      box-shadow: none;

      > main {
        overflow: hidden;
        padding: 0;
      }

      img {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;

        &.is-width {
          width: 98%;
          height: auto;
        }

        &.is-height {
          height: 100%;
          width: auto;
        }
      }
    }

    .el-carousel {
      height: 700px;

      .el-carousel__container {
        height: 100%;
      }

      .el-carousel__item {
        overflow: scroll;
      }
    }
  }
</style>

<template>
  <v-modal
    v-model="open"
    class="image-reader-modal"
    :header="false"
    :footer="false"
    :close="false"
  >
    <el-carousel
      :autoplay="false"
      arrow="always"
      :initial-index="index"
      height="700"
    >
      <el-carousel-item v-for="item in images" :key="item">
        <v-img
          :class="[ computeImageType(item) === 3 ? 'is-height' : 'is-width' ]"
          :src="computeImageSize(item)"
        ></v-img>
      </el-carousel-item>
    </el-carousel>
  </v-modal>
</template>

<script>
  export default {
    name: 'ImageReader',
    data () {
      return {
        images: [],
        index: 0,
        open: false,
        maxWidth: 0,
        maxHeight: 0,
        maxWidthHeightRate: 0,
        maxHeightWidthRate: 0
      }
    },
    mounted () {
      this.computeMaxSize()
      this.$channel.$on('open-image-reader', ({ images, index }) => {
        if (!images) {
          return
        }
        this.images = Array.isArray(images) ? images : [images]
        this.index = index || 0
        this.open = true
      })
    },
    methods: {
      computeMaxSize () {
        this.maxWidth = parseInt(document.body.offsetWidth * 0.9, 10)
        this.maxHeight = 700
        this.maxWidthHeightRate = this.maxWidth / this.maxHeight
        this.maxHeightWidthRate = this.maxHeight / this.maxWidth
      },
      computeImageType (item) {
        if (item.split('|http').length === 1) {
          return 0
        }

        const attr = item.split('|http').shift().split('-')
        const width = attr[0]
        const height = attr[1]

        // 图片太小了，直接返回
        if (width < this.maxWidth && height < this.maxHeight) {
          return 1
        }

        const imageWidthHeightRate = width / height
        const imageHeightWidthRate = height / width

        // 图片太大，但没有溢出屏幕
        if (this.maxWidthHeightRate > imageWidthHeightRate && this.maxHeightWidthRate > imageHeightWidthRate) {
          return 2
        }

        // 图片太长
        if (this.maxHeightWidthRate < imageHeightWidthRate) {
          return 3
        }

        // 图片太宽
        if (this.maxWidthHeightRate < imageWidthHeightRate) {
          return 4
        }

        return 5
      },
      computeImageSize (item) {
        const type = this.computeImageType(item)
        if (type === 4) {
          return this.$resize(item, { width: this.maxWidth, mode: 2 })
        }
        return this.$resize(item, { height: this.maxHeight, mode: 2 })
      }
    }
  }
</script>
