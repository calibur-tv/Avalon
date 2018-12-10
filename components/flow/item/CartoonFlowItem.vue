<style lang="scss">
.cartoon-flow-item {
  width: 198px;
  height: 335px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin: 3px 7px 15px 3px;
  background-color: #fafafa;
  overflow: hidden;
  float: left;

  .poster-wrap {
    position: relative;
    display: block;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      opacity: 0.3;
      background-color: transparent;
      background-image: linear-gradient(
        transparent,
        rgba(0, 0, 0, 0.1) 20%,
        rgba(0, 0, 0, 0.2) 35%,
        rgba(0, 0, 0, 0.6) 65%,
        rgba(0, 0, 0, 0.9)
      );
    }

    &:hover {
      &:after {
        opacity: 1;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        transition: background 0.2s;
      }
    }

    img {
      width: 100%;
      height: 300px;
      display: block;
    }

    .info {
      position: absolute;
      left: 7px;
      bottom: 4px;
      z-index: 1;
      color: #fff;
      line-height: 20px;

      i {
        font-size: 20px;
        vertical-align: middle;
      }

      .image-count {
        margin-left: 5px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }

  .intro {
    height: 55px;
    padding: 5px 15px;
    background-color: #fff;

    .name,
    .social {
      height: 20px;
      font-size: 12px;
      line-height: 20px;
    }

    .name {
      margin-top: 3px;
    }

    .social {
      color: $color-text-light;
      margin-top: 2px;

      span {
        margin-right: 10px;
      }

      .done {
        color: $color-pink-deep;
      }
    }
  }

  .about {
    height: 51px;
    padding: 10px 15px;
    border-top: 1px solid #f2f2f2;

    .user-avatar {
      display: block;
      margin-right: 10px;
      float: left;
    }

    .main-name {
      line-height: 30px;
      font-size: 12px;
      word-wrap: break-word;
      color: $color-text-normal;
    }
  }
}
</style>

<template>
  <li class="cartoon-flow-item">
    <a
      :href="$alias.image(item.id)"
      target="_blank"
    >
      <div class="poster-wrap">
        <img :src="$resize(item.source.url, { width: 396, height: 600 })">
        <div class="info">
          <i class="el-icon-picture-outline"/>
          <span
            class="image-count"
            v-text="item.image_count"
          />
        </div>
      </div>
      <div class="intro">
        <p class="name oneline">【 {{ item.part }} 】{{ item.name }}</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'CartoonFlowItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    bangumiId: {
      type: [Number, String],
      default: ''
    },
    userZone: {
      type: String,
      default: ''
    }
  }
}
</script>
