<style lang="scss">
#user-post {
  margin-top: 10px;

  .posts-of-mine {
    margin-left: 10px;

    #no-content {
      margin-left: -10px;
    }
  }

  .posts-of-reply {
    li {
      float: none;
      padding: 10px;
      position: relative;

      &:not(:last-child) {
        border-bottom: 1px dotted #e4e6eb;
      }

      .header {
        position: relative;
        height: 32px;
        line-height: 32px;

        .time {
          float: right;
          display: block;
          line-height: 32px;
          color: #999;
          font-size: 12px;
          position: relative;
          z-index: 1;
          margin-right: 12px;
        }

        .avatar {
          display: block;
          float: right;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }
      }

      .origin {
        background-color: $color-gray-normal;
        padding: 10px 20px;
        margin: 10px 0;
        border-radius: 5px;
      }

      .reply {
        border-left: 5px solid $color-gray-normal;
        padding: 0 20px;
        margin: 10px 0;
      }

      .content {
        margin-top: 3px;
        color: #666;
        font-size: 12px;
        line-height: 22px;
        max-height: 44px;
        overflow: hidden;
      }

      .images {
        height: 90px;
        overflow: hidden;
        margin-top: 10px;
        margin-bottom: 15px;

        .image-box {
          margin-right: 10px;
          height: 100%;
          position: relative;
          float: left;

          &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            opacity: 0;
          }

          &:hover {
            &:after {
              opacity: 0.1;
            }
          }

          img {
            height: 100%;
            width: auto;
          }
        }
      }
    }

    .load-more-btn {
      margin-left: 10px;
    }
  }
}
</style>

<template>
  <div id="user-post">
    <el-radio-group
      v-model="tab"
      size="mini"
      @change="handleTabSwitch"
    >
      <el-radio-button label="发表"/>
      <el-radio-button label="回复"/>
    </el-radio-group>
    <post-flow-list
      v-show="tab === '发表'"
      :user-zone="zone"
      class="posts-of-mine"
    />
    <div
      v-show="tab === '回复'"
      class="posts-of-reply"
    >
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
        >
          <div class="header clearfix">
            回复：
            <a
              :href="$alias.post(item.post.id)"
              class="href-fade-blue"
              target="_blank"
              v-text="item.post.title"
            />
            <el-tooltip
              :content="item.bangumi.name"
              effect="dark"
              placement="top"
            >
              <a
                :href="$alias.bangumi(item.bangumi.id)"
                class="avatar"
                target="_blank"
              >
                <v-img
                  :src="item.bangumi.avatar"
                  size="24"
                />
              </a>
            </el-tooltip>
            <v-time
              v-model="item.created_at"
              class="time"
            />
          </div>
          <div class="origin">
            <div
              class="content"
              v-html="item.post.content"
            />
            <div
              v-if="item.post.images.length"
              class="images clearfix"
            >
              <div
                v-for="(image, index) in item.post.images"
                :key="index"
                class="image-box"
              >
                <v-img
                  :src="image.url"
                  width="auto"
                  height="90"
                />
              </div>
            </div>
          </div>
          <div class="reply">
            <div
              class="content"
              v-html="item.content"
            />
            <div
              v-if="item.images.length"
              class="images clearfix"
            >
              <div
                v-for="(image, index) in item.images"
                :key="index"
                class="image-box"
              >
                <v-img
                  :src="image.url"
                  width="auto"
                  height="90"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <no-content v-if="!list.length && noMore"/>
      <load-more-btn
        v-else
        :auto="true"
        :no-more="noMore"
        :loading="loading"
        @fetch="getUserPosts(false)"
      />
    </div>
  </div>
</template>

<script>
import PostFlowList from "~/components/flow/list/PostFlowList";
import Api from "~/api/userApi";

export default {
  name: "UserPostFlowList",
  components: {
    PostFlowList
  },
  props: {
    zone: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      tab: "发表",
      postListType: "reply",
      list: [],
      loading: false,
      fetched: false,
      noMore: false,
      page: 0
    };
  },
  methods: {
    handleTabSwitch(label) {
      if (label === "回复") {
        this.getUserPosts(true);
      }
    },
    async getUserPosts(init = false) {
      if (init && this.fetched) {
        return;
      }
      if (this.loading || this.noMore) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        const data = await api.replyPosts({
          take: 10,
          page: this.page,
          zone: this.zone
        });
        this.fetched = true;
        this.list = this.list.concat(data.list);
        this.noMore = data.noMore;
        this.page++;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
