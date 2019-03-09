<style lang="scss">
#idol-market-price-draft {
  .draft-control {
    margin-top: 20px;
    margin-bottom: 60px;

    .text-wrap {
      margin-left: 50%;

      p {
        margin-bottom: 15px;
        line-height: 24px;
        font-size: 14px;
        margin-left: -90px;
      }
    }

    .button-wrap {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      button {
        display: block;
        margin: 0;

        i {
          margin: 0;
        }

        &.el-button--primary {
          border-radius: 4px 0 0 4px;
        }

        &.el-button--danger {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }
}
</style>

<template>
  <div id="idol-market-price-draft">
    <div v-if="draft && draft.result == 0">
      <el-alert
        show-icon
        type="warning"
        title="提案项在通过或反对占比大于「50%」之后，会由系统自动增发股票/或关闭提案（最多延迟5分钟）"
      />
      <br />
      <el-alert
        show-icon
        type="warning"
        title="若股东超过两天仍未投票，则视为弃权，将会用已投票的数据通过或驳回增发提案"
      />
      <div class="draft-control">
        <div class="text-wrap">
          <p>
            <strong>提案内容：</strong>
            <span
              >预增发{{ draft.add_stock_count }}股，每股￥{{
                draft.stock_price
              }}</span
            >
          </p>
          <p>
            <strong>提案董事：</strong>
            <span>{{ draft.user.nickname }}</span>
          </p>
          <p>
            <strong>提案时间：</strong>
            <span>{{ draft.created_at }}</span>
          </p>
          <p>
            <strong>通过情况：</strong>
            <span
              >{{ draft.pass_count }}人投票，占比：{{
                draft.pass_percent
              }}%</span
            >
          </p>
          <p>
            <strong>反对情况：</strong>
            <span
              >{{ draft.ban_count }}人投票，占比：{{ draft.ban_percent }}%</span
            >
          </p>
          <p>
            <strong>我的选择：</strong>
            <span>{{
              draft.voted === 0
                ? '未投票'
                : draft.voted > 0
                ? '赞同票'
                : '反对票'
            }}</span>
          </p>
        </div>
        <div class="button-wrap">
          <el-button
            :loading="submitting"
            :plain="draft.voted > 0"
            type="primary"
            icon="el-icon-caret-top"
            @click="submitVote(true)"
            >同意</el-button
          >
          <el-button
            :loading="submitting"
            :plain="draft.voted < 0"
            type="danger"
            @click="submitVote(false)"
          >
            反对
            <i class="el-icon-caret-bottom el-icon--right" />
          </el-button>
        </div>
      </div>
    </div>
    <el-steps v-if="source && source.noMore" space="100px" direction="vertical">
      <template v-if="!idol.ipo_at">
        <el-step
          title="增发提案"
          status="wait"
          description="还未选举出大股东"
        />
        <el-step
          :description="`投资人未满20人，还差${20 - idol.fans_count}人`"
          title="等待上市"
          status="process"
        />
        <el-step
          :description="idol.created_at"
          title="公司注册"
          status="success"
        />
      </template>
      <template v-else-if="!source.total">
        <el-step
          title="增发提案"
          status="process"
          description="大股东还未发起提案"
        />
        <el-step :description="idol.ipo_at" title="公司上市" status="success" />
        <el-step
          :description="idol.created_at"
          title="公司注册"
          status="success"
        />
      </template>
      <template v-else>
        <el-step
          v-for="item in source.list"
          :key="item.id"
          :status="
            item.result === 0
              ? 'finish'
              : item.result === 1
              ? 'success'
              : 'error'
          "
          :description="
            `${item.created_at} - 本提案由「${
              item.user.nickname
            }」发起，发行「${item.add_stock_count}」股，每股「￥${
              item.stock_price
            }」，` +
              (item.result === 0
                ? '董事会正在投票'
                : item.result === 1
                ? '董事会表决通过'
                : '董事会表决未通过')
          "
          title="增发提案"
        />
        <el-step :description="idol.ipo_at" title="公司上市" status="success" />
        <el-step
          :description="idol.created_at"
          title="公司注册"
          status="success"
        />
      </template>
    </el-steps>
  </div>
</template>

<script>
import { Steps, Step } from 'element-ui'
import { marketPriceVote } from '~/api/cartoonRoleApi'

export default {
  name: 'IdolMarketPriceDraft',
  components: {
    'el-steps': Steps,
    'el-step': Step
  },
  props: {
    isBoss: {
      type: Boolean,
      required: true
    },
    idol: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      submitting: false
    }
  },
  computed: {
    source() {
      return this.$store.getters['flow/getFlow'](
        'getIdolDraftList',
        'new',
        this.idol.id
      )
    },
    draft() {
      if (!this.source || !this.source.total) {
        return null
      }
      return this.source.list[0]
    }
  },
  methods: {
    async submitVote(is_agree) {
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await marketPriceVote(this, {
          is_agree,
          idol_id: this.idol.id,
          draft_id: this.draft.id
        })
        this.$toast.success('投票成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.submitting = false
      }
    }
  }
}
</script>
