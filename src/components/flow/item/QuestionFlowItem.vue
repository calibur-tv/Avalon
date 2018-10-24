<style lang="scss">
.question-flow-item {
  padding-bottom: 15px;
  padding-top: 15px;
  border-bottom: 1px dotted #e4e6eb;

  &:last-child {
    border-bottom: none;
  }

  .qaq-flow-header {
    height: 24px;
    margin-bottom: 8px;

    .user-avatar {
      float: left;
      margin-right: 10px;
      @include avatar(24px);
    }

    .nickname {
      font-weight: 600;
      font-size: 15px;
      line-height: 24px;
      color: #444;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
    color: #1a1a1a;
    margin-bottom: 6px;

    &:hover {
      color: $color-blue-deep;
    }
  }

  .content {
    @extend %clearfix;
    margin-bottom: 10px;

    .poster {
      margin-top: -2px;
      margin-right: 18px;
      margin-bottom: 4px;
      border-radius: 4px;
      overflow: hidden;
      float: left;
    }

    .text {
      line-height: 25px;
      max-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  .footer {
    color: $color-text-normal;

    .v-share {
      display: inline-block;
    }

    .share-btn {
      color: $color-text-normal;
    }

    .vote-button {
      margin-right: 20px;
    }

    .stats {
      margin-right: 20px;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <li class="question-flow-item">
    <header class="qaq-flow-header">
      <user-card
        :id="item.user.id"
        :zone="item.user.zone"
        custom-class="user-avatar"
      >
        <v-img
          :src="item.user.avatar"
          size="24"
        />
      </user-card>
      <a
        :href="$alias.user(item.user.zone)"
        target="_blank"
        class="nickname"
        v-text="item.user.nickname"
      />
    </header>
    <a
      :href="$alias.question(item.id)"
      target="_blank"
    >
      <h3
        class="title"
        v-text="item.title"
      />
    </a>
    <div class="content">
      <a
        v-if="item.answer"
        :href="$alias.answer(item.answer.id)"
        target="_blank"
      >
        <div
          v-if="item.answer.poster"
          class="poster"
        >
          <v-img
            :src="item.answer.poster.url"
            width="190"
            height="105"
          />
        </div>
        <div
          class="text"
          v-text="item.answer.intro"
        />
      </a>
      <a
        v-else
        :href="$alias.question(item.id)"
        target="_blank"
        class="text"
        v-text="item.intro"
      />
    </div>
    <div class="footer">
      <a
        v-if="item.answer"
        :href="$alias.answer(item.answer.id)"
        target="_blank"
      >
        <vote-button
          :id="item.answer.id"
          :total="item.answer.vote_count"
          :author-id="item.user.id"
          :score="0"
          :disabled="true"
          type="answer"
        />
      </a>
      <span class="stats">
        <i class="el-icon-edit"/>
        {{ item.answer_count ? item.answer_count + '个回答' : '还没有回答' }}
      </span>
      <span class="stats">
        <i class="iconfont icon-talk"/>
        {{ item.comment_count ? item.comment_count + '条评论' : '还没有评论' }}
      </span>
      <span
        v-if="item.follow_count"
        class="stats"
      >
        <i class="iconfont icon-mark"/>
        {{ item.follow_count }}人关注
      </span>
      <v-share
        :url="item.answer ? $alias.answer(item.answer.id) : $alias.question(item.id)"
        :title="item.title"
        :desc="item.answer ? item.answer.intro : item.intro"
        type="button"
        class="stats"
      />
    </div>
  </li>
</template>

<script>
import VoteButton from "~/components/common/VoteButton";

export default {
  name: "QuestionFlowItem",
  components: {
    VoteButton
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  }
};
</script>
