<style lang="scss">
  #comment-wrap {
    font-family: Microsoft Yahei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;

    .subtitle {
      margin-bottom: 30px;
    }

    #comment-list-wrap {
      padding-top: 20px;
    }

    .load-more-btn {
      margin-left: 85px;

      button {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }

    .no-content {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
      font-size: 12px;
      color: #99a2aa;
    }
  }
</style>

<template>
  <div id="comment-wrap">
    <!-- 主列表的头部 -->
    <slot name="header">
      <h3 class="subtitle">评论{{ total ? `(${total})` : '' }}</h3>
      <comment-create-form
        :id="id"
        :type="type"
      ></comment-create-form>
    </slot>
      <!-- 主列表的 list -->
    <div id="comment-list-wrap" v-if="list.length">
        <!-- 每条主评论 -->
        <div
          v-for="comment in list"
          :key="comment.id"
          class="comment-item-wrap"
        >
          <!-- 主评论的内容 -->
          <slot name="comment-item" :comment="comment">
            <comment-item :comment="comment" :type="type"></comment-item>
          </slot>
        </div>
      </div>
    <p class="no-content" v-else-if="emptyText" v-text="emptyText"></p>
    <div id="comment-list-footer">
      <div class="load-more-btn">
        <el-button
          type="info"
          :loading="loading"
          @click="loadMore"
          v-if="!noMore"
          plain
          round
        >{{ loading ? '加载中...' : '加载更多' }}</el-button>
      </div>
      <!-- 主列表的底部 -->
      <slot name="reply">
        <comment-create-form
          v-if="list.length >= 10"
          :id="id"
          :type="type"
        ></comment-create-form>
      </slot>
    </div>
  </div>
</template>

<script>
  import CommentItem from './CommentItem'
  import CommentCreateForm from './CommentCreateForm'

  export default {
    name: 'v-comment-main',
    props: {
      id: {
        required: true,
        type: [Number, String]
      },
      type: {
        required: true,
        type: String,
        validator: val => ~['post', 'video', 'image'].indexOf(val)
      },
      onlySeeMaster: {
        type: Boolean,
        default: false
      },
      emptyText: {
        type: String,
        default: '暂无评论，快来抢沙发吧╮(￣▽￣)╭！'
      }
    },
    components: {
      CommentCreateForm,
      CommentItem
    },
    computed: {
      store () {
        return this.$store.state.comment
      },
      list () {
        return this.store.list
      },
      noMore () {
        return this.store.noMore
      },
      total () {
        return this.store.total
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('comment/getMainComments', {
            ctx: this,
            type: this.type,
            id: this.id,
            onlySeeMaster: this.onlySeeMaster ? 1 : 0
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
