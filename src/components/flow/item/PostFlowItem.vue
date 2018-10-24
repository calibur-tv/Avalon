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
    }

    .user-avatar {
      display: block;
      float: left;
      margin-right: 7px;
      @extend %avatar;
    }

    .title {
      font-size: 14px;
      line-height: 32px;
      display: block;
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
    .nice_badge,
    .creator_badge {
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
      user-select: none;
    }

    .top_badge {
      background-color: $color-blue-normal;
    }

    .nice_badge {
      background-color: $color-pink-deep;
    }

    .creator_badge {
      background-color: goldenrod;
    }
  }

  .content {
    margin-top: 3px;
    color: #666;
    font-size: 12px;
    margin-bottom: 5px;
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

    .bangumi {
      float: left;
      font-size: 12px;
      line-height: 20px;
    }

    .v-share {
      display: inline-block;

      .share-btn {
        color: $color-text-light;
        font-size: 12px;
        width: 70px;
      }

      span,
      i {
        line-height: 15px;
      }
    }

    .meta {
      display: inline-block;
      width: 90px;
    }

    span {
      line-height: 20px;
      font-size: 12px;
      vertical-align: middle;
    }

    i {
      vertical-align: middle;
      line-height: 20px;
      font-size: 14px;
      margin-right: 3px;
    }
  }
}
</style>

<template>
  <li class="post-show-item">
    <div class="header clearfix">
      <user-card
        v-if="item.user"
        :id="item.user.id"
        :zone="item.user.zone"
        custom-class="user-avatar"
      >
        <v-img
          :src="item.user.avatar"
          :size="32"
        />
      </user-card>
      <el-tooltip
        v-else-if="item.bangumi"
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
            size="24"
          />
        </a>
      </el-tooltip>
      <span class="time">
        发表于: <v-time v-model="item.created_at"/>
      </span>
      <div
        v-if="item.top_at && bangumiId"
        class="top_badge"
      >置顶</div>
      <div
        v-if="item.is_nice"
        class="nice_badge"
      >精</div>
      <div
        v-if="item.is_creator"
        class="creator_badge"
      >原创</div>
      <a
        :href="$alias.post(item.id)"
        class="title oneline href-fade-blue"
        target="_blank"
        v-text="item.title"
      />
    </div>
    <p
      v-if="item.user"
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
    <p
      v-else
      :class="{ 'min-height': !item.images.length }"
      class="content"
      v-text="item.desc"
    />
    <div
      v-if="item.images.length"
      class="images clearfix"
    >
      <image-preview
        :images="item.images"
        :download="false"
        query="image-box"
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
      </image-preview>
    </div>
    <span
      class="counter"
      v-text="item.comment_count"
    />
    <div class="footer">
      <a
        v-if="!bangumiId && !userZone"
        :href="$alias.bangumi(item.bangumi.id)"
        target="_blank"
        class="bangumi"
      >
        <i class="iconfont icon-biaoqian"/>
        <span v-text="item.bangumi.name"/>
      </a>
      <v-share
        :url="$alias.post(item.id)"
        :title="item.title"
        :desc="item.desc"
        type="button"
      />
      <span
        v-if="item.is_creator"
        class="meta"
      >
        <i class="iconfont icon-fantuan"/>
        <span>投食&nbsp;({{ item.reward_count }})</span>
      </span>
      <span
        v-else
        class="meta"
      >
        <i class="iconfont icon-like"/>
        <span>喜欢&nbsp;({{ item.like_count }})</span>
      </span>
      <span class="meta">
        <i class="iconfont icon-mark"/>
        <span>收藏&nbsp;({{ item.mark_count }})</span>
      </span>
      <span class="meta">
        <i class="iconfont icon-talk"/>
        <span>评论&nbsp;({{ item.comment_count }})</span>
      </span>
    </div>
  </li>
</template>

<script>
import ImagePreview from "~/components/common/ImagePreview/ImagePreview";

export default {
  name: "PostShowItem",
  components: {
    ImagePreview
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    bangumiId: {
      type: Number,
      default: 0
    },
    userZone: {
      type: String,
      default: ""
    }
  }
};
</script>
