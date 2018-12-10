<style lang="scss">
#user-recommended {
  .sub-title {
    font-size: 15px;
    user-select: none;
    display: flex;
    justify-content: space-between;

    span {
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

  ul {
    margin-right: 40px;
  }

  li {
    display: block;
    padding-left: 9px;
    margin-bottom: 14px;

    a {
      display: block;
      width: 100%;
      height: 100%;
      @extend %clearfix;

      &:hover span {
        color: $color-blue-normal;
      }
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
      float: left;
    }

    .intro {
      overflow: hidden;

      span {
        cursor: pointer;
        font-size: 12px;
        line-height: 16px;
        color: #222;
      }

      p {
        color: $color-text-normal;
        margin-top: 4px;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>

<template>
  <div
    v-if="users.length"
    id="user-recommended"
  >
    <h3 class="sub-title">
      推荐用户
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
        v-for="user in filterList"
        :key="user.id"
      >
        <a
          :href="$alias.user(user.zone)"
          target="_blank"
        >
          <img
            :src="$resize(user.avatar, { width: 80 })"
            class="avatar"
          >
          <div class="intro">
            <span
              class="oneline"
              v-text="user.nickname"
            />
            <p
              class="oneline"
              v-text="user.signature"
            />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserRecommended',
  props: {
    users: {
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
      if (!this.users.length) {
        return []
      }
      const begin = this.counter * this.display
      const end = begin + this.display
      return this.users.slice(begin, end)
    }
  },
  methods: {
    choiceTags() {
      if ((this.counter + 1) * this.display >= this.users.length) {
        this.counter = 0
      } else {
        this.counter++
      }
    }
  }
}
</script>
