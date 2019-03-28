<style lang="scss">
#bangumi-tags {
  .tags {
    margin-bottom: 25px;

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

  .bangumi {
    width: 100%;
    padding: 20px 10px;
    @extend %clearfix;

    &:not(:last-child) {
      border-bottom: 1px solid $color-gray-normal;
    }

    .avatar {
      margin-right: 15px;
      overflow: hidden;
      float: left;
      border-radius: 10%;
    }

    .content {
      overflow: hidden;

      .title {
        font-size: 18px;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }

      .desc {
        margin: 10px 0 12px 0;
        color: $color-text-light;
        font-size: 13px;
        @include twoline(18px);
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-tags" class="main">
    <div class="tags">
      <h2 class="sub-title">
        标签列表
      </h2>
      <ul>
        <li v-for="tag in tags" :key="tag.id" @click="selectTag(tag)">
          <a
            :class="{ selected: tag.selected }"
            href="javascript:;"
            class="tag-btn"
          >{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div v-if="bangumis.total" class="bangumis">
      <h2 class="sub-title">
        番剧列表
      </h2>
      <ul>
        <li v-for="item in bangumis.data" :key="item.id" class="bangumi">
          <a :href="$alias.bangumi(item.id)" target="_blank" class="avatar">
            <v-img :src="item.avatar" width="90" height="90" />
          </a>
          <div class="content">
            <a
              :href="$alias.bangumi(item.id)"
              target="_blank"
              class="title"
              v-text="item.name"
            />
            <p class="desc" v-text="item.summary" />
          </div>
        </li>
      </ul>
      <load-more-btn
        :no-more="bangumis.noMore"
        :loading="loading"
        :auto="true"
        @fetch="loadBangumis"
      />
    </div>
    <no-content v-else-if="showEmpty" />
  </div>
</template>

<script>
import { getAllBangumiTag, getCategoryBangumis } from '~/api/bangumiApi'

export default {
  name: 'BangumiTags',
  data() {
    return {
      tags: [],
      recommendedBangumis: [],
      loading: false,
      bangumis: {
        data: [],
        noMore: false,
        page: 0,
        take: 10,
        total: 0
      }
    }
  },
  computed: {
    showEmpty() {
      return (
        (this.tags.some(_ => _.selected) && !this.loading) ||
        this.tags.every(_ => !_.selected)
      )
    }
  },
  async asyncData({ app }) {
    const data = await getAllBangumiTag(app)
    return {
      tags: data.map(_ => {
        return Object.assign(_, {
          selected: false
        })
      })
    }
  },
  head: {
    title: '动画标签'
  },
  methods: {
    selectTag(tag) {
      if (this.loading) {
        return
      }
      tag.selected = !tag.selected
      this.bangumis = {
        data: [],
        noMore: false,
        page: 0,
        take: 10,
        total: 0
      }
      this.loadBangumis()
    },
    async loadBangumis() {
      if (this.loading || this.bangumis.noMore) {
        return
      }
      this.loading = true

      try {
        const data = await getCategoryBangumis(this, {
          page: this.bangumis.page,
          take: this.bangumis.take,
          tags: this.tags
            .filter(_ => _.selected)
            .map(_ => _.id)
            .join('-')
        })
        this.bangumis.data = this.bangumis.data.concat(data.list)
        this.bangumis.noMore = data.noMore
        this.bangumis.total = data.total
        this.bangumis.page++
      } catch (e) {
        // do nothing
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
