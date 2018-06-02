<template>
  <div class="json-content">
    <div v-for="item in content" :key="item.id">
      <div class="text-package" v-if="item.type === 'txt'" v-html="item.data"></div>
      <p class="image-package" v-else-if="item.type === 'img'" @click="$previewImages(images, computeImageIndex(item.data))">
        <v-img
          class="image"
          width="350"
          mode="2"
          :src="item.data.url"
          :aspect="aspect(item)"
        ></v-img>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-json-content',
    props: {
      value: {
        type: String,
        required: true
      }
    },
    computed: {
      content () {
        return JSON.parse(this.value)
      },
      images () {
        return this.content.filter(_ => _.type === 'img').map(item => {
          const data = item.data
          return `${data.width}-${data.height}|${data.url}`
        })
      }
    },
    methods: {
      aspect (item) {
        const width = +item.data.width
        const height = +item.data.height
        if (!width || !height) {
          return 0
        }
        return height / width
      },
      computeImageIndex (data) {
        return this.images.indexOf(`${data.width}-${data.height}|${data.url}`)
      }
    }
  }
</script>
