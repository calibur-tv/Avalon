<template>
  <div id="idol-owner-list">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="按持股由多到少"/>
        <el-radio-button label="按最新入股排序"/>
      </el-radio-group>
    </div>
    <flow-list
      v-show="active === '按持股由多到少'"
      :id="id"
      func="virtualIdolOwners"
      type="seenIds"
      sort="biggest"
    >
      <ul
        slot-scope="{ flow }"
        class="likes-modal"
      >
        <li
          v-for="item in flow"
          :key="item.id"
        >
          <a
            :href="$alias.user(item.zone)"
            class="user"
            target="_blank"
          >
            <img
              :src="$resize(item.avatar, { width: 80 })"
              class="avatar"
            >
            <span
              class="nickname"
              v-text="item.nickname"
            />
            <span class="score">持有{{ item.score }}股，占比{{ computedPercent(item.score) }}</span>
          </a>
        </li>
      </ul>
      <no-content slot="nothing">
        <el-button
          round
          @click="$toast.warn('Orz')"
        >可怜的「{{ name }}」还没有人入股</el-button>
      </no-content>
    </flow-list>
    <flow-list
      v-show="active === '按最新入股排序'"
      :id="id"
      func="virtualIdolOwners"
      type="lastId"
      sort="newest"
    >
      <ul
        slot-scope="{ flow }"
        class="likes-modal"
      >
        <li
          v-for="item in flow"
          :key="item.id"
        >
          <a
            :href="$alias.user(item.zone)"
            class="user"
            target="_blank"
          >
            <img
              :src="$resize(item.avatar, { width: 80 })"
              class="avatar"
            >
            <span
              class="nickname"
              v-text="item.nickname"
            />
            <v-time
              v-model="item.score"
              class="score"
            />
          </a>
        </li>
      </ul>
      <no-content slot="nothing">
        <el-button
          round
          @click="$toast.warn('Orz')"
        >可怜的「{{ name }}」还没有人入股</el-button>
      </no-content>
    </flow-list>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'

export default {
  name: 'IdolOwnerList',
  components: {
    FlowList
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    star: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      active: '按持股由多到少'
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === '按持股由多到少') {
        this.getBigOwner()
      } else {
        this.getNewOwner()
      }
    },
    computedPercent(score) {
      return `${parseFloat((score / this.star) * 100).toFixed(2)}%`
    },
    getBigOwner() {
      this.$store.dispatch('flow/initData', {
        func: 'virtualIdolOwners',
        type: 'seenIds',
        sort: 'biggest',
        id: this.id
      })
    },
    getNewOwner() {
      this.$store.dispatch('flow/initData', {
        func: 'virtualIdolOwners',
        type: 'lastId',
        sort: 'newest',
        id: this.id
      })
    }
  }
}
</script>
