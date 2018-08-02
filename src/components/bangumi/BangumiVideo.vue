<style lang="scss">
#bangumi-video {
  $video-item-width: 255px;
  $video-item-margin: 15px;
  $video-item-height: 70px;

  .video-item {
    margin: 0 $video-item-margin 15px 0;
    float: left;

    a {
      display: block;
      position: relative;
    }

    figure {
      width: $video-item-width - $video-item-margin;
      height: $video-item-height;
      background-color: $color-gray-normal;
      cursor: pointer;
      border-radius: 3px;
      overflow: hidden;

      &:hover p {
        color: $color-blue-normal;
      }

      img {
        width: 110px;
        height: 100%;
        cursor: pointer;
        margin-right: 12px;
      }

      figcaption {
        padding-left: 122px;
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
}
</style>

<template>
  <div id="bangumi-video">
    <section v-if="videos.list.length">
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
                <figure>
                  <v-img
                    :alt="video.name"
                    :src="$resize(video.poster, { width: 192, height: 120 })"
                    class="bg"
                  />
                  <figcaption class="abs">
                    <p class="part oneline">第{{ video.part - season.base }}话</p>
                    <span
                      class="name"
                      v-text="video.name"
                    />
                  </figcaption>
                </figure>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul v-else>
        <li
          v-for="video in videos.list"
          :key="video.id"
          class="video-item"
        >
          <a
            :href="$alias.video(video.id)"
            target="_blank"
          >
            <figure>
              <v-img
                :alt="video.name"
                :src="$resize(video.poster, { width: 192, height: 120 })"
                class="bg"
              />
              <figcaption class="abs">
                <p class="part oneline">第{{ video.part }}话</p>
                <span
                  class="name"
                  v-text="video.name"
                />
              </figcaption>
            </figure>
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
  name: "BangumiVideo",
  data() {
    return {
      state: {
        loading: false,
        fetched: false
      }
    };
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    },
    videos() {
      return this.$store.state.bangumi.videos;
    }
  },
  mounted() {
    this.$channel.$on("bangumi-tab-switch-video", () => {
      if (!this.state.fetched) {
        this.getData();
      }
    });
  },
  methods: {
    async getData() {
      if (this.state.loading) {
        return;
      }
      this.state.loading = true;

      try {
        await this.$store.dispatch("bangumi/getVideos", {
          ctx: this,
          id: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.state.loading = false;
        this.state.fetched = true;
      }
    },
    openFeedback() {
      this.$channel.$emit("open-feedback", {
        type: 5,
        desc: `我想看《${this.info.name}》的视频第 ? 集`
      });
    }
  }
};
</script>
