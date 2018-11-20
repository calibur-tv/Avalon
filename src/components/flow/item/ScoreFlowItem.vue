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

  .content {
    display: block;

    .title {
      color: #212121;
      cursor: pointer;
      font-size: 16px;
      line-height: 30px;
      font-weight: 700;
      transition: all 0.2s linear;
    }

    .intro {
      font-size: 14px;
      margin-top: 8px;
      @include twoline(22px);
    }

    &:hover .title {
      color: $color-blue-normal;
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
            :avatar="true"
            size="30"
            class="user-avatar"
          />
          <span
            class="name blue-link"
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
            :poster="true"
            size="30"
            class="bangumi-avatar"
          />
          <span
            class="name blue-link"
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
      class="content"
      target="_blank"
    >
      <div
        class="title"
        v-text="item.title"
      />
      <div
        class="intro"
        v-text="item.intro"
      />
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
      type: Number,
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
