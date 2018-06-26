<style lang="scss">
  .search-item-video {
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid $color-gray-normal;
    @extend %clearfix;

    .in-common-avatar {
      float: left;
      margin-right: 12px;
      width: 90px;
      height: 56px;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .avatar {
      float: left;
      margin-right: 12px;
      width: 160px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .intro {
      overflow: hidden;

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

        .name {
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

      .summary {
        font-size: 12px;
        color: $color-text-normal;
        @include twoline(16px)
      }
    }
  }
</style>

<template>
  <div class="search-item-video">
    <a target="_blank" :href="$alias.video(item.id)" class="in-common-avatar" v-if="inCommon">
      <img :src="$resize(item.poster, { width: 180, height: 102 })" :alt="item.name">
    </a>
    <a target="_blank" :href="$alias.video(item.id)" class="avatar" v-else>
      <img :src="$resize(item.poster, { width: 320, height: 200 })" :alt="item.name">
    </a>
    <div class="intro">
      <div class="head">
        <span class="badge" v-if="inCommon">视频</span>
        <a target="_blank" class="name" :href="$alias.video(item.id)" v-text="item.name"></a>
      </div>
      <p class="summary" v-text="item.summary"></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search-item-video',
    props: {
      item: {
        required: true,
        type: Object
      },
      inCommon: {
        required: true,
        type: Boolean,
        default: false
      }
    }
  }
</script>
