<style lang="scss">
  #bangumi-tags {
    .col-main {
      margin-left: 15px;
    }

    .bangumis {
      margin-left: 15px;
    }

    .bangumi {
      width: 100%;
      border-bottom: 1px solid $color-gray-normal;

      &:last-child {
        border-bottom-width: 0;
      }

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
            @include twoline(18px)
          }

          .foot {

          }
        }
      }
    }

    .tags {
      margin-bottom: 25px;
      margin-left: 15px;

      li {
        margin-right: 10px;
        margin-bottom: 10px;
        float: left;
      }

      .btn {
        font-size: 12px;
        background-color: $color-white;
        border: 1px solid $color-gray-deep;
        padding: 0 5px;
        line-height: 22px;
        border-radius: 4px;

        &:hover {
          background-color: $color-gray-deep;
        }
      }
    }
  }
</style>

<template>
  <div
    id="bangumi-tags"
    class="main"
  >
    <v-banner/>
    <div class="container">
      <aside class="col-aside"/>
      <section class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.bangumiNews">新番放送</router-link>
          <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
          <router-link :to="$alias.bangumiTag()">分类索引</router-link>
        </div>
        <div class="tags">
          <h2 class="sub-title">标签列表</h2>
          <ul>
            <li
              v-for="(tag, index) in tags"
              :key="tag.id"
              @click="$store.commit('bangumi/selectTag', index)"
            >
              <a
                :href="$alias.bangumiTag(tag.id)"
                :class="{ 'selected': tag.selected }"
                class="tag-btn"
                @click.prevent
              >{{ tag.name }}</a>
            </li>
            <li>
              <button
                class="btn"
                @click="refresh"
              >点击查找</button>
            </li>
          </ul>
        </div>
        <div
          v-if="bangumis && bangumis.length"
          class="bangumis"
        >
          <h2 class="sub-title">番剧列表</h2>
          <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="notFetch"
            infinite-scroll-distance="200"
          >
            <li
              v-for="item in bangumis"
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
                    <!--<span v-text="item.count_like"></span>-->
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
        <no-content v-else-if="id"/>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BangumiTags',
    head: {
      title: '分类索引 - 番剧'
    },
    async asyncData ({ route, store, ctx }) {
      const id = route.query.id
      const arr = [store.dispatch('bangumi/getTags', { id, ctx })]
      if (id && (
        /^\d+$/.test(id) ||
        (id.indexOf('-') !== -1 && id.split('-').every(item => /^\d+$/.test(item)))
      )) {
        arr.push(store.dispatch('bangumi/getCategory', {
          id,
          ctx
        }))
      }
      await Promise.all(arr)
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      id () {
        return this.$route.query.id
      },
      bangumis () {
        return this.$store.state.bangumi.category.data
      },
      tags () {
        return this.$store.state.bangumi.tags
      },
      notFetch () {
        return this.loading || this.$store.state.bangumi.category.noMore
      }
    },
    methods: {
      refresh () {
        const selected = []
        this.tags.forEach((tag) => {
          if (tag.selected) {
            selected.push(tag.id)
          }
        })
        if (selected.length) {
          window.location = this.$alias.bangumiTag(selected.join('-'))
        }
      },
      async loadMore () {
        if (this.notFetch) {
          return
        }
        this.loading = true

        try {
          await this.$store.dispatch('bangumi/getCategory', {
            id: this.$route.query.id,
            ctx: this
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
