<style lang="scss">
#video-show {
  $meta-height: 30px;
  $meta-margin-bottom: 8px;

  #video-header {
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    min-height: 30px;
    padding-right: 60px;

    .season-title {
      padding-bottom: 10px;
      margin-left: 10px;
    }
  }

  .video-info {
    padding-top: 60px;
    margin-bottom: 20px;

    .fen-think {
      height: 40px;
      float: right;
    }

    .video-report {
      margin-right: 15px;
      margin-top: 2px;
    }
  }

  .wallet {
    margin-bottom: 20px;

    .item {
      width: 49%;
      display: inline-block;
      text-align: center;
      margin-bottom: 10px;

      strong {
        color: #6d757a;
        font-weight: 700;
        font-size: 30px;
      }

      div {
        font-size: 14px;
        margin-top: 10px;
      }

      &:first-child {
        border-right: 1px solid $color-gray-normal;
      }
    }

    .sign-btn {
      background-color: #f25d8e;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      width: 76px;
      line-height: 30px;
      margin-top: -3px;
      float: right;

      &:hover {
        background-color: #ff85ad;
      }

      &.day-signed {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }

    .intro {
      font-size: 12px;
      color: $color-text-light;

      p {
        margin-top: 5px;
      }
    }
  }

  .invite-code {
    button {
      width: 100%;
      background-color: #f25d8e;
      border-radius: 4px;
      box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      line-height: 50px;
      padding: 0 24px;
      margin-bottom: 20px;

      &:hover {
        background-color: #ff709f;
      }
    }

    p {
      font-size: 12px;
      color: $color-text-light;
      margin-bottom: 20px;
    }
  }
}

