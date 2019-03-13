<style lang="scss" module>
$header-height: 50px;
$avatar-height: 36px;

.header {
  .nav-link {
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei',
      'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
  }

  .nav {
    left: 0;
    top: 0;
    width: 100%;
    height: $header-height;
    z-index: 100;

    .text {
      position: relative;
      height: 100%;
      padding-left: 20px;
      padding-right: 20px;
      z-index: 1;

      .right {
        position: absolute;
        top: 0;
        right: 30px;
        height: 100%;
        z-index: 10;

        .sign-btn {
          width: 52px;
          height: 100%;
          color: $color-white;
          text-align: center;
          font-size: 13px;
          margin-left: 8px;

          span {
            display: block;
            border-radius: 2px;
          }
        }

        .sign-in span {
          line-height: 31px;
        }

        .sign-up span {
          line-height: 32px;
          border: 0;
          background-color: rgba($color-blue-normal, 0.8);

          &:hover {
            background-color: $color-blue-normal;
          }
        }

        .user-section {
          height: $header-height;
          margin-left: 25px;
          margin-right: 25px;
          vertical-align: middle;

          .avatar {
            margin-top: ($header-height - $avatar-height) / 2;
          }
        }

        .faker-user-section {
          display: inline-block;
          width: 89px;
        }
      }

      $logo-size: 30px;
      .logo {
        float: left;
        margin-top: ($header-height - $logo-size) / 2 - 1;
        margin-right: 10px;

        img {
          width: $logo-size;
          height: $logo-size;
        }
      }

      .nav-link {
        display: block;
        float: left;
        height: 100%;
        line-height: $header-height;
        text-align: center;
        font-size: 13px;

        span {
          margin: 0 6px;
          padding: 4px 9px;
          border-radius: 5px;
        }

        &.first {
          margin-left: -16px;
        }
      }
    }

    .banner-bg-container {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 0;
      overflow: hidden;

      .banner-bg-img {
        position: absolute;
        width: 125%;
        left: -12.5%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80%;
        @include filter-blur();
      }
    }

    .mask-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100px;
      z-index: -1;
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
      );
    }
  }

  .nav-mask {
    background-color: transparent;

    .nav-link {
      span {
        color: #fff;
        transition: 0.4s background-color, 0.4s color;
      }

      &:hover {
        span {
          color: $color-blue-normal;
          background-color: #fff;
        }
      }
    }
  }

  .nav-banner {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    .text {
      background-color: hsla(0, 0%, 100%, 0.4);
    }

    .nav-link {
      transition: 0.3s background-color;

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }

  .nav-pure {
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .nav-link {
      &:hover {
        background-color: $color-gray-normal;
      }
    }
  }

  .nav-fixed {
    position: fixed;
  }

  .nav-abs {
    position: absolute;
  }

  .nav-shim {
    width: 100%;
    height: $header-height;
  }

  .normal-banner {
    position: relative;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: $header-height;
    z-index: 0;

    .calibur {
      width: 500px;
      height: 63px;
      background-position: center left;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('https://image.calibur.tv/banner/3-1.png?imageMogr2/auto-orient/strip');
      margin-top: 30px;
      margin-left: 5px;
    }
  }

  .mask-banner {
    position: relative;
    width: 100%;
    overflow: hidden;
    box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.5);

    .mask-banner-img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 110%;
      transform: translate(-50%, -50%);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 0;
      @include filter-blur();
    }
  }
}
</style>

<style lang="scss">
$header-height: 50px;
$search-height: 32px;

