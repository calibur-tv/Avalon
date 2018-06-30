<style lang="scss">
  .search-item-role {
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

      .intro {
        font-size: 12px;
        color: #6d757a;
        @include twoline(16px)
      }
    }
  }
</style>

<template>
  <div class="search-item-role">
    <a
      :href="$alias.cartoonRole(item.id)"
      target="_blank"
      class="avatar"
    >
      <img
        :src="$resize(item.avatar, { width: 180 })"
        :alt="item.name"
      >
    </a>
    <div class="intro">
      <div class="head">
        <span
          v-if="inCommon"
          class="badge"
        >偶像</span>
        <a
          :href="$alias.cartoonRole(item.id)"
          target="_blank"
          class="name"
          v-text="item.name"
        />
      </div>
      <p
        class="intro"
        v-text="item.intro"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchItemRole',
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
