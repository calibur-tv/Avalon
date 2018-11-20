<style lang="scss">
$music-width: 563px;
$music-padding: 10px;
$toggle-width: 22px;
$music-face-size: 90px;
$music-height: 115px;
$color-blue: #00bfef;
$color-gray-light: #e5e9ef;
$color-gray-bg: #edece9;
$color-gray: #99a2aa;
$color-gray-hover: #6d757a;

#music {
  width: $music-width;
  height: $music-height;
  position: fixed;
  bottom: 30px;
  background-color: #fff;
  box-shadow: 3px 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 0;
  z-index: 10;
  transition: left 0.6s ease;

  .toggle {
    width: $toggle-width;
    height: 100%;
    border-radius: 0 4px 4px 0;
    background-color: $color-blue;
    float: right;
    color: #fff;
    font-size: 20px;
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
          width: 20px;
          height: 20px;
          transition: 0.4s;
          color: $color-gray-hover;
        }

        .menu-click {
          transform: rotate(-90deg);
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
            height: 9px;
            vertical-align: middle;
            margin-left: 5px;
            padding-right: 5px;
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

  .M-allBar {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    z-index: 2;

    .vue-pwa-range-runway {
      background-color: transparent;
    }

    .vue-pwa-range-progress {
      transition: 0.4s;
    }
  }

  .M-menu {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 0;
    background-color: transparent;
    transition: height 0.8s;
    overflow: hidden;
    padding-right: $toggle-width;

    .M-menu-wrap {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .header {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 33px;
      background-color: $color-blue;
      border-radius: 0 5px 0 0;
      box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);
      z-index: 1;

      .list {
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        float: left;
        margin-left: 10px;
        margin-top: 8px;
      }

      .close {
        display: block;
        width: 20px;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        background-color: #fff;
        color: $color-blue;
        font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
        float: right;
        margin-right: 10px;
        margin-top: 6px;
      }
    }

    .body {
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);
      border-radius: 0 5px 0 0;
      height: 100%;
      padding-top: 33px;

      .title,
      .item {
        padding: 5px 10px;
      }

      .title {
        height: 30px;
        border-bottom: 1px solid $color-gray-bg;
        position: relative;
        font-size: 14px;
        color: #333;
      }

      .item {
        color: $color-gray;
        background-color: transparent;
        font-size: 13px;
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

          .iconfont {
            color: $color-gray-hover;
          }

          .play {
            margin-right: 10px;
          }
        }

        .item-left {
          position: relative;
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

        .item-right {
          width: 120px;
          float: right;
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
    font-size: 45px;
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
    content: '•';
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
  <div
    id="music"
    :class="[ open ? 'M-open' : 'M-close' ]"
  >
    <audio ref="audio"/>
    <button
      class="toggle"
      @click="musicToggle"
    >
      <i class="iconfont icon-yinle"/>
    </button>
    <div class="M-main">
      <div class="M-warp">
        <img
          :src="now.img"
          class="M-face"
        >
        <div class="M-control">
          <div class="header">
            <div class="left">
              <a>{{ now.name }}</a>
              <span class="M-dot"/>
              <a>{{ now.player }}</a>
            </div>
            <button
              :class="{ 'menu-click' : status.menuShow }"
              class="menu-btn"
              @click="status.menuShow = !status.menuShow"
            >
              <i class="iconfont icon-liebiao"/>
            </button>
          </div>
          <div class="center">
            <div class="M-play-control">
              <button
                class="sm-btn"
                @click="next(false)"
              >
                <i class="iconfont icon-svgprevious"/>
              </button>
              <button
                class="lg-btn"
                @click="handlePlayBtnClick"
              >
                <i
                  :class="[ status.playing ? 'icon-icon-' : 'icon-bofang1' ]"
                  class="iconfont"
                />
              </button>
              <button
                class="sm-btn"
                @click="next(true)"
              >
                <i class="iconfont icon-iconfontsvgnext"/>
              </button>
            </div>
            <div class="M-voice-control">
              <button
                class="sm-btn"
                @click="handleMuteBtnClick"
              >
                <i
                  :class="[ status.silent ? 'icon-jingyin' : 'icon-zengdayinliang' ]"
                  class="iconfont"
                />
              </button>
              <span class="M-all-voice">
                <v-range
                  v-model="status.voice"
                  :barsize="3"
                  :tailsize="9"
                  @rangeChangeEvent="volume"
                />
              </span>
            </div>
          </div>
          <div class="footer">
            <span>{{ time.cur }} / {{ time.all }}</span>
          </div>
        </div>
      </div>
      <span class="M-allBar">
        <v-range
          v-model="status.current"
          :max="status.duration"
          :barsize="3"
          :tailsize="0"
          :disabled="true"
        />
      </span>
    </div>
    <div
      :class="{ 'menu-show': status.menuShow }"
      class="M-menu"
    >
      <div class="M-menu-wrap">
        <div class="header">
          <h3 class="list">歌曲列表</h3>
          <button
            class="close"
            @click="status.menuShow = false"
          >&times;</button>
        </div>
        <div class="body">
          <div class="title item">
            <div class="item-right">歌手</div>
            <div class="item-left">歌曲</div>
          </div>
          <div
            v-for="(item, index) in musics"
            :key="index"
            class="item"
          >
            <div class="item-right oneline">{{ item.player }}</div>
            <div class="item-left">
              <div>
                <span
                  v-show="item.playing"
                  :class="['icon', status.playing ? 'icon-play' : 'icon-pause']"
                />
                <a
                  @click="loadSource(item)"
                >{{ item.name }}</a>
              </div>
              <div class="hover">
                <button
                  title="点击播放"
                  class="sm-btn play"
                  @click="loadSource(item)"
                >
                  <i class="iconfont icon-tongji"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vRange from '~/components/common/Range'

export default {
  components: {
    vRange
  },
  data() {
    return {
      source: [
        {
          id: 1,
          src: 'https://image.calibur.tv/owner/music/1.mp3',
          name: 'Life Is Like A Boat',
          player: 'Rie Fu',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=4251145607,2531835868&fm=85&s=A8036E93E24A56EE1AE5A153030010F3'
        },
        {
          id: 2,
          src: 'https://image.calibur.tv/owner/music/2.mp3',
          name: 'だんご大家族',
          player: '茶太',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2980366584,2187856484&fm=171&s=15982F77831E40694CD1DC7E03001039&w=121&h=91&img.JPEG&bpow=448&bpoh=252'
        },
        {
          id: 3,
          src: 'https://image.calibur.tv/owner/music/3.mp3',
          name: 'Memories',
          player: '大槻マキ',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=3414694364,2917711924&fm=85&s=5402FABE5E1261F5DA2E41640300F061'
        },
        {
          id: 4,
          src: 'https://image.calibur.tv/owner/music/4.mp3',
          name: '残酷な天使のテーゼ',
          player: '高橋洋子',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2570708825,3778744992&fm=58&bpow=932&bpoh=1067'
        },
        {
          id: 5,
          src: 'https://image.calibur.tv/owner/music/5.mp3',
          name: 'Theme of ONE PUNCH MAN',
          player: '宮崎誠',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3502363312,3220031789&fm=85&s=15C3FDA65EF29DF51C3CF938030010C3'
        },
        {
          id: 6,
          src: 'https://image.calibur.tv/owner/music/6.mp3',
          name: 'Butter-Fly',
          player: '和田光司',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3750807320,2770026803&fm=58'
        },
        {
          id: 7,
          src: 'https://image.calibur.tv/owner/music/7.mp3',
          name: '時代を越える想い',
          player: '和田薫',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3085520176,2847306273&fm=58&bpow=644&bpoh=768'
        },
        {
          id: 8,
          src: 'https://image.calibur.tv/owner/music/8.mp3',
          name: 'Continued Story',
          player: '黒石ひとみ',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3073230744,4164198060&fm=58'
        },
        {
          id: 9,
          src: 'https://image.calibur.tv/owner/music/9.mp3',
          name: 'あなたがいた森',
          player: '樹海',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2475402386,230787783&fm=58'
        },
        {
          id: 10,
          src: 'https://image.calibur.tv/owner/music/10.mp3',
          name: '翼をください ',
          player: '林原めぐみ',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1225371658,1348139348&fm=172&app=19&f=JPEG?w=121&h=91&s=DB9503C64E4636515857D7B20300D00F&bpow=400&bpoh=250'
        },
        {
          id: 11,
          src: 'https://image.calibur.tv/owner/music/11.mp3',
          name: 'secret base ~君がくれたもの~ ',
          player: '茅野愛衣',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3257225204,3825220231&fm=58'
        },
        {
          id: 12,
          src: 'https://image.calibur.tv/owner/music/12.mp3',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4023072402,3220604678&fm=58&bpow=1280&bpoh=1254',
          player: '平野绫',
          name: 'God knows...'
        },
        {
          id: 13,
          src: 'https://image.calibur.tv/owner/music/13.mp3',
          name: 'Gamble Rumble',
          player: '日本群星',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=898061995,2496832578&fm=58'
        },
        {
          id: 14,
          src: 'https://image.calibur.tv/owner/music/14.mp3',
          name: '遠い空へ',
          player: '三輪学',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=840459020,736145682&fm=58'
        },
        {
          id: 15,
          src: 'https://image.calibur.tv/owner/music/15.mp3',
          name: '雪どけのあの川の流れのように',
          player: '三枝夕夏 IN db',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2108051172,1763104311&fm=58'
        },
        {
          id: 16,
          src: 'https://image.calibur.tv/owner/music/16.mp3',
          name: 'One more time, One more chance',
          player: '山崎まさよし',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1618533673,3779234904&fm=58'
        },
        {
          id: 17,
          src: 'https://image.calibur.tv/owner/music/17.mp3',
          name: 'ヒカリ',
          player: '樹海',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3633046244,4153138975&fm=58'
        },
        {
          id: 18,
          src: 'https://image.calibur.tv/owner/music/18.mp3',
          name: '地球ぎ',
          player: '松澤由美',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3923877014,165725923&fm=58&bpow=480&bpoh=728'
        },
        {
          id: 19,
          src: 'https://image.calibur.tv/owner/music/19.mp3',
          name: 'Wind',
          player: 'Akeboshi',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3287911437,3680177977&fm=58&bpow=571&bpoh=421'
        },
        {
          id: 20,
          src: 'https://image.calibur.tv/owner/music/20.mp3',
          name: 'Brothers',
          player: '群星',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1079743037,4016790706&fm=85&s=80006FB706434AED2C29256303007078'
        },
        {
          id: 21,
          src: 'https://image.calibur.tv/owner/music/21.mp3',
          name: 'コネクト',
          player: 'ClariS',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1043104536,2579742317&fm=58'
        },
        {
          id: 22,
          src: 'https://image.calibur.tv/owner/music/22.mp3',
          name: 'Glassy Sky',
          player: 'Donna Burke',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2790305043,3258702299&fm=58'
        },
        {
          id: 23,
          src: 'https://image.calibur.tv/owner/music/23.mp3',
          name: 'My Song',
          player: 'Yui',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1802538637,158839725&fm=171&app=20&f=JPEG?w=121&h=91&s=C41AC43951767C39DC7918DA030080B4&bpow=480&bpoh=270'
        },
        {
          id: 24,
          src: 'https://image.calibur.tv/owner/music/24.mp3',
          name: 'NEXT TO YOU',
          player: 'Ken Arai',
          selected: true,
          playing: false,
          img:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1307757296,4262664801&fm=179&app=42&f=JPEG?w=150&h=150'
        },
        {
          id: 25,
          src: 'https://image.calibur.tv/owner/music/25.mp3',
          name: '町, 時の流れ, 人',
          player: 'Key Sounds Label',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1488271269,3385060447&fm=58'
        },
        {
          id: 26,
          src: 'https://image.calibur.tv/owner/music/26.mp3',
          name: 'Dear Friends',
          player: 'TRIPLANE',
          selected: true,
          playing: false,
          img:
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2627866346,475109417&fm=27&gp=0.jpg'
        },
        {
          id: 27,
          src: 'https://image.calibur.tv/owner/music/27.mp3',
          name: '世界が終るまでは…',
          player: 'WANDS',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=712966633,2295645920&fm=58'
        },
        {
          id: 28,
          src: 'https://image.calibur.tv/owner/music/28.mp3',
          name: 'again',
          player: 'Yui',
          selected: true,
          playing: false,
          img:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=3860908664,40817184&fm=85&s=EA9B6E8FC66366B45E3125670300C042'
        },
        {
          id: 29,
          src: 'https://image.calibur.tv/owner/music/29.mp3',
          name: '潮鳴り',
          player: 'Key Sounds Label',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=351792085,464043388&fm=179&app=42&f=JPEG?w=121&h=140'
        },
        {
          id: 30,
          src: 'https://image.calibur.tv/owner/music/30.mp3',
          name: '想い出は遠くの日々',
          player: '天門',
          selected: true,
          playing: false,
          img:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1618533673,3779234904&fm=58'
        }
      ],
      open: false,
      needInit: true,
      status: {
        playing: false,
        silent: false,
        menuShow: false,
        voice: 50,
        current: 0,
        duration: 0
      },
      time: {
        cur: '00:00',
        all: '00:00'
      },
      now: {},
      player: null
    }
  },
  computed: {
    musics() {
      const array = this.source.map(_ => _)
      for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i)
        ;[array[i - 1], array[j]] = [array[j], array[i - 1]]
      }

      return array
    }
  },
  mounted() {
    const audio = this.$refs.audio
    this.player = audio
    audio.volume = 0.5

    audio.addEventListener('ended', () => {
      this.status.playing = false
      this.next(true)
    })

    audio.addEventListener('durationchange', () => {
      const duration = audio.duration
      const timeArr = this.formatSeconds(duration)
      this.status.duration = duration
      this.time.all = timeArr[0]
        ? `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
        : `${timeArr[1]}:${timeArr[2]}`
    })

    audio.addEventListener('timeupdate', () => {
      const current = audio.currentTime
      const timeArr = this.formatSeconds(current)
      this.status.current = current
      this.time.cur = timeArr[0]
        ? `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
        : `${timeArr[1]}:${timeArr[2]}`
    })

    audio.addEventListener('error', () => {
      this.next(true)
    })
  },
  methods: {
    musicToggle() {
      this.open = !this.open
      if (this.needInit) {
        this.needInit = false
        this.loadSource(this.musics[0], false)
      }
    },
    next(isNext) {
      const musicCount = this.musics.length
      if (!musicCount) {
        return
      }
      const id = this.now.id
      let resultIndex = -1
      this.musics.forEach((item, index) => {
        if (item.id === id) {
          if (isNext) {
            if (index === musicCount - 1) {
              resultIndex = 0
            } else {
              resultIndex = index + 1
            }
          } else {
            if (!index) {
              resultIndex = musicCount - 1
            } else {
              resultIndex = index - 1
            }
          }
        }
      })
      if (resultIndex !== -1) {
        this.loadSource(this.musics[resultIndex])
      }
    },
    volume(val) {
      this.player.muted = !val
      this.status.voice = val
      this.player.volume = val / 100
    },
    loadSource(item, autoPlay = true) {
      if (this.now.playing !== undefined) {
        if (this.now.id === item.id) {
          return
        }
        this.now.playing = false
      }
      item.playing = true
      this.now = item
      this.player.setAttribute('src', this.now.src)
      if (autoPlay) {
        this.player.play()
        this.status.playing = true
      }
    },
    formatSeconds(second) {
      let [h, m, s] = [0, 0, 0]
      if (second > 60) {
        m = parseInt(second / 60)
        s = (second % 60).toFixed(0)
        if (m > 60) {
          h = parseInt(m / 60)
          m = parseInt(m % 60)
        }
      } else {
        s = parseInt(second)
      }
      s = s < 10 ? '0' + s : s
      m = m < 10 ? '0' + m : m
      return [h, m, s]
    },
    handleMuteBtnClick() {
      this.status.silent = !this.status.silent
      this.player.muted = !this.player.muted
    },
    handlePlayBtnClick() {
      this.status.playing = !this.status.playing
      this.player.paused ? this.player.play() : this.player.pause()
    }
  }
}
</script>
