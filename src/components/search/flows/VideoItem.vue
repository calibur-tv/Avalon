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
      @include twoline(16px);
    }
  }
}
</style>

<template>
  <div class="search-item-video">
    <a
      v-if="inCommon"
      :href="$alias.video(item.id)"
      target="_blank"
      class="in-common-avatar"
    >
      <img
        :src="$resize(item.poster, { width: 180, height: 102 })"
        :alt="item.name"
      >
    </a>
    <a
      v-else
      :href="$alias.video(item.id)"
      target="_blank"
      class="avatar"
    >
      <img
        :src="$resize(item.poster, { width: 320, height: 200 })"
        :alt="item.name"
      >
    </a>
    <div class="intro">
      <div class="head">
        <span
          v-if="inCommon"
          class="badge"
        >视频</span>
        <a
          :href="$alias.video(item.id)"
          target="_blank"
          class="name"
          v-text="item.name"
        />
      </div>
      <p
        class="summary"
        v-text="item.summary"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchItemVideo',
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
