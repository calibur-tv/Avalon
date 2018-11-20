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
    margin-bottom: 6px;
    @include twoline(22px);

    &.min-height {
      min-height: 44px;
    }

    .desc {
      color: #666;
      font-size: 12px;
    }

    .nickname {
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
    margin-bottom: 11px;

    .image-box {
      margin-right: 10px;
      height: 100%;
      position: relative;
      float: left;

      &:after {
        content: '';
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
    font-size: 13px;
    color: $color-text-light;

    .tags {
      overflow: hidden;
      font-size: 12px;
      margin-right: 10px;

      > * {
        display: inline-block;
        height: 20px;
        border-radius: 10px;
        line-height: 20px;
        background-color: $color-gray-normal;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 7px;
      }

      .tag {
        cursor: default;
        user-select: none;
      }

      i {
        margin-right: 3px;
      }
    }

    .stats {
      float: right;

      .v-share {
        display: inline-block;

        .share-btn {
          color: $color-text-light;
          font-size: 12px;
        }

        span,
        i {
          line-height: 15px;
        }
      }

      .meta {
        display: inline-block;
        width: 50px;

        span {
          line-height: 20px;
          font-size: 12px;
          vertical-align: middle;
        }

        i {
          vertical-align: middle;
          line-height: 20px;
          font-size: 14px;
          margin-right: 5px;
        }
      }
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
          :avatar="true"
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
            :poster="true"
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
      <div class="title oneline">
        <a
          :href="$alias.post(item.id)"
          class="blue-link"
          target="_blank"
          v-text="item.title"
        />
      </div>
    </div>
    <p
      v-if="item.user"
      :class="{ 'min-height': !item.images.length }"
      class="content"
    >
      <a
        :href="$alias.user(item.user.zone)"
        target="_blank"
        class="nickname"
      >{{ item.user.nickname }}</a>
      :
      <a
        :href="$alias.post(item.id)"
        target="_blank"
        class="desc"
      >
        {{ item.desc }}
      </a>
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
    <div class="footer clearfix">
      <div class="stats">
        <span
          v-if="item.is_creator"
          class="meta"
        >
          <i class="iconfont icon-fantuan"/>
          <span>{{ $utils.shortenNumber(item.reward_count) }}</span>
        </span>
        <span
          v-else
          class="meta"
        >
          <i class="iconfont icon-like"/>
          <span>{{ $utils.shortenNumber(item.like_count) }}</span>
        </span>
        <span class="meta">
          <i class="iconfont icon-mark"/>
          <span>{{ $utils.shortenNumber(item.mark_count) }}</span>
        </span>
        <span class="meta">
          <i class="iconfont icon-talk"/>
          <span>{{ $utils.shortenNumber(item.comment_count) }}</span>
        </span>
        <v-share
          :url="$alias.post(item.id)"
          :title="item.title"
          :desc="item.desc"
          :show-text="false"
          type="button"
        />
      </div>
      <div class="tags oneline">
        <a
          v-if="!bangumiId && !userZone"
          :href="$alias.bangumi(item.bangumi.id)"
          target="_blank"
        >
          <i class="iconfont icon-biaoqian"/>
          <span v-text="item.bangumi.name"/>
        </a>
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          class="tag"
          v-text="tag.name"
        />
      </div>
    </div>
  </li>
</template>

<script>
import ImagePreview from '~/components/common/ImagePreview/ImagePreview'

export default {
  name: 'PostShowItem',
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
      default: ''
    }
  }
}
</script>