#page-header {
  .el-badge {
    .el-badge__content {
      right: 25px;
      top: 10px;
    }
  }

  .search-container {
    position: relative;
    height: 100%;
    float: left;
    $transition: 0.2s;

    .search-input-wrap {
      height: $search-height;
      border-radius: $search-height / 2;
      margin-top: ($header-height - $search-height) / 2;
      margin-right: 20px;
      transition: $transition;
      width: 167px;
      float: left;

      .search-input {
        background-color: transparent;
        padding: 4px 10px 4px 15px;
        border-radius: 16px 0 0 16px;
        border: 1px solid transparent;
        line-height: 24px;
        border-right: 0;
        font-size: 12px;
      }

      .search-input-btn {
        width: 32px;
        height: 32px;
        border-radius: 0 16px 16px 0;
        background-color: transparent;
        font-size: 18px;
        border: 1px solid transparent;
        border-left: 0;
        line-height: 29px;
        transition: $transition;
        color: $color-white;
      }

      &.search-focus {
        width: 267px;

        & ~ .search-history {
          visibility: visible;
          opacity: 1;
          transition: 0.2s;
        }
      }
    }

    .search-history {
      position: absolute;
      right: 20px;
      top: 120%;
      height: 192px;
      width: 267px;
      background-color: $color-white;
      border: 1px solid $color-gray-normal;
      border-radius: 4px;
      font-size: 12px;
      padding-bottom: 5px;
      box-shadow: rgba(0, 0, 0, 0.16) 0 2px 4px;
      visibility: hidden;
      opacity: 0;
      transition: 0s;

      .hr {
        margin: 0 20px;
      }

      ul {
        li {
          height: 30px;
          width: 100%;
          position: relative;

          &:hover {
            background-color: $color-gray-normal;
          }

          a {
            padding: 5px 40px 5px 10px;
            line-height: 20px;
            display: block;
          }

          .del {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            text-align: center;
            cursor: pointer;

            &:hover {
              color: $color-blue-normal;
            }
          }
        }
      }

      &:hover {
        visibility: visible;
        opacity: 1;
        transition: 0.2s;
      }
    }
  }

  .nav-banner,
  .nav-mask {
    .search-container .search-input-wrap {
      background-color: rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }

      .search-input {
        color: $color-white;
        @include input-placeholder();
      }

      &.search-focus {
        background-color: #fff;

        .search-input {
          color: #222;
          @include input-placeholder(#222);
        }

        .search-input-btn {
          color: $color-text-deep;

          &:hover {
            color: $color-blue-normal;
          }
        }
      }
    }

    .sign-in span {
      border: 1px solid rgba(255, 255, 255, 0.8);

      &:hover {
        background: $color-white;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
        color: #000;
        border: 1px solid #ccc;
      }
    }
  }

  .nav-pure {
    .search-container .search-input-wrap {
      background-color: #f1f2f4;

      &:hover {
        background-color: $color-gray-deep;
      }

      .search-input {
        color: $color-text-normal;
        @include input-placeholder($color-text-normal);
      }

      .search-input-btn {
        color: $color-text-normal;
      }

      &.search-focus {
        background-color: #f1f2f4;

        .search-input-btn {
          &:hover {
            color: $color-blue-normal;
          }
        }
      }
    }

    .sign-in span {
      background-color: rgba(#fff, 0.6);
      color: #333;
      border: 1px solid #ccc;

      &:hover {
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
        color: #000;
      }
    }
  }
}
</style>

<template>
  <div id="page-header" :class="$style.header">
    <div :class="navClassList">
      <div :class="$style.text">
        <v-layout>
          <nuxt-link
            v-if="type === 'pure' || scrollFlag"
            :class="$style.logo"
            to="/"
          >
            <img :src="$resize('owner/logo-new/logo.png', { width: 80 })" >
          </nuxt-link>
          <nuxt-link v-else :class="[$style.navLink, $style.first]" to="/">
            <span>首页</span>
          </nuxt-link>
          <nuxt-link :to="$alias.roleTrending" :class="$style.navLink">
            <span>股市</span>
          </nuxt-link>
          <nuxt-link :class="$style.navLink" to="/world">
            <span>社区</span>
          </nuxt-link>
          <nuxt-link :class="$style.navLink" :to="$alias.bangumiNews">
            <span>番剧</span>
          </nuxt-link>
          <nuxt-link :class="$style.navLink" to="/app/download">
            <span>下载APP</span>
          </nuxt-link>
          <nuxt-link :class="$style.navLink" to="/about/reward">
            <span>捐赠</span>
          </nuxt-link>
        </v-layout>
        <div :class="$style.right">
          <div class="search-container">
            <v-search :show-suggestion="false">
              <i slot="submit-btn" class="iconfont icon-sousuo" />
            </v-search>
            <v-search-history />
          </div>
          <template v-if="haveAuthToken">
            <template v-if="isLogin">
              <el-badge
                :value="notificationsCount"
                :hidden="!notificationsCount"
                :max="99"
                class="item"
              >
                <a
                  :class="$style.navLink"
                  target="_blank"
                  href="/my/notification"
                >
                  <span>消息</span>
                </a>
              </el-badge>
              <el-dropdown :class="$style.userSection" placement="bottom">
                <a
                  :href="$alias.user(user.zone)"
                  target="_blank"
                  class="el-dropdown-link"
                >
                  <v-img
                    :src="user.avatar"
                    :class="$style.avatar"
                    :avatar="true"
                    :lazy="false"
                    :width="34"
                    :height="34"
                  />
                </a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <button @click="signOut">
                      退出
                    </button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <a :class="$style.navLink" href="javascript:;">
                <span>消息</span>
              </a>
              <span :class="$style.fakerUserSection" />
            </template>
          </template>
          <template v-else>
            <button
              :class="[$style.signBtn, $style.signIn]"
              class="sign-in"
              @click="signIn"
            >
              <span>登录</span>
            </button>
            <button
              :class="[$style.signBtn, $style.signUp]"
              class="sign-up"
              @click="signUp"
            >
              <span>注册</span>
            </button>
          </template>
        </div>
      </div>
      <template v-if="type !== 'pure' && !scrollFlag">
        <div v-if="type === 'banner'" :class="$style.bannerBgContainer">
          <div :class="$style.bannerBgImg" :style="normalBannerBgStyle" />
        </div>
        <div v-if="type === 'mask'" :class="$style.maskBg" />
      </template>
    </div>
    <div
      v-if="type === 'banner'"
      :style="[{ height, marginBottom }, bannerImage]"
      :class="$style.normalBanner"
    >
      <div class="container">
        <div :class="$style.calibur" />
      </div>
      <slot />
    </div>
    <template v-else-if="type === 'mask'">
      <div
        v-if="banner"
        :style="{ height, marginBottom }"
        :class="$style.maskBanner"
      >
        <div :class="$style.maskBannerImg" :style="[{ height }, bannerImage]" />
        <slot />
      </div>
    </template>
    <div v-else :class="$style.navShim" :style="{ marginBottom }" />
  </div>
