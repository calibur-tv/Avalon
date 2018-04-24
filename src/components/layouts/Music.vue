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

    .toggle {
      width: $toggle-width;
      height: 100%;
      border-radius: 0 4px 4px 0;
      background-color: $color-blue;
      float: right;
      color: #fff;
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
            transition: .4s;
            color: $color-gray-hover;
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
          font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          float: right;
          margin-right: 10px;
          margin-top: 6px;
        }
      }

      .body {
        overflow-y: auto;
        background-color: #fff;
        box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);
        height: 100%;
        padding-top: 33px;

        .title, .item {
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
          background-color: #fff;
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

          .item-select {
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 4px;
            border: 1px solid $color-gray;
            float: left;
            margin-top: 3px;
            margin-right: 5px;
          }

          .item-selected {
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
    <button class="toggle" @click="musicToggle">
      <i class="iconfont icon-yinle"></i>
    </button>
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
            <button class="menu-btn" :class="{ 'menu-click' : status.menuShow }" @click="status.menuShow = !status.menuShow">
              <i class="iconfont icon-liebiao"></i>
            </button>
          </div>
          <div class="center">
            <div class="M-play-control">
              <button class="sm-btn" @click="next(false)">
                <i class="iconfont icon-svgprevious"></i>
              </button>
              <button class="lg-btn" @click="handlePlayBtnClick" ref="paused">
                <i class="iconfont" :class="[ status.playing ? 'icon-icon-' : 'icon-bofang1' ]"></i>
              </button>
              <button class="sm-btn" @click="next(true)">
                <i class="iconfont icon-iconfontsvgnext"></i>
              </button>
              <button class="sm-btn" @click="changeModel">
                <i class="iconfont" :class="`icon-${status.model}`"></i>
              </button>
            </div>
            <div class="M-voice-control">
              <button class="sm-btn" @click="handleMuteBtnClick" ref="muted">
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
    <div class="M-menu" :class="{ 'menu-show': status.menuShow }">
      <div class="M-menu-wrap">
        <div class="header">
          <h3 class="list">歌曲列表</h3>
          <button class="close" @click="status.menuShow = false">&times;</button>
        </div>
        <div class="body">
          <div class="title item">
            <div class="item-right">歌手</div>
            <div class="item-left">
              <a class="item-select" :class="{ 'item-selected': list.length === source.length }" @click="selectAll"></a>
              歌曲
            </div>
          </div>
          <div class="item" v-for="item in source">
            <div class="item-right oneline">{{ item.player }}</div>
            <div class="item-left">
              <a class="item-select" :class="{ 'item-selected': item.selected }" @click="musicSelect(item)"></a>
              <div>
                <span v-show="item.playing" :class="['icon', status.playing ? 'icon-play' : 'icon-pause']"></span>
                <a @click="loadSource(item)">{{ item.name }}</a>
              </div>
              <div class="hover">
                <button title="点击播放" class="sm-btn play" @click="loadSource(item)">
                  <i class="iconfont icon-tongji"></i>
                </button>
                <button title="加入列表" class="sm-btn menu" @click="musicSelect(item)">
                  <i class="iconfont icon-tubiaozhizuomoban"></i>
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
          }
        ],
        open: false,
        timeWidth: 541,
        voiceWidth: 70,
        tipShow: false,
        tipWidth: 25,
        tipText: '',
        needInit: true,
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
        list: [],
        player: null
      }
    },
    methods: {
      musicToggle () {
        this.open = !this.open
        if (this.needInit) {
          this.needInit = false
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
      loadSource (item, autoPlay = true) {
        if (this.now.playing !== undefined) {
          if (this.now.id === item.id) {
            return
          }
          this.now.playing = false
        }
        item.playing = true
        this.now = item
        this.$refs.audio.setAttribute('src', this.now.src)
        this.$refs.banner.setAttribute('src', this.now.img)
        if (autoPlay) {
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
      handleMuteBtnClick () {
        this.status.silent = !this.status.silent
        this.player.muted = !this.player.muted
      },
      handlePlayBtnClick () {
        this.status.playing = !this.status.playing
        this.player.paused ? this.player.play() : this.player.pause()
      }
    },
    mounted () {
      var vm = this
      const audio = this.$refs.audio
      this.player = audio
      audio.volume = 0.5

      audio.addEventListener('canplay', () => {
        console.log('oncanplay : 缓冲已足够开始时')
      })

      audio.addEventListener('canplaythrough', () => {
        console.log('oncanplaythrough : 缓冲已完成')
      })

      audio.addEventListener('ended', () => {
        this.status.playing = false
        this.next(true)
      })

      audio.addEventListener('durationchange', () => {
        const timeArr = vm.formatSeconds(this.duration)
        this.time.all = timeArr[0]
          ? `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
          : `${timeArr[1]}:${timeArr[2]}`
      })

      audio.addEventListener('error', () => {
        this.next(true)
      })

      audio.addEventListener('play', () => {
        console.log('onplay : 播放开始')
      })

      audio.addEventListener('waiting', () => {
        console.log('onwaiting : 播放过程中开始缓冲')
      })

      audio.addEventListener('timeupdate', () => {
        const timeArr = this.formatSeconds(this.currentTime)
        this.$refs.curtime.style.width = this.timeWidth * this.currentTime / this.duration + 'px'
        this.time.cur = timeArr[0]
          ? `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
          : `${timeArr[1]}:${timeArr[2]}`
      })

      audio.addEventListener('playing', () => {
        console.log('onplaying : 播放中...')
      })

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
