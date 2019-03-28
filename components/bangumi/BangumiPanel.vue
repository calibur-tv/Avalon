<style lang="scss" module>
.bangumi-panel {
  position: relative;
  width: 206px;
  height: 270px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .avatar {
    margin: 0 auto 8px auto;
    border-radius: 10%;
    overflow: hidden;
  }

  .name {
    margin: 7px 16px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    @include twoline(18px);
  }

  .summary {
    margin: 0 auto 10px;
    max-width: 180px;
    @include twoline(16px);
  }

  button {
    margin-top: 5px;
  }
}
</style>

<template>
  <div :class="$style.bangumiPanel" class="bangumi-panel">
    <a :href="$alias.bangumi(id)" target="_blank">
      <v-img
        :class="$style.avatar"
        :src="avatar"
        width="90"
        height="90"
      />
    </a>
    <a
      :class="$style.name"
      :href="$alias.bangumi(id)"
      target="_blank"
      v-text="name"
    />
    <p :class="$style.summary" v-text="summary" />
    <el-button
      :loading="source.follow_loading"
      :plain="source.follow"
      type="danger"
      icon="iconfont icon-follow"
      round
      @click="toggleFollow"
    >
      {{ source.follow ? '已关注' : '关注' }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'BangumiPanel',
  props: {
    id: {
      required: true,
      type: Number
    },
    avatar: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    summary: {
      required: true,
      type: String
    }
  },
  computed: {
    source() {
      return this.$store.getters['social/getState']('bangumi', this.id)
    }
  },
  methods: {
    toggleFollow() {
      this.$store.dispatch('social/toggleAction', {
        id: this.id,
        type: 'bangumi',
        action: 'follow'
      })
    }
  }
}
</script>
