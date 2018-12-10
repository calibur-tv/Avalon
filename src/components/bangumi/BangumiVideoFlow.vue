<style lang="scss">
#bangumi-video-flow {
  $video-item-width: 195px;
  $video-item-margin: 13px;
  $video-item-height: 60px;

  .video-item {
    margin: 0 $video-item-margin 15px 0;
    float: left;

    a {
      display: block;
      position: relative;
      width: $video-item-width;
      height: $video-item-height;
      border-radius: 3px;
      background-color: $color-gray-normal;
      overflow: hidden;

      &:hover .part {
        color: $color-blue-normal;
      }
    }

    .poster {
      margin-right: 12px;
      float: left;
    }

    .intro {
      padding-right: 12px;

      .part {
        display: block;
        color: $color-text-deep;
        font-size: 12px;
        line-height: 14px;
        margin-top: 6px;
        margin-bottom: 5px;
      }

      .name {
        font-size: 12px;
        color: $color-text-normal;
        @include twoline(14px);
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-video-flow">
    <section v-if="videos.total">
      <div v-if="videos.has_season">
        <div
          v-for="season in videos.list"
          :key="season.name"
        >
          <h3
            class="celltitle"
            v-text="season.name"
          />
          <ul>
            <li
              v-for="video in season.data"
              :key="video.id"
              class="video-item"
            >
              <a
                :href="$alias.video(video.id)"
                target="_blank"
              >
                <v-img
                  :src="video.poster"
                  width="106"
                  height="60"
                  class="poster"
                />
                <div class="intro">
                  <p class="part oneline">第{{ video.part - season.base }}话</p>
                  <span
                    class="name"
                    v-text="video.name"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul v-else>
        <li
          v-for="video in videos.list[0].data"
          :key="video.id"
          class="video-item"
        >
          <a
            :href="$alias.video(video.id)"
            target="_blank"
          >
            <v-img
              :src="video.poster"
              width="106"
              height="60"
              class="poster"
            />
            <div class="intro">
              <p class="part oneline">第{{ video.part }}话</p>
              <span
                class="name"
                v-text="video.name"
              />
            </div>
          </a>
        </li>
      </ul>
    </section>
    <no-content v-else-if="videos.fetched">
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >求资源</el-button>
    </no-content>
  </div>
</template>

<script>
export default {
  name: 'BangumiVideoFlow',
  data() {
    return {
      state: {
        loading: false,
        fetched: false
      }
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    },
    videos() {
      return this.$store.state.bangumi.videos
    }
  },
  methods: {
    async getData() {
      if (this.state.loading) {
        return
      }
      this.state.loading = true

      try {
        await this.$store.dispatch('bangumi/getVideos', {
          ctx: this,
          id: this.info.id
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.state.loading = false
        this.state.fetched = true
      }
    },
    openFeedback() {
      this.$channel.$emit('open-feedback', {
        type: 5,
        desc: `我想看《${this.info.name}》的视频第 {?} 集`,
        placeholder: '请填写你想看的集数'
      })
    }
  }
}
</script>
