<style lang="scss">
  #bangumi-tags {
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
            line-height: 18px;
          }

          .foot {

          }
        }
      }
    }

    .tags {
      margin-bottom: 25px;

      li {
        margin-right: 10px;
        margin-bottom: 10px;
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
  <div id="bangumi-tags" class="main">
    <v-banner></v-banner>
    <div class="container clearfix">
      <section class="col-main">
        <div class="tags">
          <h2 class="subtitle">标签列表</h2>
          <ul class="clearfix">
            <li v-for="tag in tags" @click="tag.selected = !tag.selected">
              <a @click.prevent
                 :href="`/bangumi/tags/${tag.id}`" class="el-tag"
                 :class="{ 'selected': tag.selected }"
              >{{ tag.name }}</a>
            </li>
            <li>
              <button class="btn" @click="getList">点击查找</button>
            </li>
          </ul>
        </div>
        <div class="bangumis" v-if="bangumis.length">
          <h2 class="subtitle">番剧列表</h2>
          <ul class="clearfix">
            <li class="bangumi" v-for="item in bangumis">
              <figure>
                <nuxt-link
                  :to="`/bangumi/${item.id}`">
                  <v-img
                    class="face"
                    :title="item.name"
                    :alt="item.name"
                    :src="$resize(item.avatar, { width: 180 })">
                  </v-img>
                </nuxt-link>
                <figcaption class="content">
                  <p class="head">
                    <nuxt-link :to="`/bangumi/${item.id}`" class="name" v-text="item.name"></nuxt-link>
                    <!--<span v-text="item.count_score"></span>-->
                  </p>
                  <p class="body twoline" v-text="item.summary"></p>
                  <div class="foot">
                    <!--<span v-text="item.count_like"></span>-->
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  import vBanner from '~/components/views/Banner.vue'

  export default {
    name: 'bangumi-tags',
    head: {
      title: '番剧列表'
    },
    components: {
      vBanner
    },
    validate ({ params }) {
      const id = params.id
      if (id === undefined || /^\d+$/.test(id)) {
        return true
      }
      if (id.indexOf('-') !== -1) {
        return id.split('-').every(item => /^\d+$/.test(item))
      }
      return false
    },
    watch: {
      '$route' () {
        this.bangumis = []
      }
    },
    async asyncData ({ params, app }) {
      const data = await app.$axios.get('bangumi/tags', {
        params: {
          id: params.id
        }
      })
      const tags = data.tags
      const ids = params.id ? params.id.split('-') : undefined
      tags.forEach((tag, index) => {
        tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
      })
      return {
        tags: tags,
        bangumis: data.bangumis
      }
    },
    data () {
      return {
        tags: [],
        bangumis: []
      }
    },
    methods: {
      getList () {
        const selected = []
        this.tags.forEach((tag) => {
          if (tag.selected) {
            selected.push(tag.id)
          }
        })
        if (selected.length) {
          this.$router.push({
            name: 'bangumi-tags-id',
            params: {
              id: selected.join('-')
            }
          })
        }
      }
    }
  }
</script>
