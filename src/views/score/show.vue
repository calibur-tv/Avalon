<style lang="scss">
  #score-show {
    .score-header {
      .control-btn {
        float: right;
        margin-top: 3px;
        margin-right: 15px;
      }

      .total {
        float: right;
        font-weight: bold;
        font-size: 30px;
        letter-spacing: 1px;
        color: #ff9900;
        margin-right: 10px;
      }

      .title {
        overflow: hidden;
      }

      .user {
        margin-bottom: 20px;
        line-height: 30px;

        .avatar {
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          @include avatar-2(30px);
        }
      }

      .star-row {
        margin-bottom: 20px;
        @extend %clearfix;

        .star-item {
          float: left;
          margin-right: 60px;
          margin-bottom: 10px;

          &:nth-child(5n) {
            margin-right: 0;
          }

          .label {
            font-size: 13px;
            margin-bottom: 3px;
            color: $color-text-normal;
          }
        }
      }
    }

    .score-body {
      margin-bottom: 30px;
      font-size: 16px;
      color: #222;
      line-height: 30px;
      font-family: Microsoft Yahei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;
      @extend %breakWord;
    }

    .score-footer {
      text-align: center;
      margin-bottom: 50px;
    }
  }
</style>

<template>
  <div id="score-show">
    <v-banner/>
    <v-layout v-if="info">
      <template slot="main">
        <div class="score-header">
          <div>
            <div class="total">{{ info.total }}分</div>
            <template v-if="isMine">
              <el-button
                round
                plain
                type="danger"
                class="control-btn"
                size="mini"
                @click="deleteScore"
              >删除</el-button>
              <a :href="$alias.editScore(info.id)">
                <el-button
                  round
                  plain
                  type="primary"
                  class="control-btn"
                  size="mini"
                >编辑</el-button>
              </a>
            </template>
            <div class="title">
              <h1 class="sub-title">写给《{{ bangumi.name }}》的漫评</h1>
              <div class="user">
                作者：
                <a
                  :href="$alias.user(user.zone)"
                  target="_blank"
                >
                  <div class="avatar">
                    <img :src="$resize(user.avatar, { width: 60 })">
                  </div>
                  <span
                    class="name"
                    v-text="user.nickname"
                  />
                </a>
                &nbsp;·&nbsp;
                <template v-if="info.published_at === info.updated_at">
                  发表于：
                  <el-tooltip
                    :content="info.published_at"
                    placement="top"
                    effect="dark"
                  >
                    <v-time v-model="info.published_at"/>
                  </el-tooltip>
                </template>
                <template v-else>
                  编辑于：
                  <el-tooltip
                    :content="`发表于：${info.published_at}`"
                    placement="top"
                    effect="dark"
                  >
                    <v-time v-model="info.updated_at"/>
                  </el-tooltip>
                </template>
                <template v-if="info.like_count">
                  &nbsp;·&nbsp;
                  赞：{{ info.like_count }}
                </template>
                <template v-if="info.comment_count">
                  &nbsp;·&nbsp;
                  评论：{{ info.comment_count }}
                </template>
              </div>
            </div>
          </div>
          <div class="star-row">
            <div
              v-for="(item, index) in columns"
              :key="index"
              class="star-item"
            >
              <div
                class="label"
                v-text="labelMap[item]"
              />
              <el-tooltip
                :content="`${info[item] * 2}分`"
                placement="top"
                effect="dark"
              >
                <el-rate
                  v-model="info[item]"
                  disabled
                  allow-half
                />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="score-body">
          <json-content :content="info.content"/>
        </div>
        <div class="score-footer">
          <el-button
            v-if="info.liked"
            :loading="loadingToggleLike"
            round
            plain
            type="danger"
            @click="toggleLike"
          >
            <i class="iconfont icon-guanzhu"/>
            已喜欢({{ info.like_count }})
          </el-button>
          <el-button
            v-else
            :loading="loadingToggleLike"
            round
            type="danger"
            @click="toggleLike"
          >
            <i class="iconfont icon-guanzhu"/>
            喜欢{{ info.like_count ? `(${info.like_count})` : '' }}
          </el-button>
        </div>
        <comment-main
          :id="info.id"
          :master-id="user.id"
          type="score"
        />
      </template>
      <template slot="aside">
        <v-bangumi-panel
          :id="bangumi.id"
          :avatar="bangumi.avatar"
          :name="bangumi.name"
          :followed="bangumi.followed"
          :summary="bangumi.summary"
          @follow="handleBangumiFollow"
        />
      </template>
    </v-layout>
  </div>
</template>

<script>
  import ToggleApi from '~/api/toggleApi'
  import ScoreApi from '~/api/scoreApi'
  import CommentMain from '~/components/comments/CommentMain'
  import JsonContent from '~/components/jsonEditor/JsonContent'

  export default {
    name: 'ScoreShow',
    async asyncData ({ store, route, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('score/getShow', {
          ctx,
          id
        }),
        store.dispatch('comment/getMainComments', {
          ctx,
          id,
          type: 'score'
        })
      ])
    },
    components: {
      CommentMain,
      JsonContent
    },
    data () {
      const labelMap = {
        lol: '笑点',
        cry: '泪点',
        fight: '燃点',
        moe: '萌点',
        sound: '音乐',
        vision: '画面',
        story: '情节',
        role: '人设',
        express: '内涵',
        style: '美感'
      }
      return {
        labelMap,
        columns: Object.keys(labelMap),
        loadingToggleLike: false
      }
    },
    computed: {
      info () {
        return this.$store.state.score.show
      },
      bangumi () {
        return this.info.bangumi
      },
      user () {
        return this.info.user
      },
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.user.id
      }
    },
    methods: {
      async toggleLike () {
        if (this.loadingToggleLike) {
          return
        }
        this.loadingToggleLike = true;
        const api = new ToggleApi(this);
        try {
          const result = await api.like({
            type: 'score',
            id: this.info.id
          });
          this.$store.commit('score/LIKE_SCORE', result)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingToggleLike = false;
        }
      },
      handleBangumiFollow (result) {
        this.$store.commit('score/FOLLOW_BANGUMI', result)
      },
      deleteScore () {
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const api = new ScoreApi(this)
          try {
            await api.delete({
              id: this.info.id
            })
            this.$toast.success('操作成功')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } catch (e) {
            this.$toast.error(e)
          }
        }).catch(() => {})
      }
    }
  }
</script>
