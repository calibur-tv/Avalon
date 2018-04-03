<style lang="scss">
  #image-reader-modal {
    .v-modal {
      max-width: 90%;
      max-height: 90%;
      min-width: 80%;
      height: 700px;
      box-shadow: none;
      background-color: #000;

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
        max-width: 100%;
        max-height: 100%;
      }
    }

    .el-carousel {
      height: 700px;
      background-color: #000;

      .el-carousel__container {
        height: 100%;
      }
    }
  }
</style>

<template>
  <v-modal
    v-model="open"
    id="image-reader-modal"
    :header="false"
    :footer="false"
    :close="false"
  >
    <el-carousel
      :autoplay="false"
      arrow="always"
      :initial-index="index"
      height="700"
      @change="handleCarouselChange"
    >
      <el-carousel-item
        v-for="item in images"
        :key="item"
      >
        <v-img
          :src="computeImageSize(item)"
          :id="`image-reader-${index}`"
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
        setTimeout(() => {
          const length = images.length
          // 如果图片大于一张，要 hack 懒加载
          if (length > 1) {
            if (length - 1 === index) {
              // 预览的是最后一张，加载上一张
              this.$channel.$emit(`image-load-image-reader-${index - 1}`)
            } else if (index === 0) {
              // 预览的是第一张，加载下一张
              this.$channel.$emit(`image-load-image-reader-1`)
            } else {
              // 预览的是中间的图，加载上一张和下一张
              this.$channel.$emit(`image-load-image-reader-${index + 1}`)
              this.$channel.$emit(`image-load-image-reader-${index - 1}`)
            }
          }
        }, 500)
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
      },
      handleCarouselChange (index) {
        this.$channel.$emit(`image-load-image-reader-${index + 1}`)
        this.$channel.$emit(`image-load-image-reader-${index - 1}`)
      }
    }
  }
</script>
