<style lang="scss">
  #bangumi-news {
    $time-size: 30px;
    .subtitle {
      margin-left: $time-size / 2;
    }

    .timeline {
      .el-tabs {
        padding-left: $time-size;

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

    .history {
      .collections {
        position: relative;

        &:before {
          content: '';
          position: absolute;
          display: block;
          left: 14.5px;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: $color-dark-light;
        }

        .collection {
          padding-left: $time-size;

          .time {
            height: $time-size;
            line-height: $time-size;
            padding-left: $time-size * 1.5;
            margin-left: -$time-size;
            position: relative;
            font-weight: 400;
            color: $color-text-light;
            font-size: 16px;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: $time-size;
              height: $time-size;
              border-radius: 50%;
              border: 1px solid $color-blue-light;
              background-color: $color-white;
            }
          }
        }
      }

      .bangumi {
        width: 100%;

        figure {
          padding: 20px 10px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;

          .face {
            width: 90px;
            height: 90px;
            flex-shrink: 0;
            margin-right: 15px;
            display: block;
          }

          .content {
            flex: auto;

            .head {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .name {
                font-size: 18px;
                font-weight: bold;

                &:hover {
                  text-decoration: underline;
                }
              }

              .score {

              }
            }

            .body {
              margin: 8.5px 0;
              text-indent: 2em;
              color: $color-text-light;
              font-size: 13px;
              line-height: 18px;
            }

            .foot {
              .icon-item {

                li {
                  position: relative;
                  margin-right: 10px;

                  a {
                    color: $color-text-light;
                  }

                  &:after {
                    content: '·';
                    position: absolute;
                    width: 10px;
                    right:-10px;
                    bottom: 0;
                    top: 0;
                    text-align: center;
                  }

                  &:last-child {
                    margin-right: 0;

                    &:after {
                      content: '';
                    }
                  }
                }
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
        <section class="timeline">
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
        </section>
        <section class="history">
          <h2 class="subtitle">时间轴</h2>
          <ul class="collections"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="200">
            <ul v-for="col in timeline" :key="col.date" class="collection">
              <h3 class="time" v-text="col.date"></h3>
              <li class="bangumi" v-for="item in col.list" :key="item.id">
                <figure>
                  <a :href="$alias.bangumi(item.id)" target="_blank">
                    <v-img
                      class="face"
                      :title="item.name"
                      :alt="item.name"
                      :src="$resize(item.avatar, { width: 180 })">
                    </v-img>
                  </a>
                  <figcaption class="content">
                    <p class="head">
                      <a target="_blank" :href="$alias.bangumi(item.id)" class="name" v-text="item.name"></a>
                      <!--<span v-text="item.count_score"></span>-->
                    </p>
                    <p class="body twoline" v-text="item.summary"></p>
                    <div class="foot">
                      <ul class="icon-item icon-item-tag oneline" v-if="item.tags.length">
                        <li v-for="tag in item.tags">
                          <a target="_blank" :href="$alias.bangumiTag(tag.id)" v-text="tag.name"></a>
                        </li>
                      </ul>
                      <!--<span v-text="item.count_like"></span>-->
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </ul>
        </section>
      </div>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  const nowTime = new Date()
  const weeklys = ['最新', '一', '二', '三', '四', '五', '六', '日']
  const defaultParams = {
    year: nowTime.getFullYear() + 1,
    take: 5
  }

  export default {
    name: 'bangumi-news',
    head: {
      title: '时间轴 - 番剧'
    },
    async asyncData ({ store }) {
      await Promise.all([
        store.dispatch('bangumi/getReleased'),
        store.dispatch('bangumi/getTimeline', {
          year: defaultParams.year,
          take: defaultParams.take
        })
      ])
    },
    computed: {
      timeline () {
        return this.$store.state.bangumi.timeline.data
      },
      released () {
        return this.$store.state.bangumi.released
      },
      minYear () {
        return this.$store.state.bangumi.timeline.min
      }
    },
    data () {
      return {
        showtime: weeklys,
        thisWeek: weeklys[nowTime.getDay() ? nowTime.getDay() : 7],
        loading: false,
        year: defaultParams.year,
        take: defaultParams.take
      }
    },
    methods: {
      computePartStyle (timestamp) {
        return parseInt(nowTime.getTime() / 1000, 10) - timestamp < 604800
      },
      async loadMore () {
        if (this.loading || this.year <= this.minYear) {
          return
        }
        this.loading = true

        try {
          await this.$store.dispatch('bangumi/getTimeline', {
            year: this.year - this.take,
            take: this.take
          })
          this.year -= this.take
        } catch (e) {
          console.log(e)
        }
        this.loading = false
      }
    }
  }
</script>
