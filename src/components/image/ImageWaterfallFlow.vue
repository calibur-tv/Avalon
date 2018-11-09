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
    background-color: #f2f3f5;
    box-shadow: 0 1px 3px 0 rgba(80, 80, 80, 0.11);
    border-radius: 8px;

    .image-box {
      position: relative;
      overflow: hidden;
      display: block;

      &.album-box:after {
        content: "";
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
        transition: 0.3s;
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

      .name,
      .social {
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
      border-top: 1px solid #f2f2f2;

      .user-avatar,
      .bangumi-avatar {
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
              <v-img
                :src="item.source.url"
                :height="computeImageHeight(item.source)"
                :width="width"
                :lazy="false"
              />
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
                <span v-if="item.is_creator">
                  <i class="iconfont icon-fantuan"/>
                  {{ item.reward_count }}
                </span>
                <span v-else>
                  <i class="iconfont icon-like"/>
                  {{ item.like_count }}
                </span>
                <span>
                  <i class="iconfont icon-talk"/>
                  {{ item.comment_count }}
                </span>
                <span>
                  <i class="iconfont icon-mark"/>
                  {{ item.mark_count }}
                </span>
              </div>
            </div>
            <div class="about">
              <template v-if="userZone">
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  target="_blank"
                  class="bangumi-avatar"
                >
                  <v-img
                    :src="item.bangumi.avatar"
                    :poster="true"
                    size="30"
                  />
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
              <user-card
                v-else-if="bangumiId"
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
                  class="main-name"
                  v-text="item.user.nickname"
                />
              </user-card>
              <template v-else>
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  target="_blank"
                  class="bangumi-avatar"
                >
                  <v-img
                    :src="item.bangumi.avatar"
                    :poster="true"
                    size="30"
                  />
                </a>
                <div class="info">
                  <p class="main-info">
                    <span>UP：</span>
                    <user-card
                      :id="item.user.id"
                      :zone="item.user.zone"
                      style="float: none"
                      custom-class="oneline"
                    >
                      {{ item.user.nickname }}
                    </user-card>
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
    <load-more-btn
      :no-more="noMore"
      :loading="loading"
      :auto="true"
      @fetch="loadMore"
    />
  </div>
</template>

<script>
export default {
  name: "ImageWaterfallFlow",
  components: {
    waterfall: () => {
      if (typeof window === "undefined") {
        return import("~/assets/js/empty");
      }
      return import("vue-waterfall/lib/waterfall");
    },
    "waterfall-slot": () => {
      if (typeof window === "undefined") {
        return import("~/assets/js/empty");
      }
      return import("vue-waterfall/lib/waterfall-slot");
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
    bangumiId: {
      type: Number,
      default: 0
    },
    userZone: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 200
    }
  },
  methods: {
    computeBoxHeight(image) {
      return this.computeImageHeight(image) + 106;
    },
    computeImageHeight(image) {
      const result = parseInt((image.height / image.width) * this.width, 10);
      if (result > 300) {
        return 300;
      }
      return result;
    },
    loadMore() {
      this.$emit("load");
    }
  }
};
</script>
