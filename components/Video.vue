<style lang="scss">
  $tool-height : 40px;
  $tool-btn-width : 40px;

  .vue-pwa-video {
    box-sizing: border-box;
    overflow: hidden;
    background-color: #000;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid $color-gray-normal;
    position: relative;

    &.vue-pwa-video-flex {
      display: flex;
      flex-direction: column;

      .vue-pwa-video-box {
        flex: 1;
      }
    }

    &.vue-pwa-video-cover {
      .vue-pwa-video-tool {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    .vue-pwa-video-box {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      video {
        background-color: #000;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .vue-pwa-video-waiting {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
        width: 60px;
        height: 60px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.8);
        font-family: 'iconfont' !important;
        z-index: 1;

        &:before {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          content: '\e63a';
          font-size: 40px;
          text-align: center;
          line-height: 60px;
          color: $color-white;
          -webkit-animation: unlimited 1s infinite linear;
        }
      }

      @keyframes unlimited {
        0%{
          transform: rotate(0deg);
        }
        50%{
          transform: rotate(180deg);
        }
        100%{
          transform: rotate(360deg);
        }
      }

      @-webkit-keyframes unlimited {
        0%{
          -webkit-transform: rotate(0deg);
        }
        50%{
          -webkit-transform: rotate(180deg);
        }
        100%{
          -webkit-transform: rotate(360deg);
        }
      }

      .vue-pwa-video-init {
        position: absolute;
        width : 100%;
        height : 100%;
        left: 0;
        top: 0;
        background-color: #000;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 5;
      }

      .vue-pwa-video-debug {
        background-color: rgba(0, 0, 0, .3);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 50%;
        overflow-y: scroll;
        padding: 20px 10px;
        z-index: 4;

        p {
          color: lawngreen;
          font-weight: bold;
          font-size: 13px;
        }
      }
    }

    .vue-pwa-video-tool {
      height: $tool-height;
      background-color: $color-white;
      border-left: 1px solid $color-gray-normal;
      border-right: 1px solid $color-gray-normal;
      font-size: 13px;
      display: flex;
      z-index: 3;

      button {
        width: $tool-btn-width;
        height: 100%;
        background-size: 20px;
        transition: .3s ease-in-out;
        outline: none;
        border: none;
        cursor: pointer;
        font-family: 'iconfont' !important;
        position: relative;
        color: #99A2AA;
        background-color: $color-white;

        &:before {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          line-height: 1;
        }

        &:hover, &:active {
          background-color: $color-gray-normal;
          color: #6D757A;
        }
      }
    }

    .v-tool-full {
      position: absolute;
      bottom: 0;
      left: 0;
      border: none;
      z-index: 2147483650;
      width: 100%;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    transition: opacity .5s;
    opacity: 0
  }

  .vue-pwa-video-btn-playing:before {
    content: "\e614";
  }

  .vue-pwa-video-btn-paused:before {
    content: "\e653";
  }

  .vue-pwa-video-btn-volume:before {
    content: "\e617";
  }

  .vue-pwa-video-btn-silent:before {
    content: "\e602";
  }

  .vue-pwa-video-btn-screen:before {
    content: "\e803";
  }

  .vue-pwa-video-btn-full:before {
    content: "\e816";
  }

  .vue-pwa-video-btn-voice:hover {
    .vue-pwa-video-voice-bar {
      visibility: visible;
    }
  }

  .vue-pwa-video-voice-bar {
    background-color: $color-white;
    position: absolute;
    width: 40px;
    height: 70px;
    left: 0;
    bottom: 100%;
    border-radius: 5px 5px 0 0;
    border-top: 1px solid $color-gray-normal;
    border-left: 1px solid $color-gray-normal;
    border-right: 1px solid $color-gray-normal;
    padding: 15px 0;
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    visibility: hidden;

    &:hover {
      visibility: visible;
    }
  }

  .vue-pwa-video-time {
    background-color: $color-white;
    width: $tool-btn-width;
    height: 100%;
    color: $color-text-light;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .vue-pwa-video-progress-bar {
    background-color: $color-white;
    box-sizing: border-box;
    height: 100%;
    margin: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<template>
  <div class="vue-pwa-video"
       :class="[ cover ? 'vue-pwa-video-cover' : 'vue-pwa-video-flex' ]"
       ref="box">
    <div class="vue-pwa-video-box"
         ref="mask"
         @click.stop="screenclick ? handlePlay() : ''"
         @dblclick="screenclick ? screen() : ''"
         @mousemove="tool">
      <video :preload="auto ? 'auto' : 'metadata'"
             :autoplay="auto"
             ref="video">
      </video>
      <div class="vue-pwa-video-init"
           v-if="state.init">
      </div>
      <div class="vue-pwa-video-waiting"
           v-show="state.waiting">
      </div>
      <div class="vue-pwa-video-error"
           v-show="state.error">
      </div>
      <div class="vue-pwa-video-debug"
           v-if="debug">
        <p v-for="txt in logs" v-text="txt"></p>
      </div>
    </div>
    <transition name="fade">
      <div v-show="state.showTool"
           class="vue-pwa-video-tool"
           :class="{ 'v-tool-full' : state.isFull }">
        <button :class="[ state.playing ? 'vue-pwa-video-btn-playing' : 'vue-pwa-video-btn-paused' ]"
                @click="handlePlay()">
        </button>
        <div class="vue-pwa-video-time">
          <span v-text="value.curTime"></span>
        </div>
        <div class="vue-pwa-video-progress-bar">
          <v-range v-model="value.playing"
                   :loading="value.loading"
                   :max="value.duration"
                   @rangeChangeEvent="handleSeek"
          ></v-range>
        </div>
        <div class="vue-pwa-video-time">
          <span v-text="value.allTime"></span>
        </div>
        <button class="vue-pwa-video-btn-voice"
                :class="[ value.voice ? 'vue-pwa-video-btn-volume' : 'vue-pwa-video-btn-silent' ]"
                @click="handleMuted"
                v-if="showvioce">
          <div class="vue-pwa-video-voice-bar">
            <v-range v-model="value.voice"
                     @rangeChangeEvent="volume"
                     :vertical="true"
            ></v-range>
          </div>
        </button>
        <button :class="[ state.isFull ? 'vue-pwa-video-btn-full' : 'vue-pwa-video-btn-screen' ]"
                @click="screen">
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
  import vRange from '~/components/base/range.vue'

  export default {
    name: 'v-video',
    components: {
      vRange
    },
    props: {
      lang: {
        default: 'zh'
      },
      p: {
        default: '720'
      },
      source: {
        default: '',
        required: true
      },
      sourceissrc: {
        type: Boolean,
        default: false
      },
      info: {
        type: String
      },
      poster: {
        type: String
      },
      auto: {
        type: Boolean,
        default: false
      },
      keyboard: {
        type: Boolean,
        default: true
      },
      cover: {
        type: Boolean,
        default: false
      },
      loading: {
        type: String
      },
      screenclick: {
        type: Boolean,
        default: true
      },
      showvioce: {
        type: Boolean,
        default: true
      },
      debug: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        video: null,
        state: {
          playing: false,
          isMuted: false,
          isFull: false,
          showTool: true,
          waiting: true,
          firstPlay: true,
          init: true,
          ended: false,
          seeking: false,
          error: false,
          progressive: []
        },
        value: {
          duration: 0,
          loading: 0,
          playing: 0,
          curTime: '00:00',
          allTime: '00:00',
          voiceTemp: 0,
          voice: 60,
          timer: null
        },
        logs: []
      }
    },
    beforeMount () {
      if (this.auto) {
        this.state.playing = true
        this.state.firstPlay = false
      }
      this.computedProgressive()
    },
    methods: {
      initVideo () {
        this.video.innerHTML = ''
        this.video.load()
        this.state = {
          playing: false,
          isMuted: false,
          isFull: false,
          showTool: true,
          waiting: true,
          firstPlay: true,
          init: true,
          ended: false,
          seeking: false,
          error: false,
          progressive: []
        }
        this.value = {
          duration: 0,
          loading: 0,
          playing: 0,
          curTime: '00:00',
          allTime: '00:00',
          voiceTemp: 0,
          voice: 60,
          timer: null
        }
        this.computedProgressive()
        this.loadResource()
      },
      computedProgressive () {
        if (!this.sourceissrc) {
          for (const p in this.source.video) {
            this.state.progressive.push(p)
          }
          this.p = this.state.progressive[0]
        }
      },
      handlePlay () {
        if (this.state.waiting) return
        if (this.video.paused) {
          this.video.play()
          this.state.playing = true
          this.$emit('playing')
        } else {
          this.video.pause()
          this.state.playing = false
        }
      },
      volume (val) {
        this.video.muted = !val
        this.value.voice = val
        this.video.volume = val / 100
      },
      handleMuted () {
        if (this.state.isMuted) {
          this.video.muted = false
          this.value.voice = this.value.voiceTemp
          this.video.volume = this.value.voice / 100
          this.state.isMuted = false
        } else {
          this.video.muted = true
          this.value.voiceTemp = this.value.voice
          this.value.voice = 0
          this.state.isMuted = true
        }
      },
      handleSeek (val) {
        this.video.currentTime = val
        if (this.video.paused) {
          this.handlePlay()
        }
      },
      tool () {
        if (this.state.isFull && !this.state.showTool) {
          this.state.showTool = true
          this.value.timer = setTimeout(() => {
            if (this.state.isFull) {
              this.state.showTool = false
            }
          }, 5000)
        }
      },
      screen () {
        if (this.checkIsFullScreen()) {
          this.exitFullScreen()
        } else {
          this.launchFullScreen(this.$refs.mask)
        }
      },
      screenToggle () {
        this.state.isFull = this.checkIsFullScreen() === true
        this.state.showTool = true
        this.$refs.box.style.width = '100%'
        this.$refs.box.style.height = '100%'
        this.$refs.mask.style.width = '100%'
        if (this.state.isFull) {
          this.value.timer = setTimeout(() => {
            if (this.state.isFull) {
              this.state.showTool = false
            }
            clearTimeout(this.value.timer)
          }, 5000)
        } else {
          clearTimeout(this.value.timer)
          this.state.showTool = true
        }
      },
      exitFullScreen () {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.oRequestFullscreen) {
          document.oCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else {
          document.IsFullScreen = false
        }
      },
      launchFullScreen (e) {
        if (e.requestFullscreen) {
          e.requestFullscreen()
        } else if (e.mozRequestFullScreen) {
          e.mozRequestFullScreen()
        } else if (e.msRequestFullscreen) {
          e.msRequestFullscreen()
        } else if (e.oRequestFullscreen) {
          e.oRequestFullscreen()
        } else if (e.webkitRequestFullscreen) {
          e.webkitRequestFullScreen()
        } else {
          document.IsFullScreen = true
        }
      },
      checkIsFullScreen () {
        return this.invokeFieldOrMethod(document, 'FullScreen') || this.invokeFieldOrMethod(document, 'IsFullScreen') || document.IsFullScreen
      },
      invokeFieldOrMethod (ele, method) {
        let usablePrefixMethod;

        ['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
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
      debugLog (log) {
        if (this.debug) {
          console.log(log)        // eslint-disable-line
          console.log(this.state) // eslint-disable-line
          this.logs.push(log + JSON.stringify(this.state))
        }
      },
      loadResource () {
        this.video.src = ''
        this.video.load()
        this.video.src = this.sourceissrc ? this.source : `${this.$cdn}${this.source.video[this.p].src}`
        this.video.load()
      }
    },
    mounted () {
      this.video = this.$refs.video
      const self = this
      const video = self.$refs.video
      video.volume = self.value.voice / 100
      video.controls = false
      self.loadResource()

      video.addEventListener('abort', function () {
        self.debugLog('abort : 音频/视频的加载已放弃时 | 在退出时运行')
      })

      video.addEventListener('canplaythrough', function () {
        self.debugLog('canplaythrough : 媒体可以在保持当前的下载速度的情况下不被中断地播放完毕')
        self.state.waiting = false
        if (self.state.firstPlay) {
          self.state.init = false
        } else {
          if (this.paused) {
            self.handlePlay()
          }
        }
      })

      video.addEventListener('emptied', function () {
        self.debugLog('emptied : 目前的播放列表为空时 | 发生故障并且文件突然不可用时运')
      })

      video.addEventListener('error', function () {
        self.debugLog('error : 在发生错误时触发')
        self.state.error = true
      })

      video.addEventListener('loadeddata', function () {
        self.debugLog('loadeddata : 媒体的第一帧已经加载完毕')
      })

      video.addEventListener('loadedmetadata', function () {
        self.debugLog('loadedmetadata : 媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效信息')
        let duration = this.duration
        let timeArr = self.formatSeconds(duration)
        self.value.duration = duration
        self.value.allTime = timeArr[1] + ':' + timeArr[2]
      })

      video.addEventListener('loadstart', function () {
        self.debugLog('loadstart : 媒体开始加载')
      })

      video.addEventListener('mozaudioavailable', function () {
        self.debugLog('mozaudioavailable')
      })

      video.addEventListener('play', function () {
        self.debugLog('play : 在媒体回放被暂停后再次开始时触发')
        self.state.ended = false
      })

      video.addEventListener('pause', function () {
        self.debugLog('pause : 播放暂停时触发')
        if (!this.seeking) {
          self.state.playing = false
        }
        if (self.state.firstPlay) {
          this.play()
        }
      })

      video.addEventListener('playing', function () {
        self.debugLog('playing : 在媒体开始播放时触发')
        self.state.firstPlay = false
        self.state.playing = true
      })

      video.addEventListener('ratechange', function () {
        self.debugLog('ratechange : 在回放速率变化时触发')
      })

      video.addEventListener('seeked', function () {
        self.debugLog('seeked : 在跳跃操作完成时触发')
        self.state.seeking = false
        if (this.paused && !self.state.ended) {
          setTimeout(() => {
            if (!self.state.seeking) {
              this.play()
            }
          }, 400)
        }
      })

      video.addEventListener('seeking', function () {
        self.debugLog('seeking : 在跳跃操作开始时触发')
        self.state.seeking = true
        if (!this.paused && !self.state.ended && !self.state.firstPlay) {
          setTimeout(() => {
            if (self.state.seeking) {
              this.pause()
            }
          }, 400)
        }
      })

      video.addEventListener('stalled', function () {
        self.debugLog('stalled : 浏览器尝试获取媒体数据，但数据不可用时 | 浏览器不论何种原因未能取回媒介数据')
      })

      video.addEventListener('suspend', function () {
        self.debugLog('suspend : 在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停')
      })

      video.addEventListener('volumechange', function () {
        self.debugLog('volumechange : 在音频音量改变时触发')
      })

      video.addEventListener('canplay', function () {
        self.debugLog('canplay : 缓冲已足够开始时')
      })

      video.addEventListener('durationchange', function () {
        self.debugLog('durationchange : 视频/音频（audio/video）的时长发生变化')
        let duration = this.duration
        let timeArr = self.formatSeconds(duration)
        self.value.duration = duration
        self.value.allTime = timeArr[1] + ':' + timeArr[2]
      })

      video.addEventListener('waiting', function () {
        self.debugLog('waiting : 在一个待执行的操作（如回放）因等待另一个操作（如跳跃或下载）被延迟时触发')
        self.state.waiting = true
      })

      video.addEventListener('timeupdate', function () {
        self.debugLog('timeupdate : 元素的currentTime属性表示的时间已经改变')
        let current = this.currentTime
        let timeArr = self.formatSeconds(current)
        self.value.playing = current
        self.value.curTime = timeArr[1] + ':' + timeArr[2]
      })

      video.addEventListener('progress', function () {
        self.debugLog('progress : 正在下载视频')
        let bf = this.buffered
        if (this.duration > 0 && bf.length) {
          self.value.loading = bf.end(bf.length - 1)
        }
      })

      video.addEventListener('ended', function () {
        self.debugLog('ended : 播放完毕')
        self.value.playing = 0
        self.state.playing = false
        self.state.ended = true
        if (!this.paused) {
          this.pause()
        }
      })

      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 32) {
          if (self.keyboard && self.checkIsFullScreen()) {
            e.preventDefault()
            e.stopPropagation()
            self.handlePlay()
          }
        } else if (e.keyCode === 40) {
          if (self.checkIsFullScreen()) {
            let down = self.value.voice - 10
            video.volume = down >= 0 ? down / 100 : 0
            self.value.voice = down >= 0 ? down : 0
          }
        } else if (e.keyCode === 38) {
          if (self.checkIsFullScreen()) {
            let up = self.value.voice + 10
            video.volume = up >= 100 ? 1 : up / 100
            self.value.voice = up >= 100 ? 100 : up
          }
        } else if (e.keyCode === 39) {
          video.currentTime += 5
        } else if (e.keyCode === 37) {
          video.currentTime -= 5
        }
      })

      document.addEventListener('fullscreenchange', function () {
        self.screenToggle()
      })

      document.addEventListener('mozfullscreenchange', function () {
        self.screenToggle()
      })

      document.addEventListener('webkitfullscreenchange', function () {
        self.screenToggle()
      })

      document.addEventListener('msfullscreenchange', function () {
        self.screenToggle()
      })
    }
  }
</script>
