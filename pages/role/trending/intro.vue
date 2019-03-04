<style lang="scss">
#role-trending-intro {
  .content {
    h2 {
      margin-bottom: 20px;
    }

    p {
      line-height: 20px;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    ul {
      margin-left: 2em;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    li {
      list-style-type: disc;
      line-height: 28px;
    }
  }
}
</style>

<template>
  <div id="role-trending-intro">
    <v-layout>
      <div class="content">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="0" title="什么是股市">
            <p>
              股市是 calibur
              一个新的偶像应援系统，它将取代之前的「偶像排行榜」，并且在功能设计上尽可能的简化模拟现实世界中的股市
            </p>
            <p>股市的特点是：</p>
            <ul>
              <li>
                偶像的"积分"（股价、市值、粉丝）数会增加，也会减少，这将提高整个版区的流动性，避免霸榜现象
              </li>
              <li>
                你可以在股市的
                <nuxt-link to="/role/trending/hall">
                  <el-button size="mini" round>
                    交易所
                  </el-button>
                </nuxt-link>
                里通过低价买入高价卖出来，以赚差价的思路来赚取团子（前提是有人买）
              </li>
              <li>
                即使你一直持有某一偶像的股份不去出售，你也可以在
                <nuxt-link to="/role/trending/product">
                  <el-button size="mini" round>
                    产品区
                  </el-button>
                </nuxt-link>
                赚到团子，只要这个偶像"经营"的好（产品区是由偶像"经纪人"运作的）
              </li>
            </ul>
            <p>股市的名词解释：</p>
            <ul>
              <li><strong>入股</strong>：用户把自己的团子给偶像</li>
              <li>
                <strong>上市</strong
                >：偶像的投资人达到20个后，公司就会自动上市，上市之后就可以调整股价和采购产品
              </li>
              <li><strong>认购股数</strong>：偶像获得的团子总数</li>
              <li>
                <strong>股价</strong
                >：如果股价是￥1/股，那么偶像获得1团子，就会增加1股；如果股价是￥2/股，偶像获得1团子，就会增加0.5股
              </li>
              <li><strong>持股人数</strong>：有多少人入股了当前偶像</li>
              <li>
                <strong>市值</strong
                >：偶像获得的所有团子以及每个团子代表的股价的总和（团子个数 ×
                每个团子的股价）= 市值
              </li>
              <li>
                <strong>发行股数</strong
                >：偶像能够被购买的团子数是有上限的，达到上限之后用户不能再入股
              </li>
              <li>
                <strong>挂牌</strong
                >：偶像还未上市或"发行股数"不等于"认购股数"，处于"可入股"状态
              </li>
              <li>
                <strong>停牌</strong
                >：偶像的"发行股数"等于"认购股数"，处于"不可入股"的状态
              </li>
              <li>
                <strong>大股东</strong
                >：持有偶像股份最多的那个人，有权利调整股价和发行总量
              </li>
              <li>
                <strong>经纪人</strong
                >：负责以偶像的名义采购社区内容的人，（目前）由大股东任命
              </li>
              <li><strong>交易所</strong>：用户（股东）之间买卖股份的地方</li>
              <li><strong>产品区</strong>：经纪人采购的内容会展示在产品区</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="1" title="如何注册公司">
            <p>
              前往
              <nuxt-link to="/role/trending/register">
                <el-button round size="mini">注册公司</el-button>
              </nuxt-link>
              页面，填写表单即可注册公司
            </p>
            <p>注册公司的一些要求：</p>
            <ul>
              <li>
                请勿成立重复的公司，注册公司前请先善用搜索功能，查看该公司是否已存在，重复的公司将被删除
              </li>
              <li>
                为了筛选垃圾信息，注册公司需要提供10个虚拟币作为"注册资本"，公司被删除时，（情节严重者）注册资本不反还
              </li>
              <li>
                偶像的「头像」建议使用其具有代表性的图片，并且不要混入其它人在内，否则视为违规
              </li>
              <li>
                偶像的「名称」选择其具有代表性的名称即可，比如《黑之契约者》的男主角："李舜生"、"黑色死神"、"BK-201"、"黑"这四个名字，建议使用"BK-201"，不会与其它角色重复，将其它几个名称代号填写到「别名」里就可以了
              </li>
              <li>偶像的「简介」目前仅支持纯文本，请勿输入无关内容</li>
              <li>
                「番剧」一栏，输入你要把偶像关联到的正确番剧，填写不对应的番剧将会被视为垃圾数据而删除，若番剧搜索不到，请加QQ群「106402736」进行反馈
              </li>
              <li>公司成立后，番剧的管理员可以修改除「名称」以为的数据</li>
              <li>其它一些需要管理员帮忙调整信息的，也请加入QQ群反馈</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="2" title="如何赚钱团子">
            <p>在股市赚取团子有两种方案：</p>
            <ul>
              <li>
                在
                <nuxt-link to="/role/trending/hall">
                  <el-button size="mini" round>
                    交易所
                  </el-button>
                </nuxt-link>
                通过股价差来赚团子
              </li>
              <li>
                持有偶像的股份，经纪人采购
                <nuxt-link to="/world/post">
                  <el-button size="mini" round>
                    社区
                  </el-button>
                </nuxt-link>
                的优质内容到
                <nuxt-link to="/role/trending/product">
                  <el-button size="mini" round>
                    产品区
                  </el-button>
                </nuxt-link>
                ，通过优质内容的投食分成来赚团子
              </li>
            </ul>
            <p>在交易所赚团子的原理：</p>
            <ul>
              <li>
                偶像的股价是变动的，上市之前是￥1/股，上市之后价格可以高于初始值
              </li>
              <li>
                假设上市之后的股价是￥1.5/股，那么你可以在交易所以￥1.2/股（小于1.5，大于1.0）的价格出售
              </li>
              <li>
                如果偶像处于停牌状态，你可以售价大于￥1.5/股（高于发行价）的价格出售
              </li>
              <li>
                同时，其它用户会在交易所选择价格最"优"的的进行交易，所以你的出售价格不能乱定，不然没人买的
              </li>
            </ul>
            <p>在产品区赚团子的原理：</p>
            <ul>
              <li>
                首先，如果你不是经纪人，你只需要持有该偶像的股份即可，什么都不用做
              </li>
              <li>
                公司上市之后，大股东可以任命公司的经纪人是谁，经纪人可以用偶像的"可支配资产"去社区采购内容
              </li>
              <li>
                被采购的内容会展示在产品区，这些内容被投食之后，会有一定比例的团子会计入偶像的"收入"当中
              </li>
              <li>
                这些收入会每隔一段时间（暂定为一周），按照持有的股份转账给投资人（如果分的的收入小于0.01则忽略不计）
              </li>
            </ul>
            <p><strong>PS - </strong>详解"<strong>可支配资产</strong>"：</p>
            <ul>
              <li>
                公司的市值 - 认购股数 = 本金（如果股价一直定的是￥1/股，那么本金
                = 0）
              </li>
              <li>每次采购成功之后，消费的团子数，计为"亏损"</li>
              <li>采购的内容被投食，获得投食分成，计为"盈利"</li>
              <li>可支配资产 = 本金 + 盈利 - 亏损</li>
              <li>
                本金为0当然就没钱采购，也就不会亏损和盈利。所以上市之后不建议保持￥1.0/股的价格
              </li>
              <li>
                如果经纪人的眼光不好，或者中饱私囊，暗箱操作转移资产，那么公司就亏惨了吧
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="3" title="大股东要做什么">
            <p>大股东是持有偶像股份最多的人，责任和义务包括但不限于以下：</p>
            <ul>
              <li>创建、组织偶像的QQ粉丝群</li>
              <li>按照合理的规律增发股票份额并定制合理的价格</li>
              <li>任命称职的经纪人，为全体股东谋福利</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="4" title="经纪人要做什么">
            <p>
              经纪人是负责为所有投资人谋福利的，责任重大，需要做的包括但不限于：
            </p>
            <ul>
              <li>以合理的价格采购优质的社区内容到产品区</li>
              <li>
                能够采购的范围仅限于偶像所属番剧下的原创内容（目前仅支持帖子）
              </li>
              <li>提高产品的曝光量，使收益达到最大化</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="5" title="惩罚与反馈">
            <p>有以下恶劣行为者，会遭到处罚：</p>
            <ul>
              <li>
                申请多个小号，操控股价者，会被封禁，再也无法参与股市的买卖
              </li>
              <li>
                注册重复公司的人，会被删除注册的公司，"注册资本"不反还（情节严重者）
              </li>
            </ul>
            <p>遇到情况，请加入QQ群：<strong>106402736</strong>进行反馈</p>
          </el-collapse-item>
        </el-collapse>
      </div>
      <template slot="aside"
        >&nbsp;</template
      >
    </v-layout>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'element-ui'

export default {
  name: 'RoleTrendingIntro',
  head: {
    title: '游戏规则'
  },
  components: {
    'el-collapse': Collapse,
    'el-collapse-item': CollapseItem
  },
  data() {
    return {
      activeName: []
    }
  }
}
</script>
