<style lang="scss">
.post-reply-item {
  float: none;
  padding: 10px;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px dotted #e4e6eb;
  }

  .header {
    position: relative;
    height: 32px;
    line-height: 32px;

    .prefix {
      float: left;
    }

    .title {
      display: block;
    }

    .time {
      float: right;
      display: block;
      line-height: 32px;
      font-size: 12px;
      position: relative;
      margin-right: 12px;
      margin-left: 10px;
      color: #999;
      z-index: 1;
    }

    .avatar {
      display: block;
      float: right;
      margin-top: 4px;
      position: relative;
      z-index: 1;
    }
  }

  .origin {
    background-color: $color-gray-normal;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
  }

  .reply {
    border-left: 5px solid $color-gray-normal;
    padding: 0 20px;
    margin: 10px 0;
  }

  .content {
    margin-top: 3px;
    color: #666;
    font-size: 12px;
    line-height: 22px;
    max-height: 44px;
    overflow: hidden;
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
}
</style>

<template>
  <li class="post-reply-item">
    <div class="header clearfix">
      <span class="prefix">回复：</span>
      <el-tooltip :content="item.bangumi.name" effect="dark" placement="top">
        <a
          :href="$alias.bangumi(item.bangumi.id)"
          class="avatar"
          target="_blank"
        >
          <v-img
            :src="item.bangumi.avatar"
            :poster="true"
            :width="24"
            :height="24"
          />
        </a>
      </el-tooltip>
      <v-time v-model="item.created_at" class="time" />
      <a
        :href="$alias.post(item.post.id, { 'comment-id': item.id })"
        class="title href-fade-blue oneline"
        target="_blank"
        v-text="item.post.title"
      />
    </div>
    <div class="origin">
      <div class="content" v-html="item.post.content" />
      <div v-if="item.post.images.length" class="images clearfix">
        <div
          v-for="(image, index) in item.post.images"
          :key="index"
          class="image-box"
        >
          <v-img :src="image.url" :blur="true" width="auto" height="90" />
        </div>
      </div>
    </div>
    <div class="reply">
      <div class="content" v-html="item.content" />
      <div v-if="item.images.length" class="images clearfix">
        <div
          v-for="(image, index) in item.images"
          :key="index"
          class="image-box"
        >
          <v-img :src="image.url" :blur="true" width="auto" height="90" />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'PostReplyItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
