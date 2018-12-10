<style lang="scss">
#bangumi-hots {
  .sub-title {
    font-size: 15px;
    margin-left: 0 !important;
    margin-top: -5px;
    user-select: none;

    span {
      float: right;
      cursor: pointer;
      display: inline-block;
      color: $color-text-light;
      font-size: 12px;
      line-height: 16px;
      padding: 5px;
    }

    i {
      transition: 0.5s ease;
    }
  }

  li {
    padding-bottom: 8px;
    cursor: pointer;

    &:hover {
      a {
        background-color: $color-gray-normal;
      }

      span {
        background-color: $color-pink-normal;
        color: #fff;
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
      transition: 0.5s;
      @extend %clearfix;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      float: left;
    }

    div {
      overflow: hidden;
      padding: 2px 5px;
    }

    p {
      line-height: 18px;
      height: 18px;
      font-size: 12px;
      margin-bottom: 3px;
      color: #222;
    }

    span {
      display: inline-block;
      color: $color-text-light;
      font-size: 12px;
      line-height: 16px;
      padding: 2px 5px;
      border-radius: 5px;
      transition: 0.5s;
    }
  }
}
</style>

<template>
  <div
    v-if="bangumis.length"
    id="bangumi-hots"
  >
    <h3 class="sub-title">
      热门番剧
      <span @click="choiceTags">
        <i
          :style="{ transform: `rotate(${counter * 360}deg)` }"
          class="el-icon-refresh"
        />
        换一换
      </span>
    </h3>
    <ul>
      <li
        v-for="item in filterList"
        :key="item.id"
      >
        <a
          :href="$alias.bangumi(item.id)"
          target="_blank"
        >
          <img :src="$resize(item.avatar, { width: 80 })">
          <div>
            <p
              class="oneline"
              v-text="'《' + item.name + '》'"
            />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BangumiHots',
  props: {
    bangumis: {
      type: Array,
      required: true
    },
    display: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  computed: {
    filterList() {
      if (!this.bangumis.length) {
        return []
      }
      const begin = this.counter * this.display
      const end = begin + this.display
      return this.bangumis.slice(begin, end)
    }
  },
  methods: {
    choiceTags() {
      if ((this.counter + 1) * this.display >= this.list.length) {
        this.counter = 0
      } else {
        this.counter++
      }
    }
  }
}
</script>
