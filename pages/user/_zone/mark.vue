<style lang="scss">
#user-mark {
  #no-content {
    margin-top: 22px;
    padding-top: 0;
  }

  .posts {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #eee;
    }
  }

  .images {
    margin-top: 20px;

    li {
      position: relative;
      float: left;
      margin-right: 12px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px 0 rgba(80, 80, 80, 0.11);
      border-radius: 8px;
      overflow: hidden;

      .delete-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 300px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
      }

      img {
        display: block;
        transition: 0.3s;
        transform-origin: center;
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }

  .answers {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #eee;
      @include twoline(20px);
    }
  }

  .scores {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #eee;

      a {
        font-weight: 500;
      }

      p {
        margin-top: 10px;
        color: #999999;
      }
    }
  }

  .videos {
    margin-top: 20px;

    li {
      margin: 0 20px 20px 0;
      float: left;

      &:hover {
        .iconfont {
          font-size: 70px;
        }
      }
    }

    .poster {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      display: block;
    }

    .text {
      margin-top: 6px;
      line-height: 20px;
      font-size: 12px;
    }

    .delete-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      font-size: 14px;
      text-align: center;
      line-height: 119px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .iconfont {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 50px;
      transition: 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);
    }
  }
}
</style>

<template>
  <div id="user-mark">
    <el-radio-group v-model="selectedTab" size="mini" @change="handleTabSwitch">
      <el-radio-button label="帖子" />
      <el-radio-button label="相册" />
      <el-radio-button label="答案" />
      <el-radio-button label="漫评" />
      <el-radio-button label="视频" />
    </el-radio-group>
    <main>
      <flow-list
        v-if="type === 'post'"
        func="getUserBookmarks"
        type="page"
        sort="post"
      >
        <ul slot-scope="{ flow }" class="posts">
          <li v-for="item in flow" :key="item.id">
            <a
              :href="item.deleted_at ? 'javascript:;' : $alias.post(item.id)"
              :class="[item.deleted_at ? 'deleted' : 'blue-link']"
              target="_blank"
              v-text="item.title"
            />
          </li>
        </ul>
        <no-content slot="nothing" />
      </flow-list>
      <flow-list
        v-else-if="type === 'image'"
        func="getUserBookmarks"
        type="page"
        sort="image"
      >
        <ul slot-scope="{ flow }" class="images">
          <li v-for="item in flow" :key="item.id">
            <a
              :href="item.deleted_at ? 'javascript:;' : $alias.image(item.id)"
              target="_blank"
            >
              <v-img :src="item.url" width="190" height="300" />
              <div v-if="item.deleted_at" class="delete-mask">该相册已删除</div>
            </a>
          </li>
        </ul>
        <no-content slot="nothing" />
      </flow-list>
      <flow-list
        v-else-if="type === 'answer'"
        func="getUserBookmarks"
        type="page"
        sort="answer"
      >
        <ul slot-scope="{ flow }" class="answers">
          <li v-for="item in flow" :key="item.id">
            <a
              :href="item.deleted_at ? 'javascript:;' : $alias.answer(item.id)"
              :class="[item.deleted_at ? 'deleted' : 'blue-link']"
              target="_blank"
              v-text="item.intro || '[图片]'"
            />
          </li>
        </ul>
        <no-content slot="nothing" />
      </flow-list>
      <flow-list
        v-else-if="type === 'score'"
        func="getUserBookmarks"
        type="page"
        sort="score"
      >
        <ul slot-scope="{ flow }" class="scores">
          <li v-for="item in flow" :key="item.id">
            <a
              :href="item.deleted_at ? 'javascript:;' : $alias.score(item.id)"
              :class="[item.deleted_at ? 'deleted' : 'blue-link']"
              target="_blank"
              v-text="item.title"
            />
            <p v-text="item.intro || '[图片]'" />
          </li>
        </ul>
        <no-content slot="nothing" />
      </flow-list>
      <flow-list
        v-else-if="type === 'video'"
        func="getUserBookmarks"
        type="page"
        sort="video"
      >
        <ul slot-scope="{ flow }" class="videos">
          <li v-for="item in flow" :key="item.id">
            <a
              :href="item.deleted_at ? 'javascript:;' : $alias.video(item.id)"
              class="poster"
              target="_blank"
            >
              <v-img :src="item.poster" width="190" height="119" />
              <div v-if="item.deleted_at" class="delete-mask">
                视频已失效
              </div>
              <i v-else class="iconfont icon-bofang" />
            </a>
            <div class="text">
              <a
                :href="item.deleted_at ? 'javascript:;' : $alias.video(item.id)"
                target="_blank"
                class="blue-link"
                v-text="item.name"
              />
            </div>
          </li>
        </ul>
        <no-content slot="nothing" />
      </flow-list>
    </main>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'

export default {
  name: 'UserMark',
  components: {
    FlowList
  },
  data() {
    return {
      selectedTab: '帖子',
      type: 'post'
    }
  },
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'getUserBookmarks',
      type: 'page',
      sort: 'post',
      count: 9999
    })
  },
  methods: {
    handleTabSwitch(label) {
      let type
      if (label === '帖子') {
        type = 'post'
      } else if (label === '相册') {
        type = 'image'
      } else if (label === '答案') {
        type = 'answer'
      } else if (label === '漫评') {
        type = 'score'
      } else if (label === '视频') {
        type = 'video'
      }
      this.getData(type)
    },
    getData(sort) {
      this.$store.dispatch('flow/initData', {
        func: 'getUserBookmarks',
        type: 'page',
        sort,
        count: 9999
      })
      this.type = sort
    }
  }
}
</script>
