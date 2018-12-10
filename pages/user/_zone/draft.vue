<style lang="scss">
#user-draft {
  .el-radio-group {
    margin-left: 0 !important;
    margin-top: 6px;
  }

  .score-draft {
    padding-bottom: 15px;
    padding-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .header {
      height: 30px;
      line-height: 30px;

      .title {
        overflow: hidden;
      }

      .bangumi {
        float: right;

        img {
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
    }

    .body {
      display: block;
      font-size: 13px;
      @include twoline(16px);
    }
  }

  .answer-draft {
    padding-bottom: 15px;
    padding-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.6;
      color: #1a1a1a;
      margin-bottom: 6px;

      &:hover {
        color: $color-blue-deep;
      }
    }

    .intro {
      line-height: 25px;
      max-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  #no-content {
    margin-top: 25px;
  }
}
</style>

<template>
  <div id="user-draft">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="漫评"/>
        <el-radio-button label="回答"/>
      </el-radio-group>
    </div>
    <flow-list
      v-if="active === '漫评'"
      func="getUserScoreDrafts"
      type="page"
      sort="news"
    >
      <ul slot-scope="{ flow }">
        <li
          v-for="item in flow"
          :key="item.id"
          class="score-draft"
        >
          <div class="header">
            <a
              :href="$alias.bangumi(item.bangumi.id)"
              class="bangumi"
              target="_blank"
            >
              <img :src="$resize(item.bangumi.avatar, { width: 60 })">
            </a>
            <div class="title">
              <a
                :href="$alias.editScore(item.id)"
                class="href-fade-blue"
                target="_blank"
                v-text="item.title"
              />
            </div>
          </div>
          <a
            :href="$alias.editScore(item.id)"
            class="body"
            target="_blank"
            v-text="item.intro"
          />
        </li>
      </ul>
    </flow-list>
    <flow-list
      v-else-if="active === '回答'"
      func="getUserAnswerDrafts"
      type="page"
      sort="news"
    >
      <ul slot-scope="{ flow }">
        <li
          v-for="item in flow"
          :key="item.id"
          class="answer-draft"
        >
          <a
            :href="$alias.question(item.question.id)"
            target="_blank"
          >
            <h5
              class="title"
              v-text="item.question.title"
            />
          </a>
          <a
            :href="$alias.answer(item.id)"
            target="_blank"
            class="intro"
            v-text="item.intro"
          />
        </li>
      </ul>
    </flow-list>
  </div>
</template>

<script>
export default {
  name: 'UserDraft',
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'getUserScoreDrafts',
      type: 'page',
      sort: 'news'
    })
  },
  data() {
    return {
      active: '漫评'
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === '漫评') {
        this.getUserDrafts('getUserScoreDrafts')
      } else if (label === '回答') {
        this.getUserDrafts('getUserAnswerDrafts')
      }
    },
    getUserDrafts(func) {
      this.$store.dispatch('flow/initData', {
        func,
        type: 'page',
        sort: 'news'
      })
    }
  }
}
</script>
