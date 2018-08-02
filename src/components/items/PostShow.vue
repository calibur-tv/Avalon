<style lang="scss">
.post-show-item {
  float: none;
  padding: 10px 10px 10px 65px;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px dotted #e4e6eb;
  }

  .header {
    position: relative;
    height: 32px;

    .bangumi-avatar {
      display: block;
      float: left;
      margin-right: 10px;
      margin-top: 4px;

      img {
        display: block;
        width: 24px;
        height: 24px;
      }
    }

    .user-avatar {
      display: block;
      float: left;
      margin-right: 7px;

      img {
        display: block;
        border: 1px solid #f0f0f0;
        @include avatar(32px);
      }
    }

    .title {
      font-size: 14px;
      line-height: 32px;
      display: inline-block;
    }

    .time {
      float: right;
      display: block;
      line-height: 32px;
      color: #999;
      font-size: 12px;
      margin-left: 10px;
    }

    .top_badge,
    .nice_badge {
      float: left;
      height: 22px;
      line-height: 20px;
      color: #fff;
      cursor: default;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 1px 6px;
      border-radius: 4px;
      margin: 5px 5px 0 0;
    }

    .top_badge {
      background-color: $color-blue-normal;
    }

    .nice_badge {
      background-color: $color-pink-deep;
    }
  }

  .content {
    margin-top: 3px;
    color: #666;
    font-size: 12px;
    @include twoline(22px);

    &.min-height {
      min-height: 44px;
    }

    a {
      font-size: 12px;
      line-height: 22px;
      color: #262626;
      font-weight: 600;
    }
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
      cursor: zoom-in;

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

  .counter {
    position: absolute;
    left: 0;
    top: 12px;
    width: 50px;
    height: 30px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    background-color: RGB(247, 247, 247);
    display: block;
    border: 1px solid #e4e6eb;
    border-radius: 3px;
  }

  .footer {
    text-align: right;
    font-size: 13px;
    color: $color-text-light;

    .done {
      color: $color-blue-normal;
    }

    .v-share {
      display: inline-block;

      .share-btn {
        color: $color-text-light;
        font-size: 12px;
      }
    }

    span {
      margin-left: 15px;
      line-height: 20px;
      font-size: 12px;
    }

    i {
      line-height: 20px;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <li class="post-show-item">
    <div class="header clearfix">
      <el-tooltip
        v-if="bangumiPage"
        :content="item.user.nickname"
        effect="dark"
        placement="top"
      >
        <a
          :href="$alias.user(item.user.zone)"
          class="user-avatar"
          target="_blank"
        >
          <v-img
            :src="item.user.avatar"
            width="32"
            height="32"
          />
        </a>
      </el-tooltip>
      <el-tooltip
        v-else
        :content="item.bangumi.name"
        effect="dark"
        placement="top"
      >
        <a
          :href="$alias.bangumi(item.bangumi.id)"
          class="bangumi-avatar"
          target="_blank"
        >
          <v-img
            :src="item.bangumi.avatar"
            width="32"
            height="32"
          />
        </a>
      </el-tooltip>
      <el-tooltip
        v-if="item.updated_at !== item.created_at"
        :content="`发表于：${item.created_at}`"
        effect="dark"
        placement="top"
      >
        <span class="time">
          回复于: <v-time v-model="item.updated_at"/>
        </span>
      </el-tooltip>
      <span
        v-else
        class="time"
      >
        发表于: <v-time v-model="item.updated_at"/>
      </span>
      <div
        v-if="item.top_at"
        class="top_badge"
      >置顶</div>
      <div
        v-if="item.is_nice"
        class="nice_badge"
      >精</div>
      <a
        :href="$alias.post(item.id)"
        class="title oneline href-fade-blue"
        target="_blank"
        v-text="item.title"
      />
    </div>
    <p
      v-if="bangumiPage"
      :class="{ 'min-height': !item.images.length }"
      class="content"
      v-text="item.desc"
    />
    <p
      v-else
      :class="{ 'min-height': !item.images.length }"
      class="content"
    >
      <a
        :href="$alias.user(item.user.zone)"
        target="_blank"
      >{{ item.user.nickname }}</a>
      :
      {{ item.desc }}
    </p>
    <div
      v-if="item.images.length"
      class="images clearfix"
    >
      <div
        v-for="(image, index) in item.images"
        :key="index"
        class="image-box"
        @click="$previewImages(item.images, index)"
      >
        <v-img
          :src="image.url"
          :aspect="$computeImageAspect(image)"
          height="90"
          mode="2"
        />
      </div>
    </div>
    <span
      class="counter"
      v-text="item.comment_count"
    />
    <div class="footer">
      <v-share
        :url="`/post/${item.id}`"
        :title="item.title"
        :desc="item.desc"
        type="button"
      />
      <span :class="{ 'done': item.marked }">
        <i class="iconfont icon-buoumaotubiao44"/>
        收藏数&nbsp;({{ item.mark_count }})
      </span>
      <span :class="{ 'done': item.liked }">
        <i class="iconfont icon-guanzhu"/>
        喜欢数&nbsp;({{ item.like_count }})
      </span>
      <span>
        <i class="iconfont icon-ai-eye"/>
        阅读数&nbsp;({{ item.view_count }})
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "PostShowItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    bangumiPage() {
      return this.$route.name === "bangumi-show";
    }
  }
};
</script>
