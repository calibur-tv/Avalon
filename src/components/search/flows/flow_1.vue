<style lang="scss">
  .search-item-user {
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid $color-gray-normal;
    @extend %clearfix;

    .avatar {
      float: left;
      margin-right: 12px;
      @include avatar-2(90px)
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

        .nickname {
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

      .signature {
        font-size: 12px;
        color: #6d757a;
        @include twoline(16px)
      }
    }
  }
</style>

<template>
  <div class="search-item-user">
    <a target="_blank" :href="$alias.user(item.zone)" class="avatar">
      <img :src="$resize(item.avatar, { width: 180 })" :alt="item.nickname">
    </a>
    <div class="intro">
      <div class="head">
        <span class="badge" v-if="inCommon">用户</span>
        <a target="_blank" class="nickname" :href="$alias.user(item.zone)" v-text="item.nickname"></a>
      </div>
      <p class="signature" v-text="item.signature"></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search-item-user',
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
