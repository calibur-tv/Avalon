<style lang="scss">
.choice-album-item {
  .meta {
    float: right;
    height: 24px;
    margin-top: 5px;
    width: 24px;
    line-height: 24px;
    font-size: 12px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    margin-left: 10px;
  }

  .image-count {
    background-color: $color-gray-deep;
  }

  .is-creator {
    background-color: gold;
  }

  .is-cartoon {
    background-color: $color-pink-deep;
  }

  .info {
    overflow: hidden;

    img {
      width: 24px;
      height: 24px;
      border-radius: 3px;
      margin-right: 5px;
      margin-top: -2px;
      vertical-align: middle;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>

<template>
  <el-select
    v-model="selected"
    :filterable="true"
    :clearable="clear"
    :loading="loading"
    :placeholder="placeholder"
    style="width: 100%"
  >
    <el-option
      v-for="item in selectionAlbum"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      class="choice-album-item"
    >
      <div
        class="image-count meta"
        v-text="item.image_count"
      />
      <div
        v-if="item.is_creator"
        class="is-creator meta"
      >创</div>
      <div
        v-if="item.is_cartoon"
        class="is-cartoon meta"
      >漫</div>
      <div class="info">
        <img :src="$resize(item.poster, { width: 48 })">
        <span v-text="item.name"/>
      </div>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ImageAlbumSelect',
  props: {
    placeholder: {
      type: String,
      default: '选择一个相册'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    clear: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Function,
      default: undefined
    },
    append: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.value,
      loading: false
    }
  },
  computed: {
    albums() {
      return this.$store.state.image.albums
    },
    selectionAlbum() {
      return this.filter
        ? this.filter(this.append.concat(this.albums))
        : this.append.concat(this.albums)
    }
  },
  mounted() {
    if (!this.albums.length) {
      this.getUserAlbum()
    }
    this.$watch('value', val => {
      this.selected = val
    })
    this.$watch('selected', val => {
      this.$emit('input', val)
      this.$emit('success', this.selectionAlbum.filter(_ => _.id === val)[0])
    })
  },
  methods: {
    async getUserAlbum() {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('image/userAlbum', {
          ctx: this
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