</template>

<script>
import vSearch from '~/components/search/Input'
import vSearchHistory from '~/components/search/History'
import { logout } from '~/api/userApi'
import { Badge } from 'element-ui'

export default {
  name: 'VHeader',
  components: {
    vSearch,
    vSearchHistory,
    'el-badge': Badge
  },
  props: {
    type: {
      type: String,
      default: 'banner',
      validator: val => ~['mask', 'pure', 'banner'].indexOf(val)
    },
    banner: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '200px'
    },
    marginBottom: {
      type: String,
      default: '35px'
    }
  },
  data() {
    return {
      scrollFlag: false
    }
  },
  computed: {
    defaultBanner() {
      return this.$store.state.pageData
        ? this.$store.state.pageData.page_banner
        : ''
    },
    navClassList() {
      const result = [this.$style.nav]
      const type = this.type
      if (this.scrollFlag) {
        result.push(this.$style.navFixed)
        result.push(this.$style.navPure)
        result.push('nav-pure')
      } else {
        result.push(
          type === 'banner' ? this.$style.navAbs : this.$style.navFixed
        )
        result.push(
          type === 'mask'
            ? this.$style.navMask
            : type === 'banner'
            ? this.$style.navBanner
            : this.$style.navPure
        )
        result.push(`nav-${type}`)
      }
      return result
    },
    bannerImage() {
      return {
        backgroundImage: `url(${this.$resize(
          this.type === 'banner'
            ? this.banner || this.defaultBanner
            : this.banner,
          { width: 2048, mode: 0 }
        )})`
      }
    },
    convertBannerHeight() {
      const matched = this.height.match(/(\d+)px$/)
      return matched ? +matched[1] : +this.height.replace('%', '')
    },
    normalBannerBgStyle() {
      let height
      let top

      const compute = this.convertBannerHeight

      if (this.height.match(/(\d+)px$/)) {
        height = `${compute * 1.25}px`
        top = `${-compute * 0.125}px`
      } else {
        height = `${compute * 1.25}%`
        top = `${-compute * 0.125}%`
      }

      return Object.assign({}, this.bannerImage, {
        height,
        top
      })
    },
    isLogin() {
      return this.$store.state.login
    },
    isAuth() {
      return this.$store.state.isAuth
    },
    haveAuthToken() {
      return this.$store.state.haveAuthToken
    },
    user() {
      return this.$store.state.user
    },
    notificationsCount() {
      if (!this.isLogin) {
        return 0
      }
      const result =
        this.user.notification - this.$store.state.users.notifications.checked
      return result < 0 ? 0 : result
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    signIn() {
      this.$channel.$emit('sign-in')
    },
    signUp() {
      this.$channel.$emit('sign-up')
    },
    signOut() {
      this.$cookie.remove('JWT-TOKEN')
      logout(this)
      window.location.href = '/'
    },
    handleScroll() {
      this.scrollFlag =
        window.scrollY >
        (this.type === 'mask'
          ? this.convertBannerHeight - 100
          : this.convertBannerHeight)
    }
  }
}
</script>
