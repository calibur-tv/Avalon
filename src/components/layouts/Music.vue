<style lang="scss">
  $music-width: 563px;
  $music-padding: 10px;
  $toggle-width: 22px;
  $music-face-size: 90px;
  $music-height : 115px;
  $color-blue: #00bfef;
  $color-gray-light: #e5e9ef;
  $color-gray-bg : #edece9;
  $color-gray: #99a2aa;
  $color-gray-hover: #6d757a;

  #music {
    width: $music-width;
    height: $music-height;
    position: fixed;
    bottom: 30px;
    background-color: #fff;
    box-shadow: 3px 1px 6px rgba(0,0,0,.25);
    border-radius: 0 4px 4px 0;
    z-index: 1;
    transition: left .6s ease;

    button {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .toggle {
      width: $toggle-width;
      height: 100%;
      border-radius: 0 4px 4px 0;
      background-color: $color-blue;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAECklEQVR4Xu2aj1EVMRCHdytQKkAqECpAKlArUCsQKxAqECpQKhAqUCsAKsAOgArW+Z6bmfjm/Ulyl+TwvcwwA8Plvdsvv/1ls3cqGz50w+OXLYCtAjacwDYFNlwAdUzQzJ6r6sNTgDt6CpjZTxHZVdW9TQVwIiKfReRUVfl90qOGAl6IyJ1H/UFVv02ZwOgACNbT4NADPxORc1X9PUUQtQC8F5GvcwGjBPzh15RgVAHgKmAXeLZk1VHDJUBU9aqnMmoCQPofE4IDFDAue8CoCSA2wwQOs0tQBqmCZzSpI6oBmDPDcxEJAb1yGvsrUoRrj1X1IpVc6XW1AQQzXFgTUDGKCCCA8kZEXs4Fgmm+ramG2gAIEFljhkeqSkBLh5mRNkA7jtSBGph7U7rKq+ZVBeBpQE6/8xRgNVdC8DmAA0IAQfBAGN0XWgBA4tfRKpyo6mnKaroi2CFIDbbMo5R5OddUB+ArygrG+c3fnzLUgGqYvzaNcoLn2lYAFlWGYdujXrhaVR26Ejhf3KjqQW6QXT0gyulghsvuh/+z0vwA5J98N7NQWO2NWUo3UcCcGaYu4Kw6DDAiFYx6wmwJgL3+R2r00XWhVMY4Q8k8Wp+hGQBXATLfpVniAYaqkD/D8XkVI+bfqipF0yijNQD29S+r3DyqDkOVyDbKD+AYoxZGrQEQ1L2IXKgqO0PyMDPUgvRRymgQmgKIzPC1iODm2ZWdmSF/qksr/YyYeg8AwQyL3dzMQnWZraR5yTUHEJnh/ZCixsxC93lQXdALQLj5g9JTnpslu8LZkPZ7LwChWzRIwl4dHg5RUhcAngYUNTh6kRn6Z8z8RFWL4yiemLx/LbnQ3fy7iBSboUNgNyhOpW4AIjO8G3LONzMAFB+TewMY7OT+FIomy9pO0yIx9gYQzJA2OGVy9jAzuk1JzZXJAfA0mHV7VHUnO/q/zyHtSZpgCNbMQrco2wy9FqBXSGVYNLqmQASBM8F1rhl6k2RfVdlSi8ZUAFRpd6UQmQqAwWaYEuykTNDlSyVI8Ax2gYfW7xY1V4CZ8ZSIYJcZF0+PinM6VwnNAPgZntI3rPiye6UlPlrPbx2QJgCirW7d/cz+P2RfT/qC6KLqAMyMd4Wy+n9DDjeTAmBmoQuce187Jf3C3C+Zqa1kUsoc7+KWPAh5VFW6x01GFQBeonJIWWd4i4IsPhiVEKsFIBxzc+/pke1xzIef626gFgAefpTImGMtZXGzMTqAAbk/qEFaSqwGgBLnv+VNsVbOH8OqAWDZ2yDLFqnLyoebqQEg9Q1RDI9eXtOcn1+F0QHwBQkFEG+AEnz3V+irAHAIPLQgHUItQNeH/h8vRXcPvFoKlLpxr3nVFNAroNzv3QLIJfa/Xf8HsXeZUPFFXZ4AAAAASUVORK5CYII=);
      float: right;
    }

    .M-main {
      padding: $music-padding;
      width: $music-width - $toggle-width;
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .M-warp {
      height: 100%;

      .M-face {
        width: $music-height - 2 * $music-padding;
        height: $music-height - 2 * $music-padding;
        margin-right: $music-padding;
        float: left;
      }

      .M-control {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        span {
          color: $color-gray;
          font-size: 12px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;

          .left {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 380px;
          }

          .menu-btn {
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAABRUlEQVRYR+2WwU3DMBiF308XKBPQDSgbMAIXnAPCoZe63MoG3YD0BOWSpBKHhgMZoRvQERgBjgjBjwJYDVUj1dUvlEb2LYrz8vy9+MWEHRm0Iz7hjUon1QyiN9PsgoAQjHwQqnGZ0iSdJUx0IEWOwAujg6sqvUqid/dZlz/wZB+kFo76Z2pRXE+mD0OAr6VMWp1PoHepVbJOdyujBek9IK6F0W9y6WwEomMwz00YjFai/7knNda8oyzdjM0kBUtCxxOVoNi8b/Q2zSIQDol4bM6D3K4wjh/bb633okc7guSeB1r1nAv/T6kzXkyo9q1IrQp/xcyr0aptjdau8IvoidAFcVSOvvQbPZGLnnKjTyPn6OUMyCj5HpXhuFTxRP+VaFXh/x4BRU/4AHzh1+qEn4Co4wvfYcf5enKAtdFUT3QjTA6TvgCUWZsh4jKUuwAAAABJRU5ErkJggg==);
            background-size: 20px;
            width: 20px;
            height: 20px;
            transition: .4s;
          }

          .menu-click {
            transform:rotate(-90deg);
          }
        }

        .center {
          flex: 1;
          display: flex;

          .M-model {
            margin-right: 20px;
          }

          .M-play-control {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-right: 20px;
          }

          .M-voice-control {
            display: flex;
            align-items: center;

            .M-all-voice {
              position: relative;
              display: inline-block;
              width: 70px;
              height: 3px;
              vertical-align: middle;
              background-color: $color-gray-light;
              cursor: pointer;
              margin-left: 5px;
            }

            .M-cur-voice {
              position: absolute;
              left: 0;
              top: 0;
              width: 35px;
              height: 3px;
              background-color: $color-blue;
            }
          }
        }
        .footer {
          text-align: right;
        }
      }
    }

    .M-curBar, .M-allBar {
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 4px;
    }

    .M-curBar {
      width: 0;
      background-color: $color-blue;
    }

    .M-allBar {
      width: 100%;
      z-index: 2;
      cursor: pointer;
    }

    .M-tip {
      position: absolute;
      bottom: 12px;
      width: 50px;
      height: 17px;
      line-height: 17px;
      font-size: 10px;
      text-align: center;
      background-color: #fff;
      border: solid 1px $color-gray-light;
      border-radius: 3px;

      em {
        border-width: 8px;
        border-color: transparent;
        border-top-color: $color-gray-light;
        border-style: dashed dashed solid;
        position: absolute;
        left: 17px;
        top: 15px;
      }
      i {
        border-width: 6px;
        border-color: transparent;
        border-top-color: #fff;
        border-style: dashed dashed solid;
        position: absolute;
        left: -6px;
        top: -8px;
      }
    }

    .M-menu {
      position: absolute;
      left: 0;
      bottom: 100%;
      width: 100%;
      height: 0;
      background-color: transparent;
      transition: height .8s;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding-right: $toggle-width;

      .header {
        height: 33px;
        background-color: $color-blue;
        padding: $music-padding;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 5px 0 0;
        box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);

        .list {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
        }

        .close {
          width: 20px;
          height: 20px;
          display: block;
          border-radius: 50%;
          background-color: #fff;
          color: $color-blue;
          font-size: 20px;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
          font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
        }
      }

      .body {
        overflow-y: auto;
        flex: 1;
        background-color: #fff;
        box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);

        >div {
          padding: 5px 10px;
        }

        .title {
          height: 30px;
          border-bottom: 1px solid $color-gray-bg;
          position: relative;
          display: flex;
          font-size: 14px;
          color: #333;

          .select {
            left: 15px;
            top: 8px;
            z-index: 5;
          }
        }
        .item {
          color: $color-gray;
          background-color: #fff;
          font-size: 13px;
          display: flex;
          height: 30px;
          line-height: 20px;
          &:hover {
            background-color: $color-gray-bg;
            color: $color-gray-hover;
            .hover {
              display: block;
            }
          }
          .hover {
            display: none;
            position: absolute;
            right: 20px;
            top: 0;
            height: 20px;
            .play {
              margin-right: 5px;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABSElEQVRYR+2WMW7CMBSG/0fYyw3gBnCD9iidUZFYMjQTLGmkMCARMdObhBvADcIN2gM0DxnVVdK6lg1OPJCMeXb85/fn34/g+SHP66MT0DnQqAOzMHpmxrAKOhFOmzTeyXcNC3jNAXqsnzTeb9K3p1YETMNo0uNyUBVQUu9jm8aHVgTMQs8OfDMw+sVA0SID9w6hyT1jdAxVMDFjma3ihW4RZxCqYALKPFsluV7AhYHbIXwJozWYx3Wa6b1Ks0qIah6Ijlkaz61ywPsWiEQLwA/VvwwCPq2TpFDVvkCfIu10NWcO6EBzBqEq0/t9FNKB//Le6i7QgaZjwJkDQgCBJ3WaaSdIt60x6CBIV82TtT8MqJoHoNyLs25bk02HVUNia7NMQmdbYJLbTYz5uQu8O6DLe9saES5Nh/eGxGTLjK5jkw9dO6YTcAZlW0kwunbEUgAAAABJRU5ErkJggg==);
            }

            .menu {
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC0UlEQVRYR91WUVLaUBQ9N6H+1h1oV6BdQXEF1RWovx2Y4gzMQH7EjxKnpNO0pP2trqC4AuIKSlcg7gA/pUlO5wKJgaIBK9VpPt/c3Hfuueee+wSP/Mkj34//F0ChYrkgNwTomjl+co+Pe7PYXhoDxYrFiQtJt+XYB9MglgKgUK7mRYwOiDOAPgV1gTwn0M39Wtly3Xo/BrIUAMWKtQfgG4kjz2nUS6X6apC79kVkIz77JwBC4OXXZqOrl41ADLoiWDPN6EWsiaUwcNtoF8u1EkQ+gjxoObarcQmAYtlqQ/CapJ/LcT8MpQPIeoZPnLSajf10zLDSZ4MOyL5OgMDwPzvvzoYsVKvrYWhcqDZaTmN7JgCA56bJvSAwfKXrTgCpRHFcIsDJEehFEepfPtino+ngeatp5ycAPJQjFspWXQSHKjYY7Eoke8qs5ifYFsj2kgHUTkRkl4y2POfY14vfVKxNg9TzjVGhS2SgWKn5gLxqNRsTAr9tFO81BSMxyZpp8nLaYrXHJC49p/GHgMejWMoFK25sRnMD0J/D3PUhMOzpaqIZog9B2zSjo0ForJrAj7TKs7Q1FwDtoUl09GKCVzpeJHoiWCewqTYLok/AFUF92u3uApEJYFT54GJ4OXGUpi9OnBjM+IDCHe+93c6qfmIM4/UJQd9r2jvTybOqUl0EgbRV6WmrzQJx44Rj9ZL86Tn2ZgJgfJ729duSFsqWtmVtegL+qgWF8niuM2iN20Dy1HNs3YZzfZkaSFbrjF0+Yb8wvqtOFqF/biuOWQDYI8SNgHNds2Pf3wUQV7zfajZO5ip9HJTJQFJlxXIFeDsruY4myO3YepcCQJMOHTDQZSJ5CHUseyLiL1p1GuDcDCxS1SKxTwfA9Ds+CPXplPL8RcpKxaptz3qOxyEJA4VyrTt8tYJXESQ/XCoP8Gk+r2nfLK+pnE+nBQ9Q7L1SPDoDvwGgOncwDjIoMgAAAABJRU5ErkJggg==);
            }
          }
          .select {
            left: 5px;
            top: 3px;
          }
        }
        .left {
          flex: 1;
          display: flex;
          padding-right: 100px;
          padding-left: 30px;
          position: relative;
          width: 380px;
          overflow: hidden;
          .icon {
            display: block;
            width: 14px;
            height: 14px;
            background-repeat: no-repeat;
            background-position: center;
            float: left;
            margin-right: 8px;
          }
          .icon-pause {
            background-image: url(data:image/gif;base64,R0lGODlhDgAOAJEAAAAAAP///0up5v///yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=);
          }
          .icon-play {
            background-image: url(data:image/gif;base64,R0lGODlhDgAOAIABAEup5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkEzQUQ5MjJEQjlBMTFFMThEMDRBNjJDNENEOTY3NjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkEzQUQ5MjFEQjlBMTFFMThEMDRBNjJDNENEOTY3NjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozMjFGRTgzMjhCREJFMTExQkI4Njk1NTQ5Q0Y0QUZDNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjFGRTgzMjhCREJFMTExQkI4Njk1NTQ5Q0Y0QUZDNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkoAAEALAAAAAAOAA4AAAIejI+pqwCMHDySybrusw8HrH2dM4omWYbomZIsq7YFACH5BAkoAAEALAAAAAAOAA4AAAIejI+py+0IwIqHKhsoztLo7oEfJEpjdJpqynHs96oFACH5BAUoAAEALAAAAAAOAA4AAAIdjI+py+0PFQBwLmtwploHC07c+I1hiYrkqaYrUAAAOw==);
          }
        }
        .right {
          width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .select {
          display: block;
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 4px;
          border: 1px solid $color-gray;
        }
        .selected {
          &:before {
            content: '';
            position: absolute;
            display: block;
            left: 2px;
            top: 2px;
            width: 7px;
            height: 7px;
            border-radius: 3px;
            background-color: $color-blue;
          }
        }
      }
    }

    .menu-show {
      height: 500px;
    }

    .lg-btn {
      width: 40px;
      height: 40px;
      font-size: 40px;
      line-height: 40px;
    }

    .sm-btn {
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 20px;
    }
  }

  .M-dot {
    margin: 0 5px;
    font-size: 12px;

    &:after {
      content: "•";
      color: $color-gray;
    }
  }

  .M-open {
    left: 0;
  }

  .M-close {
    left: -541px;
  }
