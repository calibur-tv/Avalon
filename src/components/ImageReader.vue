<style lang="scss">
  .image-reader-modal {
    .v-modal {
      max-width: none;
      max-height: none;
      min-width: 80%;
      height: 700px;
      background-color: transparent;

      > main {
        overflow: hidden;
        padding: 0;
      }

      img {
        width: 100%;
        height: auto;
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
  <v-modal v-model="open" class="image-reader-modal" :header="false" :footer="false">
    <el-carousel :autoplay="false" arrow="always" :initial-index="index" height="700">
      <el-carousel-item v-for="image in images" :key="image">
        <img :src="image">
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
        open: false
      }
    },
    mounted () {
      this.$channel.$on('open-image-reader', ({ images, index }) => {
        if (!images) {
          return
        }
        this.images = Array.isArray(images) ? images : [images]
        this.index = index || 0
        this.open = true
      })
    }
  }
</script>
