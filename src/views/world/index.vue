<style lang="scss">
#the-world {
  .col-aside {
    .side-bar {
      .router-link-active {
        background-color: $color-gray-normal;
      }

      a {
        display: block;
        padding: 15px;
        transition: 0.5s;
        border-radius: 5px;

        &:hover {
          background-color: $color-gray-normal;
        }
      }
    }

    .sub-title {
      font-size: 15px;
      margin-left: 8px;
      margin-top: 20px;
    }

    .recommended-users {
      li {
        display: block;
        padding-left: 9px;
        margin-bottom: 14px;

        a {
          display: block;
          width: 100%;
          height: 100%;
          @extend %clearfix;

          &:hover span {
            color: $color-blue-normal;
          }
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
          float: left;
        }

        .intro {
          overflow: hidden;

          span {
            cursor: pointer;
            font-size: 12px;
            line-height: 16px;
            color: #222;
          }

          p {
            color: $color-text-normal;
            margin-top: 4px;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  }

  .col-main {
    .flow-intro {
      @extend %clearfix;
      margin-bottom: 20px;

      .img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-right: 20px;
        float: left;
        color: #fff;
        text-align: center;
        cursor: default;
        font-weight: bold;
        user-select: none;
        font-size: 36px;
        line-height: 80px;
      }

      .intro {
        overflow: hidden;

        .summary {
          overflow: hidden;

          .title {
            margin-top: 10px;
            font-size: 17px;
          }

          .extra {
            margin-top: 8px;
            font-size: 14px;
            color: $color-text-normal;
          }
        }

        .control {
          float: right;
          margin-top: 10px;
          margin-left: 10px;
        }
      }

      .detail {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 8px;
        padding-right: 25px;
        background-color: $color-gray-normal;
        color: $color-text-normal;

        p {
          margin-bottom: 5px;
          font-size: 13px;
          line-height: 18px;
        }

        a {
          color: $color-blue-normal;
          transition: 0.4s;

          &:hover {
            color: $color-blue-deep;
          }
        }
      }
    }

    .load-more-btn {
      width: 100%;
    }

    .carousel {
      height: 266px;
      margin-bottom: 30px;
      overflow: hidden;

      .background {
        display: block;
        background-color: $color-blue-normal;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .intro {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgba(30, 30, 34, 0.6);
        height: 50px;
        width: 100%;
        padding: 8px 12px 3px;
        color: #fff;

        .title {
          font-size: 14px;
        }

        .desc {
          margin-top: 4px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<template>
  <div id="the-world">
    <v-header type="pure"/>
    <v-layout :left="false">
      <div
        slot="aside"
        class="col-aside"
      >
        <ul class="side-bar">
          <li>
            <router-link :to="$alias.world('post')">
              帖子
            </router-link>
          </li>
          <li>
            <router-link :to="$alias.world('pins')">
              相册
            </router-link>
          </li>
          <li>
            <router-link :to="$alias.world('review')">
              漫评
            </router-link>
          </li>
          <li>
            <router-link :to="$alias.world('qaq')">
              问答
            </router-link>
          </li>
        </ul>
        <template v-if="recommendedUsers.length">
          <p class="sub-title">推荐用户</p>
          <ul class="recommended-users">
            <li
              v-for="user in recommendedUsers"
              :key="user.id"
            >
              <a
                :href="$alias.user(user.zone)"
                target="_blank"
              >
                <img
                  :src="$resize(user.avatar, { width: 80 })"
                  class="avatar"
                >
                <div class="intro">
                  <span
                    class="oneline"
                    v-text="user.nickname"
                  />
                  <p
                    class="oneline"
                    v-text="user.desc"
                  />
                </div>
              </a>
            </li>
          </ul>
        </template>
      </div>
      <div class="col-main">
        <el-carousel
          v-if="loops.length"
          :interval="4000"
          type="card"
          height="240px"
          class="carousel"
        >
          <el-carousel-item
            v-for="(item, index) in loops"
            :key="index"
          >
            <a
              :style="{ backgroundImage: `url(${$resize(item.poster, { width: 800, height: 480 })})` }"
              :href="item.link"
              target="_blank"
              class="background"
            >
              <div class="intro">
                <p
                  class="title"
                  v-text="item.title"
                />
                <p
                  class="desc oneline"
                  v-text="item.desc"
                />
              </div>
            </a>
          </el-carousel-item>
        </el-carousel>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "TheWorld",
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("users/getRecommended"),
      store.dispatch("cm/getCmLoop")
    ]);
  },
  computed: {
    recommendedUsers() {
      return this.$store.state.users.recommended;
    },
    loops() {
      return this.$store.state.cm.loops;
    }
  }
};
</script>
