exports.ids=[17],exports.modules={239:function(t,e,r){"use strict";r.d(e,"l",function(){return o}),r.d(e,"s",function(){return n}),r.d(e,"g",function(){return l}),r.d(e,"j",function(){return c}),r.d(e,"c",function(){return d}),r.d(e,"k",function(){return m}),r.d(e,"d",function(){return h}),r.d(e,"q",function(){return f}),r.d(e,"h",function(){return _}),r.d(e,"o",function(){return v}),r.d(e,"f",function(){return $}),r.d(e,"r",function(){return x}),r.d(e,"a",function(){return y}),r.d(e,"p",function(){return w}),r.d(e,"m",function(){return k}),r.d(e,"e",function(){return A}),r.d(e,"b",function(){return j}),r.d(e,"i",function(){return I}),r.d(e,"n",function(){return S});const o=(t,{id:e})=>t.$axios.$get(`cartoon_role/${e}/stock_show`),n=(t,{id:e,amount:r})=>t.$axios.$post(`cartoon_role/${e}/buy_stock`,{amount:r}),l=(t,{bangumi_id:e,name:r,intro:o,avatar:n,alias:l})=>t.$axios.$post("cartoon_role/manager/create",{bangumi_id:e,name:r,intro:o,avatar:n,alias:l}),c=(t,form)=>t.$axios.$post("cartoon_role/manager/edit",form),d=(t,form)=>t.$axios.$post("cartoon_role/manager/user_create",form),m=(t,{id:e})=>t.$axios.$get(`cartoon_role/${e}/get_deal`),h=(t,form)=>t.$axios.$post("cartoon_role/create_deal",form),f=(t,form)=>t.$axios.$post("cartoon_role/make_deal",form),_=(t,{id:e})=>t.$axios.$post("cartoon_role/delete_deal",{id:e}),v=t=>t.$axios.$get("cartoon_role/stock_meta"),$=(t,form)=>t.$axios.$post("cartoon_role/create_market_price_draft",form),x=(t,{is_agree:e,idol_id:r,draft_id:o})=>t.$axios.$post("cartoon_role/vote_market_price_draft",{is_agree:e,idol_id:r,draft_id:o}),y=(t,{idol_id:e,qq_group:r,lover_words:o,manager_id:n})=>t.$axios.$post("cartoon_role/change_idol_profile",{idol_id:e,qq_group:r,lover_words:o,manager_id:n}),w=t=>t.$axios.$get("cartoon_role/user_draft_work"),k=t=>t.$axios.$get("cartoon_role/can_use_income"),A=(t,{product_id:e,product_type:r,amount:o})=>t.$axios.$post("cartoon_role/create_buy_request",{product_id:e,product_type:r,amount:o}),j=(t,{order_id:e,result:r})=>t.$axios.$post("cartoon_role/check_product_request",{order_id:e,result:r}),I=(t,{order_id:e})=>t.$axios.$post("cartoon_role/delete_buy_request",{order_id:e}),S=t=>t.$axios.$get("cartoon_role/get_mine_product_orders")},276:function(t,e){},288:function(t,e,r){"use strict";r.d(e,"c",function(){return o}),r.d(e,"a",function(){return n}),r.d(e,"d",function(){return l}),r.d(e,"b",function(){return c}),r.d(e,"h",function(){return d}),r.d(e,"f",function(){return m}),r.d(e,"g",function(){return h}),r.d(e,"e",function(){return f});const o=(t,{id:e,only:r,hash:o,time:time})=>t.$axios.$get(`post/${e}/show`,{params:{only:r,hash:o,time:time}}),n=(t,{title:title,bangumiId:e,content:content,images:r,tags:o,desc:desc,geetest:n,is_creator:l})=>t.$axios.$post("post/create",{title:title,bangumiId:e,content:content,images:r,tags:o,desc:desc,geetest:n,is_creator:l}),l=t=>t.$axios.$get("post/tags"),c=(t,{id:e})=>t.$axios.$post(`post/${e}/deletePost`),d=(t,{id:e})=>t.$axios.$post("post/manager/top/set",{id:e}),m=(t,{id:e})=>t.$axios.$post("post/manager/top/remove",{id:e}),h=(t,{id:e})=>t.$axios.$post("post/manager/nice/set",{id:e}),f=(t,{id:e})=>t.$axios.$post("post/manager/nice/remove",{id:e})},297:function(t,e){},298:function(t,e){},341:function(t,e,r){"use strict";e.a={async fetch({store:t,error:e}){await t.dispatch("initAuth")||e({statusCode:401,message:"继续操作前请先登录"})}}},353:function(t,e){},354:function(t,e,r){"use strict";r.r(e);var o=r(276),n=r.n(o);for(var l in o)"default"!==l&&function(t){r.d(e,t,function(){return o[t]})}(l);e.default=n.a},355:function(t,e){},356:function(t,e){},357:function(t,e){},358:function(t,e){},398:function(t,e,r){"use strict";var o=r(6),n=r(239),l={name:"CreateRoleForm",mixins:[o.a],props:{isCreate:{type:Boolean,default:!1},bangumiId:{type:[Number,String],default:0},role:{type:Object,default:null}},data(){return{form:{bangumi_id:this.bangumiId,name:this.role?this.role.name:"",alias:this.role?this.role.alias.split(","):[],avatar:this.role?this.role.avatar:"",intro:this.role?this.role.intro:"",stock_price:this.role?this.role.stock_price:"",max_stock_count:this.role?+this.role.max_stock_count||"未设置":""},rules:{name:[{validator:(t,e,r)=>e?e.length>35?r(new Error("名称最长 35 个字")):void r():r(new Error("请先填写角色名称")),trigger:"submit"}],intro:[{validator:(t,e,r)=>e?e.length>400?r(new Error("简介最多 400 个字")):void r():r(new Error("请先填写角色简介")),trigger:"submit"}],avatar:[{validator:(t,e,r)=>{if(!e)return r(new Error("请先上传头像"));r()},trigger:"submit"}],alias:[{validator:(t,e,r)=>e&&e.length?e.length>5?r(new Error("最多填写 5 个别名")):e.join("").length>200?r(new Error("最多 200 字")):void r():r(new Error("至少填写 1 个别名")),trigger:"submit"}]},submitting:!1}},methods:{submitEditProfile(){this.$refs.form.validate(async t=>{if(!t)return!1;{if(this.submitting)return;this.submitting=!0;const t=this.form.name;try{const e={bangumi_id:this.form.bangumi_id,name:t,intro:this.form.intro.trim(),avatar:this.form.avatar.split(".calibur.tv/").pop(),alias:[t].concat(this.form.alias.filter(e=>e!==t)).toString()};if("string"!=typeof e.alias&&(e.alias=e.alias.join(",")),this.isCreate){const t=await Object(n.g)(this,e);this.$refs.form.resetFields(),this.$refs.upload.clearFiles(),this.$toast.success("创建成功").then(()=>{window.open(this.$alias.cartoonRole(t))})}else await Object(n.j)(this,Object.assign(e,{id:this.role.id})),this.$emit("success")}catch(t){this.$toast.error(t)}finally{this.submitting=!1}}})},beforeAvatarUpload(t){return this.uploadConfig.max=1,this.uploadConfig.pathPrefix=`bangumi/${this.bangumiId}/role`,this.beforeImageUpload(t)},handleAvatarSuccess(t){this.$toast.success("上传成功"),this.form.avatar=t.data.url}}},c=r(0);var component=Object(c.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"edit-idol-form"}},[r("el-alert",{staticStyle:{"margin-bottom":"15px"},attrs:{closable:!1,title:"目前只有版主可以编辑偶像",type:"warning"}}),t._ssrNode(" "),r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,disabled:t.submitting,"label-width":"80px"}},[t.isCreate?r("el-form-item",{attrs:{label:"偶像名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"偶像的中文名"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"==typeof e?e.trim():e)},expression:"form.name"}})],1):t._e(),t._v(" "),r("el-form-item",{attrs:{label:"偶像别名",prop:"alias"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"角色的其它名字，如：英文名、日文名"},model:{value:t.form.alias,callback:function(e){t.$set(t.form,"alias",e)},expression:"form.alias"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"偶像头像",prop:"avatar"}},[t.form.avatar?r("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:t.$resize(t.form.avatar,{width:200})}}):t._e(),t._v(" "),r("el-upload",{ref:"upload",attrs:{data:t.uploadHeaders,action:t.imageUploadAction,accept:t.imageUploadAccept,"on-error":t.handleImageUploadError,"before-upload":t.beforeAvatarUpload,"on-success":t.handleAvatarSuccess,"show-file-list":!1}},[r("el-button",{attrs:{size:"mini"}},[t._v("点击上传")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"偶像简介",prop:"intro"}},[r("el-input",{attrs:{rows:10,type:"textarea",placeholder:"请输入角色简介"},model:{value:t.form.intro,callback:function(e){t.$set(t.form,"intro",e)},expression:"form.intro"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{loading:t.submitting,type:"primary"},on:{click:t.submitEditProfile}},[t._v("确认提交")])],1)],1)],2)},[],!1,function(t){var e=r(354);e.__inject__&&e.__inject__(t)},null,"08c2cfec");e.a=component.exports},451:function(t,e,r){"use strict";r.r(e);var o=r(355),n=r.n(o);for(var l in o)"default"!==l&&function(t){r.d(e,t,function(){return o[t]})}(l);e.default=n.a},452:function(t,e,r){"use strict";r.r(e);var o=r(356),n=r.n(o);for(var l in o)"default"!==l&&function(t){r.d(e,t,function(){return o[t]})}(l);e.default=n.a},453:function(t,e,r){"use strict";r.r(e);var o=r(357),n=r.n(o);for(var l in o)"default"!==l&&function(t){r.d(e,t,function(){return o[t]})}(l);e.default=n.a},454:function(t,e,r){"use strict";r.r(e);var o=r(358),n=r.n(o);for(var l in o)"default"!==l&&function(t){r.d(e,t,function(){return o[t]})}(l);e.default=n.a},496:function(t,e,r){"use strict";r.r(e);r(297),r(2);var o=r(206),n=r.n(o),l=(r(298),r(207)),c=r.n(l),d=(r(353),r(210)),m=r.n(d),h=r(6),f=r(61),_={components:{"el-date-picker":m.a},mixins:[h.a],props:{id:{type:[Number,String],required:!0}},data:()=>({loading:!1,tags:[],releaseWeekly:[{id:0,name:"不连载"},{id:1,name:"周一"},{id:2,name:"周二"},{id:3,name:"周三"},{id:4,name:"周四"},{id:5,name:"周五"},{id:6,name:"周六"},{id:7,name:"周日"}],form:{name:"",alias:"",tags:[],avatar:"",banner:"",summary:"",has_video:!0,has_cartoon:!1,qq_group:""},rules:{name:[{required:!0,message:"请输入番剧名称",trigger:"blur"}],alias:[{validator:(t,e,r)=>{if(!e||!e.length)return r(new Error("至少填写 1 个别名"));r()},trigger:"blur"}],tags:[{validator:(t,e,r)=>e&&e.length?e.length>10?r(new Error("最多选择 10 个标签")):void r():r(new Error("至少保留 1 个标签")),trigger:"change"}],summary:[{required:!0,message:"简介不能为空",trigger:"blur"},{min:1,max:250,message:"最多250字",trigger:"blur"}],qq_group:[{validator:(t,e,r)=>e?/^\d+$/.test(e)?void r():r(new Error("QQ群号码必须是数字")):r(),trigger:"submit"}]},seasons:[],editableTabsValue:"",tabIndex:0,seasonRule:{}}),mounted(){this.getBangumiById(),this.getBangumiTags()},methods:{getBangumiById(){this.$refs.form.resetFields(),this.loading=!0,Object(f.j)(this,{bangumi_id:this.id}).then(t=>{this.form=Object.assign(t,{banner:t.banner.split(".calibur.tv/").pop(),avatar:t.avatar.split(".calibur.tv/").pop(),tags:t.tags.map(t=>t.id),alias:t.alias.split(",")});const e=t.season.map(t=>Object.assign(t,{tab_name:t.name?t.name:`第${t.rank}季`,avatar:t.avatar.split(".calibur.tv/").pop()}));this.seasons=e,this.tabIndex=e.length-1,this.editableTabsValue=e[this.tabIndex].tab_name,this.loading=!1}).catch(()=>{this.loading=!1})},getBangumiTags(){this.$axios.$get("bangumi/tags").then(data=>{this.tags=data})},beforeAvatarUpload(t){return this.uploadConfig.max=1,this.beforeImageUpload(t)},beforeBannerUpload(t){return this.uploadConfig.max=3,this.beforeImageUpload(t)},handleAvatarSuccess(t){this.$toast.success("上传成功"),this.form.avatar=t.data.url},handleBannerSuccess(t){this.$toast.success("上传成功"),this.form.banner=t.data.url},editBangumiInfo(){this.$refs.form.validate(async t=>{if(t){const t=this.form.name,e=Object.assign({},this.form,{published_at:new Date(this.form.published_at).getTime()/1e3,alias:[t].concat(this.form.alias.filter(e=>e!==t)).toString()});try{await Object(f.b)(this,e),this.$toast.success("编辑成功"),setTimeout(()=>{window.location.reload()},1e3)}catch(t){this.$toast.error("操作失败")}}})},updateRelease(){this.$prompt("请输入视频id","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([1-9][0-9]*)$/,inputErrorMessage:"id 格式不正确"}).then(({value:t})=>{this.$axios.$post("admin/bangumi/release",{season_id:this.seasons[this.tabIndex].id,video_id:t})}).catch(()=>{})},handlePosterUploadSuccess(t){this.$toast.success("上传成功"),this.seasons[this.tabIndex].avatar=t.data.url},async editSeasonInfo(){const form=this.seasons[this.tabIndex];if(!form.published_at)return void this.$toast.error("上映日期不能为空");if(!form.avatar)return void this.$toast.error("季度封面不能为空");const t=Object.assign({},form,{published_at:new Date(form.published_at).getTime()/1e3});try{form.id?(await Object(f.c)(this,t),this.$toast.success("编辑成功")):(await Object(f.a)(this,t),this.$toast.success("创建成功")),setTimeout(()=>{window.location.reload()},1e3)}catch(t){this.$toast.error("操作失败")}},handleTabsChange(t){this.tabIndex=+t.index},handleTabsEdit(t,e){if("add"===e){const t=this.seasons[this.seasons.length-1].rank+1;let e=`第${t}季`;this.seasons.push({id:0,name:"",bangumi_id:this.id,tab_name:e,other_site_video:!0,end:!1,released_at:0,published_at:"",avatar:"",summary:"",rank:t}),this.editableTabsValue=e,this.tabIndex=this.seasons.length-1}if("remove"===e){this.seasons[this.tabIndex].published_at?this.$toast.warn("还不支持删除季度"):(this.seasons=this.seasons.filter(e=>e.tab_name!==t),this.tabIndex=this.seasons.length-1,this.editableTabsValue=this.seasons[this.tabIndex].tab_name)}}}},v=r(0),$=Object(v.a)(_,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"bangumi-edit"}},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"68px"}},[r("el-alert",{staticStyle:{"margin-bottom":"20px"},attrs:{title:"修改番剧名称不会生效",type:"error"}}),t._v(" "),r("el-form-item",{attrs:{label:"番剧名称",prop:"name"}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{placeholder:"中文名"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"==typeof e?e.trim():e)},expression:"form.name"}})],1),t._v(" "),r("el-col",{staticStyle:{"text-align":"right"},attrs:{offset:2,span:6}},[r("el-button",{attrs:{type:"primary"},on:{click:t.editBangumiInfo}},[t._v("更新番剧")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧别名",prop:"alias",required:""}},[r("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"番剧的其它名字，如：英文名、日文名"},model:{value:t.form.alias,callback:function(e){t.$set(t.form,"alias",e)},expression:"form.alias"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开启视频"}},[r("el-switch",{model:{value:t.form.has_video,callback:function(e){t.$set(t.form,"has_video",e)},expression:"form.has_video"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开启漫画"}},[r("el-switch",{model:{value:t.form.has_cartoon,callback:function(e){t.$set(t.form,"has_cartoon",e)},expression:"form.has_cartoon"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧标签",prop:"tags",required:""}},[r("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",placeholder:"可多选，至少选择一个"},model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}},t._l(t.tags,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧头像",prop:"avatar",required:""}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{disabled:!0,"auto-complete":"off"},model:{value:t.form.avatar,callback:function(e){t.$set(t.form,"avatar","string"==typeof e?e.trim():e)},expression:"form.avatar"}},[r("template",{slot:"prepend"},[t._v("https://image.calibur.tv/")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2,offset:1}},[r("el-form-item",[r("el-upload",{attrs:{data:t.uploadHeaders,"show-file-list":!1,"on-success":t.handleAvatarSuccess,"on-error":t.handleImageUploadError,"before-upload":t.beforeAvatarUpload,action:t.imageUploadAction,accept:t.imageUploadAccept}},[r("el-button",{attrs:{type:"text"}},[r("i",{staticClass:"el-icon-plus"}),t._v("\n              上传\n            ")])],1)],1)],1),t._v(" "),t.form.avatar?r("el-col",{attrs:{span:2}},[r("el-popover",{ref:"popoverAvatar",attrs:{placement:"left",width:"200",trigger:"hover"}},[r("img",{attrs:{src:t.imagePrefix+t.form.avatar}})]),t._v(" "),r("a",{directives:[{name:"popover",rawName:"v-popover:popoverAvatar",arg:"popoverAvatar"}],attrs:{href:t.imagePrefix+t.form.avatar,type:"text",target:"_blank"}},[r("i",{staticClass:"el-icon-view"}),t._v(" 预览\n        ")])],1):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧背景",prop:"banner",required:""}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{disabled:!0,"auto-complete":"off"},model:{value:t.form.banner,callback:function(e){t.$set(t.form,"banner","string"==typeof e?e.trim():e)},expression:"form.banner"}},[r("template",{slot:"prepend"},[t._v("https://image.calibur.tv/")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2,offset:1}},[r("el-form-item",[r("el-upload",{attrs:{data:t.uploadHeaders,"show-file-list":!1,"on-success":t.handleBannerSuccess,"on-error":t.handleImageUploadError,"before-upload":t.beforeBannerUpload,action:t.imageUploadAction,accept:t.imageUploadAccept}},[r("el-button",{attrs:{type:"text"}},[r("i",{staticClass:"el-icon-plus"}),t._v("\n              上传\n            ")])],1)],1)],1),t._v(" "),t.form.banner?r("el-col",{attrs:{span:2}},[r("el-popover",{ref:"popoverBanner",attrs:{placement:"left",width:"200",trigger:"hover"}},[r("img",{attrs:{src:t.imagePrefix+t.form.banner}})]),t._v(" "),r("a",{directives:[{name:"popover",rawName:"v-popover:popoverBanner",arg:"popoverBanner"}],attrs:{href:t.imagePrefix+t.form.banner,type:"text",target:"_blank"}},[r("i",{staticClass:"el-icon-view"}),t._v(" 预览\n        ")])],1):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧简介",prop:"summary"}},[r("el-input",{attrs:{rows:4,type:"textarea",placeholder:"请输入番剧简介，最多250字，纯文本不支持各种换行符"},model:{value:t.form.summary,callback:function(e){t.$set(t.form,"summary","string"==typeof e?e.trim():e)},expression:"form.summary"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"番剧Q群",prop:"qq_group"}},[r("el-input",{attrs:{placeholder:"设置官方同好群，请不要频繁修改"},model:{value:t.form.qq_group,callback:function(e){t.$set(t.form,"qq_group","string"==typeof e?e.trim():e)},expression:"form.qq_group"}})],1)],1),t._ssrNode(" "),r("el-alert",{staticStyle:{"margin-bottom":"20px"},attrs:{title:"以下是季度信息，与番剧信息分开编辑保存",type:"error"}},[r("p",[t._v("季度信息保存之后，无法删除，操作请谨慎")])]),t._ssrNode(" "),r("el-tabs",{attrs:{type:"card",editable:""},on:{edit:t.handleTabsEdit,"tab-click":t.handleTabsChange},model:{value:t.editableTabsValue,callback:function(e){t.editableTabsValue=e},expression:"editableTabsValue"}},t._l(t.seasons,function(e,o){return r("el-tab-pane",{key:o+"-"+e.id,attrs:{label:e.tab_name,name:e.tab_name}},[r("el-form",{ref:"season-"+e.id,refInFor:!0,attrs:{model:e,rules:t.seasonRule,"label-width":"68px"}},[r("el-form-item",{attrs:{label:"季度名称",prop:"name"}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{placeholder:"季度名"},model:{value:e.name,callback:function(r){t.$set(e,"name","string"==typeof r?r.trim():r)},expression:"item.name"}})],1),t._v(" "),r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:8}},[r("el-button",{attrs:{type:"primary"},on:{click:t.editSeasonInfo}},[t._v("更新季度")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"季度简介",prop:"summary"}},[r("el-input",{attrs:{rows:4,type:"textarea",placeholder:"季度简介，最多250字，纯文本不支持各种换行符"},model:{value:e.summary,callback:function(r){t.$set(e,"summary","string"==typeof r?r.trim():r)},expression:"item.summary"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"季度封面",prop:"avatar",required:""}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{disabled:!0,"auto-complete":"off"},model:{value:e.avatar,callback:function(r){t.$set(e,"avatar","string"==typeof r?r.trim():r)},expression:"item.avatar"}},[r("template",{slot:"prepend"},[t._v("https://image.calibur.tv/")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2,offset:1}},[r("el-form-item",[r("el-upload",{attrs:{data:t.uploadHeaders,"show-file-list":!1,"on-success":t.handlePosterUploadSuccess,"on-error":t.handleImageUploadError,"before-upload":t.beforeAvatarUpload,action:t.imageUploadAction,accept:t.imageUploadAccept}},[r("el-button",{attrs:{type:"text"}},[r("i",{staticClass:"el-icon-plus"}),t._v("\n                  上传\n                ")])],1)],1)],1),t._v(" "),e.avatar?r("el-col",{attrs:{span:2}},[r("el-popover",{ref:"popoverPoster-"+e.id,refInFor:!0,attrs:{placement:"left",width:"200",trigger:"hover"}},[r("img",{attrs:{src:t.imagePrefix+e.avatar}})]),t._v(" "),r("a",{directives:[{name:"popover",rawName:"v-popover",value:"popoverPoster-"+e.id,expression:"`popoverPoster-${item.id}`"}],attrs:{href:t.imagePrefix+e.avatar,type:"text",target:"_blank"}},[r("i",{staticClass:"el-icon-view"}),t._v(" 预览\n            ")])],1):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"上映日期",prop:"published_at",required:""}},[r("el-date-picker",{attrs:{clearable:!1,type:"date",placeholder:"选择日期"},model:{value:e.published_at,callback:function(r){t.$set(e,"published_at",r)},expression:"item.published_at"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"连载周期"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.released_at,callback:function(r){t.$set(e,"released_at",r)},expression:"item.released_at"}},t._l(t.releaseWeekly,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"是否完结"}},[r("el-switch",{model:{value:e.end,callback:function(r){t.$set(e,"end",r)},expression:"item.end"}})],1)],1)],1)}),1)],2)},[],!1,null,null,"2fde837a").exports,x=r(398),y=r(288),w={name:"BangumiPostSetting",data:()=>({set_nice_url:"",del_nice_url:"",set_top_url:"",del_top_url:"",loading:!1}),methods:{setNice(){if(!this.set_nice_url)return;const t=this.getPostIdFromUrl(this.set_nice_url);t?this.$confirm("确定要加精吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{if(!this.loading){this.loading=!0;try{await Object(y.g)(this,{id:t}),this.$toast.success("设置成功")}catch(t){this.$toast.error(t)}finally{this.loading=!1}}}).catch(()=>{}):this.$toast.error("请输入合法链接")},setTop(){if(!this.set_top_url)return;const t=this.getPostIdFromUrl(this.set_top_url);t?this.$confirm("确定要置顶吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{if(!this.loading){this.loading=!0;try{await Object(y.h)(this,{id:t}),this.$toast.success("设置成功")}catch(t){this.$toast.error(t)}finally{this.loading=!1}}}).catch(()=>{}):this.$toast.error("请输入合法链接")},removeNice(){if(!this.del_nice_url)return;const t=this.getPostIdFromUrl(this.del_nice_url);t?this.$confirm("确定要取消精吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{if(!this.loading){this.loading=!0;try{await Object(y.e)(this,{id:t}),this.$toast.success("设置成功")}catch(t){this.$toast.error(t)}finally{this.loading=!1}}}).catch(()=>{}):this.$toast.error("请输入合法链接")},removeTop(){if(!this.del_top_url)return;const t=this.getPostIdFromUrl(this.del_top_url);t?this.$confirm("确定要取消置顶吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{if(!this.loading){this.loading=!0;try{await Object(y.f)(this,{id:t}),this.$toast.success("设置成功")}catch(t){this.$toast.error(t)}finally{this.loading=!1}}}).catch(()=>{}):this.$toast.error("请输入合法链接")},getPostIdFromUrl(t){const e=t.split("?")[0].match(/^http(|s):\/\/(m|www).calibur.tv\/post\/(\d+)$/);return e?+e[3]:0}}};var k=Object(v.a)(w,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"bangumi-post-setting"}},[t._ssrNode('<div class="item">',"</div>",[t._ssrNode("<p>加精：</p> "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:21}},[r("el-input",{attrs:{placeholder:"输入帖子链接"},model:{value:t.set_nice_url,callback:function(e){t.set_nice_url=e},expression:"set_nice_url"}},[r("template",{slot:"prepend"},[t._v("要加精的帖子链接")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2}},[r("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.setNice}},[t._v("确认")])],1)],1)],2),t._ssrNode(" "),t._ssrNode('<div class="item">',"</div>",[t._ssrNode("<p>取消精：</p> "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:21}},[r("el-input",{attrs:{placeholder:"输入帖子链接"},model:{value:t.del_nice_url,callback:function(e){t.del_nice_url=e},expression:"del_nice_url"}},[r("template",{slot:"prepend"},[t._v("要取消精的帖子链接")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2}},[r("el-button",{attrs:{loading:t.loading,type:"danger"},on:{click:t.removeNice}},[t._v("确认")])],1)],1)],2),t._ssrNode(" "),t._ssrNode('<div class="item">',"</div>",[t._ssrNode("<p>置顶（最多同时有 3 个置顶帖）：</p> "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:21}},[r("el-input",{attrs:{placeholder:"输入帖子链接"},model:{value:t.set_top_url,callback:function(e){t.set_top_url=e},expression:"set_top_url"}},[r("template",{slot:"prepend"},[t._v("要置顶的帖子链接")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2}},[r("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.setTop}},[t._v("确认")])],1)],1)],2),t._ssrNode(" "),t._ssrNode('<div class="item">',"</div>",[t._ssrNode("<p>取消置顶：</p> "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:21}},[r("el-input",{attrs:{placeholder:"输入帖子链接"},model:{value:t.del_top_url,callback:function(e){t.del_top_url=e},expression:"del_top_url"}},[r("template",{slot:"prepend"},[t._v("要取消置顶的帖子链接")])],2)],1),t._v(" "),r("el-col",{attrs:{span:2}},[r("el-button",{attrs:{loading:t.loading,type:"danger"},on:{click:t.removeTop}},[t._v("确认")])],1)],1)],2)],2)},[],!1,function(t){var e=r(451);e.__inject__&&e.__inject__(t)},null,"8506d36a").exports,A=r(71),j=r(69),I=r(70),S={name:"ChangeBangumiManager",props:{id:{type:[String,Number],required:!0}},data:()=>({list:[]}),computed:{leaders(){return this.list.filter(t=>t.is_leader)},managers(){return this.list.filter(t=>!t.is_leader)},currentUserId(){return this.$store.state.login?this.$store.state.user.id:0},isLeader(){return this.leaders.map(t=>t.user.id).some(t=>t===this.currentUserId)}},mounted(){this.getManagers()},methods:{async getManagers(){const data=await Object(f.l)(this,this.id);this.list=data.list},addManager(){this.$prompt("请输入任职人的邀请码","任命代行者",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([1-9][0-9]*)$/,inputErrorMessage:"邀请码格式不正确"}).then(async({value:t})=>{await Object(f.q)(this,{user_id:t,bangumi_id:this.id}),this.$toast.success("操作成功"),setTimeout(()=>{window.location.reload()},1500)}).catch(()=>{})},delManager(){this.$prompt("请输入卸任人的邀请码","移除代行者",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([1-9][0-9]*)$/,inputErrorMessage:"邀请码格式不正确"}).then(async({value:t})=>{await Object(f.p)(this,{user_id:t,bangumi_id:this.id}),this.$toast.success("操作成功"),setTimeout(()=>{window.location.reload()},1500)}).catch(()=>{})}}};var T=Object(v.a)(S,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"change-bangumi-manager"}},[t._ssrNode('<h3 class="sub-title">版主</h3> <div class="users">'+t._ssrList(t.leaders,function(e){return"<a"+t._ssrAttr("href",t.$alias.user(e.user.zone))+' target="_blank"><img'+t._ssrAttr("src",t.$resize(e.user.avatar,{width:120}))+"></a>"})+"</div> "),t.isLeader?t._ssrNode('<div class="control">',"</div>",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.addManager}},[t._v("\n      添加代行者\n    ")]),t._ssrNode(" "),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:t.delManager}},[t._v("\n      移除代行者\n    ")])],2):t._e(),t._ssrNode(' <h3 class="sub-title">代行者</h3> <div class="users">'+t._ssrList(t.managers,function(e){return"<a"+t._ssrAttr("href",t.$alias.user(e.user.zone))+' target="_blank"><img'+t._ssrAttr("src",t.$resize(e.user.avatar,{width:120}))+"></a>"})+"</div>")],2)},[],!1,function(t){var e=r(452);e.__inject__&&e.__inject__(t)},null,"76895638").exports,N=r(217),B={name:"SortAndDelVideo",components:{draggable:r.n(N).a},props:{id:{type:[Number,String],required:!0}},data:()=>({package:null,enabled:!0}),computed:{columns(){return this.package?this.package.season:[]},videos(){return this.package?this.package.has_season?this.package.videos.map(t=>t.data):[this.package.videos.data]:[]}},mounted(){this.getVideos()},methods:{async getVideos(){this.package=await Object(f.h)(this,{id:this.id})},deleteVideo(t,e){this.package.has_season?this.package.videos[t].data.forEach((video,r)=>{video.id===e&&this.package.videos[t].data.splice(r,1)}):this.package.videos.data.forEach((video,t)=>{video.id===e&&this.package.videos.data.splice(t,1)})},submitChange(){this.$confirm("确认要提交你的改动吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const form=[];this.columns.forEach((t,e)=>{const r=this.videos[e].map(t=>t.id).join(",");form.push({season_id:t.id,videos:r})});try{await Object(f.r)(this,{bangumi_id:this.id,seasons:form}),this.$toast.success("编辑成功"),setTimeout(()=>{window.location.reload()},1500)}catch(t){this.$toast.error(t)}}).catch(()=>{})}}};var C=Object(v.a)(B,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"sort-and-del-video"}},[t._ssrNode('<div class="page-header">',"</div>",[r("el-switch",{attrs:{"inactive-color":"#ff4949","inactive-text":"删除模式","active-text":"排序模式"},model:{value:t.enabled,callback:function(e){t.enabled=e},expression:"enabled"}}),t._ssrNode("\n     \n    "),r("el-button",{attrs:{type:"primary",size:"mini",round:""},on:{click:t.submitChange}},[t._v("\n      保存\n    ")])],2),t._ssrNode(" "),t._ssrNode('<div class="list-wrap clearfix">',"</div>",t._l(t.columns,function(col,e){return t._ssrNode("<div"+t._ssrClass("list",{enabled:t.enabled})+t._ssrStyle(null,{width:parseInt(1/t.columns.length*100)+"%"},null)+">","</div>",[t._ssrNode('<p class="title oneline">'+t._ssrEscape(t._s(col.name))+"</p> "),r("draggable",{staticClass:"list-group",attrs:{list:t.videos[e],disabled:!t.enabled,group:"video"}},t._l(t.videos[e],function(video){return r("div",{key:video.id,staticClass:"list-group-item"},[r("div",{staticClass:"part",domProps:{textContent:t._s(video.episode)}}),t._v(" "),r("div",{staticClass:"el-icon-error delete",on:{click:function(r){return t.deleteVideo(e,video.id)}}}),t._v(" "),r("div",{staticClass:"name oneline",domProps:{textContent:t._s(video.name)}})])}),0)],2)}),0)],2)},[],!1,function(t){var e=r(453);e.__inject__&&e.__inject__(t)},null,"3bf6e376").exports,E=r(341),U={name:"BangumiSetting",components:{BangumiEditForm:$,CreateRoleForm:x.a,BangumiPostSetting:k,UploadImageForm:A.a,CreateAlbumForm:j.a,ImageAlbumSelect:I.a,SortAndDelVideo:C,ChangeBangumiManager:T,"el-collapse":c.a,"el-collapse-item":n.a},mixins:[E.a],props:{id:{required:!0,type:String}},data:()=>({activeName:"0",showSelectAlbum:!1,createdAlbum:null,selectedAlbum:null}),computed:{bangumi(){return this.$store.state.bangumi.show}},methods:{setSelectedAlbum(t){this.selectedAlbum=t},handleAlbumCreated(t){this.createdAlbum=t}}};var O=Object(v.a)(U,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"bangumi-setting"}},[r("el-collapse",{attrs:{accordion:""},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-collapse-item",{attrs:{title:"编辑番剧",name:"1"}},[r("bangumi-edit-form",{attrs:{id:t.id}})],1),t._v(" "),r("el-collapse-item",{attrs:{title:"编辑视频",name:"2"}},[r("sort-and-del-video",{attrs:{id:t.id}})],1),t._v(" "),r("el-collapse-item",{attrs:{title:"编辑权限",name:"4"}},[r("change-bangumi-manager",{attrs:{id:t.id}})],1),t._v(" "),r("el-collapse-item",{attrs:{title:"添加偶像",name:"5"}},[r("el-alert",{attrs:{type:"info",title:""}},[r("div",[t._v("1：请勿添加与该番剧无关的偶像")]),t._v(" "),r("div",[t._v("\n          2：添加偶像之前，请先在偶像列表里查找是否已添加过，请勿重复添加\n        ")])]),t._v(" "),r("create-role-form",{attrs:{"bangumi-id":t.id,"is-create":!0}})],1),t._v(" "),r("el-collapse-item",{attrs:{title:"帖子操作",name:"6"}},[r("bangumi-post-setting")],1),t._v(" "),r("el-collapse-item",{attrs:{title:"上传漫画",name:"7"}},[t.createdAlbum?[r("el-alert",{attrs:{type:"info",title:""}},[r("div",[t._v("1：漫画已经创建，但还没有内容，最好尽快上传内容")]),t._v(" "),r("div",[t._v("\n            2：下面的上传按钮可以一次最多上传\n            "),r("strong",[t._v("51")]),t._v("\n            张图片，当然你也可以在其它地方上传，但其它地方一次能够上传的更少\n          ")]),t._v(" "),r("div",[t._v("3：上传完成之后，可以在漫画页面排序和删除多余的图片")])]),t._v(" "),r("el-alert",{attrs:{title:"",type:"success"}},[t._v("\n          当前选中漫画："+t._s(t.createdAlbum.name)+"\n        ")]),t._v(" "),r("upload-image-form",{attrs:{"selected-album-id":t.createdAlbum.id,"selected-bangumi-id":t.id,exceed:51,"is-cartoon":!0}})]:[r("el-alert",{attrs:{type:"info",title:""}},[t._v("\n          请先创建一个相册，填写相应的漫画信息，或 \n          "),r("el-button",{attrs:{type:"primary",size:"mini",plain:"",round:""},on:{click:function(e){t.showSelectAlbum=!t.showSelectAlbum}}},[t._v("\n            "+t._s(t.showSelectAlbum?"新建一集漫画":"选择已有漫画，进行续传")+"\n          ")])],1),t._v(" "),t.showSelectAlbum?r("el-row",[r("el-col",{attrs:{span:20}},[r("image-album-select",{on:{success:t.setSelectedAlbum}})],1),t._v(" "),r("el-col",{attrs:{span:3,offset:1}},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.createdAlbum=t.selectedAlbum}}},[t._v("\n              确认\n            ")])],1)],1):r("create-album-form",{attrs:{"bangumi-id":t.id,"is-cartoon":!0},on:{success:t.handleAlbumCreated}})]],2)],1)],1)},[],!1,function(t){var e=r(454);e.__inject__&&e.__inject__(t)},null,"4f28e87f");e.default=O.exports}};
//# sourceMappingURL=setting.chunk.28b6844e.js.map