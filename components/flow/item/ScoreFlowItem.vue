<style lang="scss">
.score-flow-item {
  padding-bottom: 15px;
  padding-top: 20px;

  &:not(:last-child) {
    border-bottom: 1px solid #f4f5f7;
  }

  .header {
    margin-bottom: 10px;

    .created-at {
      float: right;
      color: #99a2aa;
      font-size: 12px;
      line-height: 30px;
    }

    .about {
      overflow: hidden;

      .user-avatar,
      .bangumi-avatar {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
      }

      .bangumi-avatar {
        border-radius: 3px;
        border: 1px solid #e5e9ef;
      }

      .name {
        line-height: 30px;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 20px;
      }
    }

    .el-rate {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .title {
    display: block;
    color: #212121;
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
    transition: all 0.2s linear;

    &:hover {
      color: $color-blue-normal;
    }
  }

  .content {
    display: block;
    margin-top: 10px;

    .poster {
      float: left;
      margin-right: 15px;
      border-radius: 4px;
    }

    .intro {
      overflow: hidden;
      font-size: 14px;
      line-height: 1.6;

      button {
        color: rgba($color-blue-light, 0.9);
        margin-left: 3px;
        font-size: 13px;
      }
    }
  }

  .footer {
    margin-top: 16px;
    line-height: 16px;
    color: #99a2aa;

    .meta {
      display: inline-block;
      width: 90px;
    }

    span {
      vertical-align: middle;
      line-height: 20px;
      font-size: 12px;
    }

    i {
      line-height: 20px;
      font-size: 14px;
      margin-right: 3px;
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <div class="score-flow-item">
    <div class="header">
      <el-tooltip
        :content="item.created_at"
        placement="top"
        effect="dark"
      >
        <v-time
          v-model="item.created_at"
          class="created-at"
        />
      </el-tooltip>
      <div
        class="about"
      >
        <user-card
          v-if="bangumiId"
          :id="item.user.id"
          :zone="item.user.zone"
        >
          <v-img
            :src="item.user.avatar"
            :width="30"
            :height="30"
            :avatar="true"
            class="user-avatar"
          />
          <span
            class="name href-fade-blue"
            v-text="item.user.nickname"
          />
        </user-card>
        <a
          v-else
          :href="$alias.bangumi(item.bangumi.id)"
          target="_blank"
        >
          <v-img
            :src="item.bangumi.avatar"
            :width="30"
            :heighr="30"
            class="bangumi-avatar"
          />
          <span
            class="name href-fade-blue"
            v-text="item.bangumi.name"
          />
        </a>
        <el-rate
          v-if="starCount"
          v-model="starCount"
          disabled
        />
        <el-rate
          v-else
          v-model="noScore"
          disabled
        />
      </div>
    </div>
    <a
      :href="$alias.score(item.id)"
      class="title"
      target="_blank"
      v-text="item.title"
    />
    <a
      :href="$alias.score(item.id)"
      class="content clearfix"
      target="_blank"
    >
      <v-img
        v-if="item.banner"
        :src="item.banner.url"
        :width="190"
        :height="105"
        :blur="true"
        class="poster"
      />
      <div class="intro">
        {{ item.intro }}…<button>阅读全文<i class="el-icon-arrow-down"/></button>
      </div>
    </a>
    <div class="footer">
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
        <i class="iconfont icon-fantuan"/>
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
  </div>
</template>

<script>
export default {
  name: 'ScoreFlowItem',
  props: {
    item: {
      required: true,
      type: Object
    },
    bangumiId: {
      type: [Number, String],
      default: 0
    },
    userZone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      noScore: 0
    }
  },
  computed: {
    starCount() {
      return this.item.total / 2
    }
  }
}
</script>