.need-coin-modal {
  text-align: center;

  h2 {
    margin-bottom: 20px;
    margin-top: 10px;
  }

  p,
  li {
    line-height: 24px;
  }

  a {
    color: $color-blue-normal;
  }

  ul {
    margin-left: 135px;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  li {
    text-align: left;
    list-style-type: disc;
  }

  .invite-btn {
    width: 350px;
    margin: 0 auto;
    background-color: #f25d8e;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    line-height: 50px;
    padding: 0 24px;
    margin-bottom: 5px;

    &:hover {
      background-color: #ff709f;
    }
  }
}
</style>

<template>
  <div id="video-show">
    <v-header/>
    <div
      id="video-header"
      class="container"
    >
      <nav>
        <h1
          v-if="bangumi && info"
          class="breadcrumb"
        >
          <a
            :href="$alias.index"
            target="_blank"
          >主站</a>
          <a
            :href="$alias.bangumi(bangumi.id)"
            target="_blank"
            v-text="bangumi.name"
          />
          第{{ info.part }}话&nbsp;{{ info.name }}
        </h1>
      </nav>
      <template v-if="list.has_season && showAll">
        <div
          v-for="(items, idx) in list.videos"
          :key="idx"
        >
          <h6
            class="season-title"
            v-text="items.name"
          />
          <v-part
            :list="items.data"
            :alias="$alias.video"
            :is-first="idx === 0"
            :force-all="true"
            :all-data="videos"
            v-model="showAll"
          >
            <template slot-scope="{ item }">
              <span>{{ item.part - items.base }}</span>{{ item.name }}
            </template>
          </v-part>
        </div>
      </template>
      <v-part
        v-else
        :list="videos"
        :all-data="videos"
        :alias="$alias.video"
        v-model="showAll"
      >
        <template slot-scope="{ item }">
          <span>{{ item.part }}</span>{{ item.name }}
        </template>
      </v-part>
    </div>
    <v-layout>
      <!-- 播放器 -->
      <v-video
        :source="computeVideoSrc"
        :other-src="useOtherSiteSource"
        :video="`${bangumi.name} 第 ${info.part} 话 ${info.name}`"
        :poster="$resize(info.poster, { width: 800 })"
        :next="nextPartVideo"
        :is-guest="isGuest"
        :blocked="ip_blocked"
        :must-reward="must_reward && !info.rewarded"
        :need-min-level="need_min_level"
        @playing="handlePlaying"
        @reward="showRewardDialog = true"
      />
      <!-- 视频底部 -->
      <div class="video-info">
        <social-panel
          :id="info.id"
          :is-creator="info.is_creator"
          :is-mine="isMine"
          type="video"
          @reward-callback="handleRewardAction"
        />
        <v-share type="panel"/>
        <el-button
          type="warning"
          size="medium"
          class="video-report"
          round
          @click="handleVideoReportClick"
        >资源报错</el-button>
      </div>
      <!-- 评论区 -->
      <v-lazy>
        <comment-main
          :id="id"
          :master-id="info.user_id"
          :lazy="true"
          type="video"
        />
      </v-lazy>
      <!-- 侧边栏 -->
      <template slot="aside">
        <template v-if="!isGuest">
          <div class="wallet">
            <h3 class="sub-title">虚拟币</h3>
            <div>
              <div class="item">
                <strong>{{ coinCount }}</strong>
                <div>团子</div>
              </div>
              <div class="item">
                <strong>{{ lightCount }}</strong>
                <div>光玉</div>
              </div>
            </div>
            <div class="intro">
              <p>团子类似于Q币，1团子=1Q币，可在站内流通</p>
              <p>光玉就是可提现的团子，只能从别人的投食中获得</p>
            </div>
          </div>
          <div class="invite-code">
            <h2 class="sub-title">邀请码</h2>
            <button
              v-clipboard="`http://calibur.tv/about/invite/${user.id}`"
              @success="$toast.success('复制成功~快去发送给好友吧')"
            >点击复制你的邀请码</button>
            <p>其他人使用你的邀请码注册，你就能获得团子奖励</p>
          </div>
        </template>
        <h3 class="sub-title">番剧</h3>
        <bangumi-panel
          :id="bangumi.id"
          :name="bangumi.name"
          :avatar="bangumi.avatar"
          :summary="bangumi.summary"
        />
      </template>
      <!-- 邀请弹窗 -->
      <v-dialog
        v-model="showRewardDialog"
        :header="false"
        :footer="false"
        :close="false"
        width="560px"
        class="need-coin-modal"
      >
        <div
          v-if="!isGuest"
          class="content"
        >
          <h2>非常抱歉，为了降低流量压力，需要投食才能看番</h2>
          <p>
            <span>点击视频下方</span>
            <el-button
              type="warning"
              size="mini"
              round
            >投食</el-button>
            <span>按钮即可继续观看</span>
          </p>
          <p>
            <span>投食会消耗你一枚</span>
            <a
              href="/app/notice/1"
              target="_blank"
            >
              「团子」
            </a>
          </p>
          <p>如果你已经没有团子了，你可以：</p>
          <ul>
            <li>每天签到可以获得一枚团子</li>
            <li>每天在站内发言、活跃就会获得团子</li>
            <li>邀请别人注册 calibur，你与注册者都会获得团子</li>
            <li>calibur 目前还不支持氪金，请见谅</li>
          </ul>
          <button
            v-clipboard="`http://calibur.tv/about/invite/${user.id}`"
            class="invite-btn"
            @success="$toast.success('复制成功~快去发送给好友吧')"
          >点击生成你的专属邀请码，获得团子</button>
        </div>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import vVideo from '~/components/Video'
import vPart from '~/components/lists/Parts'
import CommentMain from '~/components/comments/CommentMain'
import SocialPanel from '~/components/common/SocialPanel'
import { getVideoInfo, markPlaying } from '~/api/videoApi'

export default {
  name: 'VideoShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ app, store, params, error }) {
    const { id } = params
    return getVideoInfo(app, { id })
      .then(data => {
        const { bangumi, info } = data
        store.commit('social/SET_STATE', {
          type: 'video',
          id,
          data: {
            like: info.liked,
            reward: info.rewarded,
            mark: info.marked,
            like_users: info.like_users,
            mark_users: info.mark_users,
            reward_users: info.reward_users
          }
        })
        store.commit('social/SET_STATE', {
          type: 'bangumi',
          id: bangumi.id,
          data: {
            follow: bangumi.followed
          }
        })
        return data
      })
      .catch(error)
  },
  components: {
    vVideo,
    vPart,
    CommentMain,
    SocialPanel
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  head() {
    const { bangumi, info, list } = this
    const hasSeason = list.has_season
    const bangumiName = bangumi.name
    const videoName = info.name
    let resultPart = info.part
    let seasonName = ''
    let title = ''
    if (hasSeason) {
      list.videos.forEach(videos => {
        videos.data.forEach(item => {
          if (item.id === info.id) {
            resultPart = item.part - videos.base
            seasonName = list.name
          }
        })
      })
    }
    if (seasonName) {
      if (seasonName === videoName) {
        title = `${bangumiName} : ${seasonName} - 视频`
      } else {
        title = `${bangumiName} : ${seasonName} : 第${resultPart}话 ${videoName} - 视频`
      }
    } else {
      title = `${bangumiName} : 第${resultPart}话 ${videoName} - 视频`
    }
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: bangumi.summary
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${bangumiName}，第${resultPart}话，${videoName}，在线观看 动画片大全 动漫在线播放 日本动漫 好看的动漫 二次元网站`
        }
      ]
    }
  },
  data() {
    return {
      showAll: false,
      firstPlay: true,
      info: null,
      bangumi: null,
      list: [],
      ip_blocked: false,
      must_reward: false,
      need_min_level: 0,
      showRewardDialog: false
    }
  },
  computed: {
    isGuest() {
      return !this.$store.state.login
    },
    isMine() {
      return this.$store.state.login
        ? this.info.user_id === this.$store.state.user.id
        : false
    },
    videos() {
      let result = []
      this.list.videos.forEach(videos => {
        result = result.concat(videos.data)
      })
      return result
    },
    nextPartVideo() {
      let nextId = 0
      const currentId = +this.id
      this.videos.forEach((video, index) => {
        if (video.id === currentId && index !== this.videos.length - 1) {
          nextId = this.videos[index + 1].id
        }
      })
      return nextId ? this.$alias.video(nextId) : ''
    },
    useOtherSiteSource() {
      return this.info.other_site
    },
    computeVideoSrc() {
      return this.info.src
    },
    user() {
      return this.$store.state.user
    },
    coinCount() {
      if (this.isGuest) {
        return 0
      }
      return this.user.banlance.coin_count
    },
    lightCount() {
      if (this.isGuest) {
        return 0
      }
      return this.user.banlance.light_count
    }
  },
  methods: {
    handlePlaying() {
      if (this.firstPlay) {
        this.firstPlay = false
        markPlaying(this, { id: this.id })
      }
    },
    handleVideoReportClick() {
      this.$channel.$emit('open-feedback', {
        type: 4,
        desc: `【PC】-《${this.bangumi.name}》视频有错误，视频 id：${
          this.id
        }：错误详情为：{?}`,
        placeholder: '请填写错误详情'
      })
    },
    handleRewardAction() {
      if (this.must_reward) {
        window.location.reload()
      }
    }
  }
}
</script>
