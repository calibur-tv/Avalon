<style lang="scss">
  #image-album {
    background-color: #f5f5f5;

    .container {
      background-color: #fff;
      padding: 30px 27px;
    }

    @media (min-width: 1050px) {
      .container {
        width: 1080px;
        margin-bottom: 100px;
      }
    }
  }
</style>

<template>
  <div id="image-album">
    <v-banner></v-banner>
    <div class="container">
      <div class="images-wrap">
        <div
          class="image-package"
          v-for="(img, idx) in images"
          :key="img.id"
          @click="$previewImages(previewImages, idx)"
        >
          <v-img
            class="image"
            :src="img.url"
            width="500"
            mode="2"
            :aspect="$computeImageAspect(img.url)"
          ></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'image-album',
    async asyncData ({ store, route, ctx }) {
      await store.dispatch('image/getAlbumData', {
        ctx,
        id: route.params.id
      })
    },
    computed: {
      album () {
        return this.$store.state.image.albumShow
      },
      images () {
        return this.album.images
      },
      previewImages () {
        return this.images.map(_ => _.url)
      },
      user () {
        return this.album.user
      },
      bangumi () {
        return this.album.bangumi
      }
    },
    data () {
      return {
      }
    },
    created () {

    },
    methods: {

    },
    mounted () {

    }
  }
</script>
