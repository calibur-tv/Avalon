<style lang="scss">
  #image-waterfall-flow {
    .vue-waterfall {
      width: 848px;
    }

    .vue-waterfall-slot {
      padding-right: 12px;
      padding-bottom: 12px;
      margin-left: 3px;
      margin-top: 3px;
    }

    .image {
      width: 100%;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
      background-color: #FAFAFA;

      .image-box {
        position: relative;
        overflow: hidden;
        display: block;

        &.album-box:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          opacity: .3;
          background-color: transparent;
          background-image: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
        }

        .is-creator {
          font-size: 20px;
          position: absolute;
          left: 5px;
          top: 2px;
          z-index: 1;
          color: #ffcf00;
        }

        .is-album {
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

        img {
          display: block;
          transition: .3s;
          transform-origin: center;
        }

        &:hover {
          img {
            transform: scale(1.1);
          }
        }
      }

      .intro {
        height: 55px;
        padding: 5px 15px;
        background-color: #fff;

        .name, .social {
          height: 20px;
          font-size: 12px;
          line-height: 20px;
        }

        .social {
          color: $color-text-light;
          margin-top: 5px;

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
        border-top: 1px solid #F2F2F2;

        .user-avatar {
          @include avatar-2(30px);
        }

        .bangumi-avatar {
          width: 30px;
          height: 30px;
          border-radius: 4px;
        }

        .user-avatar, .bangumi-avatar {
          display: block;
          margin-right: 10px;
          overflow: hidden;
          float: left;
        }

        .main-name {
          line-height: 30px;
          font-size: 12px;
          word-wrap: break-word;
          color: $color-text-normal;
        }

        .info {
          overflow: hidden;
          font-size: 12px;
          line-height: 15px;

          .main-info {
            margin-bottom: 2px;

            span {
              color: $color-text-light;
              float: left;
            }
          }

          a {
            color: $color-text-normal;
            display: block;
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
  <div id="image-waterfall-flow">
    <no-ssr>
      <waterfall
        :line-gap="width + 12"
        :auto-resize="false"
      >
        <waterfall-slot
          v-for="(item, index) in list"
          :height="computeBoxHeight(item.source)"
          :order="index"
          :key="item.id"
          :width="width"
        >
          <div class="image">
            <a
              :href="$alias.image(item.id)"
              :class="{ 'album-box': item.is_album }"
              class="image-box"
              target="_blank"
            >
              <el-tooltip
                v-if="item.is_creator"
                effect="dark"
                content="原创"
                placement="top"
              >
                <i class="is-creator iconfont icon-huangguan"/>
              </el-tooltip>
              <img
                :height="computeImageHeight(item.source)"
                :src="$resize(item.source.url, { width: width * 2, mode: 2 })"
                width="200"
              >
              <div
                v-if="item.is_album"
                class="is-album"
              >
                <i class="el-icon-picture-outline"/>
                <span
                  class="image-count"
                  v-text="item.image_count"
                />
              </div>
            </a>
            <div class="intro">
              <p
                class="name oneline"
                v-text="item.name"
              />
              <div class="social">
                <span
                  v-if="item.like_count"
                  :class="{ 'done': item.liked }"
                >
                  <i class="iconfont icon-guanzhu"/>
                  {{ item.like_count }}
                </span>
                <span
                  v-if="item.comment_count"
                  :class="{ 'done': item.commented }"
                >
                  <i class="iconfont icon-pinglun1"/>
                  {{ item.comment_count }}
                </span>
                <span v-if="item.view_count">
                  <i class="iconfont icon-ai-eye"/>
                  {{ item.view_count }}
                </span>
              </div>
            </div>
            <div class="about">
              <template v-if="page === 'user-show'">
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  target="_blank"
                  class="bangumi-avatar"
                >
                  <img :src="$resize(item.bangumi.avatar, { width: 60 })">
                </a>
                <div class="info">
                  <a
                    :href="$alias.bangumi(item.bangumi.id)"
                    target="_blank"
                    class="main-name oneline"
                    v-text="item.bangumi.name"
                  />
                </div>
              </template>
              <template v-else-if="page === 'bangumi-show'">
                <a
                  :href="$alias.user(item.user.zone)"
                  target="_blank"
                  class="user-avatar"
                >
                  <img :src="$resize(item.user.avatar, { width: 60 })">
                </a>
                <a
                  :href="$alias.user(item.user.zone)"
                  target="_blank"
                  class="main-name"
                  v-text="item.user.nickname"
                />
              </template>
              <template v-else>
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  target="_blank"
                  class="bangumi-avatar"
                >
                  <img :src="$resize(item.bangumi.avatar, { width: 60 })">
                </a>
                <div class="info">
                  <p class="main-info">
                    <span>UP：</span>
                    <a
                      :href="$alias.user(item.user.zone)"
                      target="_blank"
                      class="oneline"
                      v-text="item.user.nickname"
                    />
                  </p>
                  <a
                    :href="$alias.bangumi(item.bangumi.id)"
                    target="_blank"
                    class="oneline"
                    v-text="item.bangumi.name"
                  />
                </div>
              </template>
            </div>
          </div>
        </waterfall-slot>
      </waterfall>
    </no-ssr>
    <el-button
      v-if="!noMore"
      :loading="loading"
      class="load-more-btn"
      type="info"
      plain
      @click="loadMore"
    >{{ loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
  export default {
    name: 'ImageWaterfallFlow',
    components: {
      'waterfall': () => {
        if (typeof window === 'undefined') {
          return import('~/assets/js/empty')
        }
        return import('vue-waterfall/lib/waterfall')
      },
      'waterfall-slot': () => {
        if (typeof window === 'undefined') {
          return import('~/assets/js/empty')
        }
        return import('vue-waterfall/lib/waterfall-slot')
      }
    },
    props: {
      list: {
        required: true,
        type: Array,
        default: () => []
      },
      noMore: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 200
      }
    },
    computed: {
      page () {
        return this.$route.name
      },
    },
    methods: {
      computeBoxHeight (image) {
        return this.computeImageHeight(image) + 106
      },
      computeImageHeight (image) {
        return parseInt(image.height / image.width * this.width, 10)
      },
      loadMore() {
        this.$emit('load')
      }
    }
  }
</script>
