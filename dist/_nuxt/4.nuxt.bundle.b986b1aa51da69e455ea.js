webpackJsonp([4],{177:function(t,n,e){function a(t){e(233)}var i=e(18)(e(198),e(224),a,"data-v-b6da3594",null);t.exports=i.exports},179:function(t,n,e){"use strict";var a=e(52),i=e.n(a);n.a=i.a.create({baseURL:"http://api.riuir.com"})},198:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(179);n.default={name:"index",head:{title:"天下漫友是一家"},asyncData:function(){return a.a.get("/cartoon/banner").then(function(t){return{banner1:t.data}}).catch(function(t){console.log(t)})},data:function(){return{banner1:null,banner2:null,timer:null,toggle:!0}},created:function(){this.loopBanner()},methods:{loopBanner:function(){var t=this;this.timer=setInterval(function(){a.a.get("/cartoon/banner").then(function(n){t.toggle?t.banner2=n.data:t.banner1=n.data,setTimeout(function(){t.toggle=!t.toggle},1e4)}).catch(function(t){console.log(t)})},2e4)}},beforeDestroy:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}},208:function(t,n,e){n=t.exports=e(26)(!0),n.push([t.i,"#index-wrap[data-v-b6da3594]{width:100%;height:100%}#index-wrap .banner[data-v-b6da3594]{position:absolute;left:0;right:0;top:0;bottom:0;background-color:RGB(238,238,238);z-index:-1;opacity:0;-webkit-transition:opacity 1s ease-in-out;-o-transition:opacity 1s ease-in-out;transition:opacity 1s ease-in-out}#index-wrap .banner.show[data-v-b6da3594]{opacity:1}#index-wrap .slogan[data-v-b6da3594]{background-image:url(data:image/png;base64,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);width:435px;height:65px;position:absolute;left:50%;top:50%;margin-left:-217.5px;margin-top:-132.5px}","",{version:3,sources:["/Users/yuistack/Documents/Sites/riuir/frontend/desktop/pages/index.vue"],names:[],mappings:"AACA,6BAA6B,WAAW,WAAW,CAClD,AACD,qCAAqC,kBAAkB,OAAO,QAAQ,MAAM,SAAS,kCAAoC,WAAW,UAAU,0CAA0C,qCAAqC,iCAAiC,CAC7P,AACD,0CAA0C,SAAS,CAClD,AACD,qCAAqC,6yFAA6yF,YAAY,YAAY,kBAAkB,SAAS,QAAQ,qBAAqB,mBAAmB,CACp7F",file:"index.vue",sourcesContent:["\n#index-wrap[data-v-b6da3594]{width:100%;height:100%\n}\n#index-wrap .banner[data-v-b6da3594]{position:absolute;left:0;right:0;top:0;bottom:0;background-color:RGB(238, 238, 238);z-index:-1;opacity:0;-webkit-transition:opacity 1s ease-in-out;-o-transition:opacity 1s ease-in-out;transition:opacity 1s ease-in-out\n}\n#index-wrap .banner.show[data-v-b6da3594]{opacity:1\n}\n#index-wrap .slogan[data-v-b6da3594]{background-image:url(data:image/png;base64,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);width:435px;height:65px;position:absolute;left:50%;top:50%;margin-left:-217.5px;margin-top:-132.5px\n}\n"],sourceRoot:""}])},224:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"index-wrap"}},[e("div",{staticClass:"banner bg",class:{show:t.toggle},style:{backgroundImage:t.banner1?"url("+t.banner1.url+")":""}}),e("div",{staticClass:"banner bg",class:{show:!t.toggle},style:{backgroundImage:t.banner2?"url("+t.banner2.url+")":""}}),t._m(0)])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"slogan bg"})])}]}},233:function(t,n,e){var a=e(208);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(27)("ffef8a58",a,!0)}});