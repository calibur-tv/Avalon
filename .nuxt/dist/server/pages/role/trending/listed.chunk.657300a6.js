exports.ids=[42],exports.modules={239:function(t,e,n){"use strict";n.d(e,"l",function(){return r}),n.d(e,"s",function(){return o}),n.d(e,"g",function(){return c}),n.d(e,"j",function(){return l}),n.d(e,"c",function(){return d}),n.d(e,"k",function(){return _}),n.d(e,"d",function(){return m}),n.d(e,"q",function(){return v}),n.d(e,"h",function(){return f}),n.d(e,"o",function(){return h}),n.d(e,"f",function(){return $}),n.d(e,"r",function(){return y}),n.d(e,"a",function(){return x}),n.d(e,"p",function(){return k}),n.d(e,"m",function(){return w}),n.d(e,"e",function(){return C}),n.d(e,"b",function(){return E}),n.d(e,"i",function(){return I}),n.d(e,"n",function(){return z});const r=(t,{id:e})=>t.$axios.$get(`cartoon_role/${e}/stock_show`),o=(t,{id:e,amount:n})=>t.$axios.$post(`cartoon_role/${e}/buy_stock`,{amount:n}),c=(t,{bangumi_id:e,name:n,intro:r,avatar:o,alias:c})=>t.$axios.$post("cartoon_role/manager/create",{bangumi_id:e,name:n,intro:r,avatar:o,alias:c}),l=(t,form)=>t.$axios.$post("cartoon_role/manager/edit",form),d=(t,form)=>t.$axios.$post("cartoon_role/manager/user_create",form),_=(t,{id:e})=>t.$axios.$get(`cartoon_role/${e}/get_idol_deal`),m=(t,form)=>t.$axios.$post("cartoon_role/create_deal",form),v=(t,form)=>t.$axios.$post("cartoon_role/make_deal",form),f=(t,{id:e})=>t.$axios.$post("cartoon_role/delete_deal",{id:e}),h=t=>t.$axios.$get("cartoon_role/stock_meta"),$=(t,form)=>t.$axios.$post("cartoon_role/create_market_price_draft",form),y=(t,{is_agree:e,idol_id:n,draft_id:r})=>t.$axios.$post("cartoon_role/vote_market_price_draft",{is_agree:e,idol_id:n,draft_id:r}),x=(t,{idol_id:e,qq_group:n,lover_words:r,manager_id:o})=>t.$axios.$post("cartoon_role/change_idol_profile",{idol_id:e,qq_group:n,lover_words:r,manager_id:o}),k=t=>t.$axios.$get("cartoon_role/user_draft_work"),w=t=>t.$axios.$get("cartoon_role/can_use_income"),C=(t,{product_id:e,product_type:n,amount:r})=>t.$axios.$post("cartoon_role/create_buy_request",{product_id:e,product_type:n,amount:r}),E=(t,{order_id:e,result:n})=>t.$axios.$post("cartoon_role/check_product_request",{order_id:e,result:n}),I=(t,{order_id:e})=>t.$axios.$post("cartoon_role/delete_buy_request",{order_id:e}),z=t=>t.$axios.$get("cartoon_role/get_mine_product_orders")},245:function(t,e){},274:function(t,e,n){"use strict";n.r(e);var r=n(245),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);e.default=o.a},275:function(t,e){},285:function(t,e,n){"use strict";var r=n(203),o={name:"VirtualIdolItem",components:{"v-trend":n.n(r).a},props:{item:{type:Object,required:!0},sort:{type:String,required:!0}},computed:{trendData(){return this.item.market_trend.map(t=>+t.value).reverse()},computedPercent(){return`${parseFloat(this.item.has_star/this.item.star_count*100).toFixed(2)}%`}}},c=n(0);var component=Object(c.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"virtual-idol-item"},[t._ssrNode("<a"+t._ssrAttr("href",t.$alias.cartoonRole(t.item.id))+' target="_blank">',"</a>",[t._ssrNode('<div class="info"><img'+t._ssrAttr("src",t.$resize(t.item.avatar,{width:160}))+'> <p class="oneline">'+t._ssrEscape(t._s(t.item.name))+"</p></div> "),t._ssrNode('<div class="intro">',"</div>",[t._ssrNode('<p class="price"><span>市值:</span> <strong>'+t._ssrEscape(t._s(t.item.company_state?"￥"+t.item.market_price:"未上市"))+'</strong></p> <p class="meta_1"><span>股价:</span> <span>'+t._ssrEscape("￥"+t._s(t.item.stock_price)+" / 股，"+t._s(t.item.fans_count)+"人持股")+"</span></p> "+("mine"===t.sort?'<p class="meta_2"><span>持有：</span> <span>'+t._ssrEscape(t._s(t.item.has_star)+"股，占比 "+t._s(t.computedPercent))+"</span></p>":'<p class="meta_2"><span>认购：</span> <span>'+t._ssrEscape(t._s(t.item.star_count)+"股")+"</span></p>")+" "),t._ssrNode('<div class="trend-placeholder">',"</div>",[t.trendData.length?n("no-ssr",[n("v-trend",{attrs:{data:t.trendData,gradient:["#ffafc9","#ff8eb3","#f25d8e"],"auto-draw-duration":400,height:42,padding:0,"auto-draw":"",smooth:""}})],1):n("p",[t._v("暂无数据")])],1)],2),t._ssrNode(' <div class="control">'+("mine"===t.sort?"<button>查看数据</button>":"<button"+t._ssrClass(null,{locked:t.item.is_locked})+">"+t._ssrEscape("\n          "+t._s(t.item.is_locked?"已停牌":"马上入股")+"\n        ")+"</button>")+'</div> <div class="extra"><div class="user">'+(t.item.boss?"<img"+t._ssrAttr("src",t.$resize(t.item.boss.avatar,{width:50,height:50}))+' class="boss">':"\x3c!----\x3e")+" "+(t.item.manager?"<img"+t._ssrAttr("src",t.$resize(t.item.manager.avatar,{width:50,height:50}))+' class="manager">':"\x3c!----\x3e")+'</div> <div class="time">'+(t.item.ipo_at?"<p>"+t._ssrEscape("上市时间："+t._s(t.item.ipo_at.split(" ")[0]))+"</p>":"<p>"+t._ssrEscape("创办时间："+t._s(t.item.created_at.split(" ")[0]))+"</p>")+"</div></div>")],2)])},[],!1,function(t){var e=n(274);e.__inject__&&e.__inject__(t)},null,"432705fd");e.a=component.exports},339:function(t,e,n){"use strict";n.r(e);var r=n(275),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);e.default=o.a},340:function(t,e){},397:function(t,e,n){"use strict";var r=n(55),o=n(239),c={name:"IdolTrendingAside",components:{FlowList:r.a},data:()=>({meta:{buyer_count:0,money_count:0,deal_count:0,exchang_money_count:0}}),mounted(){this.getRecentBuy(),this.getRecentDeal(),this.getMetaInfo()},methods:{getRecentBuy(){this.$store.dispatch("flow/initData",{func:"getRecentBuyList",sort:"newest",type:"page"})},getRecentDeal(){this.$store.dispatch("flow/initData",{func:"getRecentDealList",sort:"newest",type:"page"})},async getMetaInfo(){this.meta=await Object(o.o)(this)}}},l=n(0);var component=Object(l.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"idol-trending-aside"}},[t._ssrNode('<div class="badge"><span>'+t._ssrEscape("投资人数："+t._s(t.meta.buyer_count))+"</span> <em></em> <span>"+t._ssrEscape("总交易额：￥"+t._s(parseFloat(t.meta.money_count).toFixed(2)))+"</span></div> "),n("flow-list",{attrs:{auto:!1,"show-load-more":!1,func:"getRecentBuyList",sort:"newest",type:"page"},scopedSlots:t._u([{key:"header",fn:function(e){var source=e.source;return n("div",{staticClass:"recent-header"},[n("span",{staticClass:"title"},[t._v("最近入股")]),t._v(" "),source.total?n("span",{staticClass:"total"},[t._v("\n         · 共"+t._s(source.total)+"笔")]):t._e()])}},{key:"default",fn:function(e){var r=e.flow;return n("ul",{staticClass:"recent-deal-list"},t._l(r,function(e,r){return n("li",{key:r},[n("div",{staticClass:"oneline"},[n("a",{attrs:{href:t.$alias.user(e.user.zone),target:"_blank"}},[n("img",{attrs:{src:t.$resize(e.user.avatar,{width:36,height:36})}})]),t._v(" "),n("span",{domProps:{textContent:t._s(e.user.nickname)}}),t._v(" "),n("span",[t._v("入股了")]),t._v(" "),n("a",{attrs:{href:t.$alias.cartoonRole(e.idol.id),target:"_blank"},domProps:{textContent:t._s(e.idol.name)}})]),t._v(" "),n("div",{staticClass:"extra"},[n("div",[n("span",[t._v("￥"+t._s(e.price))]),t._v("\n            ·\n            "),n("span",[t._v(t._s(e.count)+"股")])]),t._v(" "),n("v-time",{model:{value:e.time,callback:function(n){t.$set(e,"time",n)},expression:"item.time"}})],1)])}),0)}}])}),t._ssrNode(' <br> <div class="badge"><span>'+t._ssrEscape("成交次数："+t._s(t.meta.deal_count))+"</span> <em></em> <span>"+t._ssrEscape("总成交额：￥"+t._s(parseFloat(t.meta.exchang_money_count).toFixed(2)))+"</span></div> "),n("flow-list",{attrs:{auto:!1,"show-load-more":!1,func:"getRecentDealList",sort:"newest",type:"page"},scopedSlots:t._u([{key:"header",fn:function(e){var source=e.source;return n("div",{staticClass:"recent-header"},[n("span",{staticClass:"title"},[t._v("最近交易")]),t._v(" "),source.total?n("span",{staticClass:"total"},[t._v(" · 共"+t._s(source.total)+"笔")]):t._e()])}},{key:"default",fn:function(e){var r=e.flow;return n("ul",{staticClass:"recent-deal-list"},t._l(r,function(e,r){return n("li",{key:r},[n("div",{staticClass:"oneline"},[n("a",{attrs:{href:t.$alias.user(e.buyer.zone),target:"_blank"}},[n("img",{attrs:{src:t.$resize(e.buyer.avatar,{width:36,height:36})}})]),t._v(" "),n("span",{domProps:{textContent:t._s(e.buyer.nickname)}}),t._v(" "),n("span",[t._v("购买了")]),t._v(" "),n("a",{attrs:{href:t.$alias.user(e.dealer.zone),target:"_blank"},domProps:{textContent:t._s(e.dealer.nickname)}}),t._v(" "),n("span",[t._v("的股票")])]),t._v(" "),n("div",{staticClass:"extra"},[n("div",[n("a",{attrs:{href:t.$alias.cartoonRole(e.idol.id),target:"_blank"},domProps:{textContent:t._s(e.idol.name)}}),t._v("\n            ·\n            "),n("span",[t._v("￥"+t._s(e.price))]),t._v("\n            ·\n            "),n("span",[t._v(t._s(e.count)+"股")])]),t._v(" "),n("v-time",{model:{value:e.time,callback:function(n){t.$set(e,"time",n)},expression:"item.time"}})],1)])}),0)}}])})],2)},[],!1,function(t){var e=n(339);e.__inject__&&e.__inject__(t)},null,"6b4051e2");e.a=component.exports},439:function(t,e,n){"use strict";n.r(e);var r=n(340),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);e.default=o.a},528:function(t,e,n){"use strict";n.r(e);var r=n(55),o=n(285),c=n(397),l={name:"RoleTrendingListed",components:{FlowList:r.a,VirtualIdolItem:o.a,IdolTrendingAside:c.a},data:()=>({nameQuery:"",sorts:[{label:"按市值排序",value:"market_price"},{label:"按人数排序",value:"fans_count"},{label:"按股价排序",value:"stock_price"},{label:"按活跃排序",value:"activity"}],sort_selected:"activity",current_sort:"trending-activity-1"}),async asyncData({store:t}){await t.dispatch("flow/initData",{func:"virtualIdolList",type:"seenIds",sort:"trending-activity-1"})},head:{title:"上市公司"},methods:{initTrending(){const t=`trending-${this.sort_selected}-1`;this.$store.dispatch("flow/initData",{func:"virtualIdolList",type:"seenIds",sort:t}),this.current_sort=t},handleSortChange(t){this.sort_selected=t,this.initTrending()},searchByName(){this.nameQuery&&(window.open(`/search?q=${this.nameQuery}&type=role`),this.nameQuery="")},searchByBangumi(t){window.open(`/bangumi/${t}/role`)}}},d=n(0);var component=Object(d.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"role-trending-listed"},[n("v-layout",[n("flow-list",{attrs:{sort:t.current_sort,func:"virtualIdolList",type:"seenIds"},scopedSlots:t._u([{key:"header",fn:function(e){var source=e.source;return n("div",{staticClass:"role-trending-header"},[n("strong",[t._v("总共 "+t._s(source.total)+" 个公司")]),t._v(" "),n("div",{staticClass:"search"},[n("bangumi-search",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"按番剧搜索"},on:{search:t.searchByBangumi}}),t._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"按名称搜索"},model:{value:t.nameQuery,callback:function(e){t.nameQuery="string"==typeof e?e.trim():e},expression:"nameQuery"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchByName},slot:"append"})],1),t._v(" "),n("el-select",{attrs:{size:"mini"},on:{change:t.handleSortChange},model:{value:t.sort_selected,callback:function(e){t.sort_selected=e},expression:"sort_selected"}},t._l(t.sorts,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)])}},{key:"default",fn:function(e){var r=e.flow;return n("ul",{},t._l(r,function(t){return n("virtual-idol-item",{key:t.id,attrs:{item:t,sort:"listed"}})}),1)}}])},[t._v(" "),t._v(" "),n("no-content",{attrs:{slot:"nothing"},slot:"nothing"},[n("nuxt-link",{attrs:{to:"/role/trending/newbie"}},[n("el-button",{attrs:{size:"mini"}},[t._v("\n            查看融资中的公司\n          ")])],1),t._v(" "),n("nuxt-link",{attrs:{to:"/role/trending/register"}},[n("el-button",{attrs:{size:"mini"}},[t._v("\n            自己注册公司\n          ")])],1)],1)],1),t._v(" "),n("idol-trending-aside",{attrs:{slot:"aside"},slot:"aside"})],1)],1)},[],!1,function(t){var e=n(439);e.__inject__&&e.__inject__(t)},null,"e6e75978");e.default=component.exports}};
//# sourceMappingURL=listed.chunk.657300a6.js.map