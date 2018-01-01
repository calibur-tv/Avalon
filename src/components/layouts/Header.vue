<style lang="scss">
  $header-height: 46px;
  $search-height: 32px;
  $avatar-height: 36px;

  #header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: $header-height;
    z-index: 10;

    .text {
      width: 100%;
      height: $header-height;
      line-height: $header-height;
      padding-left: 20px;
      padding-right: 20px;

      .header-left {
        height: $header-height;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
      }

      .header-right {
        height: $header-height;
        float: right;
        position: relative;

        .search-box {
          height: $search-height;
          border-radius: $search-height / 2;
          background-color: rgba(0, 0, 0, 0.2);
          margin-top: ($header-height - $search-height) / 2;
          margin-right: 30px;
          float: left;

          &:hover {
            background-color: rgba(0, 0, 0, 0.4);
          }

          $transition: .2s;
          .search-ctx {
            width: 135px;
            background-color: transparent;
            transition: $transition;
            font-size: 12px;
            padding: 4px 10px 4px 15px;
            line-height: 24px;
            border-radius: 16px 0 0 16px;
            color: $color-white;
            @include input-placeholder();
            border: 1px solid transparent;
            border-right: 0;

            &:focus {
              width: 235px;
              background-color: $color-white;
              color: #222;
              @include input-placeholder(#222);

              &+.search-btn {
                background-color: $color-white;
                color: $color-text-deep;

                &:hover {
                  color: $color-blue-normal;
                }
              }

              &~.search-history {
                transition-delay: $transition;
              }
            }
          }

          @media (max-width: 768px) {
            .search-ctx {
              width: 85px;

              &:focus {
                width: 155px;
              }
            }
          }

          .search-btn {
            width: 32px;
            height: 32px;
            border-radius: 0 16px 16px 0;
            background-color: transparent;
            transition: $transition;
            color: $color-white;
            font-family: 'iconfont' !important;
            font-size: 18px;
            border: 1px solid transparent;
            border-left: 0;
            line-height: 29px;

            &:before {
              content: '\e761';
            }
          }
        }

        .sign-btn {
          border-radius: 2px;
          width: 52px;
          height: 34px;
          line-height: 32px;
          color: $color-white;
          text-align: center;
          font-size: 14px;
        }

        .sign-in {
          border: 1px solid rgba(255,255,255,.8);

          &:hover {
            background: $color-white;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
            color: #000;
            border: 1px solid #ccc;
          }
        }

        .sign-up {
          margin-left: 7px;
          border: 0;
          background-color: rgba($color-blue-normal, .8);

          &:hover {
            background-color: $color-blue-normal;
          }
        }

        .user-section {
          height: $header-height;
          margin-left: 6px;
          margin-right: 25px;

          .avatar {
            margin-top: ($header-height - $avatar-height) / 2;
            @include avatar($avatar-height);
          }
        }
      }
    }

    .wrap {
      z-index: -1;
    }

    &.mask {
      background-color: transparent;

      &.scroll-show,
      &.scroll-hide {
        .nav-link {
          padding: 5px 20px;
          border-radius: 10px;
          margin: 0 5px;
          font-size: 15px;
          transition: .4s background-color, .4s color;

          &:hover {
            background-color: $color-white;
            color: $color-blue-normal;
            transition-duration: 0s;
          }
        }
      }

      &.scroll-show {
        background-color: $color-white;
        box-shadow: rgba(0,0,0,0.1) 0 1px 2px;

        .nav-link {
          color: $color-link;
        }

        .header-right {

          .search-ctx:focus {
            border: 1px solid #D9D9D9;
            border-right: 0;

            &+.search-btn {
              border: 1px solid #D9D9D9;
              border-left: 0;
            }
          }

          .sign-in {
            color: $color-link;
            border: 1px solid #D9D9D9;
            background: linear-gradient(#FAFAFA, #F2F2F2);
            text-shadow: 0 1px 0 rgba(255,255,255,.5);

            &:hover {
              background: linear-gradient(#FFF, #F7F7F7);
              box-shadow: inset 0 1px 0 white, 0 1px 0 rgba(255,255,255,.05);
              border: 1px solid #CCC;
            }
          }

          .sign-up {
            background: linear-gradient($color-blue-light, $color-blue-normal);
            border: 1px solid $color-blue-deep;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 1px 0 rgba(255,255,255,.3);

            &:hover {
              background: linear-gradient(#00bfef, #00a7de);
              box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 1px 0 rgba(255,255,255,.1);
            }
          }
        }
      }

      &.scroll-hide {
        .nav-link {
          color: $color-white;
        }

        .shim {
          width: 100%;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          background-image: linear-gradient(to top,rgba(0, 0, 0, 0),rgba(0, 0, 0, .3));
        }
      }
    }

    &.blur {
      background-color: $color-white;

      .nav-link {
        padding: 0 25px;
        font-size: 15px;
        height: $header-height;
        display: inline-block;

        &:hover {
          background-color: rgba(255, 255, 255, 0.24);
        }
      }

      &.black {
        box-shadow: rgba(0,0,0,0.1) 0 1px 2px;
        .text {
          background-color: rgba(0, 0, 0, 0.2);

          .nav-link {
            color: $color-white;
          }
        }
      }

      &.white {
        box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
        .text {
          background-color: rgba(255, 255, 255, 0.4);

          .nav-link {
            color: $color-link;
          }
        }
      }

      .wrap {
        overflow: hidden;

        .shim {
          position: absolute;
          width: 125%;
          height: $banner-hgt * 1.25;
          top: -$banner-hgt * 0.125;
          left: -12.5%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 80%;
          z-index: -1;
          @include filter-blur();
        }
      }
    }
  }
</style>

<template>
  <header id="header" :class="[theme, 'white', scrollFlag ? 'scroll-show' : 'scroll-hide']">
    <div class="text">
      <nav class="container header-left">
        <a class="nav-link" :href="$alias.index">主站</a>
        <el-dropdown>
          <a class="nav-link el-dropdown-link" :href="$alias.bangumiNews">番剧</a>
          <el-dropdown-menu slot="dropdown">
            <!--
            <el-dropdown-item>
              <router-link class="nav-link" to="/bangumi/rank">排行榜</router-link>
            </el-dropdown-item>
            -->
            <el-dropdown-item>
              <a class="nav-link" :href="$alias.bangumiTimeline">时间轴</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="nav-link" :href="$alias.bangumiNews">新番放送</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="nav-link" :href="$alias.bangumiTag()">分类索引</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="nav-link" :href="$alias.postNews">帖子</a>
      </nav>
      <nav class="header-right">
        <v-search placeholder="搜索" :history="true"></v-search>
        <template v-if="isLogin">
          <el-dropdown class="user-section" placement="bottom">
            <a class="el-dropdown-link" :href="$alias.user(user.zone)">
              <img class="avatar" :src="$resize(user.avatar, { width: 72, height: 72 })" :alt="user.nickname">
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
              <el-dropdown-item>动态</el-dropdown-item>
              <el-dropdown-item>
                <button @click="signOut">退出</button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <button class="sign-btn sign-in" @click="signIn">登录</button>
          <button class="sign-btn sign-up" @click="signUp">注册</button>
        </template>
      </nav>
    </div>
    <div class="wrap abs">
      <div class="shim" :style="computedBg"></div>
    </div>
  </header>
</template>

<script>
  import UserApi from '~/api/userApi'
  import vSearch from '~/components/layouts/Search'

  export default {
    name: 'v-header',
    components: {
      vSearch
    },
    data () {
      return {
        scrollFlag: false
      }
    },
    computed: {
      theme () {
        return ['homepage', 'bangumi-show', 'user-show'].indexOf(this.$route.name) !== -1
          ? 'mask'
          : 'blur'
      },
      computedBg () {
        return this.theme === 'blur' ? {
          backgroundImage: `url(${this.$resize(this.$store.state.banner, { width: 1920, mode: 0 })})`
        } : {}
      },
      isLogin () {
        return this.$store.state.login
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      signIn () {
        this.$channel.$emit('sign-in')
      },
      signUp () {
        this.$channel.$emit('sign-up')
      },
      signOut () {
        this.$cookie.remove('JWT-TOKEN')
        const api = new UserApi(this)
        api.logout()
        window.location.reload()
      }
    },
    mounted () {
      document.addEventListener('scroll', () => {
        this.scrollFlag = window.scrollY > 200
      })
    }
  }
</script>
