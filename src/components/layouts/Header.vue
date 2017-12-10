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
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAABkCAYAAABOx/oaAAAAAXNSR0IArs4c6QAAAX5JREFUSA2llAtuwzAMQ5NtN9r9r9bUZP0I2VW7ATWQ2KZISv4k53Ecv+NZ2tcym5MOvDrwBLyKjZkCzvEQOH8mIGICkosBy0E8xTIwXpfkam+ZJiCvzAPQHrzIztxyEnkyI+0yW8/s0pJdngKybvlS0sLsQK99l3s/ZYPcPYkUoKUkAPd17ZJa3mbfwTA9QKq+y+5lVqbHbHINHDuoOnOXxIRt5m0A3BCNW7nByKYinlIp2MqdUCU5KupsuQwA6r12SiJhmABhLsBAfZoVbJkCn1b0IegruR+cKulPc2d+mF2JvEvOaLPHa8nOxmSX6neU6805mU2di69uMixy3WAKWBJVYPFEakKVC/CVBKROy/fvyDYwPeElJqXQP13vlyUtXxyW3k9N4qdJTaS52mvmI14s/pQnGUwBbEp+gM46zXOakSrwPR7JIhUoT7WF2YEXUuTq7QU7Nkr01CorQYE1s8c2HgF6sdtA/gxhaEBDTm98mcCsvQn/Y1XZ+/EdtDiR1Lr0wCcAAAAASUVORK5CYII=);
        }
      }
    }

    &.blur {
      background-color: $color-white;

      .nav-link {
        padding: 0 25px;
        font-size: 15px;
        height: $header-height;
        display: block;
        float: left;

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
        <router-link class="nav-link" to="/">主站</router-link>
        <router-link class="nav-link" to="/bangumi/news">番剧</router-link>
        <!--
        <el-dropdown>
          <router-link class="nav-link el-dropdown-link" to="/bangumi/news">番剧</router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link class="nav-link" to="/bangumi/rank">排行榜</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" to="/bangumi/timeline">时间轴</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" to="/bangumi/news">新番放送</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" to="/bangumi/tags">分类索引</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        -->
        <router-link class="nav-link" to="/bangumi/tags">分类</router-link>
      </nav>
      <nav class="header-right">
        <v-search :placeholder="'搜索'" :history="true"></v-search>
        <template v-if="isLogin">
          <el-dropdown class="user-section" :placement="'bottom'">
            <router-link class="el-dropdown-link" :to="`/user/${user.zone}`">
              <img class="avatar" :src="$resize(user.avatar, { width: 72, height: 72 })" :alt="user.nickname">
            </router-link>
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
  import UserApi from 'api/userApi'

  import vSearch from 'component/layouts/Search.vue'

  export default {
    name: 'v-header',
    components: {
      vSearch
    },
    data () {
      return {
        theme: 'mask',
        img: '',
        imageGrayLevel: 0,
        scrollFlag: false
      }
    },
    computed: {
      computedBg () {
        return this.img ? {
          backgroundImage: `url(${this.img})`
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
    beforeMount () {
      this.$channel.$on('change-page-background', ({ img, theme, gray }) => {
        this.img = img
        this.theme = theme
        if (!this.imageGrayLevel) {
          this.imageGrayLevel = gray
        }
      })
    },
    mounted () {
      document.addEventListener('scroll', () => {
        this.scrollFlag = window.scrollY > 200
      })
    }
  }
</script>
