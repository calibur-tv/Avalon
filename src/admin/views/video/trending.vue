<template>
  <div
    v-loading="pageLoading"
    id="video-trending"
  >
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="视频id">
        <a
          slot-scope="scope"
          :href="$alias.video(scope.row.id)"
          target="_blank"
          v-text="scope.row.id"
        />
      </el-table-column>
      <el-table-column label="番剧id">
        <a
          slot-scope="scope"
          :href="$alias.bangumi(scope.row.bangumi_id)"
          target="_blank"
          v-text="scope.row.bangumi_id"
        />
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name"
      />
      <el-table-column
        label="播放量"
        prop="count_played"
      />
    </el-table>
    <v-page
      :state="pageState"
      :change="getData"
    />
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import pageMixin from '@/mixins/page'

  export default {
    mixin: [
      pageMixin
    ],
    created () {
      this.getData(1);
    },
    methods: {
      async getData (page) {
        if (page <= this.pageState.max) {
          this.pageState.cur = page
          return
        }
        if (this.pageLoading) {
          return
        }
        this.pageLoading = true;
        this.pageState.size = 20;
        const api = new Api(this);
        try {
          const data = await api.getTrendingVideo({
            to_page: page,
            cur_page: this.pageState.cur,
            take: this.pageState.size
          })
          this.pageState.total = data.total
          this.pageState.cur = page
          this.pageState.max = page
          this.pageList = this.pageList.concat(data.list)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.pageLoading = false
        }
      },
    }
  }
</script>
