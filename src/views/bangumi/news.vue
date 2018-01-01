<style lang="scss">
  #bangumi-news {
    $time-size: 30px;
    .subtitle {
      margin-left: $time-size / 2;
    }

    .el-tabs {
      padding-left: $time-size / 2;

      .el-tabs__nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;

        .el-tabs__item {
          flex: 1;
        }
      }
      .el-tabs__content {
        height: 300px;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }

    .nothing {
      font-size: 13px;
      line-height: 100px;
      color: $color-text-light;
      text-align: center;
    }

    .bangumi {
      width: 170px;
      margin: 0 10px 10px 0;

      figure {
        position: relative;

        >a {
          margin-right: 8px;
          width: 65px;
          height: 65px;
          display: block;
          float: left;
          position: relative;
          z-index: 1;

          img {
            width: 100%;
            height: 100%;
          }
        }

        figcaption {
          padding: 5px 0 5px 73px;
          z-index: 0;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

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
  }
</style>

<template>
  <div id="bangumi-news">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-main">
        <h2 class="subtitle">新番放送表</h2>
        <el-tabs v-model="thisWeek">
          <el-tab-pane v-for="(tab, index) in showtime"
                       :label="tab"
                       :key="index"
                       :name="tab">
            <ul v-if="released[index] && released[index].length">
              <li class="bangumi" :key="item.id" v-for="item in released[index]">
                <figure class="clearfix">
                  <a target="_blank" :href="$alias.bangumi(item.id)">
                    <img class="face" :src="$resize(item.avatar, { width: 180 })" :alt="item.name">
                  </a>
                  <figcaption class="abs">
                    <a :href="$alias.bangumi(item.id)"
                       class="href-fade-blue twoline"
                       target="_blank"
                       v-text="item.name"
                    ></a>
                    <span>
                      更新至
                      <a v-if="item.released_video_id"
                         :class="[computePartStyle(item.published_at) ? 'new' : 'old']"
                         :href="$alias.video(item.released_video_id)"
                         target="_blank"
                         class="part oneline">
                        {{ `${item.released_part}话` }}
                      </a>
                      <strong class="part oneline"
                              :class="[computePartStyle(item.published_at) ? 'new' : 'old']"
                              v-else>
                        {{ `${item.released_part}话` }}
                      </strong>
                    </span>
                  </figcaption>
                </figure>
              </li>
            </ul>
            <div class="nothing" v-else>
              还什么都没有
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  const nowTime = new Date()
  const weeklys = ['最新', '一', '二', '三', '四', '五', '六', '日']

  export default {
    name: 'bangumi-news',
    head: {
      title: '时间轴 - 番剧'
    },
    async asyncData ({ store }) {
      await store.dispatch('bangumi/getReleased')
    },
    computed: {
      released () {
        return this.$store.state.bangumi.released
      }
    },
    data () {
      return {
        showtime: weeklys,
        thisWeek: weeklys[nowTime.getDay() ? nowTime.getDay() : 7]
      }
    },
    methods: {
      computePartStyle (timestamp) {
        return parseInt(nowTime.getTime() / 1000, 10) - timestamp < 604800
      }
    }
  }
</script>
