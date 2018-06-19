<style lang="scss">
  #comment-wrap {
    .load-more-btn {
      margin-top: 20px;
      margin-bottom: 20px;

      button {
        width: 100%;
      }
    }
  }
</style>

<template>
  <div id="comment-wrap">
    <!-- 主列表的头部 -->
    <slot name="header"></slot>
    <!-- 主列表的 list -->
    <div id="comment-list-wrap">
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
        <!-- 主评论的子评论列表 -->
        <slot name="sub-comment-list" :parent-comment="comment"></slot>
      </div>
    </div>
    <div id="comment-list-footer">
      <slot name="load">
        <div class="load-more-btn">
          <el-button
            type="info"
            v-if="!noMore"
            :loading="loading"
            @click="loadMore"
            plain
            round
          >{{ loading ? '加载中...' : '加载更多' }}</el-button>
        </div>
      </slot>
      <!-- 主列表的底部 -->
      <create-comment-form
        :id="id"
        :type="type"
        :with-image="withImage"
      ></create-comment-form>
    </div>
  </div>
</template>

<script>
  import CreateCommentForm from '~/components/forms/CreateCommentForm'
  import CommentItem from './CommentItem'

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
      withImage: {
        type: Boolean,
        default: false
      }
    },
    components: {
      CreateCommentForm,
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
