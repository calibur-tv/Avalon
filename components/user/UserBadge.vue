<style lang="scss">
.user-badge {
  cursor: pointer;

  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .text {
    font-size: 14px;
    vertical-align: middle;
  }
}

.user-badge-detail {
  margin-bottom: 10px;
  text-align: center;

  img {
    width: 70px;
    height: 70px;
  }

  strong {
    display: block;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  p {
    line-height: 22px;
  }
}
</style>

<template>
  <div class="user-badge" @click="getBadgeData">
    <img :src="$resize(item.icon, { width: 40 })" class="icon" >
    <span class="text" v-text="item.name" />
    <v-dialog
      v-model="showDetail"
      :header="false"
      :footer="false"
      width="400px"
    >
      <div v-if="info" class="user-badge-detail">
        <img :src="$resize(info.icon, { width: 140 })" >
        <div>
          <strong>名称</strong>
          <p v-text="info.name" />
        </div>
        <div>
          <strong>稀有度</strong>
          <p v-text="computeLevel(info.level)" />
        </div>
        <div>
          <strong>持有人数</strong>
          <p v-text="info.user_count" />
        </div>
        <div v-if="info.user_count > 1">
          <strong>该用户持有数</strong>
          <p v-text="info.user_get_count" />
        </div>
        <div>
          <strong>徽章描述</strong>
          <p v-text="info.intro" />
        </div>
        <div v-if="info.user_spec_intro">
          <strong>小纸条</strong>
          <p v-text="info.user_spec_intro" />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { getUserBadgeDetail } from '~/api/userApi'

export default {
  name: 'UserBadge',
  props: {
    item: {
      required: true,
      type: Object
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showDetail: false,
      info: null
    }
  },
  methods: {
    async getBadgeData() {
      if (this.info) {
        this.showDetail = true
        return
      }
      try {
        this.info = await getUserBadgeDetail(this, {
          user_id: this.userId,
          badge_id: this.item.id
        })
        this.showDetail = true
      } finally {
        // do nothing
      }
    },
    computeLevel(level) {
      switch (+level) {
        case 0:
          return 'D'
        case 1:
          return 'C'
        case 2:
          return 'B'
        case 3:
          return 'A'
        case 4:
          return 'S'
        default:
          return '未知'
      }
    }
  }
}
</script>
