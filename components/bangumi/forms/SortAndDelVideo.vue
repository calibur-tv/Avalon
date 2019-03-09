<style lang="scss">
#sort-and-del-video {
  .page-header {
    text-align: right;
    margin-bottom: 12px;
    margin-right: 12px;

    .el-switch {
      &__label {
        color: $color-gray-deep;
      }

      &__label--right.is-active {
        color: #409eff;
      }

      &__label--left.is-active {
        color: #ff4949;
      }
    }
  }

  .list-wrap {
    .list {
      float: left;

      &.enabled {
        .list-group-item {
          cursor: pointer;
          user-select: none;

          .delete {
            display: none;
          }
        }
      }
    }

    .title {
      padding-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      color: $color-text-deep;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .list-group {
      margin-right: 10px;
      min-height: 45px;
      background-color: $color-gray-light;

      .list-group-item {
        padding: 10px 15px;
        border: 1px solid #ddd;
        background-color: #fff;
        margin-bottom: -1px;

        &:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        &:last-child {
          margin-bottom: 0;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        .part {
          float: left;
          margin-right: 5px;
        }

        .delete {
          float: right;
          color: $color-gray-deep;
          line-height: 25px;
          cursor: pointer;
        }

        .name {
          overflow: hidden;
        }
      }
    }
  }
}
</style>

<template>
  <div id="sort-and-del-video">
    <div class="page-header">
      <el-switch
        v-model="enabled"
        inactive-color="#ff4949"
        inactive-text="删除模式"
        active-text="排序模式"
      />
      &nbsp;
      <el-button type="primary" size="mini" round @click="submitChange">
        保存
      </el-button>
    </div>
    <div class="list-wrap clearfix">
      <div
        v-for="(col, index) in columns"
        :key="col.id"
        :style="{ width: `${parseInt((1 / columns.length) * 100)}%` }"
        :class="{ enabled }"
        class="list"
      >
        <p class="title oneline" v-text="col.name" />
        <draggable
          :list="videos[index]"
          :disabled="!enabled"
          class="list-group"
          group="video"
        >
          <div
            v-for="video in videos[index]"
            :key="video.id"
            class="list-group-item"
          >
            <div class="part" v-text="video.episode" />
            <div
              class="el-icon-error delete"
              @click="deleteVideo(index, video.id)"
            />
            <div class="name oneline" v-text="video.name" />
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { getBangumiVideos, updateBangumiVideos } from '~/api/bangumiApi'
import draggable from 'vuedraggable'

export default {
  name: 'SortAndDelVideo',
  components: {
    draggable
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      package: null,
      enabled: true
    }
  },
  computed: {
    columns() {
      return this.package ? this.package.season : []
    },
    videos() {
      if (!this.package) {
        return []
      }
      if (!this.package.has_season) {
        return [this.package.videos[0].data]
      }
      return this.package.videos.map(_ => _.data)
    }
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    async getVideos() {
      this.package = await getBangumiVideos(this, { id: this.id })
    },
    deleteVideo(season_index, video_id) {
      if (this.package.has_season) {
        this.package.videos[season_index].data.forEach((video, index) => {
          if (video.id === video_id) {
            this.package.videos[season_index].data.splice(index, 1)
          }
        })
      } else {
        this.package.videos.data.forEach((video, index) => {
          if (video.id === video_id) {
            this.package.videos.data.splice(index, 1)
          }
        })
      }
    },
    submitChange() {
      this.$confirm('确认要提交你的改动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const form = []
          this.columns.forEach((season, index) => {
            const videos = this.videos[index].map(_ => _.id).join(',')
            form.push({
              season_id: season.id,
              videos
            })
          })
          try {
            await updateBangumiVideos(this, {
              bangumi_id: this.id,
              seasons: form
            })
            this.$toast.success('编辑成功')
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          } catch (e) {
            // do nothing
          }
        })
        .catch(() => {})
    }
  }
}
</script>
