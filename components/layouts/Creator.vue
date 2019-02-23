<style lang="scss">
#creator-button-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 12;

  .mint-palette-button {
    position: absolute;
    bottom: 260px;
    right: 60px;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    pointer-events: auto;
  }

  .mint-main-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: RGB(152, 155, 162);
    background-color: RGB(225, 226, 229);

    &:hover {
      background-color: RGB(205, 206, 207);
      color: RGB(255, 255, 255);
    }
  }

  .mint-palette-button-active {
    animation: mint-zoom 0.5s ease-in-out;
  }

  .mint-sub-button-container .creator-btn {
    position: absolute;
    top: 7px;
    left: 7px;
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease-in-out;
  }

  @keyframes mint-zoom {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(1.1);
    }
    30% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.95);
    }
    90% {
      transform: scale(1.01);
    }
    100% {
      transform: scale(1);
    }
  }

  .creator-btn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    pointer-events: auto;
    color: #fff;
    font-size: 14px;
  }
}
</style>

<template>
  <div id="creator-button-wrap">
    <div class="creator-button-box">
      <div
        :class="{
          expand: expanded,
          'mint-palette-button-active': transforming
        }"
        class="mint-palette-button"
        @animationend="onMainAnimationEnd"
        @webkitAnimationEnd="onMainAnimationEnd"
        @mozAnimationEnd="onMainAnimationEnd"
      >
        <div class="mint-sub-button-container" @click="collapse">
          <slot />
        </div>
        <el-tooltip placement="right" effect="dark" content="创作">
          <button
            :style="mainButtonStyle"
            class="mint-main-button"
            @click="toggle"
          >
            <i class="el-icon-edit-outline" />
          </button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtPaletteButton',
  props: {
    offset: {
      type: Number, // 扇面偏移角，默认是四分之π，配合默认方向lt
      default: Math.PI / 5
    },
    direction: {
      type: String,
      default: 'lt' // lt t rt this.radius rb b lb l 取值有8个方向，左上、上、右上、右、右下、下、左下、左，默认为左上
    },
    radius: {
      type: Number,
      default: 90
    },
    mainButtonStyle: {
      type: String, // 应用到 mint-main-button 上的 class
      default: ''
    }
  },
  data: function() {
    return {
      transforming: false, // 是否正在执行动画
      expanded: false // 是否已经展开子按钮
    }
  },
  mounted() {
    this.slotChildren = []
    for (let i = 0; i < this.$slots.default.length; i++) {
      if (this.$slots.default[i].elm.nodeType !== 3) {
        this.slotChildren.push(this.$slots.default[i])
      }
    }
    let css = ''
    let directionArc =
      (Math.PI *
        (3 +
          Math.max(
            ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'].indexOf(
              this.direction
            ),
            0
          ))) /
      4
    for (let i = 0; i < this.slotChildren.length; i++) {
      const arc =
        ((Math.PI - this.offset * 2) / (this.slotChildren.length - 1)) * i +
        this.offset +
        directionArc
      const x = (Math.cos(arc) * this.radius).toFixed(2)
      const y = (Math.sin(arc) * this.radius).toFixed(2)
      css +=
        '.expand .palette-button-' +
        this._uid +
        '-sub-' +
        i +
        '{transform:translate(' +
        x +
        'px,' +
        y +
        'px) rotate(720deg);transition-delay:' +
        0.03 * i +
        's}'
      this.slotChildren[i].elm.className +=
        ' palette-button-' + this._uid + '-sub-' + i
    }
    this.styleNode = document.createElement('style')
    this.styleNode.type = 'text/css'
    this.styleNode.rel = 'stylesheet'
    this.styleNode.title = 'palette button style'
    this.styleNode.appendChild(document.createTextNode(css))
    document.getElementsByTagName('head')[0].appendChild(this.styleNode)
  },
  destroyed() {
    if (this.styleNode) {
      this.styleNode.parentNode.removeChild(this.styleNode)
    }
  },
  methods: {
    toggle(event) {
      if (this.transforming) {
        return
      }
      this.expanded ? this.collapse(event) : this.expand(event)
    },
    onMainAnimationEnd() {
      this.transforming = false
      this.$emit('expanded')
    },
    expand(event) {
      this.$backdrop.show({
        ele: this.$el,
        click: () => {
          this.collapse()
        }
      })
      this.expanded = true
      this.transforming = true
      this.$emit('expand', event)
    },
    collapse(event) {
      this.$backdrop.hide()
      this.expanded = false
      this.$emit('collapse', event)
    }
  }
}
</script>
