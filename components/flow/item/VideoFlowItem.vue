<style lang="scss">
.video-flow-item {
  $video-item-width: 195px;
  $video-item-margin: 13px;
  $video-item-height: 60px;
  margin: 0 $video-item-margin 15px 0;
  float: left;

  a {
    display: block;
    position: relative;
    width: $video-item-width;
    height: $video-item-height;
    border-radius: 3px;
    background-color: $color-gray-normal;
    overflow: hidden;

    &:hover .part {
      color: $color-blue-normal;
    }
  }

  .poster {
    margin-right: 12px;
    float: left;
  }

  .intro {
    padding-right: 12px;

    .part {
      display: block;
      color: $color-text-deep;
      font-size: 12px;
      line-height: 14px;
      margin-top: 6px;
      margin-bottom: 5px;
    }

    .name {
      font-size: 12px;
      color: $color-text-normal;
      @include twoline(14px);
    }
  }
}
</style>

<template>
  <li :key="item.id" class="video-flow-item">
    <a :href="$alias.video(item.id)" target="_blank">
      <v-img
        :src="item.poster"
        width="106"
        height="60"
        class="poster"
      />
      <div class="intro">
        <p class="part oneline">第{{ item.part }}话</p>
        <span class="name" v-text="item.name" />
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VideoFlowItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    bangumiId: {
      type: [String, Number],
      default: ''
    },
    userZone: {
      type: String,
      default: ''
    }
  }
}
</script>
