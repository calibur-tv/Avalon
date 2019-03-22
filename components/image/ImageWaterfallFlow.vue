<style lang="scss">
#image-waterfall-flow {
  .image-item {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid $color-gray-normal;
    overflow: hidden;

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

      .image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }

    .panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 106px;
      background-color: #fff;

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

        .user-avatar,
        .bangumi-avatar {
          display: block;
          overflow: hidden;
          float: left;
          text-align: center;
          margin-right: 10px;
          font-size: 0;

          img {
            width: 30px;
            height: 30px;
          }
        }

        .user-avatar {
          border-radius: 50%;
        }

        .bangumi-avatar {
          border-radius: 3px;
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
  }
}
</style>

<template>
  <div id="image-waterfall-flow">
    <FlowRender
      :line-count="4"
      :margin-right="12"
      :margin-bottom="12"
      :extra-height="106"
      :max-height="436"
      :list="items"
      line-width="25%"
    >
      <div slot="item" slot-scope="{ item }" class="image-item">
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
            <i class="is-creator iconfont icon-huangguan" />
          </el-tooltip>
          <div
            :style="{
              backgroundImage: `url(${$resize(item.url, { width: 400, mode: 2 })})`,
              paddingTop: `${item.height / item.width * 100}%`
            }"
            class="image"
          />
          <div v-if="item.is_album" class="is-album">
            <i class="el-icon-picture-outline" />
            <span class="image-count" v-text="item.image_count" />
          </div>
        </a>
        <div class="panel">
          <div class="intro">
            <p class="name oneline" v-text="item.name" />
            <div class="social">
              <span v-if="item.is_creator">
                <i class="iconfont icon-fantuan" />
                {{ item.reward_count }}
              </span>
              <span v-else>
                <i class="iconfont icon-like" />
                {{ item.like_count }}
              </span>
              <span>
                <i class="iconfont icon-talk" />
                {{ item.comment_count }}
              </span>
              <span>
                <i class="iconfont icon-mark" />
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
            <user-card
              v-else-if="bangumiId"
              :id="item.user.id"
              :zone="item.user.zone"
            >
              <div class="user-avatar">
                <img :src="$resize(item.user.avatar, { width: 60 })">
              </div>
              <span class="main-name" v-text="item.user.nickname" />
            </user-card>
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
      </div>
    </FlowRender>
  </div>
</template>

<script>
import FlowRender from 'vue-flow-render'

export default {
  name: 'ImageWaterfallFlow',
  components: {
    FlowRender
  },
  props: {
    list: {
      required: true,
      type: Array,
      default: () => []
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
  computed: {
    items() {
      return this.list.map(_ => {
        return Object.assign(_, { ..._.source })
      })
    }
  }
}
</script>
