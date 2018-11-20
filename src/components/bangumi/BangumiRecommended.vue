<style lang="scss">
#bangumi-recommended {
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
      width: 60px;
      height: 60px;
      margin-right: 5px;
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
    v-if="list.length"
    id="bangumi-recommended"
  >
    <h3 class="sub-title">
      推荐番剧
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
          <img :src="$resize(item.avatar, { width: 120 })">
          <div>
            <p
              class="oneline"
              v-text="'《' + item.name + '》'"
            />
            <span v-text="item.tag"/>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BangumiRecommended',
  data() {
    return {
      counter: 0
    }
  },
  computed: {
    list() {
      return this.$store.state.bangumi.recommended
    },
    filterList() {
      if (!this.list.length) {
        return []
      }
      const begin = this.counter * 5
      const end = begin + 5
      return this.list.slice(begin, end)
    }
  },
  methods: {
    choiceTags() {
      if ((this.counter + 1) * 5 >= this.list.length) {
        this.counter = 0
      } else {
        this.counter++
      }
    }
  }
}
</script>
