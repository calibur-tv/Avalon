<style lang="scss">
#bangumi-news {
  .bangumi {
    width: 195px;
    margin: 0 10px 20px 0;
    float: left;

    .avatar {
      width: 65px;
      height: 65px;
      display: block;
      float: left;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .intro {
      overflow: hidden;
      font-size: 12px;

      .name {
        height: 37px;
        margin-top: 5px;
        margin-bottom: 5px;
        @include twoline(16px);
      }

      span {
        color: $color-text-light;
        line-height: 18px;

        .part {
          border-radius: 9px;
          color: $color-white;
          text-align: center;
          padding: 0 4px;
          height: 18px;
          min-width: 36px;
          max-width: 50px;
          margin-left: 5px;
          display: inline-block;
          vertical-align: top;

          &.new {
            background-color: $color-pink-normal;
          }

          &.old {
            background-color: $color-dark-light;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-news">
    <tab-container
      :list="showtime"
      :route="false"
      :def="thisWeek"
      title="新番放送表"
    >
      <div v-for="index in 8" :key="index" :slot="index - 1">
        <ul
          v-if="released && released[index - 1] && released[index - 1].length"
        >
          <li
            v-for="item in released[index - 1]"
            :key="item.id"
            class="bangumi"
          >
            <a :href="$alias.bangumi(item.id)" target="_blank" class="avatar">
              <img
                :src="$resize(item.avatar, { width: 180 })"
                :alt="item.name"
              >
            </a>
            <div class="intro">
              <a
                :href="$alias.bangumi(item.id)"
                class="name href-fade-blue"
                target="_blank"
                v-text="item.name"
              />
              <span>
                更新至
                <a
                  v-if="item.released_video_id"
                  :class="[item.update ? 'new' : 'old']"
                  :href="$alias.video(item.released_video_id)"
                  target="_blank"
                  class="part oneline"
                >
                  {{ item.end ? '已完结' : `${item.released_part}话` }}
                </a>
                <strong
                  v-else
                  :class="[item.update ? 'new' : 'old']"
                  class="part oneline"
                >
                  {{ item.end ? '已完结' : `${item.released_part}话` }}
                </strong>
              </span>
            </div>
          </li>
        </ul>
        <no-content v-else>
          <el-button type="primary" round
                     @click="openFeedbackForResource"
          >
            求资源
          </el-button>
        </no-content>
      </div>
    </tab-container>
  </div>
</template>

<script>
import TabContainer from '~/components/common/TabContainer'
import { getReleasedBangumis } from '~/api/bangumiApi'

export default {
  name: 'BangumiNews',
  components: {
    TabContainer
  },
  head: {
    title: '新番放送'
  },
  data() {
    return {
      released: [],
      showtime: [
        { label: '最新' },
        { label: '周一' },
        { label: '周二' },
        { label: '周三' },
        { label: '周四' },
        { label: '周五' },
        { label: '周六' },
        { label: '周日' }
      ],
      thisWeek: `${new Date().getDay() || 7}`
    }
  },
  async asyncData({ app }) {
    const released = await getReleasedBangumis(app)
    return { released }
  },
  methods: {
    openFeedbackForResource() {
      this.$channel.$emit('open-feedback', {
        type: 5,
        desc: '我想看新番：{?}',
        placeholder: '请填写你要的番剧名'
      })
    }
  }
}
</script>
