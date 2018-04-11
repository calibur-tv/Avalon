<style lang="scss">
  #image-waterfall {
    .image-item {
      width: 217px;
      padding-right: 17px;
      padding-bottom: 17px;
      margin-left: 3px;

      .image-wrap {
        font-size: 0;
        position: relative;
        cursor: zoom-in;

        .creator {
          font-size: 20px;
          position: absolute;
          left: 5px;
          top: 2px;
          z-index: 1;
          color: #ffcf00;
        }

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
      }

      .image {
        width: 100%;
        height: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        overflow: hidden;

        .desc {
          padding: 0 16px;
          margin: 10px 0;
          height: 32px;

          .tags {
            float: left;

            .el-tag {
              margin-top: 4px;
              margin-right: 7px;
              max-width: 60px;
            }
          }

          .meta {
            font-size: 11px;
            color: $color-gray-deep;
            overflow: hidden;
            text-align: right;
            margin-top: 1px;

            .like {
              margin-right: 1px;
              cursor: pointer;
              display: block;
            }

            time {
              margin-top: 3px;
            }
          }
        }

        .detail {
          padding: 10px 16px;
          border-top: 1px solid #F2F2F2;
          background-color: #fafafa;
          font-size: 12px;
          color: #999;
        }

        .bangumi {

          .avatar {
            float: left;
            margin-right: 10px;

            img {
              width: 34px;
              height: 34px;
            }
          }

          .info {
            overflow: hidden;
            line-height: 17px;
          }
        }

        .user {
          .avatar {
            float: left;
            margin-right: 10px;
            @include avatar(34px);
          }

          .info {
            overflow: hidden;
            line-height: 17px;
          }
        }
      }
    }

    .load-more-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>

<template>
  <div id="image-waterfall">
    <div>
      <div
        v-for="(item, index) in list"
        v-waterfall="{ col, index, id: 'images-waterfall' }"
        class="image-item"
        :style="computeImageHeight(item)"
      >
        <div class="image">
          <div class="image-wrap" @click="$previewImages(`${item.width}-${item.height}|${item.url}`)">
            <i v-if="item.creator" class="creator iconfont icon-huangguan"></i>
            <img :src="$resize(item.url, { width: 200, mode: 2 })">
          </div>
          <div class="desc">
            <div class="tags">
              <button class="el-tag oneline" v-for="tag in item.tags" v-text="tag.name"></button>
            </div>
            <div class="meta">
              <span class="like">
                <i class="iconfont icon-guanzhu"></i>
                {{ item.like_count }}
              </span>
              <el-tooltip effect="dark" :content="item.created_at" placement="top">
                <v-time class="oneline" v-model="item.created_at"></v-time>
              </el-tooltip>
            </div>
          </div>
          <div class="detail bangumi clearfix" v-if="item.bangumi">
            <a class="avatar" :href="$alias.bangumi(item.bangumi.id)" target="_blank">
              <img :src="$resize(item.bangumi.avatar, { width: 72 })">
            </a>
            <div class="info">
              <a class="oneline" :href="$alias.bangumi(item.bangumi.id)" target="_blank" v-text="item.bangumi.name"></a>
              <div v-if="item.role" class="oneline" v-text="item.role.name"></div>
            </div>
          </div>
          <div class="detail user clearfix" v-if="item.user">
            <a class="avatar" :href="$alias.user(item.user.zone)" target="_blank">
              <img :src="$resize(item.user.avatar, { width: 72 })">
            </a>
            <div class="info">
              <a class="oneline" :href="$alias.user(item.user.zone)" target="_blank" v-text="item.user.nickname"></a>
              <div v-if="item.role" class="oneline" v-text="item.role.name"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button
      :loading="loading"
      v-if="!noMore"
      class="load-more-btn"
      @click="handleLoadMoreClick"
      type="info"
      plain
    >{{ loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
  export default {
    name: 'ImageWaterfall',
    props: {
      list: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      noMore: {
        type: Boolean,
        required: true
      },
      col: {
        type: Number,
        default: 4
      }
    },
    methods: {
      computeImageHeight (image) {
        return {
          height: `${(image.height / image.width * 200) + 124}px`
        }
      },
      handleLoadMoreClick () {
        this.$emit('fetch')
      }
    }
  }
</script>
