<style lang="scss">
  #bangumi-timeline {
    $time-size: 30px;
    .sub-title {
      margin-left: $time-size / 2;
    }

    .col-main {
      margin-left: 15px;
    }

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
        background-color: $color-blue-light;
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
          margin-top: 20px;

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

          &:after {
            content: '';
            position: absolute;
            left: 7px;
            top: 7px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: $color-blue-light;
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
            margin: 10px 0 12px 0;
            color: $color-text-light;
            font-size: 13px;
            @include twoline(18px);
          }

          .foot {
            height: 16px;

            .icon-item {

              li {
                position: relative;
                margin-right: 10px;
                float: left;

                a {
                  color: $color-text-light;
                  display: inline-block;
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
</style>

<template>
  <div id="bangumi-timeline">
    <v-banner/>
    <div class="container">
      <aside class="col-aside"/>
      <div class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.bangumiNews">新番放送</router-link>
          <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
          <router-link :to="$alias.bangumiTag()">分类索引</router-link>
        </div>
        <h2 class="sub-title">时间轴</h2>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="notFetch"
          infinite-scroll-distance="50"
          class="collections"
        >
          <ul
            v-for="col in timeline"
            :key="col.date"
            class="collection"
          >
            <h3
              class="time"
              v-text="col.date"
            />
            <li
              v-for="item in col.list"
              :key="item.id"
              class="bangumi"
            >
              <figure>
                <a
                  :href="$alias.bangumi(item.id)"
                  target="_blank"
                >
                  <v-img
                    :title="item.name"
                    :alt="item.name"
                    :src="$resize(item.avatar, { width: 180 })"
                    class="face"
                  />
                </a>
                <figcaption class="content">
                  <p class="head">
                    <a
                      :href="$alias.bangumi(item.id)"
                      target="_blank"
                      class="name"
                      v-text="item.name"
                    />
                    <!--<span v-text="item.count_score"></span>-->
                  </p>
                  <p
                    class="body"
                    v-text="item.summary"
                  />
                  <div class="foot">
                    <ul
                      v-if="item.tags.length"
                      class="icon-item icon-item-tag oneline"
                    >
                      <li
                        v-for="tag in item.tags"
                        :key="tag.id"
                      >
                        <a
                          :href="$alias.bangumiTag(tag.id)"
                          target="_blank"
                          v-text="tag.name"
                        />
                      </li>
                    </ul>
                    <!--<span v-text="item.count_like"></span>-->
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BangumiTimeline',
    async asyncData ({ store, ctx }) {
      await store.dispatch('bangumi/getTimeline', ctx)
    },
    head: {
      title: '时间轴 - 番剧'
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      timeline () {
        return this.$store.state.bangumi.timeline.data
      },
      notFetch () {
        return this.loading || this.$store.state.bangumi.timeline.noMore
      }
    },
    methods: {
      async loadMore () {
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getTimeline')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
