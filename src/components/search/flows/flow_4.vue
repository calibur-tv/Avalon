<style lang="scss">
.search-item-post {
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid $color-gray-normal;
  @extend %clearfix;

  .head {
    margin-bottom: 12px;

    .badge {
      display: inline-block;
      height: 22px;
      padding: 0 10px;
      border: 1px solid #979797;
      color: #979797;
      text-align: center;
      line-height: 22px;
      border-radius: 100px;
      margin-right: 12px;
      font-size: 12px;
    }

    .title {
      color: #222;
      font-size: 16px;
      margin-right: 14px;
      font-weight: 700;
      line-height: 21px;

      &:hover {
        color: $color-blue-light;
      }
    }
  }

  .desc {
    font-size: 12px;
    color: $color-text-normal;
    @include twoline(16px);
  }

  .images {
    height: 90px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 15px;

    .image-box {
      margin-right: 10px;
      height: 100%;
      position: relative;
      float: left;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0;
      }

      &:hover {
        &:after {
          opacity: 0.1;
        }
      }

      img {
        height: 100%;
        width: auto;
      }
    }
  }
}
</style>

<template>
  <div class="search-item-post">
    <div class="head">
      <span
        v-if="inCommon"
        class="badge"
      >帖子</span>
      <a
        :href="$alias.post(item.id)"
        target="_blank"
        class="title"
        v-text="item.title"
      />
    </div>
    <div
      class="desc"
      v-text="item.desc"
    />
    <div
      v-if="item.images.length"
      class="images clearfix"
    >
      <div
        v-for="(image, index) in item.images"
        :key="index"
        class="image-box"
      >
        <v-img
          :src="image.url"
          width="auto"
          height="90"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItemPost",
  props: {
    item: {
      required: true,
      type: Object
    },
    inCommon: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>
