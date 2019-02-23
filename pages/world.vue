<style lang="scss">
#world-layout {
  .side-bar {
    margin-bottom: 15px;

    .nuxt-link-active {
      background-color: $color-gray-normal;
    }

    a {
      display: block;
      padding: 15px;
      transition: 0.5s;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: $color-gray-normal;
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
      height: 210px;
      margin-bottom: 30px;
      overflow: hidden;

      .background {
        display: block;
        background-color: transparent;
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
  <section id="world-layout">
    <v-header type="pure" />
    <v-layout :left="false">
      <template slot="aside">
        <ul class="side-bar">
          <li><nuxt-link to="/world/post">帖子</nuxt-link></li>
          <li><nuxt-link to="/world/pins">相册</nuxt-link></li>
          <li><nuxt-link to="/world/review">漫评</nuxt-link></li>
          <li><nuxt-link to="/world/qaq">问答</nuxt-link></li>
        </ul>
        <user-recommended :users="recommendedUsers" />
      </template>
      <div class="col-main">
        <el-carousel
          v-if="loops.length"
          :interval="4000"
          type="card"
          height="210px"
          indicator-position="none"
          class="carousel"
        >
          <el-carousel-item v-for="(item, index) in loops" :key="index">
            <a
              :style="{
                backgroundImage: `url(${$resize(item.poster, {
                  width: 800,
                  height: 480
                })})`
              }"
              :href="item.link"
              target="_blank"
              class="background"
            >
              <div class="intro">
                <p class="title" v-text="item.title" />
                <p class="desc oneline" v-text="item.desc" />
              </div>
            </a>
          </el-carousel-item>
        </el-carousel>
        <nuxt-child />
      </div>
    </v-layout>
  </section>
</template>

<script>
import UserRecommended from '~/components/user/UserRecommended'
import { getCarousel } from '~/api/carouselApi'
import { getRecommendedUsers } from '~/api/userApi'
import { Carousel, CarouselItem } from 'element-ui'

export default {
  name: 'TheWorld',
  components: {
    UserRecommended,
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem
  },
  data() {
    return {
      recommendedUsers: [],
      loops: []
    }
  },
  async asyncData({ app }) {
    const data = await Promise.all([getRecommendedUsers(app), getCarousel(app)])
    return {
      recommendedUsers: data[0],
      loops: data[1]
    }
  }
}
</script>