</style>

<template>
  <div id="music" :class="[ open ? 'M-open' : 'M-close' ]">
    <audio ref="audio"></audio>
    <button class="toggle" @click="musicToggle"></button>
    <div class="M-main">
      <div class="M-warp">
        <img class="M-face" ref="banner">
        <div class="M-control">
          <div class="header">
            <div class="left">
              <a>{{ now.name }}</a>
              <span class="M-dot"></span>
              <a>{{ now.player }}</a>
            </div>
            <button :class="['menu-btn', status.menuShow ? 'menu-click' : '']" @click="status.menuShow = !status.menuShow"></button>
          </div>
          <div class="center">
            <div class="M-play-control">
              <button class="sm-btn" @click="next(false)">
                <i class="iconfont icon-svgprevious"></i>
              </button>
              <button class="lg-btn" ref="paused">
                <i class="iconfont" :class="[ status.playing ? 'icon-bofang1' : 'icon-icon-' ]"></i>
              </button>
              <button class="sm-btn" @click="next(true)">
                <i class="iconfont icon-iconfontsvgnext"></i>
              </button>
              <button class="sm-btn" @click="changeModel">
                <i class="iconfont" :class="`icon-${status.model}`"></i>
              </button>
            </div>
            <div class="M-voice-control">
              <button class="sm-btn" ref="muted">
                <i class="iconfont" :class="[ status.silent ? 'icon-jingyin' : 'icon-zengdayinliang' ]"></i>
              </button>
              <span class="M-all-voice" ref="allvoice">
                <span class="M-cur-voice" ref="curvoice"></span>
              </span>
            </div>
          </div>
          <div class="footer">
            <span>{{ time.cur }} / {{ time.all }}</span>
          </div>
        </div>
      </div>
      <span class="M-allBar" @mouseout="tipShow = false" ref="alltime">
        <span class="M-curBar" ref="curtime"></span>
      </span>
      <div class="M-tip" v-show="tipShow" ref="tip">{{ tipText }}<em><i></i></em></div>
    </div>
    <div :class="['M-menu', status.menuShow ? 'menu-show' : '']">
      <div class="header">
        <span class="list">歌曲列表</span>
        <span class="close" @click="status.menuShow = false">&times;</span>
      </div>
      <div class="body">
        <div class="title">
          <a :class="['select', list.length === source.length ? 'selected' : '']" @click="selectAll"></a>
          <div class="left">歌曲</div>
          <div class="right">歌手</div>
        </div>
        <div class="item" v-for="item in source">
          <div class="left">
            <a :class="['select', item.selected ? 'selected' : '']" @click="musicSelect(item)"></a>
            <div>
              <span v-show="item.playing" :class="['icon', status.playing ? 'icon-play' : 'icon-pause']"></span>
              <a @click="loadSource(item)">{{ item.name }}</a>
            </div>
            <div class="hover">
              <button title="点击播放" class="sm-btn play" @click="loadSource(item)"></button>
              <button title="加入列表" class="sm-btn menu" @click="musicSelect(item)"></button>
            </div>
          </div>
          <span class="right">{{ item.player }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        source: [
          {
            id: 1,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/2581c16ff9a07997c0a4e9d26427ff7a/5800e0ce/resource/a2/48/55/72/3743317910.aac',
            img: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1895382595,3961079290&fm=85&s=938543A65337079C1C4B73B20300F01A',
            player: 'Origa',
            name: 'Inner Universe'
          },
          {
            id: 2,
            src: 'http://ip.h5.rf03.sycdn.kuwo.cn/a818f7290b61e4ca34cb8f1c19756ec3/580cb797/resource/a3/27/73/2660804116.aac',
            img: 'http://p3.music.126.net/4hhcI_Elp8nknnvtvOekhQ==/7884597883392048.jpg?param=130y130',
            player: 'Donna Burke',
            name: 'Glassy sky'
          },
          {
            id: 3,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/96d2fba33272db6c83f6fddb6b5e91b2/580d6082/resource/a3/48/77/7/1231856582.aac',
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3532494881,3489311661&fm=58',
            player: '高橋洋子',
            name: '残酷天使的行动纲领'
          },
          {
            id: 4,
            src: 'http://ip.h5.rv03.sycdn.kuwo.cn/58e05748f597ea146dfe1ed5ba733add/580c182c/resource/a3/14/40/311454290.aac',
            img: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=401076776,2742246545&fm=85&s=AD97815ADAE2EE4D4A0FC7AC0300E04A',
            player: '山本润子',
            name: '翼をください'
          },
          {
            id: 5,
            src: 'http://ip.h5.rb03.sycdn.kuwo.cn/dc5327c29d9201f0759993a777ecf532/580cb701/resource/a2/9/4/38847848.aac',
            img: 'http://img1.kuwo.cn/star/starheads/240/93/38/518470327.jpg',
            player: '広橋真紀子',
            name: 'いのちの名前'
          },
          {
            id: 6,
            name: '時雨',
            player: '川嶋あい',
            src: 'http://ip.h5.rh03.sycdn.kuwo.cn/eb10d10a5ab966534e278b8978fabe5e/580c1a35/resource/a1/21/95/2035879402.aac',
            img: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2057334100,848181386&fm=85&s=CEF08D56532478AAD2489CC30300A0B0'
          },
          {
            id: 7,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/9a97a0eb4dcece8dfaef0c9a6952cc3a/580cb664/resource/a1/48/46/81/2196659701.aac',
            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=992590722,947736457&fm=58',
            player: 'KOKIA',
            name: 'ありがとう'
          },
          {
            id: 8,
            img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4278710545,1130476452&fm=58',
            name: 'Life Is Like A Boat',
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/9324bdb5a688bf5259d99cfd11a92ba1/580cb6bf/resource/a2/48/74/43/1754866078.aac',
            player: 'Rie fu'
          },
          {
            id: 9,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/dd6a1e1cd34206e3752bb56872f5e420/580c1c36/resource/a3/48/80/29/883227969.aac',
            img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=189055273,1230914480&fm=58',
            player: 'Lia',
            name: '鸟之诗'
          },
          {
            id: 10,
            player: '松泽由美',
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/d2d6fc3b6e08ca235964c5bd20785aab/580cb7ea/resource/a3/48/50/37/1797466515.aac',
            name: '地球仪',
            img: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2103269090,4291149936&fm=96'
          },
          {
            id: 11,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/653a1f6ee345f1f413a5af99a568ff93/580cb88e/resource/a1/57/16/4109199843.aac',
            img: 'http://img4.imgtn.bdimg.com/it/u=4283983956,3392286656&fm=21&gp=0.jpg',
            name: 'Memories',
            player: '大槻真希'
          },
          {
            id: 12,
            src: 'http://ip.h5.re03.sycdn.kuwo.cn/d595a27f4c80bd53c4fefd207b2ef6c4/580cb9a7/resource/a2/80/42/677634484.aac',
            img: 'http://img.xiami.net/images/album/img10/89610/5317001465801929_2.jpg',
            name: '歳月-云流れ-',
            player: 'Foxtail-Grass Studio'
          },
          {
            id: 13,
            name: 'One More Time，One More Chance',
            src: 'http://ip.h5.rh03.sycdn.kuwo.cn/fa6df1b7c203f6c34de201c1b969681e/580cba6e/resource/a3/46/72/3911608828.aac',
            img: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1510007095,1060268610&fm=85&s=CF846089105493DECDB72597030050AB',
            player: '山崎まさよし'
          },
          {
            id: 14,
            src: 'http://ip.h5.ra03.sycdn.kuwo.cn/f2a6a07235dcc634074ed9537d3f4e33/580cbae3/resource/a1/43/51/1936674992.aac',
            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2630152203,3669016822&fm=58',
            player: 'Key Sounds Label',
            name: '潮鳴り'
          },
          {
            id: 15,
            src: 'http://ip.h5.re03.sycdn.kuwo.cn/da76d89e6153cb7fbf75e6387508fead/580cbb31/resource/a3/61/4/1141712876.aac',
            img: 'http://img.xiami.net/images/album/img42/62242/3103841472630198_2.jpg',
            name: '町， 時の流れ， 人',
            player: 'Key Sounds Label'
          },
          {
            id: 16,
            src: 'http://ip.h5.re03.sycdn.kuwo.cn/8a2f9e789208e77aaca5730694e1cc6d/580cbb95/resource/a1/40/67/157696700.aac',
            img: 'http://img.xiami.net/images/album/img42/62242/3103841472630198_2.jpg',
            name: '空に光る',
            player: 'Key Sounds Label'
          },
          {
            id: 17,
            name: 'Gamble Rumble',
            src: 'http://ip.h5.re03.sycdn.kuwo.cn/aba5946aa5f94f23d21734ec460f60b0/580cbc9f/resource/a1/90/56/937982610.aac',
            img: 'http://img3.kuwo.cn/star/starheads/240/9/58/1999698343.jpg',
            player: 'm.o.v.e'
          }
        ],
        open: false,
        timeWidth: 541,
        voiceWidth: 70,
        tipShow: false,
        tipWidth: 25,
        tipText: '',
        init: true,
        status: {
          playing: false,
          silent: false,
          menuShow: false,
          model: 'list'
        },
        time: {
          cur: '00:00',
          all: '00:00'
        },
        now: {},
        list: []
      }
    },
    methods: {
      musicToggle () {
        this.open = !this.open
        if (this.init) {
          this.init = false
          this.loadSource(this.source[0], false)
        }
      },
      musicSelect (item) {
        if (item.id === this.now.id) return
        if (item.selected) {
          this.list.splice(this.list.indexOf(item.id), 1)
        } else {
          this.list.push(item.id)
        }
        item.selected = !item.selected
      },
      next (bool) {
        if (this.status.model === 'loop') return
        let length = this.list.length
        if (length === 0) return
        let id = this.now.id
        let i, j, now
        if (this.status.model === 'list') {
          for (i in this.list) {
            if (this.list[i] === id) { break }
          }
          now = this.list[bool ? i === length - 1 ? 0 : ++i : i === 0 ? --length : --i]
        } else {
          now = this.list[Math.floor(Math.random() * length + 1) - 1]
        }
        for (j in this.source) {
          if (this.source[j].id === now) {
            this.loadSource(this.source[j])
            break
          }
        }
      },
      selectAll () {
        let i
        if (this.list.length === this.source.length) {
          this.list = []
          for (i in this.source) {
            this.source[i].selected = false
          }
        } else {
          this.list = []
          for (i in this.source) {
            this.source[i].selected = true
            this.list.push(this.source[i].id)
          }
        }
      },
      loadSource (item, bool = true) {
        if (this.now.playing !== undefined) {
          if (this.now.id === item.id) { return }
          this.now.playing = false
        }
        item.playing = true
        this.now = item
        this.$refs.audio.setAttribute('src', this.now.src)
        this.$refs.banner.setAttribute('src', this.now.img)
        if (bool) {
          this.$refs.audio.play()
          this.status.playing = true
        }
      },
      changeModel () {
        let ret = ''
        switch (this.status.model) {
          case 'list' :
            ret = 'rand'
            this.$refs.audio.loop = false
            break
          case 'rand' :
            ret = 'loop'
            this.$refs.audio.loop = true
            break
          case 'loop' :
            ret = 'list'
            this.$refs.audio.loop = false
            break
        }
        this.status.model = ret
      },
      formatSeconds (second) {
        var minute = 0
        var hour = 0
        if (second > 60) {
          minute = parseInt(second / 60)
          second = (second % 60).toFixed(0)
          if (minute > 60) {
            hour = parseInt(minute / 60)
            minute = parseInt(minute % 60)
          }
        } else {
          second = parseInt(second)
        }
        second = second < 10 ? '0' + second : second
        minute = minute < 10 ? '0' + minute : minute
        return [hour, minute, second]
      }
    },
    mounted () {
      var vm = this
      var audio = this.$refs.audio
      audio.volume = 0.5
      audio.oncanplay = function () {
        // console.log('oncanplay : 缓冲已足够开始时');
      }
      audio.oncanplaythrough = function () {
        // console.log('oncanplaythrough : 缓冲已完成');
      }
      audio.onended = function () {
        // console.log("onended : 音乐播放完毕");
        vm.status.playing = false
        vm.next(true)
      }
      audio.ondurationchange = function () {
        // console.log('ondurationchange : 视频/音频（audio/video）的时长发生变化');
        var time = vm.formatSeconds(this.duration)
        vm.time.all = time[1] + ':' + time[2]
      }

      audio.onerror = function () {
      //                console.log('onerror');
        vm.next(true)
      }
      audio.onplay = function () {
        // console.log("onplay : 播放开始");
      }
      audio.onwaiting = function () {
        // console.log("onwaiting : 播放过程中开始缓冲");
      }
      audio.ontimeupdate = function () {
        // 当播放位置改变时
        var time = vm.formatSeconds(this.currentTime)
        vm.$refs.curtime.style.width = vm.timeWidth * this.currentTime / this.duration + 'px'
        vm.time.cur = time[1] + ':' + time[2]
      }
      audio.onplaying = function () {
        // console.log('onplaying : 播放中...');
      }
      this.$refs.muted.onclick = function () {
        vm.status.silent = !vm.status.silent
        audio.muted = !audio.muted
      }
      this.$refs.paused.onclick = function () {
        vm.status.playing = !vm.status.playing
        audio.paused ? audio.play() : audio.pause()
      }
      this.$refs.allvoice.onclick = function (e) {
        audio.volume = e.layerX / vm.voiceWidth
        vm.$refs.curvoice.style.width = e.layerX + 'px'
      }
      this.$refs.alltime.onclick = function (e) {
        vm.$refs.curtime.style.width = e.layerX + 'px'
        audio.currentTime = e.layerX / vm.timeWidth * audio.duration
      }
      this.$refs.alltime.onmousemove = function (e) {
        var time = vm.formatSeconds(audio.duration / vm.timeWidth * e.layerX)
        vm.tipShow = true
        vm.$refs.tip.style.left = e.layerX - vm.tipWidth + 'px'
        vm.tipText = time[1] + ':' + time[2]
      }
    }
  }
</script>
