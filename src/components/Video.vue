<style lang="scss">
$tool-height: 40px;
$tool-btn-width: 40px;

.vue-pwa-video {
  box-sizing: border-box;
  width: 100%;
  height: 460px !important;
  position: relative;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  min-height: 400px;
  background-color: #000;
  z-index: 0;

  #video-wrap {
    width: 100%;
    height: 100%;
  }

  .not-play-screen {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    z-index: 999;
    overflow: hidden;

    p {
      width: 100%;
      margin-top: 150px;
      line-height: 24px;
    }

    a {
      display: inline-block;
      border-radius: 5px;
      border: 1px solid #fff;
      padding: 10px 15px;
      margin: 20px 8px 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  container {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  video {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #000;
    cursor: pointer;
  }

  .hidden-cursor {
    cursor: none;
  }

  video:focus,
  video:active {
    outline: none;
  }

  chimee-control {
    overflow: visible !important;
    visibility: visible !important;
  }

  chimee-control-wrap {
    width: 100%;
    height: 40px;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }

  .chimee-control-fixed container chimee-control chimee-control-wrap {
    bottom: -40px !important;
  }

  chimee-progresstime {
    color: $color-text-light !important;
    font-size: 13px;
    margin-right: 10px;
  }

  chimee-volume-bar {
    margin-top: -2px;
  }

  chimee-next {
    margin-left: 10px;
    margin-right: 5px;

    i {
      color: #99a2aa;
      font-size: 24px;

      &:hover {
        color: #6d757a;
      }
    }
  }

  chimee-progressbar-all,
  chimee-volume-bar-all {
    background-color: $color-blue-normal !important;
  }

  chimee-progressbar-buffer {
    background-color: $color-blue-light;
  }

  chimee-progressbar-ball,
  chimee-volume-bar-all:after {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    width: 14px !important;
    height: 14px !important;
  }

  .chimee-progressbar-line,
  chimee-volume-bar-bg,
  chimee-volume-bar-all {
    height: 6px !important;
    border-radius: 4px;
  }

  chimee-center-state-loading {
    box-sizing: content-box;
  }

  chimee-volume-bar-all:after {
    top: -4px;
  }

  chimee-progressbar-tip {
    background-color: $color-gray-normal;
    color: #6b6b6b;
    font-size: 12px;
  }

  chimee-playbackrate {
    width: 3em !important;
    margin-left: -5px;
    margin-right: 10px;
    padding: 0;

    chimee-playbackrate-text {
      color: #6b6b6b;
    }
  }

  chimee-control-state {
    margin-right: 0;
  }

  chimee-volume-state {
    margin-right: 4px;
  }

  chimee-progressbar-bg,
  chimee-volume-bar-bg {
    background-color: $color-gray-normal !important;
  }

  chimee-center-state-error {
    color: #fff !important;
    font-size: 16px !important;
    text-shadow: none;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="vue-pwa-video">
    <div
      v-if="!source"
      class="not-play-screen"
    >
      <p>这个资源消失了_〆(´Д｀ )</p>
    </div>
    <div
      v-else-if="otherSrc"
      class="not-play-screen"
    >
      <p>应版权方要求 (⇀‸↼‶)，该视频暂不提供站内播放</p>
      <a
        :href="source"
        target="_blank"
      >播放链接</a>
    </div>
    <div
      v-else-if="isGuest"
      class="not-play-screen"
    >
      <p>流量压力太大了 (ಥ_ಥ)，需要登录才能看番</p>
      <a @click="$channel.$emit('sign-in')">立即登录</a>
    </div>
    <div
      v-else-if="blocked"
      class="not-play-screen"
    >
      <p>
        由于你消耗的视频流量过高，被系统判定为机器人恶意攻击，已被禁止看视频功能
        <br>
        如果看到这条信息，代表你不是机器人，那么请加官方QQ群，帮你解禁
      </p>
      <a
        href="https://www.calibur.tv/post/2282"
        target="_blank"
      >&nbsp;&nbsp;为什么要限流？</a>
      <a
        href="/about/hello"
        target="_blank"
      >查看加群方式</a>
    </div>
    <div
      v-else-if="mustReward"
      class="not-play-screen"
    >
      <p>
        由于站内视频流量过大，站长资金难以维持，该视频需要投食之后才能播放
        <br>
        团子可通过签到等方式获得
      </p>
      <a
        href="https://www.calibur.tv/post/2282"
        target="_blank"
      >&nbsp;&nbsp;为什么要限流？</a>
      <a
        href="/about/hello"
        target="_blank"
      >&nbsp;&nbsp;什么是团子？</a>
    </div>
    <div
      v-else-if="showLevelThrottle"
      class="not-play-screen"
    >
      <p>
        由于站内视频流量过大，站长资金难以维持，该视频需要你的等级至少 {{ needMinLevel }} 才能播放
      </p>
      <a
        href="https://www.calibur.tv/post/2282"
        target="_blank"
      >&nbsp;&nbsp;为什么要限流？</a>
      <a
        href="https://www.calibur.tv/post/2279"
        target="_blank"
      >&nbsp;&nbsp;如何升级？</a>
    </div>
    <div
      v-else
      id="video-wrap"
      :class="[isFull ? '' : 'chimee-control-fixed']"
    />
  </div>
</template>

<script>
import Chimee from 'chimee'
import chimeePluginControlbar from 'chimee-plugin-controlbar'

export default {
  name: 'VVideo',
  props: {
    source: {
      type: [String, Object],
      default: '',
      required: true
    },
    otherSrc: {
      type: Boolean,
      required: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    cover: {
      type: Boolean,
      default: false
    },
    screenclick: {
      type: Boolean,
      default: true
    },
    showvioce: {
      type: Boolean,
      default: true
    },
    next: {
      type: String,
      default: ''
    },
    debug: {
      type: Boolean,
      default: false
    },
    isGuest: {
      required: true,
      type: Boolean
    },
    blocked: {
      required: true,
      type: Boolean
    },
    poster: {
      type: String,
      default: ''
    },
    mustReward: {
      type: Boolean,
      default: false
    },
    needMinLevel: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      player: null,
      notMove: false,
      timer: 0,
      isFull: false
    }
  },
  computed: {
    isFlv() {
      return (
        this.source
          .split('?')[0]
          .split('.')
          .pop()
          .toLowerCase() === 'flv'
      )
    },
    showLevelThrottle() {
      if (this.$store.state.login) {
        return this.$store.state.user.exp.level < this.needMinLevel
      }
      return true
    }
  },
  mounted() {
    if (this.otherSrc || this.isGuest) {
      return
    }
    if (this.showLevelThrottle || this.mustReward) {
      return
    }
    Chimee.install(chimeePluginControlbar)
    import('chimee-plugin-center-state').then(chimeePluginCenterState => {
      Chimee.install(chimeePluginCenterState)
      if (this.isFlv) {
        import('chimee-kernel-flv').then(module => {
          this.initVideo({
            flvKernel: module,
            statePlugin: chimeePluginCenterState
          })
        })
      } else {
        this.initVideo({
          flvKernel: null,
          statePlugin: chimeePluginCenterState
        })
      }
    })
  },
  methods: {
    initVideo({ flvKernel, statePlugin }) {
      const self = this
      this.player = new Chimee({
        wrapper: '#video-wrap',
        src: this.source,
        poster: this.poster,
        controls: true,
        autoplay: false,
        kernels: flvKernel ? { flv: flvKernel } : {},
        noDefaultContextMenu: true,
        plugin: [
          {
            name: chimeePluginControlbar.name,
            majorColor: '#99a2aa',
            hoverColor: '#6d757a',
            children: self.next
              ? {
                  play: true,
                  next: {
                    tag: 'chimee-next',
                    html: `<i class="iconfont icon-skip_next"></i>`,
                    event: {
                      click() {
                        window.location = self.next
                      }
                    }
                  },
                  progressBar: {
                    layout: 'one-line'
                  },
                  progressTime: true,
                  volume: true,
                  playbackrate: {
                    list: [
                      { name: '0.5', value: 0.5 },
                      { name: '1.0', value: 1, default: true },
                      { name: '1.2', value: 1.2 },
                      { name: '2.0', value: 2 }
                    ]
                  },
                  screen: true
                }
              : {
                  play: true,
                  progressBar: {
                    layout: 'one-line'
                  },
                  progressTime: true,
                  volume: true,
                  playbackrate: {
                    list: [
                      { name: '0.5', value: 0.5 },
                      { name: '1.0', value: 1, default: true },
                      { name: '1.2', value: 1.2 },
                      { name: '2.0', value: 2 }
                    ]
                  },
                  screen: true
                }
          },
          {
            name: statePlugin.name
          }
        ]
      })

      this.player.on('playing', () => {
        this.$emit('playing')
      })

      document.addEventListener('fullscreenchange', () => {
        this.handleFullScreen()
      })
      document.addEventListener('mozfullscreenchange', () => {
        this.handleFullScreen()
      })
      document.addEventListener('webkitfullscreenchange', () => {
        this.handleFullScreen()
      })
      document.addEventListener('msfullscreenchange', () => {
        this.handleFullScreen()
      })
    },
    cursorMoveFunc() {
      this.notMove = false
      document
        .getElementsByTagName('video')[0]
        .classList.remove('hidden-cursor')
    },
    handleFullScreen() {
      const isFull = this.checkIsFullScreen()
      this.isFull = isFull
      const video = document.getElementsByTagName('video')[0]
      if (isFull) {
        document.body.addEventListener('mousemove', this.cursorMoveFunc)
        setInterval(() => {
          this.notMove = true
          setTimeout(() => {
            if (this.notMove && this.checkIsFullScreen()) {
              video.classList.add('hidden-cursor')
            }
          }, 1000)
        }, 2000)
      } else {
        video.classList.remove('hidden-cursor')
        document.body.removeEventListener('mousemove', this.cursorMoveFunc)
        if (this.timer) {
          clearInterval(this.timer)
        }
      }
    },
    checkIsFullScreen() {
      return !!(
        this.invokeFieldOrMethod(document, 'FullScreen') ||
        this.invokeFieldOrMethod(document, 'IsFullScreen') ||
        document.IsFullScreen
      )
    },
    invokeFieldOrMethod(ele, method) {
      let usablePrefixMethod
      ;['webkit', 'moz', 'ms', 'o', ''].forEach(function(prefix) {
        if (usablePrefixMethod) return
        if (prefix === '') {
          method = method.slice(0, 1).toLowerCase() + method.slice(1)
        }
        let typePrefixMethod = typeof ele[prefix + method]
        if (typePrefixMethod + '' !== 'undefined') {
          if (typePrefixMethod === 'function') {
            usablePrefixMethod = ele[prefix + method]()
          } else {
            usablePrefixMethod = ele[prefix + method]
          }
        }
      })
      return usablePrefixMethod
    }
  }
}
</script>
