<style lang="scss">
#bangumi-aside {
  > div {
    margin-bottom: 20px;
  }

  .no-one {
    color: $color-text-normal;
  }

  #bangumi-tags {
    li {
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
    }
  }

  #bangumi-managers {
    li {
      margin: 0 -5px;
      display: inline-block;
      vertical-align: middle;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #fff;
      }

      a {
        display: block;
      }
    }
  }
}

.request-become-master-modal {
  p {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
  }
  ul {
    margin-left: 25px;
  }
  li {
    list-style-type: disc;
    line-height: 20px;
  }
}
</style>

<template>
  <div id="bangumi-aside">
    <div v-if="tags.length" id="bangumi-tags">
      <h2 class="sub-title">标签</h2>
      <ul>
        <li v-for="tag in tags" :key="tag.id" class="tag">
          <a
            :href="$alias.bangumiTag(tag.id)"
            class="tag-btn"
            target="_blank"
            v-text="tag.name"
          />
        </li>
      </ul>
    </div>
    <div id="bangumi-followers">
      <h2 class="sub-title">关注的人</h2>
      <ava-dialog
        v-if="followers.total"
        :id="info.id"
        :title="`《${info.name}》的关注者们`"
        type="bangumi"
        action="follow"
      />
      <span v-else class="no-one">还没有人关注</span>
    </div>
    <div id="bangumi-managers">
      <h2 class="sub-title">版主</h2>
      <ul v-if="managers.total">
        <li v-for="user in managerUsers" :key="user.id">
          <el-tooltip
            :content="user.nickname"
            class="item"
            effect="dark"
            placement="top"
          >
            <a :href="$alias.user(user.zone)" target="_blank">
              <img :src="$resize(user.avatar, { width: 80 })" />
            </a>
          </el-tooltip>
        </li>
      </ul>
      <el-button
        v-else
        round
        size="mini"
        type="primary"
        @click="openRequestMasterModal = true"
        >还没有版主，点击申请</el-button
      >
      <v-dialog
        v-model="openRequestMasterModal"
        :title="`申请成为《${info.name}》的版主`"
        :footer="false"
        class="request-become-master-modal"
      >
        <p>亲爱的漫友你好，欢迎来到 calibur.tv！</p>
        <p>
          如果你成为了版主，那就代表你成为了这里重要的一员，因此我们在甄选版主时会非常谨慎，你起码要满足一下要求：
        </p>
        <ul>
          <li>你要有足够的阅片量，是个真正的漫迷，足够强</li>
          <li>你要有充足的精力和耐心，与 calibur 一同成长</li>
          <li>你要有负责人的精神，不能滥用权限</li>
          <li>你要待人和善，不能有意伤害其他漫友</li>
        </ul>
        <p>如果你满足以上条件，请尽快联系我们，组织需要你！</p>
        <p>QQ群「106402736」</p>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BangumiAside',
  data() {
    return {
      openRequestMasterModal: false
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    },
    tags() {
      return this.info.tags
    },
    followers() {
      return this.info.follow_users
    },
    managers() {
      return this.info.manager_users
    },
    managerUsers() {
      if (!this.managers.total) {
        return []
      }
      return this.managers.list.map(_ => {
        return _.user
      })
    }
  }
}
</script>
